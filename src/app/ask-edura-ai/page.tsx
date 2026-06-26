"use client"

import { ConversationProvider, useConversation } from "@elevenlabs/react"
import {
  Bot,
  Mic,
  MicOff,
  PhoneOff,
  ShieldCheck,
  Sparkles,
  User,
  Video,
  VideoOff,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function AskEduraAIPage() {
  const [micMuted, setMicMuted] = useState(false)

  return (
    <ConversationProvider isMuted={micMuted} onMutedChange={setMicMuted}>
      <AskEduraAIRoom micMuted={micMuted} setMicMuted={setMicMuted} />
    </ConversationProvider>
  )
}

const EDURA_AI_AGENT_ID = "agent_6701kvzcx6gne1zvv7ag1f1r5grt"
const EDURA_AI_BRANCH_ID = "agtbrch_2301kvzcx6gpf898yqvbe58889sy"
const EDURA_AI_TOKEN_ENDPOINT =
  "https://api.elevenlabs.io/v1/convai/conversation/token"

type TokenResponse = {
  token?: string
  detail?: string | { message?: string }
}

function getTokenErrorMessage(data: TokenResponse | null) {
  if (!data?.detail) return null
  if (typeof data.detail === "string") return data.detail
  return data.detail.message || null
}

async function getConversationToken() {
  const params = new URLSearchParams({
    agent_id: EDURA_AI_AGENT_ID,
    branch_id: EDURA_AI_BRANCH_ID,
  })
  const response = await fetch(`${EDURA_AI_TOKEN_ENDPOINT}?${params}`)
  const data = (await response.json().catch(() => null)) as TokenResponse | null

  if (!response.ok) {
    throw new Error(
      getTokenErrorMessage(data) || `Unable to start call (${response.status})`
    )
  }

  if (!data?.token) {
    throw new Error("Unable to start call: missing conversation token")
  }

  return data.token
}

type AskEduraAIRoomProps = {
  micMuted: boolean
  setMicMuted: (muted: boolean) => void
}

function AskEduraAIRoom({ micMuted, setMicMuted }: AskEduraAIRoomProps) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [callError, setCallError] = useState<string | null>(null)
  const [callNotice, setCallNotice] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const conversation = useConversation({
    onError: (message) => {
      setCallError(message || "Unable to start call")
      setCallNotice(null)
    },
    onConnect: () => {
      setCallError(null)
      setCallNotice("Edura Joined")
    },
    onDisconnect: (details) => {
      setCallNotice(null)
      if (details.reason === "error") {
        setCallError(details.message || "Voice session disconnected")
      }
    },
  })
  const sessionStarted =
    isStarting ||
    conversation.status === "connecting" ||
    conversation.status === "connected"
  const micEnabled = !micMuted
  const agentStatusText =
    isStarting || conversation.status === "connecting"
      ? "Edura is joining"
      : sessionStarted && conversation.isSpeaking
        ? "Speaking"
        : sessionStarted && conversation.isListening
          ? "Listening"
          : sessionStarted
            ? "Ready for your question"
            : "Waiting to join"
  const sessionStatusText =
    conversation.status === "connected"
      ? "Edura Joined"
      : isStarting || conversation.status === "connecting"
        ? "Edura is joining"
        : "Edura AI room prepared"

  useEffect(() => {
    let active = true

    const stopCamera = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      if (videoRef.current) videoRef.current.srcObject = null
    }

    if (!cameraEnabled) {
      stopCamera()
      return
    }

    const openCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera is unavailable in this browser")
        setCameraEnabled(false)
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        setCameraError(null)
        if (videoRef.current) videoRef.current.srcObject = stream
      } catch {
        setCameraError("Camera permission needed")
        setCameraEnabled(false)
      }
    }

    openCamera()

    return () => {
      active = false
      stopCamera()
    }
  }, [cameraEnabled])

  const startSession = async () => {
    if (sessionStarted) return

    setCameraError(null)
    setCallError(null)
    setCallNotice("Edura is joining")
    setIsStarting(true)

    if (!navigator.mediaDevices?.getUserMedia) {
      setCallError("Microphone is unavailable in this browser")
      setCallNotice(null)
      setIsStarting(false)
      return
    }

    try {
      const conversationToken = await getConversationToken()
      conversation.startSession({ conversationToken })
      setCameraEnabled(true)
    } catch (error) {
      setCallError(
        error instanceof Error ? error.message : "Unable to start call"
      )
      setCallNotice(null)
    } finally {
      setIsStarting(false)
    }
  }

  const endSession = () => {
    conversation.endSession()
    setCameraEnabled(false)
    setCallNotice(null)
  }

  const toggleMic = () => {
    const nextMuted = !micMuted

    if (conversation.status === "connected") {
      try {
        conversation.setMuted(nextMuted)
      } catch (error) {
        setCallError(
          error instanceof Error ? error.message : "Unable to update microphone"
        )
      }
      return
    }

    setMicMuted(nextMuted)
  }

  return (
    <main className="min-h-screen bg-[#151A18] text-white">
      <div className="flex min-h-screen flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-white/10 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[8px] bg-white">
              <Image
                src="/logo-icon.svg"
                alt="Edura"
                width={24}
                height={24}
                priority
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate font-satoshi text-lg font-bold leading-6">
                Ask Edura AI
              </h1>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                <span
                  className={`h-2 w-2 rounded-full ${
                    sessionStarted ? "bg-[#70E0BC]" : "bg-white/35"
                  }`}
                />
                <span>{sessionStarted ? "Session live" : "Room ready"}</span>
              </div>
            </div>
          </div>

          <div className="inline-flex h-10 items-center justify-center rounded-[8px] border border-white/15 bg-white/10 px-3 text-sm font-medium text-white">
            {sessionStarted ? "In session" : "AI study room"}
          </div>
        </header>

        <section className="flex flex-1 flex-col gap-4 p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
          <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-white/10 bg-[#0F1312] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-[8px] border border-white/10 bg-black/35 px-3 py-2 text-sm font-medium backdrop-blur">
              <Bot className="h-4 w-4 text-[#70E0BC]" />
              <span>Edura AI Agent</span>
            </div>

            <div className="grid min-h-[520px] gap-4 p-4 pt-16 md:grid-cols-2">
              <article className="relative flex min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 bg-[#1A211E]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(112,224,188,0.18),_transparent_58%)]" />

                <div className="relative flex w-full flex-col items-center justify-center p-6 text-center">
                  <div className="relative grid h-32 w-32 place-items-center rounded-[8px] bg-[#DFF7EC] text-[#22483B]">
                    {sessionStarted && (
                      <>
                        <span className="absolute inset-[-14px] rounded-[14px] border border-[#70E0BC]/35" />
                        <span className="absolute inset-[-28px] rounded-[18px] border border-[#70E0BC]/15" />
                      </>
                    )}
                    <Bot className="h-16 w-16" />
                  </div>

                  <h2 className="mt-6 font-satoshi text-xl font-bold">
                    Edura AI
                  </h2>
                  <p className="mt-2 text-sm text-white/55">
                    {agentStatusText}
                  </p>

                  {sessionStarted && (
                    <div className="mt-6 flex h-12 items-end justify-center gap-2">
                      {[18, 34, 24, 42, 28, 38, 20].map((height, index) => (
                        <span
                          key={index}
                          className={`origin-bottom w-2 rounded-full ${
                            conversation.isSpeaking
                              ? "animate-bounce bg-[#70E0BC]"
                              : "bg-white/25"
                          }`}
                          style={{
                            height,
                            animationDelay: `${index * 90}ms`,
                            animationDuration: "780ms",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[8px] bg-black/45 px-3 py-2 text-sm font-semibold backdrop-blur">
                  <Bot className="h-4 w-4 text-[#70E0BC]" />
                  <span>Edura AI</span>
                </div>
              </article>

              <article className="relative flex min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 bg-[#222826]">
                {cameraEnabled ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full scale-x-[-1] object-cover"
                  />
                ) : (
                  <div className="flex w-full flex-col items-center justify-center p-6 text-center">
                    <div className="grid h-32 w-32 place-items-center rounded-[8px] bg-[#F4B860] text-[#251804]">
                      <User className="h-16 w-16" />
                    </div>

                    <h2 className="mt-6 font-satoshi text-xl font-bold">You</h2>
                    <p className="mt-2 max-w-[32ch] text-sm text-white/55">
                      {cameraError || "Camera is off"}
                    </p>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[8px] bg-black/45 px-3 py-2 text-sm font-semibold backdrop-blur">
                  {micEnabled ? (
                    <Mic className="h-4 w-4 text-[#70E0BC]" />
                  ) : (
                    <MicOff className="h-4 w-4 text-[#E04F5F]" />
                  )}
                  <span>You</span>
                </div>

                <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-[8px] bg-black/45 px-3 py-2 text-sm font-semibold backdrop-blur">
                  {cameraEnabled ? (
                    <Video className="h-4 w-4 text-[#70E0BC]" />
                  ) : (
                    <VideoOff className="h-4 w-4 text-[#E04F5F]" />
                  )}
                  <span>{cameraEnabled ? "Camera on" : "Camera off"}</span>
                </div>
              </article>

              {(callError || callNotice) && (
                <div
                  className={`absolute bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 rounded-[8px] border px-4 py-3 text-center text-sm font-medium text-white shadow-lg ${
                    callError
                      ? "border-[#E04F5F]/35 bg-[#3A151B]/95"
                      : "border-[#70E0BC]/35 bg-[#12362B]/95"
                  }`}
                >
                  {callError || callNotice}
                </div>
              )}
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <section className="rounded-[8px] border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#DFF7EC] text-[#22483B]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-satoshi text-base font-bold">
                    {sessionStarted ? "Session Live" : "Session Ready"}
                  </h2>
                  <p className="mt-1 text-sm text-white/55">
                    {sessionStatusText}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[8px] border border-white/10 bg-white/[0.06] p-4">
              <h2 className="font-satoshi text-sm font-bold uppercase tracking-[0.08em] text-white/45">
                Participants
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-[8px] bg-black/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#70E0BC] text-[#10211B]">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Edura AI</p>
                      <p className="text-xs text-white/45">Agent</p>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-[#70E0BC]" />
                </div>

                <div className="flex items-center justify-between rounded-[8px] bg-black/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#F4B860] text-[#251804]">
                      <Mic className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">You</p>
                      <p className="text-xs text-white/45">Learner</p>
                    </div>
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      sessionStarted ? "bg-[#70E0BC]" : "bg-white/35"
                    }`}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[8px] border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#70E0BC]" />
                <div>
                  <h2 className="font-satoshi text-sm font-bold">
                    Edura AI
                  </h2>
                  <p className="mt-1 text-sm text-white/55">
                    Learning assistant room
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </section>

        <footer className="flex min-h-[84px] items-center justify-center border-t border-white/10 px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleMic}
              className={`inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-[8px] px-4 text-sm font-bold transition ${
                micEnabled
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-[#E04F5F] text-white hover:bg-[#C83F4E]"
              }`}
            >
              {micEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">
                {micEnabled ? "Mic on" : "Mic off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCameraError(null)
                setCameraEnabled((enabled) => !enabled)
              }}
              className={`inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-[8px] px-4 text-sm font-bold transition ${
                cameraEnabled
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-white/10 text-white/65 hover:bg-white/15"
              }`}
            >
              {cameraEnabled ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">
                {cameraEnabled ? "Camera on" : "Camera off"}
              </span>
            </button>

            {!sessionStarted && (
              <button
                type="button"
                onClick={startSession}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#70E0BC] px-5 text-sm font-bold text-[#10211B] transition hover:bg-[#86E8C9]"
              >
                <Sparkles className="h-5 w-5" />
                <span>Start call</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => (sessionStarted ? endSession() : router.back())}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#E04F5F] px-5 text-sm font-bold text-white transition hover:bg-[#C83F4E]"
            >
              <PhoneOff className="h-5 w-5" />
              <span>{sessionStarted ? "End call" : "Leave room"}</span>
            </button>
          </div>
        </footer>
      </div>
    </main>
  )
}
