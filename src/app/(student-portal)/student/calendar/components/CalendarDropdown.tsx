"use client"

import { ChevronDown, Filter } from "lucide-react"

type CalendarDropdownProps = {
  label: string
  options: string[]
  selectedValue: string
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
}

const CalendarDropdown = ({
  label,
  options,
  selectedValue,
  isOpen,
  onToggle,
  onSelect,
}: CalendarDropdownProps) => {
  return (
    <div className="relative z-[60]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex h-[48px] w-full items-center justify-between gap-2 rounded-[8px] border border-[#DADADA] bg-white px-3 text-sm text-[#383838] transition hover:border-[#9F9F9F] sm:px-4 lg:min-w-[210px]"
      >
        <span className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Filter size={20} className="shrink-0" />
          <span className="truncate">{label}</span>
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[54px] z-[100] w-full min-w-[170px] overflow-hidden rounded-[8px] bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] lg:min-w-[210px]">
          {options.map((option) => {
            const selected = selectedValue === option

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`block w-full rounded-[7px] px-3 py-3 text-left text-sm transition ${
                  selected
                    ? "bg-[#DDE8E4] text-[#252525]"
                    : "text-[#777777] hover:bg-[#F4F6F5]"
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CalendarDropdown
