"use client"

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
} from "lucide-react"

import {
  CLASS_FILTER_OPTIONS,
  EVENT_FILTER_OPTIONS,
} from "../data/calendar.data"
import type { CalendarView } from "../types/calendar.types"

type OpenDropdown = "event" | "class" | null

type CalendarToolbarProps = {
  view: CalendarView
  eventFilter: string
  classFilter: string
  openDropdown: OpenDropdown
  onViewChange: (view: CalendarView) => void
  onEventFilterChange: (value: string) => void
  onClassFilterChange: (value: string) => void
  onDropdownChange: (value: OpenDropdown) => void
  onScheduleMeeting: () => void
}

const CalendarToolbar = ({
  view,
  eventFilter,
  classFilter,
  openDropdown,
  onViewChange,
  onEventFilterChange,
  onClassFilterChange,
  onDropdownChange,
  onScheduleMeeting,
}: CalendarToolbarProps) => {
  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onScheduleMeeting}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#6F8F84] bg-[#55796D] px-5 text-base font-medium text-white transition hover:bg-[#47685E] lg:hidden"
      >
        <Plus size={20} />
        Schedule a meeting
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <ViewButton
            label="Today"
            active={view === "today"}
            onClick={() => onViewChange("today")}
          />

          <ViewButton
            label="Week"
            active={view === "week"}
            onClick={() => onViewChange("week")}
          />

          <ViewButton
            label="Month"
            active={view === "month"}
            onClick={() => onViewChange("month")}
          />

          <div className="ml-auto flex items-center gap-1 sm:ml-7 sm:gap-2 lg:ml-12">
            <strong className="whitespace-nowrap text-[15px] text-[#252525] sm:text-base">
              May 2025
            </strong>

            <button
              type="button"
              className="rounded-full p-1.5 text-[#666666] transition hover:bg-white"
              aria-label="Previous period"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className="rounded-full p-1.5 text-[#666666] transition hover:bg-white"
              aria-label="Next period"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:flex lg:items-center">
          <CalendarDropdown
            label={eventFilter}
            options={EVENT_FILTER_OPTIONS}
            selectedValue={eventFilter}
            isOpen={openDropdown === "event"}
            onToggle={() =>
              onDropdownChange(openDropdown === "event" ? null : "event")
            }
            onSelect={(value) => {
              onEventFilterChange(value)
              onDropdownChange(null)
            }}
          />

          <CalendarDropdown
            label={classFilter}
            options={CLASS_FILTER_OPTIONS}
            selectedValue={classFilter}
            isOpen={openDropdown === "class"}
            onToggle={() =>
              onDropdownChange(openDropdown === "class" ? null : "class")
            }
            onSelect={(value) => {
              onClassFilterChange(value)
              onDropdownChange(null)
            }}
          />

          <button
            type="button"
            onClick={onScheduleMeeting}
            className="hidden h-[52px] items-center justify-center gap-2 rounded-[8px] border border-[#6F8F84] bg-[#55796D] px-6 text-base font-medium text-white transition hover:bg-[#47685E] lg:flex"
          >
            <Plus size={20} />
            Schedule a meeting
          </button>
        </div>
      </div>
    </div>
  )
}

type ViewButtonProps = {
  label: string
  active: boolean
  onClick: () => void
}

const ViewButton = ({ label, active, onClick }: ViewButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[42px] rounded-[6px] px-3 text-sm transition sm:px-4 ${
        active
          ? "bg-white font-semibold text-[#252525] shadow-md"
          : "text-[#B5B5B5] hover:text-[#666666]"
      }`}
    >
      {label}
    </button>
  )
}

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
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`block w-full rounded-[7px] px-3 py-3 text-left text-sm transition ${
                selectedValue === option
                  ? "bg-[#DDE8E4] text-[#252525]"
                  : "text-[#777777] hover:bg-[#F4F6F5]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CalendarToolbar
