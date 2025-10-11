import {
  AssignmentIcon,
  ClassesIcon,
  DashboardIcon,
  SettingIcon,
} from "@/components/SVGs/portal"
import { HelpCircleIcon } from "lucide-react"

export const navLinks = [
  { name: "Dashboard", href: "/students/dashboard", icon: <DashboardIcon /> },
  { name: "Classes", href: "/students/classes", icon: <ClassesIcon /> },
  {
    name: "Assignment",
    href: "/students/assignments",
    icon: <AssignmentIcon />,
  },
]
export const accountNav = [
  {
    name: "Account & Settings",
    href: "/instructor/settings",
    icon: <SettingIcon />,
  },
  { name: "Help", href: "/instructor/help", icon: <HelpCircleIcon /> },
]
