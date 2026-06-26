"use client"

import type { CalendarEvent, CalendarView } from "../types/calendar.types"
import DesktopWeekView from "./DesktopWeekView"
import MobileAgendaView from "./MobileAgendaView"
import TodayView from "./TodayView"

type WeekViewProps = {
  view: CalendarView
  events: CalendarEvent[]
  onSelectEvent: (event: CalendarEvent) => void
}

const WeekView = ({ view, events, onSelectEvent }: WeekViewProps) => {
  if (view === "today") {
    return (
      <TodayView
        events={events.filter((event) => event.day === 0)}
        onSelectEvent={onSelectEvent}
      />
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[16px] border border-[#ECECEC] bg-white md:block">
        <DesktopWeekView events={events} onSelectEvent={onSelectEvent} />
      </div>

      <div className="overflow-hidden rounded-[14px] border border-[#ECECEC] bg-white md:hidden">
        <MobileAgendaView events={events} onSelectEvent={onSelectEvent} />
      </div>
    </>
  )
}

export default WeekView
