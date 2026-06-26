"use client"

import { HOURS } from "../data/calendar.data"
import type { CalendarEvent } from "../types/calendar.types"
import CalendarEventCard from "./CalendarEventCard"
import TimeColumn from "./TimeColumn"

type TodayViewProps = {
  events: CalendarEvent[]
  onSelectEvent: (event: CalendarEvent) => void
}

const TodayView = ({ events, onSelectEvent }: TodayViewProps) => {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#ECECEC] bg-white">
      <div className="flex border-b border-[#ECECEC]">
        <div className="w-[80px] shrink-0 border-r border-[#ECECEC]" />

        <div className="flex h-[64px] flex-1 flex-col items-center justify-center">
          <span className="text-xs text-[#666666]">Mon</span>

          <span className="mt-1 flex h-6 min-w-6 items-center justify-center rounded-sm bg-[#DCEAE5] px-1 text-sm font-semibold text-[#5A8A79]">
            22
          </span>
        </div>
      </div>

      <div className="relative flex">
        <TimeColumn />

        <div className="relative min-h-[720px] flex-1">
          {HOURS.map((hour) => (
            <div key={hour} className="h-[120px] border-t border-[#ECECEC]" />
          ))}

          <div className="absolute inset-0 px-1.5">
            {events.map((event) => (
              <CalendarEventCard
                key={event.id}
                event={event}
                onClick={() => onSelectEvent(event)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayView
