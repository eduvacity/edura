"use client"

import { HOURS } from "../data/calendar.data"
import { formatHour } from "../utils/calendar.utils"

const TimeColumn = () => {
  return (
    <div className="w-[80px] shrink-0 bg-white">
      {HOURS.map((hour) => (
        <div
          key={hour}
          className="flex h-[120px] items-start justify-center border-t border-[#ECECEC] pt-2 text-sm font-semibold text-[#262626]"
        >
          {formatHour(hour)}
        </div>
      ))}
    </div>
  )
}

export default TimeColumn
