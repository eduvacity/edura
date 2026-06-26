"use client"

import { X } from "lucide-react"
import type { ReactNode } from "react"

type DialogShellProps = {
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
  showYellowBorder?: boolean
}

const DialogShell = ({
  title,
  children,
  onClose,
  footer,
  showYellowBorder = false,
}: DialogShellProps) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/55 backdrop-blur-[2px] md:items-center md:px-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-dialog-title"
        className="relative w-full max-w-[470px] overflow-hidden rounded-t-[28px] bg-white shadow-2xl md:rounded-[16px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="max-h-[88vh] overflow-y-auto px-6 pb-7 pt-6 md:px-7">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="calendar-dialog-title"
              className="text-xl font-semibold text-[#262626]"
            >
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3F3F3] text-[#252525] transition hover:bg-[#E8E8E8]"
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mt-6">{children}</div>

          {footer && <div className="mt-7">{footer}</div>}
        </div>

        {showYellowBorder && <div className="h-[7px] bg-[#F2C300]" />}
      </div>
    </div>
  )
}

export default DialogShell
