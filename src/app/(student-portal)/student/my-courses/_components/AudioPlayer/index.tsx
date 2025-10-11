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

const AudioPlayer: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isRepeatOne, setIsRepeatOne] = useState<boolean>(false)

  useEffect(() => {
    if (!waveformRef.current) return

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#0000003D", // Gray
      progressColor: "#3FA46E", // Green
      cursorColor: "#3FA46E",
      url: "/audio-sample.mp3",
      width: "100%",
      height: 70.96,
      hideScrollbar: true,
      cursorWidth: 1,
      barGap: 10,
      barHeight: 10,
      barWidth: 4,
      barRadius: 4,
      dragToSeek: true,
      normalize: true,
    })

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current?.getDuration() || 0)
    })

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current?.getCurrentTime() || 0)
    })

    wavesurfer.current.on("finish", () => {
      setIsPlaying(false)
    })

    // Cleanup on unmount
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
        wavesurfer.current = null
      }
    }
  }, [])

  const togglePlayPause = (): void => {
    if (!wavesurfer.current) return

    wavesurfer.current.playPause()
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  const handleFiveSecondsBackward = (): void => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(
        Math.max((wavesurfer.current.getCurrentTime() - 5) / duration, 0)
      )
    }
  }
  const handleBackward = (): void => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(
        Math.max((wavesurfer.current.getCurrentTime() - 1) / duration, 0)
      )
    }
  }

  const handleForward = (): void => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(
        Math.min((wavesurfer.current.getCurrentTime() + 5) / duration, 1)
      )
    }
  }

  const toggleRepeatOne = (): void => {
    setIsRepeatOne(!isRepeatOne)
  }

  return (
    <div className="w-full h-full lg-md:h-[313px] grid grid-cols-1 bg-white rounded-[17px] border border-solid border-[#DDDDDD] p-[29px_23px_41.3px_27px]">
      {/* Title and Description */}
      <div className="w-full lg-md:h-[57px] flex gap-[17px]">
        <AudioFileIcon />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">User-Centered Design</h3>
          <span className="font-satoshi font-medium text-left text-base/[21.6px] text-[#3FA46E]">
            Iterative design: Refine design based on user feedback.
          </span>
        </div>
      </div>
      <div className="w-full h-[162.7px] -mt-4 flex flex-col gap-4">
        {/* Waveform */}
        <div className="my-4" ref={waveformRef}></div>
        {/* Timestamps */}
        <div className="w-full h-[19px] flex justify-between items-center font-satoshi font-normal text-sm/[18.9px] text-[#3D3D3D]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="h-[40.74px] flex justify-center items-center ">
          <div className="w-[465.57px] flex gap-[69.84px]">
            <IconButton disableRipple onClick={handleFiveSecondsBackward}>
              <FiveSecondsBackward />
            </IconButton>
            <IconButton disableRipple onClick={handleBackward}>
              <BackwardPlayer />
            </IconButton>
            <IconButton disableRipple onClick={togglePlayPause}>
              {isPlaying ? (
                <FaCirclePause className="w-[40.74px] h-[40.74px] bg-white text-[#3FA46E]" />
              ) : (
                <Play />
              )}
            </IconButton>
            <IconButton disableRipple onClick={handleForward}>
              <ForwardPlayer />
            </IconButton>
            <IconButton
              disableRipple
              onClick={toggleRepeatOne}
              className={`text-gray-500 ${
                isRepeatOne ? "text-green-500" : "hover:text-black"
              }`}
            >
              <ReplayIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
