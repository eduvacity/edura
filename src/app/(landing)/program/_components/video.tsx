"use client"
import { PlayButtonAlt } from "@/components/SVGs"
import Image from "next/image"
import { useState } from "react"

export default function ProgramVideo({ video }: any) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto">
      {!isPlaying ? (
        <div className="relative mx-auto w-full h-[320px] max-w-[360px] aspect-[2/1] lg:max-w-[600px] lg-md:max-w-[938px] lg-md:h-[400px] lg:max-w-[884px] lg:h-[280px] xl:w-[580px] xl:h-[380px] overflow-hidden rounded-[18px] lg-md:rounded-[20px] xl:rounded-[28.02px] border-solid border-[1.32px] border-[#FFF2DA] bg-[#282828]/[33] ">
          <Image
            src={"/images/thumbnail1.jpeg"}
            alt="course introduction video thumnail"
            fill
            sizes="(max-width: 768px) 100vw,
                     (max-width: 1024px) 100vw,
                     (max-width: 1280px) 100vw,
                     1020px"
            priority
            className="absolute inset-0 object-cover rounded-[18px] lg-md:rounded-[20px] xl:rounded-[28.02px]"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex justify-center items-center"
          >
            <PlayButtonAlt />
          </button>
        </div>
      ) : (
        <div className="relative mx-auto w-full h-[320px] max-w-[360px] aspect-[2/1] lg:max-w-[600px] lg-md:max-w-[938px] lg-md:h-[400px] lg:max-w-[884px] lg:h-[280px] xl:w-[680px] xl:h-[480px] overflow-hidden rounded-[18px] lg-md:rounded-[20px] xl:rounded-[28.02px] border-solid border-[1.32px] border-[#FFF2DA] bg-[#282828]/[33]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={video?.publicUrl}
            title="course introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </div>
  )
}
