"use client"

import { useState } from "react"
import { MOBILE_MONTH_ROWS } from "../data/calendar.data"

type MobileMonthPickerProps = {
  selectedDate?: number
  onDateSelect?: (date: number) => void
}

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const MobileMonthPicker = ({
  selectedDate = 25,
  onDateSelect,
}: MobileMonthPickerProps) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState(selectedDate)

  const handleDateSelect = (date: number, isOutside: boolean) => {
    if (isOutside) return

    setInternalSelectedDate(date)
    onDateSelect?.(date)
  }

  return (
    <div className="w-full rounded-[18px] border border-[#E5E5E5] bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="text-[11px] font-medium text-[#444444]">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {MOBILE_MONTH_ROWS.map((row, rowIndex) => (
          <div
            key={`month-row-${rowIndex}`}
            className="grid grid-cols-7 gap-1 text-center"
          >
            {row.map((date, dateIndex) => {
              const isOutside =
                rowIndex === MOBILE_MONTH_ROWS.length - 1 && dateIndex > 2

              const isSelected = !isOutside && internalSelectedDate === date

              return (
                <button
                  key={`${rowIndex}-${dateIndex}-${date}`}
                  type="button"
                  disabled={isOutside}
                  onClick={() => handleDateSelect(date, isOutside)}
                  aria-label={`Select date ${date}`}
                  aria-pressed={isSelected}
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-[7px] text-xs transition ${
                    isSelected
                      ? "bg-[#55796D] font-medium text-white"
                      : isOutside
                        ? "cursor-default text-[#9CA6B0]"
                        : "text-[#444444] hover:bg-[#F2F4F3]"
                  }`}
                >
                  {date}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileMonthPicker
