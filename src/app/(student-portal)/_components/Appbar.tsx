"use client"

import { MenuIconAlt, NotificationBell } from "@/components/SVGs/portal"
import { Badge, IconButton } from "@mui/material"
import Image from "next/image"
import { navLinks } from "./navLinks"

interface AppBarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
  activePath: string
}

export default function AppBar({
  isSidebarOpen,
  setIsSidebarOpen,
  activePath,
}: AppBarProps) {
  // const activeLink =
  //   navLinks.find((link) => link.href === activePath)?.name || "Unknown"
  const activeLink =
    navLinks.find((link) => activePath.startsWith(`${link.href}`))?.name ||
    "Unknown"
  return (
    <header className="flex items-center justify-between bg-white border border-solid border-[#DADADA] p-4 lg:pl-12 gap-4">
      <div className="flex items-center">
        {/* Sidebar Toggle for Small Devices */}
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
          className="lg:hidden"
        >
          <MenuIconAlt className="w-10 h-10" />
        </IconButton>
        <span className="hidden lg:block font-normal font-arial text-[#071C23] text-[26px]/[29.9px] text-left">
          {activeLink}
        </span>
      </div>

      <div className="flex lg:w-[300px] items-center gap-[15px] lg:pr-12">
        {/* Notification Button */}
        <IconButton className="bg-transparent" disableRipple>
          <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-[#FDFDFD] border border-solid border-[#BEBEBE] rounded-full place-content-center">
            <Badge color="error" overlap="circular" variant="dot">
              <NotificationBell className="w-[22] h-[22px] lg:w-[26px] lg:h-[32px]" />
            </Badge>
          </div>
        </IconButton>
        {/* Profile */}
        <div className="w-full flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src="/images/profile-avatar.png"
            alt="User Avatar"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="hidden lg:flex h-[50px] w-[230px] flex-col pt-1">
            <h4 className="w-full font-satoshi font-medium text-base leading-[21.6px] text-left text-[#071C23] line-clamp-1">
              Charles John
            </h4>
            <span className="w-full hidden lg:block font-satoshi font-medium text-sm leading-[18.9px] text-left text-[#575353] line-clamp-1">
              chalesjohn@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
