"use client"

import { HOURS, WEEK_DAYS } from "../data/calendar.data"
import type { CalendarEvent } from "../types/calendar.types"
import CalendarEventCard from "./CalendarEventCard"
import TimeColumn from "./TimeColumn"

type DesktopWeekViewProps = {
  events: CalendarEvent[]
  onSelectEvent: (event: CalendarEvent) => void
}

const DesktopWeekView = ({ events, onSelectEvent }: DesktopWeekViewProps) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[980px]">
        {/* Weekday headings */}
        <div className="flex border-b border-[#ECECEC]">
          <div className="w-[80px] shrink-0 border-r border-[#ECECEC]" />

          <div className="grid flex-1 grid-cols-7">
            {WEEK_DAYS.map((day, index) => (
              <div
                key={`${day.name}-${day.date}`}
                className={`flex h-[64px] flex-col items-center justify-center ${
                  index < WEEK_DAYS.length - 1
                    ? "border-r border-[#ECECEC]"
                    : ""
                }`}
              >
                <span className="text-xs text-[#666666]">{day.name}</span>

                <span
                  className={`mt-1 flex h-6 min-w-6 items-center justify-center rounded-sm px-1 text-sm font-semibold ${
                    day.date === 22
                      ? "bg-[#DCEAE5] text-[#5A8A79]"
                      : "text-[#292929]"
                  }`}
                >
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time grid */}
        <div className="relative flex">
          <TimeColumn />

          <div className="relative min-h-[720px] flex-1">
            {/* Background grid */}
            <div className="grid h-full grid-cols-7">
              {WEEK_DAYS.map((day, dayIndex) => (
                <div
                  key={`grid-${day.name}-${day.date}`}
                  className={`relative ${
                    dayIndex > 0 ? "border-l border-[#ECECEC]" : ""
                  }`}
                >
                  {HOURS.map((hour) => (
                    <div
                      key={`${day.date}-${hour}`}
                      className="h-[120px] border-t border-[#ECECEC]"
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Event columns */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-7">
              {WEEK_DAYS.map((day, dayIndex) => (
                <div
                  key={`events-${day.name}-${day.date}`}
                  className="pointer-events-none relative min-w-0 px-1.5"
                >
                  {events
                    .filter((event) => event.day === dayIndex)
                    .map((event) => (
                      <div key={event.id} className="pointer-events-auto">
                        <CalendarEventCard
                          event={event}
                          onClick={() => onSelectEvent(event)}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopWeekView
