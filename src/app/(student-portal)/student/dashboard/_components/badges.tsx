import { ExplorerIcon } from "@/components/SVGs/portal"
import React from "react"

export default function Badges() {
  return (
    <div className="w-full flex flex-col gap-[13px]">
      {data?.map((badge, index) => (
        <div
          key={index}
          className="w-full h-[100px] p-[19.66px_26.21px_20.08px_25.24px] rounded-[14.02px] border-[0.93px] border-solid border-[#DDDDDD] flex gap-2 items-center"
        >
          {badge.icon}{" "}
          <div className="flex flex-col">
            <h4 className="font-satoshi font-bold text-[16.83px] leading-[20.57px] -tracking-[0.001em] text-left text-[#2E3646]">
              {badge.title}
            </h4>
            <span className="max-w-[400px] font-satoshi font-normal text-[16px] leading-[16.83px] overflow-hidden whitespace-nowrap -tracking-[0.001em] text-left text-[#2E3646] text-ellipsis">
              {badge.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

const data = [
  {
    title: "Explorer",
    description: `Completed all modules with distinction`,
    icon: <ExplorerIcon />,
  },
  {
    title: "Ultimate",
    description: `Completed a course in record time`,
    icon: <ExplorerIcon />,
  },
]
