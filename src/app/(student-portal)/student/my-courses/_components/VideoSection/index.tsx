"use client"
import CircularProgress from "@/app/(student-portal)/_components/CircularProgressbar"
import { PlayButtonAlt } from "@/components/SVGs"
import { SquaredBracketArrow } from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import Image from "next/image"
import { useRef, useState } from "react"

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const toggleFullscreen = () => {
    const container = videoContainerRef.current
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => {
          console.error(`Failed to enter fullscreen mode: ${err.message}`)
        })
      } else {
        document.exitFullscreen().catch((err) => {
          console.error(`Failed to exit fullscreen mode: ${err.message}`)
        })
      }
    }
  }

  return (
    <div
      ref={videoContainerRef}
      className="w-full grid grid-cols-1 bg-white rounded-[9.52px] border-[0.56px] border-solid border-[#DDDDDD] p-3.5"
    >
      <div className="w-full flex flex-col gap-[22px]">
        <div className="relative w-full">
          {!isPlaying ? (
            <div className="relative w-full h-[420.42px]">
              <div className="absolute inset-0 h-full bg-[linear-gradient(91.35deg,_#4D6C62_-4.16%,_rgba(49,_50,_50,_0.9)_22.82%,_rgba(149,_152,_152,_0.05)_109.42%)] z-10 rounded-[15.52px]" />
              <Image
                src="/images/thumbnail1.jpeg"
                alt="course introduction video thumbnail"
                fill
                sizes="(max-width: 768px) 100vw,
                     (max-width: 1024px) 100vw,
                     (max-width: 1280px) 100vw,
                     1020px"
                priority
                className="absolute inset-0 object-cover rounded-[15.52px]"
              />

              <button
                onClick={handlePlay}
                className="absolute inset-0 flex justify-center items-center z-[30]"
                aria-label="Play video"
              >
                <PlayButtonAlt />
              </button>
              <div className="absolute inset-0 left-auto top-auto bottom-4 right-2 z-[30]">
                <IconButton onClick={toggleFullscreen} disableRipple>
                  <SquaredBracketArrow />
                </IconButton>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-[420.42px]">
              <video
                className="absolute inset-0 w-full h-full object-cover rounded-[15.52px]"
                src="/videos/vid-3.mp4"
                controls
                autoPlay
              />
              <div className="absolute inset-0 left-auto top-auto bottom-4 right-2 z-[30]">
                <IconButton onClick={toggleFullscreen} disableRipple>
                  <SquaredBracketArrow />
                </IconButton>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg-md:h-[57px] flex gap-[17px] justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg/[24.3px] font-satoshi text-left font-bold text-[#0C2B36]">
              User-Centered Design
            </h3>
            <span className="font-satoshi font-medium text-left text-base/[21.6px] text-[#3FA46E]">
              Iterative design: Refine design based on user feedback.
            </span>
          </div>
          <CircularProgress percentage={65} />
        </div>

        <p className="font-arial font-normal text-lg/[37.8px] text-left text-[#4A4949]">
          User-Centered Design (UCD) is a design approach that puts users at the
          forefront of the design process. It&apos;s a methodology that
          emphasizes understanding users&apos; needs, goals, and behaviors to
          create products, services, and experiences that are intuitive,
          accessible, and meet their needs.
        </p>
      </div>
    </div>
  )
}

export default VideoSection
