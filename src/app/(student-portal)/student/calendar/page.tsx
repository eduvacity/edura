"use client"

import { useMemo, useState } from "react"
import CalendarHeader from "./components/CalendarHeader"
import CalendarToolbar from "./components/CalendarToolbar"
import MobileMonthPicker from "./components/MobileMonthPicker"
import MonthView from "./components/MonthView"
import WeekView from "./components/WeekView"
import CancelMeetingDialog from "./dialogs/CancelMeetingDialog"
import EventDetailsDialog from "./dialogs/EventDetailsDialog"
import RescheduleMeetingDialog from "./dialogs/RescheduleMeetingDialog"
import ScheduleMeetingDialog from "./dialogs/ScheduleMeetingDialog"
import { CALENDAR_EVENTS } from "./data/calendar.data"
import type {
  CalendarEvent,
  CalendarView,
  DialogName,
} from "./types/calendar.types"

const CalendarPage = () => {
  const [view, setView] = useState<CalendarView>("week")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const [activeDialog, setActiveDialog] = useState<DialogName>(null)

  const [eventFilter, setEventFilter] = useState("All event")
  const [classFilter, setClassFilter] = useState("All classes")

  const [openDropdown, setOpenDropdown] = useState<"event" | "class" | null>(
    null,
  )

  const filteredEvents = useMemo(() => {
    return CALENDAR_EVENTS.filter((event) => {
      const eventMatches =
        eventFilter === "All event" ||
        (eventFilter === "Scheduled meeting" &&
          event.type === "scheduled-meeting") ||
        (eventFilter === "To-Do" && event.type === "todo")

      const classMatches =
        classFilter === "All classes" || event.course === classFilter

      return eventMatches && classMatches
    })
  }, [eventFilter, classFilter])

  const openEventDetails = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setActiveDialog("event-details")
  }

  const closeDialog = () => {
    setActiveDialog(null)
  }

  return (
    <main className="min-h-screen bg-[#F6F6F6] px-3 py-5 sm:px-5 lg:px-6">
      <CalendarHeader />

      <div className="mt-7">
        <CalendarToolbar
          view={view}
          eventFilter={eventFilter}
          classFilter={classFilter}
          openDropdown={openDropdown}
          onViewChange={setView}
          onEventFilterChange={setEventFilter}
          onClassFilterChange={setClassFilter}
          onDropdownChange={setOpenDropdown}
          onScheduleMeeting={() => setActiveDialog("schedule-meeting")}
        />
      </div>

      <section className="mt-4">
        {view === "month" ? (
          <MonthView onSelectEvent={openEventDetails} />
        ) : (
          <>
            <div className="md:hidden">
              <MobileMonthPicker />
            </div>

            <div className="mt-4 md:mt-0">
              <WeekView
                view={view}
                events={filteredEvents}
                onSelectEvent={openEventDetails}
              />
            </div>
          </>
        )}
      </section>

      {activeDialog === "event-details" && selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          onClose={closeDialog}
          onReschedule={() => setActiveDialog("reschedule-meeting")}
          onCancel={() => setActiveDialog("cancel-meeting")}
        />
      )}

      {activeDialog === "schedule-meeting" && (
        <ScheduleMeetingDialog
          onClose={closeDialog}
          onSubmit={() => {
            closeDialog()
          }}
        />
      )}

      {activeDialog === "reschedule-meeting" && selectedEvent && (
        <RescheduleMeetingDialog
          event={selectedEvent}
          onClose={() => setActiveDialog("event-details")}
          onSubmit={() => {
            closeDialog()
          }}
        />
      )}

      {activeDialog === "cancel-meeting" && selectedEvent && (
        <CancelMeetingDialog
          event={selectedEvent}
          onClose={() => setActiveDialog("event-details")}
          onConfirm={() => {
            closeDialog()
            setSelectedEvent(null)
          }}
        />
      )}
    </main>
  )
}

export default CalendarPage
