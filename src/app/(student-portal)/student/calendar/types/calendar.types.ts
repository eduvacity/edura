export type CalendarView = "today" | "week" | "month"

export type EventType =
  | "class"
  | "scheduled-meeting"
  | "reminder"
  | "todo"
  | "exam"
  | "history"

export type CalendarEvent = {
  id: number
  title: string
  description?: string
  lecturer?: string
  type: EventType
  day: number
  startHour: number
  endHour: number
  dueTime?: string
  course?: string
  location?: string
  host?: string
  isOwner?: boolean
  reminder?: string
  guests?: string[]
  highPriority?: boolean
}

export type MonthEvent = {
  id: number
  title: string
  day: number
  row: number
  column: number
  span: number
  type: EventType
}

export type DialogName =
  | "event-details"
  | "schedule-meeting"
  | "reschedule-meeting"
  | "cancel-meeting"
  | null
