"use client"

import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import AppBar from "./_components/Appbar"
import Sidebar from "./_components/Sidebar"

export default function InstructorPortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024
    if (isMobile && isSidebarOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isSidebarOpen])

  return (
    <div className="min-h-screen bg-[#F7F7F9]">
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] rounded bg-white px-3 py-2 shadow"
      >
        Skip to content
      </a>

      <div className="flex">
        {/* Sidebar (fixed on mobile, static on lg; capped at 1024px inside component) */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          pathname={pathname}
        />

        {/* Right column */}
        <div className="flex-1 flex min-h-screen flex-col">
          {/* Sticky AppBar */}
          <AppBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activePath={pathname}
          />

          {/* Page Content */}
          <main
            id="main"
            className="flex-1 overflow-y-auto px-2 py-8 lg:px-4"
            // If you ever need to prevent scroll when a modal is open, you can toggle this to 'overflow-hidden'
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
