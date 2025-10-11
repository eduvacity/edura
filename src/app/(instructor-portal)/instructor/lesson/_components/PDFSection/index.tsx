"use client"

import { PPTIcon } from "@/components/SVGs/portal"

const PDFSection: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 bg-white rounded-[17px] border border-solid border-[#DDDDDD] p-[29px_23px_21.3px_27px]">
      {/* Title and Description */}
      <div className="w-full flex justify-between items-center gap-[17px]">
        <div className="w-full lg-md:h-[57px] flex gap-[17px]">
          <div className="flex items-center gap-[10px]">
            <PPTIcon className="text-pcolor w-[59px] h-[22px]" />
            <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-pcolor">
              PPT
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">User-Centered Design</h3>
            <span className="font-satoshi font-medium text-left text-base/[21.6px] text-[#3FA46E]">
              Iterative design: Refine design based on user feedback.
            </span>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <div className="w-fit h-[44px] py-[11px] px-[17px] gap-[10px] rounded-[7px] bg-[#E9E9EF] flex justify-center items-center border border-solid border-[#ACACAC] transform duration-300 hover:scale-[0.99] cursor-pointer">
            Open
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFSection
