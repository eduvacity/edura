"use client"
import { useRef, useState } from "react"

const TextSection: React.FC = () => {
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
        <div className="w-full lg-md:h-[57px]">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">User-Centered Design</h3>
            <span className="font-satoshi font-medium text-left text-base/[21.6px] text-[#3FA46E]">
              Iterative design: Refine design based on user feedback.
            </span>
          </div>
        </div>
        <h4 className="font-satoshi font-medium text-left text-base/[21.6px] text-[#4A4949]">
          Introduction
        </h4>

        <p className="font-arial font-normal text-lg/[37.8px] text-left text-[#4A4949]">
          <span className="undeline text-[#1381CE]">
            User-Centered Design (UCD)
          </span>{" "}
          is a design approach that puts users at the forefront of the design
          process. It&apos;s a methodology that emphasizes understanding
          users&apos; needs, goals, and behaviors to create products, services,
          and experiences that are intuitive, accessible, and meet their needs.
          UCD is a design process that involves: 1. Empathizing with users
          through research and analysis 2. Defining user personas and journey
          maps 3. Ideating and prototyping solutions 4. Testing and refining
          designs based on user feedback
        </p>
      </div>
    </div>
  )
}

export default TextSection
