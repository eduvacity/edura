"use client"

import { Flag } from "lucide-react"

import type { CalendarEvent } from "../types/calendar.types"
import { formatTime, getEventColour } from "../utils/calendar.utils"

type CalendarEventCardProps = {
  event: CalendarEvent
  onClick: () => void
}

const CalendarEventCard = ({ event, onClick }: CalendarEventCardProps) => {
  const baseHour = 7
  const hourHeight = 120

  const top = Math.max(0, event.startHour - baseHour) * hourHeight + 6

  const rawHeight =
    Math.max(1, event.endHour - event.startHour) * hourHeight - 12

  const height = Math.max(78, rawHeight)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute left-1.5 right-1.5 overflow-hidden rounded-[5px] p-3 text-left transition hover:brightness-[0.98] hover:shadow-sm ${getEventColour(
        event.type,
      )}`}
      style={{ top, height }}
    >
      {event.lecturer && (
        <p className="text-[10px] font-medium text-[#303030]">
          Lecturer: {event.lecturer}
        </p>
      )}

      {event.type === "scheduled-meeting" && (
        <p className="text-[10px] font-medium text-[#C424B8]">Scheduled call</p>
      )}

      {event.type === "reminder" && (
        <p className="text-[10px] font-medium text-[#D49000]">Reminder</p>
      )}

      {event.type === "history" && (
        <p className="text-[10px] font-medium text-[#0C76C4]">Reminder</p>
      )}

      {event.type === "todo" && (
        <p className="text-[10px] font-medium text-[#C13535]">To-Do</p>
      )}

      <p className="mt-1 text-sm font-semibold leading-5 text-[#252525]">
        {event.title}
      </p>

      {event.dueTime ? (
        <p className="mt-1 text-xs text-[#333333]">Due: {event.dueTime}</p>
      ) : (
        <p className="mt-1 text-xs text-[#5B5B5B]">
          {formatTime(event.startHour)} - {formatTime(event.endHour)}
        </p>
      )}

      {event.highPriority && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-[#5A5A5A]">
          <Flag size={13} className="fill-[#D82F2F] text-[#D82F2F]" />
          High priority
        </div>
      )}
    </button>
  )
}

export default CalendarEventCard
