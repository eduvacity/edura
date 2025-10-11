"use client"
import { PlayButtonAlt } from "@/components/SVGs"
import Image from "next/image"
import { useState } from "react"

export default function DashboardVideo({ video }: any) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative w-full">
      {!isPlaying ? (
        <div className="relative w-full h-[320px]">
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
        <div className="relative w-full h-[320px]">
          <iframe
            className="absolute inset-0 w-full h-full object-cover rounded-[18px] xl:rounded-[28.02px]"
            src={video}
            title="course introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </div>
  )
}
