"use client"

import { CALENDAR_EVENTS } from "../data/calendar.data"
import type { CalendarEvent } from "../types/calendar.types"
import DesktopMonthView from "./DesktopMonthView"
import MobileAgendaView from "./MobileAgendaView"
import MobileMonthPicker from "./MobileMonthPicker"

type MonthViewProps = {
  onSelectEvent: (event: CalendarEvent) => void
}

const MonthView = ({ onSelectEvent }: MonthViewProps) => {
  return (
    <>
      <div className="hidden overflow-hidden rounded-[16px] border border-[#ECECEC] bg-white md:block">
        <DesktopMonthView onSelectEvent={onSelectEvent} />
      </div>

      <div className="md:hidden">
        <MobileMonthPicker />

        <div className="mt-5 overflow-hidden rounded-[14px] border border-[#ECECEC] bg-white">
          <MobileAgendaView
            events={CALENDAR_EVENTS}
            onSelectEvent={onSelectEvent}
          />
        </div>
      </div>
    </>
  )
}

export default MonthView
