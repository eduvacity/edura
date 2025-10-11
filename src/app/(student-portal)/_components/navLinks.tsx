import {
  AssignmentIcon,
  ClassesIcon,
  DashboardIcon,
  SettingIcon,
} from "@/components/SVGs/portal"

export const navLinks = [
  { name: "Dashboard", href: "/students/dashboard", icon: <DashboardIcon /> },
  { name: "Classes", href: "/students/classes", icon: <ClassesIcon /> },
  {
    name: "Assignment",
    href: "/students/assignments",
    icon: <AssignmentIcon />,
  },
  { name: "Settings", href: "/students/settings", icon: <SettingIcon /> },
]
