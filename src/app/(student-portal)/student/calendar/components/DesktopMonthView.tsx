"use client"

import {
  CALENDAR_EVENTS,
  MONTH_CELLS,
  MONTH_EVENTS,
} from "../data/calendar.data"
import type { CalendarEvent, MonthEvent } from "../types/calendar.types"
import { getEventColour } from "../utils/calendar.utils"

type DesktopMonthViewProps = {
  onSelectEvent: (event: CalendarEvent) => void
}

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const DesktopMonthView = ({ onSelectEvent }: DesktopMonthViewProps) => {
  const handleEventClick = (monthEvent: MonthEvent) => {
    const matchingEvent = CALENDAR_EVENTS.find(
      (event) =>
        event.title === monthEvent.title && event.type === monthEvent.type,
    )

    const fallbackEvent = CALENDAR_EVENTS.find(
      (event) => event.title === monthEvent.title,
    )

    const selectedEvent =
      matchingEvent ??
      fallbackEvent ??
      createCalendarEventFromMonthEvent(monthEvent)

    onSelectEvent(selectedEvent)
  }

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="grid grid-cols-7 border-b border-[#ECECEC]">
        {WEEK_DAYS.map((day, index) => (
          <div
            key={day}
            className={`flex h-[44px] items-center justify-center text-xs font-medium text-[#555555] ${
              index !== WEEK_DAYS.length - 1 ? "border-r border-[#ECECEC]" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-7">
        {MONTH_CELLS.map((cell, index) => {
          const row = Math.floor(index / 7)
          const column = index % 7
          const isLastColumn = column === 6

          const totalRows = Math.ceil(MONTH_CELLS.length / 7)
          const isLastRow = row === totalRows - 1

          const eventsForCell = MONTH_EVENTS.filter(
            (event) => event.row === row && event.column === column,
          )

          return (
            <div
              key={`${cell.day}-${index}`}
              className={`relative min-h-[150px] p-2 ${
                !isLastColumn ? "border-r border-[#ECECEC]" : ""
              } ${!isLastRow ? "border-b border-[#ECECEC]" : ""}`}
            >
              <div
                className={`text-center text-xs ${
                  cell.outside
                    ? "font-normal text-[#8A8A8A]"
                    : "font-semibold text-[#222222]"
                }`}
              >
                {cell.day === 1 && index === 4 ? "June 1" : cell.day}
              </div>

              <div className="relative mt-2 space-y-1">
                {eventsForCell.map((event) => {
                  const availableColumns = 7 - column

                  const safeSpan = Math.min(
                    Math.max(event.span, 1),
                    availableColumns,
                  )

                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => handleEventClick(event)}
                      title={event.title}
                      className={`relative z-20 flex h-9 items-center overflow-hidden rounded-[4px] px-2 text-left text-xs font-medium text-[#252525] transition hover:brightness-[0.97] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#55796D] focus:ring-offset-1 ${getEventColour(
                        event.type,
                      )}`}
                      style={{
                        width: `calc(${safeSpan * 100}% + ${
                          (safeSpan - 1) * 16
                        }px)`,
                      }}
                    >
                      <span className="truncate">{event.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const createCalendarEventFromMonthEvent = (
  event: MonthEvent,
): CalendarEvent => {
  return {
    id: event.id,
    title: event.title,
    type: event.type,
    day: event.column,
    startHour: 9,
    endHour: 10,
    course: event.title.toLowerCase().includes("bio")
      ? "Biology 101"
      : undefined,
  }
}

export default DesktopMonthView
