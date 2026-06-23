"use client"

import {
  AudioFileIcon,
  BackwardPlayer,
  FiveSecondsBackward,
  ForwardPlayer,
  Play,
  ReplayIcon,
} from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { FaCirclePause } from "react-icons/fa6"
import WaveSurfer from "wavesurfer.js"

const AUDIO_URL = "/audios/audio-sample.mp3"

const AudioPlayer: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const repeatOneRef = useRef(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isRepeatOne, setIsRepeatOne] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!waveformRef.current) return

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      url: AUDIO_URL,

      waveColor: "#0000003D",
      progressColor: "#3FA46E",
      cursorColor: "#3FA46E",

      width: "100%",
      height: 71,

      hideScrollbar: true,
      cursorWidth: 1,

      barGap: 4,
      barHeight: 0.8,
      barWidth: 3,
      barRadius: 4,

      dragToSeek: true,
      normalize: true,
    })

    wavesurferRef.current = wavesurfer

    const unsubscribeReady = wavesurfer.on("ready", (audioDuration) => {
      setDuration(audioDuration)
      setCurrentTime(0)
      setIsReady(true)
      setHasError(false)
    })

    const unsubscribeTimeUpdate = wavesurfer.on(
      "timeupdate",
      (newCurrentTime) => {
        setCurrentTime(newCurrentTime)
      },
    )

    const unsubscribePlay = wavesurfer.on("play", () => {
      setIsPlaying(true)
    })

    const unsubscribePause = wavesurfer.on("pause", () => {
      setIsPlaying(false)
    })

    const unsubscribeFinish = wavesurfer.on("finish", () => {
      if (repeatOneRef.current) {
        wavesurfer.setTime(0)
        void wavesurfer.play()
        return
      }

      setCurrentTime(wavesurfer.getDuration())
      setIsPlaying(false)
    })

    const unsubscribeError = wavesurfer.on("error", (error) => {
      console.error("WaveSurfer audio error:", error)

      setHasError(true)
      setIsReady(false)
      setIsPlaying(false)
    })

    return () => {
      unsubscribeReady()
      unsubscribeTimeUpdate()
      unsubscribePlay()
      unsubscribePause()
      unsubscribeFinish()
      unsubscribeError()

      wavesurfer.destroy()
      wavesurferRef.current = null
    }
  }, [])

  const togglePlayPause = async (): Promise<void> => {
    const wavesurfer = wavesurferRef.current

    if (!wavesurfer || !isReady) return

    try {
      await wavesurfer.playPause()
    } catch (error) {
      console.error("Unable to play audio:", error)
    }
  }

  const seekBy = (seconds: number): void => {
    const wavesurfer = wavesurferRef.current

    if (!wavesurfer || !isReady) return

    const totalDuration = wavesurfer.getDuration()

    if (!totalDuration || totalDuration <= 0) return

    const nextTime = Math.min(
      Math.max(wavesurfer.getCurrentTime() + seconds, 0),
      totalDuration,
    )

    wavesurfer.setTime(nextTime)
    setCurrentTime(nextTime)
  }

  const handleFiveSecondsBackward = (): void => {
    seekBy(-5)
  }

  const handleBackward = (): void => {
    seekBy(-1)
  }

  const handleForward = (): void => {
    seekBy(5)
  }

  const toggleRepeatOne = (): void => {
    const nextRepeatState = !isRepeatOne

    repeatOneRef.current = nextRepeatState
    setIsRepeatOne(nextRepeatState)
  }

  const formatTime = (time: number): string => {
    if (!Number.isFinite(time) || time < 0) {
      return "00:00"
    }

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <section className="grid h-full w-full grid-cols-1 rounded-[17px] border border-solid border-[#DDDDDD] bg-white p-[29px_23px_41.3px_27px] lg-md:h-[313px]">
      <div className="flex w-full gap-[17px] lg-md:h-[57px]">
        <div className="shrink-0">
          <AudioFileIcon />
        </div>

        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-lg font-semibold text-[#1A1A1A]">
            Philosophy of UI/UX Design
          </h3>

          <span className="font-satoshi text-left text-base/[21.6px] font-medium text-[#3FA46E]">
            Principles, ethics and practical user-centred design.
          </span>
        </div>
      </div>

      <div className="-mt-4 flex h-[162.7px] w-full flex-col gap-4">
        <div className="relative my-4 min-h-[71px] w-full">
          <div ref={waveformRef} className="w-full" />

          {!isReady && !hasError && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="font-satoshi text-sm text-[#707070]">
                Loading audio...
              </span>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white">
              <span className="font-satoshi text-sm text-red-500">
                Unable to load the audio file.
              </span>
            </div>
          )}
        </div>

        <div className="flex h-[19px] w-full items-center justify-between font-satoshi text-sm/[18.9px] font-normal text-[#3D3D3D]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex h-[40.74px] items-center justify-center">
          <div className="flex w-full max-w-[465.57px] items-center justify-between">
            <IconButton
              disableRipple
              aria-label="Go back five seconds"
              disabled={!isReady}
              onClick={handleFiveSecondsBackward}
              sx={{ padding: 0 }}
            >
              <FiveSecondsBackward />
            </IconButton>

            <IconButton
              disableRipple
              aria-label="Go back one second"
              disabled={!isReady}
              onClick={handleBackward}
              sx={{ padding: 0 }}
            >
              <BackwardPlayer />
            </IconButton>

            <IconButton
              disableRipple
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              disabled={!isReady}
              onClick={() => void togglePlayPause()}
              sx={{ padding: 0 }}
            >
              {isPlaying ? (
                <FaCirclePause className="h-[40.74px] w-[40.74px] text-[#3FA46E]" />
              ) : (
                <Play />
              )}
            </IconButton>

            <IconButton
              disableRipple
              aria-label="Go forward five seconds"
              disabled={!isReady}
              onClick={handleForward}
              sx={{ padding: 0 }}
            >
              <ForwardPlayer />
            </IconButton>

            <IconButton
              disableRipple
              aria-label={isRepeatOne ? "Disable repeat audio" : "Repeat audio"}
              aria-pressed={isRepeatOne}
              disabled={!isReady}
              onClick={toggleRepeatOne}
              sx={{
                padding: 0,
                color: isRepeatOne ? "#3FA46E" : "#707070",
              }}
            >
              <ReplayIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudioPlayer
