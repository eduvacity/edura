"use client"

import { EmbeddedIcon } from "@/components/SVGs/portal"
import Link from "next/link"

const EmbeddedSection: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 bg-white rounded-[17px] border border-solid border-[#DDDDDD] p-[29px_23px_21.3px_27px]">
      {/* Title and Description */}
      <div className="w-full flex justify-between items-center gap-[17px]">
        <div className="w-full lg-md:h-[57px] flex gap-[17px]">
          <EmbeddedIcon className="text-[#3FA46E]" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">User-Centered Design</h3>
            <Link
              href="#"
              className="font-satoshi font-medium text-left text-base/[21.6px] text-[#1381CE]"
            >
              https://usercebnterdesign.goggle.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbeddedSection
