"use client"

import { PPTIcon } from "@/components/SVGs/portal"

const PPT_URL = "/presentations/Philosophy_of_UI_UX_Design.pptx"

const PPTSection: React.FC = () => {
  const handleOpenPresentation = () => {
    window.open(PPT_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="grid w-full grid-cols-1 rounded-[17px] border border-solid border-[#DDDDDD] bg-white p-[29px_23px_21.3px_27px]">
      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-[17px] sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center">
            <PPTIcon className="text-[#3FA46E]" />
          </div>

          <div className="flex min-w-0 flex-col">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">
              Philosophy of UI/UX Design
            </h3>

            <span className="font-satoshi text-left text-base/[21.6px] font-medium text-[#3FA46E]">
              Explore the principles, ethics and practical philosophy behind
              effective user-centred design.
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center sm:justify-end">
          <button
            type="button"
            onClick={handleOpenPresentation}
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[7px] border border-solid border-[#ACACAC] bg-[#E9E9EF] px-[17px] py-[11px] font-medium transition duration-300 hover:scale-[0.99] hover:bg-[#DEDEE7] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-fit"
            aria-label="Open Philosophy of UI/UX Design presentation"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  )
}

export default PPTSection
