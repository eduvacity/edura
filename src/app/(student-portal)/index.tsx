"use client"
import { usePathname, useRouter } from "next/navigation"
import React, { useState } from "react"
import AppBar from "./_components/Appbar"
import Sidebar from "./_components/Sidebar"

export default function StudentPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
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
          onAskAI={() => router.push("/student/live-conferences")}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5] p-2  transition-all">
          <div>{children}</div>
        </main>
      </div>
    </div>
  )
}
