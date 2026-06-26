"use client"

import type { CalendarEvent } from "../types/calendar.types"
import DialogShell from "./DialogShell"

type RescheduleMeetingDialogProps = {
  event: CalendarEvent
  onClose: () => void
  onSubmit: () => void
}

const RescheduleMeetingDialog = ({
  event,
  onClose,
  onSubmit,
}: RescheduleMeetingDialogProps) => {
  return (
    <DialogShell
      title="Reschedule meeting"
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-[50px] flex-1 rounded-[8px] border border-[#55796D] bg-white font-medium text-[#55796D]"
          >
            Back
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="h-[50px] flex-1 rounded-[8px] bg-[#55796D] font-medium text-white"
          >
            Save changes
          </button>
        </div>
      }
    >
      <p className="mb-5 text-sm text-[#666666]">
        Choose a new date and time for <strong>{event.title}</strong>.
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#333333]">
            New date
          </span>

          <input
            type="date"
            className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-4 outline-none focus:border-[#55796D]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#333333]">
            Start time
          </span>

          <input
            type="time"
            className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-4 outline-none focus:border-[#55796D]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#333333]">
            End time
          </span>

          <input
            type="time"
            className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-4 outline-none focus:border-[#55796D]"
          />
        </label>
      </div>
    </DialogShell>
  )
}

export default RescheduleMeetingDialog
