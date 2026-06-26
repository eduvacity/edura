"use client"

import type { CalendarEvent } from "../types/calendar.types"
import DialogShell from "./DialogShell"

type CancelMeetingDialogProps = {
  event: CalendarEvent
  onClose: () => void
  onConfirm: () => void
}

const CancelMeetingDialog = ({
  event,
  onClose,
  onConfirm,
}: CancelMeetingDialogProps) => {
  return (
    <DialogShell
      title="Cancel meeting"
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-[50px] flex-1 rounded-[8px] border border-[#D9D9D9] bg-white font-medium text-[#444444]"
          >
            Keep meeting
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-[50px] flex-1 rounded-[8px] bg-[#D94B4B] font-medium text-white"
          >
            Cancel meeting
          </button>
        </div>
      }
    >
      <p className="text-sm leading-6 text-[#666666]">
        Are you sure you want to cancel{" "}
        <strong className="text-[#252525]">{event.title}</strong>? Guests may be
        notified that this meeting has been cancelled.
      </p>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-[#333333]">
          Reason for cancellation
        </span>

        <textarea
          rows={4}
          placeholder="Add an optional reason"
          className="w-full resize-none rounded-[8px] border border-[#D9D9D9] p-4 outline-none focus:border-[#55796D]"
        />
      </label>
    </DialogShell>
  )
}

export default CancelMeetingDialog
