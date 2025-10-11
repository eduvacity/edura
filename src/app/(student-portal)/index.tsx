"use client"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import AppBar from "./_components/Appbar"
import Sidebar from "./_components/Sidebar"

export default function StudentPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        pathname={pathname}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* AppBar */}
        <AppBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activePath={pathname}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#F7F7F9] p-2 lg:p-4 xl:p-6 transition-all">
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
