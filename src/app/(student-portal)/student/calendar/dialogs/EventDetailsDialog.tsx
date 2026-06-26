"use client"

import {
  Bell,
  BookOpen,
  CalendarDays,
  CircleUserRound,
  Clock3,
  MapPin,
  Plus,
  Users,
} from "lucide-react"
import { useState } from "react"
import type { CalendarEvent } from "../types/calendar.types"
import DialogShell from "./DialogShell"

type EventDetailsDialogProps = {
  event: CalendarEvent
  onClose: () => void
  onReschedule: () => void
  onCancel: () => void
}

const EventDetailsDialog = ({
  event,
  onClose,
  onReschedule,
  onCancel,
}: EventDetailsDialogProps) => {
  const [showGuests, setShowGuests] = useState(Boolean(event.guests?.length))

  return (
    <DialogShell
      title="Calendar details"
      onClose={onClose}
      showYellowBorder
      footer={
        <div className="space-y-3">
          <button
            type="button"
            onClick={onReschedule}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#78978D] bg-[#55796D] text-base font-medium text-white transition hover:bg-[#47685E]"
          >
            <Clock3 size={20} />
            Reschedule
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#55796D] bg-white text-base font-medium text-[#55796D] transition hover:bg-[#F4F8F6]"
          >
            <Plus size={20} />
            Cancel meeting
          </button>
        </div>
      }
    >
      <div className="border-b border-[#EEEEEE] pb-4">
        <h3 className="text-base font-semibold text-[#252525]">
          {event.title}
        </h3>

        <p className="mt-2 text-sm leading-5 text-[#666666]">
          {event.description ??
            "We will be having a call to review cells structure, bio 101"}
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <DetailRow icon={<CalendarDays size={19} />}>
          <p className="font-medium text-[#252525]">Monday, 22 May, 2025</p>

          <p className="mt-1 text-sm text-[#6D6D6D]">09:30 AM - 09:30 AM</p>
        </DetailRow>

        <DetailRow icon={<BookOpen size={19} />}>
          <p className="text-sm text-[#333333]">
            Course: {event.course ?? "Bio 101"}
          </p>
        </DetailRow>

        <DetailRow icon={<MapPin size={19} />}>
          <div className="flex min-w-0 items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm text-[#333333]">
              Online -{" "}
              <a
                href={event.location ?? "https://yourappname.com"}
                target="_blank"
                rel="noreferrer"
                className="text-[#0075FF]"
              >
                https://yourappname.com/...
              </a>
            </p>

            <button
              type="button"
              className="shrink-0 rounded-full bg-[#E1ECE8] px-3 py-1 text-xs font-medium text-[#55796D]"
            >
              Join
            </button>
          </div>
        </DetailRow>

        <DetailRow icon={<CircleUserRound size={19} />}>
          <p className="text-sm text-[#333333]">
            Hosted by: {event.host ?? "Daniel Ferdinand"}{" "}
            {event.isOwner !== false && (
              <span className="text-[#0075FF]">(You)</span>
            )}
          </p>
        </DetailRow>

        {event.reminder && (
          <DetailRow icon={<Bell size={19} />}>
            <p className="text-sm text-[#333333]">Reminder: {event.reminder}</p>
          </DetailRow>
        )}

        {event.guests && event.guests.length > 0 && (
          <DetailRow icon={<Users size={19} />} alignStart>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-[#333333]">
                  {event.guests.length + 4} guests
                </p>

                <button
                  type="button"
                  onClick={() => setShowGuests((current) => !current)}
                  className="text-xs font-medium text-[#5E8F7D]"
                >
                  {showGuests ? "View less" : "View all guests"}
                </button>
              </div>

              {showGuests && (
                <div className="mt-3 flex items-center">
                  {event.guests.map((guest, index) => (
                    <img
                      key={guest}
                      src={guest}
                      alt={`Guest ${index + 1}`}
                      className="-ml-2 h-8 w-8 rounded-full border-2 border-white object-cover first:ml-0"
                    />
                  ))}

                  <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E3E8E6] text-[10px] font-semibold text-[#55796D]">
                    +4
                  </div>
                </div>
              )}
            </div>
          </DetailRow>
        )}
      </div>
    </DialogShell>
  )
}

type DetailRowProps = {
  icon: React.ReactNode
  children: React.ReactNode
  alignStart?: boolean
}

const DetailRow = ({ icon, children, alignStart = false }: DetailRowProps) => {
  return (
    <div
      className={`flex gap-3 ${alignStart ? "items-start" : "items-center"}`}
    >
      <span className="mt-0.5 shrink-0 text-[#313131]">{icon}</span>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export default EventDetailsDialog
