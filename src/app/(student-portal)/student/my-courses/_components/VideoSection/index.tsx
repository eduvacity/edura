"use client"

import CircularProgress from "@/app/(student-portal)/_components/CircularProgressbar"
import { PlayButtonAlt } from "@/components/SVGs"
import { SquaredBracketArrow } from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import Image from "next/image"
import { useRef, useState } from "react"

const YOUTUBE_VIDEO_ID = "34URw81_5mg"

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const toggleFullscreen = async () => {
    const container = videoContainerRef.current

    if (!container) return

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Failed to change fullscreen mode:", error)
    }
  }

  return (
    <div className="grid w-full grid-cols-1 rounded-[9.52px] border-[0.56px] border-solid border-[#DDDDDD] bg-white p-3.5">
      <div className="flex w-full flex-col gap-[22px]">
        <div
          ref={videoContainerRef}
          className="relative aspect-video w-full overflow-hidden rounded-[15.52px] bg-black"
        >
          {!isPlaying ? (
            <>
              <Image
                src="/images/thumbnail1.jpeg"
                alt="Course introduction video thumbnail"
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1024px) 100vw,
                       (max-width: 1280px) 100vw,
                       1020px"
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 z-10 bg-[linear-gradient(91.35deg,_#4D6C62_-4.16%,_rgba(49,_50,_50,_0.9)_22.82%,_rgba(149,_152,_152,_0.05)_109.42%)]" />

              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 z-30 flex items-center justify-center"
                aria-label="Play User-Centered Design video"
              >
                <PlayButtonAlt />
              </button>

              <div className="absolute bottom-4 right-2 z-40">
                <IconButton
                  type="button"
                  onClick={toggleFullscreen}
                  disableRipple
                  aria-label="Open video in fullscreen"
                >
                  <SquaredBracketArrow />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="User-Centered Design course video"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              <div className="absolute bottom-14 right-2 z-40">
                <IconButton
                  type="button"
                  onClick={toggleFullscreen}
                  disableRipple
                  aria-label="Toggle fullscreen"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <SquaredBracketArrow />
                </IconButton>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full items-start justify-between gap-[17px] lg-md:h-[57px]">
          <div className="flex min-w-0 flex-col">
            <h3 className="text-left font-satoshi text-lg/[24.3px] font-bold text-[#0C2B36]">
              User-Centered Design
            </h3>

            <span className="font-satoshi text-left text-base/[21.6px] font-medium text-[#3FA46E]">
              Iterative design: Refine design based on user feedback.
            </span>
          </div>

          <div className="shrink-0">
            <CircularProgress percentage={65} />
          </div>
        </div>

        <p className="text-left font-arial text-base font-normal leading-8 text-[#4A4949] sm:text-lg sm:leading-[37.8px]">
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
