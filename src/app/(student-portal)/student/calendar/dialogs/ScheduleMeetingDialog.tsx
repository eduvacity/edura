"use client"

import DialogShell from "./DialogShell"

type ScheduleMeetingDialogProps = {
  onClose: () => void
  onSubmit: () => void
}

const ScheduleMeetingDialog = ({
  onClose,
  onSubmit,
}: ScheduleMeetingDialogProps) => {
  return (
    <DialogShell
      title="Schedule a meeting"
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-[50px] flex-1 rounded-[8px] border border-[#55796D] bg-white font-medium text-[#55796D]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="h-[50px] flex-1 rounded-[8px] bg-[#55796D] font-medium text-white"
          >
            Schedule
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <FormField label="Meeting title">
          <input
            type="text"
            placeholder="Enter meeting title"
            className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-4 outline-none focus:border-[#55796D]"
          />
        </FormField>

        <FormField label="Course">
          <select className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-4 outline-none focus:border-[#55796D]">
            <option>Biology 101</option>
            <option>Chemistry</option>
            <option>English</option>
            <option>Mathematics</option>
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Date">
            <input
              type="date"
              className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-3 outline-none focus:border-[#55796D]"
            />
          </FormField>

          <FormField label="Time">
            <input
              type="time"
              className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-3 outline-none focus:border-[#55796D]"
            />
          </FormField>
        </div>

        <FormField label="Meeting link">
          <input
            type="url"
            placeholder="https://..."
            className="h-12 w-full rounded-[8px] border border-[#D9D9D9] px-4 outline-none focus:border-[#55796D]"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            rows={4}
            placeholder="Add meeting description"
            className="w-full resize-none rounded-[8px] border border-[#D9D9D9] p-4 outline-none focus:border-[#55796D]"
          />
        </FormField>
      </div>
    </DialogShell>
  )
}

type FormFieldProps = {
  label: string
  children: React.ReactNode
}

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#333333]">
        {label}
      </span>

      {children}
    </label>
  )
}

export default ScheduleMeetingDialog
