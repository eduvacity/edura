import {
  AssignmentIcon,
  ClassesIcon,
  DashboardIcon,
  PeopleIcon,
  QuizIcon,
  SettingIcon,
} from "@/components/SVGs/portal"
import { HelpCircleIcon } from "lucide-react"

export const navLinks = [
  { name: "Dashboard", href: "/instructor/dashboard", icon: <DashboardIcon /> },
  { name: "Lesson", href: "/instructor/lesson", icon: <ClassesIcon /> },
  { name: "Students", href: "/instructor/students", icon: <PeopleIcon /> },

  {
    name: "Assignment",
    href: "/instructor/assignments",
    icon: <AssignmentIcon />,
  },
  { name: "Quiz", href: "/instructor/quiz", icon: <QuizIcon /> },
]

export const accountNav = [
  {
    name: "Account & Settings",
    href: "/instructor/settings",
    icon: <SettingIcon />,
  },
  { name: "Help", href: "/instructor/help", icon: <HelpCircleIcon /> },
]
