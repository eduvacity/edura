"use client"
import AppLogo from "@/components/SVGs/logo"
import Link from "next/link"
import { navLinks } from "./navLinks"

interface SidebarProps {
  isSidebarOpen: boolean
  pathname: string
  setIsSidebarOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isSidebarOpen, pathname }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 py-4 w-[315px] bg-pdarkcolor shadow-[0px_4px_3px_0px_#0000000D] border-r border-[#0A323F] transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:shadow-none `}
    >
      <div className="flex flex-col gap-16">
        <Link href="/" className="p-4">
          <AppLogo className="w-[212px] h-[42.21px]" />
        </Link>
        <nav className="w-full relative">
          <ul className="w-full flex flex-col gap-2">
            {navLinks.map((link) => {
              const selected = pathname.startsWith(`${link.href}`)
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className={
                    selected
                      ? "w-full h-[60px] bg-[#38494E] p-1"
                      : "w-full h-[60px] hover:bg-[#38494E]/15 p-1"
                  }
                >
                  <div
                    className={
                      selected
                        ? "w-full h-full border-l-4 border-pcolor text-pcolor flex items-center gap-[15px] px-4 rounded-[2px]"
                        : "text-[#A7A7A7] w-full h-full flex items-center gap-[15px]  px-4"
                    }
                  >
                    {link.icon}
                    <span
                      className={
                        selected
                          ? "font-satoshi font-medium text-[17px] leading-[22.95px] text-white text-left"
                          : "font-satoshi font-medium text-[17px] leading-[22.95px] text-[#B0B0B0]"
                      }
                    >
                      {link.name}
                    </span>
                  </div>
                </Link>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
