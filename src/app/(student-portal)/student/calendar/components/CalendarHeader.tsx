"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const CalendarHeader = () => {
  const router = useRouter()

  return (
    <header className="flex items-start gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => router.back()}
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#333333] shadow-sm transition hover:bg-[#ECECEC]"
        aria-label="Go back"
      >
        <ChevronLeft size={20} />
      </button>

      <div>
        <h1 className="text-[22px]/[30px] font-extrabold leading-none text-[#212121]">
          Calendar
        </h1>

        <p className="mt-2 max-w-[590px] text-[12px] leading-[16px] text-[#616161] sm:text-sm sm:leading-5">
          View upcoming exams, assignment deadlines, classes, and events, all in
          one place. Sync with your personal calendar to never miss an important
          date.
        </p>
      </div>
    </header>
  )
}

export default CalendarHeader
