import type { EventType } from "../types/calendar.types"

export const getEventColour = (type: EventType) => {
  switch (type) {
    case "scheduled-meeting":
      return "bg-[#F5DDFB]"

    case "reminder":
      return "bg-[#FFF5D8]"

    case "history":
      return "bg-[#DDEEFF]"

    case "todo":
      return "bg-[#FFF0F1]"

    case "exam":
    case "class":
    default:
      return "bg-[#F1F1F1]"
  }
}

export const formatHour = (hour: number) => {
  if (hour === 12) return "12 PM"
  return `${hour} AM`
}

export const formatTime = (hour: number) => {
  if (hour === 12) return "12:00 PM"

  if (hour > 12) {
    return `${hour - 12}:00 PM`
  }

  return `${hour}:00 AM`
}
