import {
  AssignmentIcon,
  CalendarIcon,
  CommunityIcon,
  CoursesIcon,
  DashboardIcon,
  LiveIcon,
  MessageIcon,
  ResourceIcon,
  SettingIcon,
  TodoIcon,
} from "@/components/SVGs/portal"
import { HelpCircleIcon } from "lucide-react"

export const navLinks = [
  { name: "Dashboard", href: "/student/dashboard", icon: <DashboardIcon /> },
]
export const learningLinks = [
  { name: "My courses", href: "/student/my-courses", icon: <CoursesIcon /> },
  {
    name: "Assignment",
    href: "/student/assignments",
    icon: <AssignmentIcon />,
  },
  { name: "Resources", href: "/student/resources", icon: <ResourceIcon /> },
]
export const productivityLinks = [
  { name: "Calendar", href: "/student/calendar", icon: <CalendarIcon /> },
  { name: "My Todos", href: "/student/my-todo", icon: <TodoIcon /> },
]
export const communicationLinks = [
  { name: "Messages", href: "/student/messages", icon: <MessageIcon /> },
  {
    name: "Live Conferences",
    href: "/student/live-conferences",
    icon: <LiveIcon />,
  },
  { name: "Community", href: "/student/community", icon: <CommunityIcon /> },
]
export const accountNav = [
  {
    name: "Account & Settings",
    href: "/student/settings",
    icon: <SettingIcon />,
  },
  { name: "Help", href: "/student/help", icon: <HelpCircleIcon /> },
]
