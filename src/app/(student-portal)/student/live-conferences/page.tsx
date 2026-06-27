"use client"

import { ConversationProvider, useConversation } from "@elevenlabs/react"
import {
  Bot,
  Camera,
  CameraOff,
  Maximize2,
  MessageSquareText,
  Mic,
  MicOff,
  MonitorUp,
  MoreHorizontal,
  PhoneOff,
  Plus,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import Image from "next/image"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"

type ConferenceStatus = "ready" | "connecting" | "active"

type ChatMessage = {
  id: string
  sender: string
  message: string
  time: string
  isAi?: boolean
}

const EDURA_AI_AGENT_ID = "agent_6701kvzcx6gne1zvv7ag1f1r5grt"
const EDURA_AI_BRANCH_ID = "agtbrch_2301kvzcx6gpf898yqvbe58889sy"
const EDURA_AI_TOKEN_ENDPOINT =
  "https://api.elevenlabs.io/v1/convai/conversation/token"

type TokenResponse = {
  token?: string
  detail?: string | { message?: string }
}

type LiveConferenceRoomProps = {
  isMicrophoneEnabled: boolean
  setIsMicrophoneEnabled: Dispatch<SetStateAction<boolean>>
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

export default function LiveConferences() {
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true)

  return (
    <ConversationProvider
      isMuted={!isMicrophoneEnabled}
      onMutedChange={(isMuted) => setIsMicrophoneEnabled(!isMuted)}
    >
      <LiveConferenceRoom
        isMicrophoneEnabled={isMicrophoneEnabled}
        setIsMicrophoneEnabled={setIsMicrophoneEnabled}
      />
    </ConversationProvider>
  )
}

function LiveConferenceRoom({
  isMicrophoneEnabled,
  setIsMicrophoneEnabled,
}: LiveConferenceRoomProps) {
  const [status, setStatus] = useState<ConferenceStatus>("ready")
  const [isCameraEnabled, setIsCameraEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [callError, setCallError] = useState<string | null>(null)
  const [callNotice, setCallNotice] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Edura AI",
      message:
        "Hello! I am ready to help you learn. Ask me a question whenever you are ready.",
      time: "Now",
      isAi: true,
    },
  ])
  const conversation = useConversation({
    onError: (message) => {
      setCallError(message || "Unable to start live conference")
      setCallNotice(null)
      setStatus("ready")
    },
    onConnect: () => {
      setCallError(null)
      setCallNotice("Edura Joined")
      setStatus("active")
    },
    onDisconnect: (details) => {
      setCallNotice(null)
      setStatus("ready")
      if (details.reason === "error") {
        setCallError(details.message || "Edura disconnected")
      }
    },
    onMessage: (payload) => {
      if (payload.role !== "agent" || !payload.message.trim()) return

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          sender: "Edura AI",
          message: payload.message,
          time: "Now",
          isAi: true,
        },
      ])
    },
  })

  const stopMediaStream = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop())
    mediaStreamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  const startCamera = useCallback(async () => {
    try {
      stopMediaStream()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })

      mediaStreamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setIsCameraEnabled(true)
    } catch (error) {
      console.error("Unable to access camera:", error)

      setIsCameraEnabled(false)
    }
  }, [stopMediaStream])

  const startConference = async () => {
    if (status !== "ready") return

    setStatus("connecting")
    setCallError(null)
    setCallNotice("Edura is joining")

    try {
      await startCamera()
      const conversationToken = await getConversationToken()
      conversation.startSession({ conversationToken })
    } catch (error) {
      setCallError(
        error instanceof Error ? error.message : "Unable to start live session"
      )
      setCallNotice(null)
      setStatus("ready")
    }
  }

  const endConference = () => {
    stopMediaStream()
    conversation.endSession()

    setStatus("ready")
    setElapsedSeconds(0)
    setIsScreenSharing(false)
    setIsChatOpen(true)
    setIsParticipantsOpen(false)
    setCallError(null)
    setCallNotice(null)
  }

  const toggleMicrophone = () => {
    const nextState = !isMicrophoneEnabled

    if (conversation.status === "connected") {
      try {
        conversation.setMuted(!nextState)
      } catch (error) {
        setCallError(
          error instanceof Error ? error.message : "Unable to update microphone"
        )
      }
      return
    }

    setIsMicrophoneEnabled(nextState)
  }

  const toggleCamera = async () => {
    const nextState = !isCameraEnabled

    if (nextState && !mediaStreamRef.current?.getVideoTracks().length) {
      await startCamera()
      return
    }

    mediaStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = nextState
    })

    setIsCameraEnabled(nextState)
  }

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      setIsScreenSharing(false)
      await startCamera()
      return
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      })

      stopMediaStream()
      mediaStreamRef.current = screenStream

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream
      }

      screenStream.getVideoTracks()[0]?.addEventListener("ended", async () => {
        setIsScreenSharing(false)
        await startCamera()
      })

      setIsScreenSharing(true)
      setIsCameraEnabled(true)
    } catch (error) {
      console.error("Unable to share screen:", error)
    }
  }

  const sendMessage = () => {
    const cleanMessage = message.trim()

    if (!cleanMessage) return

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        sender: "You",
        message: cleanMessage,
        time: "Now",
      },
    ])

    setMessage("")

    if (conversation.status !== "connected") {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          sender: "Edura AI",
          message: "Start the live conference first so I can respond.",
          time: "Now",
          isAi: true,
        },
      ])
      return
    }

    try {
      conversation.sendUserMessage(cleanMessage)
    } catch (error) {
      setCallError(
        error instanceof Error ? error.message : "Unable to send message"
      )
    }
  }

  useEffect(() => {
    if (status !== "active") return

    const interval = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [status])

  useEffect(() => {
    if (status !== "ready") return

    stopMediaStream()
    setIsScreenSharing(false)
  }, [status, stopMediaStream])

  useEffect(() => {
    return () => stopMediaStream()
  }, [stopMediaStream])

  const formattedDuration = new Date(elapsedSeconds * 1000)
    .toISOString()
    .slice(11, 19)
  const isAgentSpeaking = status === "active" && conversation.isSpeaking
  const agentStatusText =
    status === "connecting"
      ? "Edura is joining"
      : isAgentSpeaking
        ? "Speaking"
        : status === "active" && conversation.isListening
          ? "Listening"
          : status === "active"
            ? "Ready for your question"
            : "Waiting to join"
  const sessionStatusText =
    status === "connecting"
      ? "Edura is joining"
      : status === "active"
        ? "Edura Joined"
        : "Ready to go live"

  if (status === "ready" || status === "connecting") {
    return (
      <main className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center rounded-[18px] bg-white px-5 py-12">
        <section className="flex w-full lg:w-[456px]  flex-col items-center text-center">
          <div className="w-full flex max-w-[279px]">
            <Image
              src="/images/live-1.svg"
              alt="Female tutor"
              className="h-full w-full"
              height={119.597}
              width={119.597}
            />

            <Image
              src="/images/live-2.svg"
              alt="Male tutor"
              className="h-full w-full"
              height={119.597}
              width={119.597}
            />
          </div>

          <h1 className="text-[22px]/[30px] font-extrabold tracking-[-0.5px] text-[#212121] text-center">
            Collaborate with AI and learn in real time.
          </h1>

          <p className="mt-3 max-w-[540px] text-[14px]/[20px] leading-6 text-[#616161] text-center">
            Stay engaged with Edura AI through live chat and interactive video
            conferences.
          </p>

          <button
            type="button"
            onClick={startConference}
            disabled={status === "connecting"}
            className="mt-8 flex h-[59px] w-full max-w-[456px] items-center justify-center gap-4 rounded-xl border-[1.5px] border-[#4D6C62] bg-[#4D6C62] px-6 font-medium text-white shadow-[-4px_-2px_6px_0px_#1E1E1E33_inset] transition hover:bg-[#496B61] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "connecting" ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Edura is joining
              </>
            ) : (
              <>
                <Plus size={19} />
                Go live with Edura AI
              </>
            )}
          </button>

          {(callError || callNotice) && (
            <p
              className={`mt-4 rounded-[10px] px-4 py-3 text-sm font-medium ${
                callError
                  ? "bg-[#FCEAEA] text-[#D94242]"
                  : "bg-[#E8F2EE] text-[#4D6C62]"
              }`}
            >
              {callError || callNotice}
            </p>
          )}
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-120px)] w-full overflow-hidden rounded-[18px] bg-[#F5F6F6]">
      <header className="flex min-h-[72px] items-center justify-between border-b border-[#E4E7E5] bg-white px-5 sm:px-7">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#EA4F4F]" />

            <h1 className="text-base font-semibold text-[#252525] sm:text-lg">
              Live with Edura AI
            </h1>
          </div>

          <p className="mt-1 text-xs text-[#737373]">
            {sessionStatusText} · Session duration: {formattedDuration}
          </p>
        </div>

        <button
          type="button"
          onClick={endConference}
          className="flex h-10 items-center gap-2 rounded-[8px] bg-[#FCEAEA] px-4 text-sm font-medium text-[#D94242] transition hover:bg-[#F7DADA]"
        >
          <PhoneOff size={17} />
          <span className="hidden sm:inline">End session</span>
        </button>
      </header>

      <div className="flex min-h-[calc(100vh-192px)]">
        <section className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
          <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="relative min-h-[320px] overflow-hidden rounded-[18px] bg-[#1E2422]">
              {isCameraEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full min-h-[320px] w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-white">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#587B70] text-3xl font-semibold">
                    Y
                  </div>

                  <p className="mt-4 font-medium">You</p>
                  <p className="mt-1 text-sm text-white/60">Camera is off</p>
                </div>
              )}

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-sm text-white backdrop-blur-sm">
                {isMicrophoneEnabled ? <Mic size={15} /> : <MicOff size={15} />}

                <span>You</span>
              </div>

              <button
                type="button"
                className="absolute right-4 top-4 rounded-full bg-black/35 p-2 text-white transition hover:bg-black/55"
                aria-label="Maximise your video"
              >
                <Maximize2 size={17} />
              </button>
            </article>

            <article className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#EEF4F1] to-[#DCE9E4]">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#587B70] text-white shadow-lg">
                <Bot size={54} />

                <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#587B70] shadow">
                  <Sparkles size={18} />
                </span>
              </div>

              <h2 className="mt-5 text-xl font-semibold text-[#25312D]">
                Edura AI
              </h2>

              <p className="mt-2 max-w-[310px] px-5 text-center text-sm leading-6 text-[#67736F]">
                {agentStatusText}
              </p>

              <div className="mt-6 flex h-9 items-end gap-1">
                {[16, 25, 12, 31, 20, 34, 15, 27, 18].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={`w-1.5 origin-bottom rounded-full ${
                      isAgentSpeaking
                        ? "animate-bounce bg-[#587B70]"
                        : "bg-[#587B70]/35"
                    }`}
                    style={{
                      height: `${height}px`,
                      animationDelay: `${index * 90}ms`,
                      animationDuration: "780ms",
                    }}
                  />
                ))}
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 text-sm text-[#34443E] backdrop-blur-sm">
                <Mic size={15} />
                <span>Edura AI</span>
              </div>
            </article>
          </div>

          {(callError || callNotice) && (
            <div
              className={`mt-4 rounded-[14px] px-4 py-3 text-center text-sm font-medium ${
                callError
                  ? "bg-[#FCEAEA] text-[#D94242]"
                  : "bg-[#E8F2EE] text-[#4D6C62]"
              }`}
            >
              {callError || callNotice}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-[16px] bg-white p-4 shadow-sm">
            <ConferenceControl
              label={
                isMicrophoneEnabled ? "Mute microphone" : "Unmute microphone"
              }
              isActive={isMicrophoneEnabled}
              onClick={toggleMicrophone}
              icon={
                isMicrophoneEnabled ? <Mic size={20} /> : <MicOff size={20} />
              }
            />

            <ConferenceControl
              label={isCameraEnabled ? "Turn camera off" : "Turn camera on"}
              isActive={isCameraEnabled}
              onClick={toggleCamera}
              icon={
                isCameraEnabled ? <Camera size={20} /> : <CameraOff size={20} />
              }
            />

            <ConferenceControl
              label={isScreenSharing ? "Stop sharing" : "Share screen"}
              isActive={isScreenSharing}
              onClick={toggleScreenShare}
              icon={<MonitorUp size={20} />}
            />

            <ConferenceControl
              label="Open chat"
              isActive={isChatOpen}
              onClick={() => {
                setIsChatOpen((current) => !current)
                setIsParticipantsOpen(false)
              }}
              icon={<MessageSquareText size={20} />}
            />

            <ConferenceControl
              label="View participants"
              isActive={isParticipantsOpen}
              onClick={() => {
                setIsParticipantsOpen((current) => !current)
                setIsChatOpen(false)
              }}
              icon={<Users size={20} />}
            />

            <ConferenceControl
              label="More options"
              isActive={false}
              onClick={() => undefined}
              icon={<MoreHorizontal size={20} />}
            />

            <button
              type="button"
              onClick={endConference}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#DC4C4C] px-5 text-sm font-medium text-white transition hover:bg-[#C83E3E]"
            >
              <PhoneOff size={20} />
              <span className="hidden md:inline">End</span>
            </button>
          </div>
        </section>

        {(isChatOpen || isParticipantsOpen) && (
          <aside className="hidden w-[350px] shrink-0 border-l border-[#E2E6E4] bg-white xl:flex xl:flex-col">
            <div className="flex h-[64px] items-center justify-between border-b border-[#E8EAE9] px-5">
              <h2 className="font-semibold text-[#262626]">
                {isChatOpen ? "Live chat" : "Participants"}
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsChatOpen(false)
                  setIsParticipantsOpen(false)
                }}
                className="rounded-full p-2 text-[#707070] transition hover:bg-[#F1F2F2]"
                aria-label="Close side panel"
              >
                <X size={18} />
              </button>
            </div>

            {isChatOpen ? (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {messages.map((chatMessage) => (
                    <div
                      key={chatMessage.id}
                      className={`flex ${
                        chatMessage.sender === "You"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-[14px] px-4 py-3 ${
                          chatMessage.sender === "You"
                            ? "bg-[#587B70] text-white"
                            : "bg-[#F1F4F2] text-[#343A38]"
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          {chatMessage.isAi && <Bot size={14} />}

                          <span className="text-xs font-semibold">
                            {chatMessage.sender}
                          </span>

                          <span className="text-[10px] opacity-60">
                            {chatMessage.time}
                          </span>
                        </div>

                        <p className="text-sm leading-5">
                          {chatMessage.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8EAE9] p-4">
                  <div className="flex items-end gap-2 rounded-[12px] border border-[#D8DDDA] bg-white p-2 focus-within:border-[#587B70]">
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault()
                          sendMessage()
                        }
                      }}
                      rows={1}
                      placeholder="Ask Edura AI..."
                      className="max-h-[110px] min-h-[40px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#587B70] text-white transition hover:bg-[#48685E] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Send message"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3 p-5">
                <Participant
                  name="You"
                  role="Student"
                  isMuted={!isMicrophoneEnabled}
                />

                <Participant
                  name="Edura AI"
                  role="AI learning assistant"
                  isAi
                />
              </div>
            )}
          </aside>
        )}
      </div>
    </main>
  )
}

type ConferenceControlProps = {
  label: string
  isActive: boolean
  onClick: () => void | Promise<void>
  icon: ReactNode
}

const ConferenceControl = ({
  label,
  isActive,
  onClick,
  icon,
}: ConferenceControlProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
        isActive
          ? "border-[#587B70] bg-[#587B70] text-white"
          : "border-[#D9DEDB] bg-[#F5F7F6] text-[#414845] hover:bg-[#E9EEEB]"
      }`}
    >
      {icon}
    </button>
  )
}

type ParticipantProps = {
  name: string
  role: string
  isMuted?: boolean
  isAi?: boolean
}

const Participant = ({
  name,
  role,
  isMuted = false,
  isAi = false,
}: ParticipantProps) => {
  return (
    <div className="flex items-center gap-3 rounded-[12px] border border-[#EBEDEB] p-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2ECE8] font-semibold text-[#587B70]">
        {isAi ? <Bot size={21} /> : name.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#2A2A2A]">{name}</p>
        <p className="truncate text-xs text-[#787878]">{role}</p>
      </div>

      <span
        className={`rounded-full p-2 ${
          isMuted
            ? "bg-[#FCEAEA] text-[#D64B4B]"
            : "bg-[#E8F2EE] text-[#587B70]"
        }`}
      >
        {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
      </span>
    </div>
  )
}
