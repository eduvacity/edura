"use client"

import { HOURS } from "../data/calendar.data"
import type { CalendarEvent } from "../types/calendar.types"
import { getEventColour } from "../utils/calendar.utils"
import TimeColumn from "./TimeColumn"

type MobileAgendaViewProps = {
  events: CalendarEvent[]
  onSelectEvent: (event: CalendarEvent) => void
}

const MobileAgendaView = ({ events, onSelectEvent }: MobileAgendaViewProps) => {
  return (
    <div className="relative flex min-h-[720px]">
      <TimeColumn />

      <div className="relative min-h-[720px] flex-1">
        {HOURS.map((hour) => (
          <div key={hour} className="h-[120px] border-t border-[#ECECEC]" />
        ))}

        <div className="absolute inset-0">
          {events.map((event) => {
            const top = Math.max(5, (event.startHour - 7) * 120 + 5)

            const height = Math.max(
              40,
              (event.endHour - event.startHour) * 120 - 7,
            )

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event)}
                className={`absolute left-1.5 right-1.5 overflow-hidden rounded-[5px] px-3 py-2 text-left text-xs font-medium text-[#252525] ${getEventColour(
                  event.type,
                )}`}
                style={{ top, height }}
              >
                {event.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileAgendaView
