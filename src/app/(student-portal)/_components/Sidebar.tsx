"use client"

import AppLogo from "@/components/SVGs/logo"
import { DrawerIcon } from "@/components/SVGs"
import Link from "next/link"
import { useEffect, useState } from "react"
import clsx from "clsx"
import {
  accountNav,
  communicationLinks,
  learningLinks,
  navLinks,
  productivityLinks,
} from "./navLinks"
import ProfileRow from "@/app/(instructor-portal)/_components/profile/ProfileRow"

interface SidebarProps {
  isSidebarOpen: boolean
  pathname: string
  setIsSidebarOpen: (isOpen: boolean) => void
}

export default function Sidebar({
  isSidebarOpen,
  pathname,
  setIsSidebarOpen,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  // restore/save collapsed pref
  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("sidebar:collapsed")
    if (saved === "1") setCollapsed(true)
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0")
  }, [collapsed])

  // close mobile drawer on route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024)
      setIsSidebarOpen(false)
  }, [pathname, setIsSidebarOpen])

  const onToggleClick = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setCollapsed((v) => !v) // desktop: toggle mini
    } else {
      setIsSidebarOpen(false) // mobile: close overlay
    }
  }

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-30 bg-white border-r border-slate-100",
          // width & collapse classes you already have...
          "transition-transform duration-300 ease-out transform",
          "lg:translate-x-0 lg:static",
          isSidebarOpen
            ? "translate-x-0 w-[266px]"
            : "-translate-x-full w-[266px]",
          "lg:transition-[width] lg:duration-300",
          collapsed ? "lg:w-[84px]" : "lg:w-[266px]",

          // NEW: height capped at 1024px, responsive to viewport
          "max-h-[1024px]",
          "supports-[height:100svh]:h-[min(100svh,1024px)]",
          "h-[min(100vh,1024px)]"
        )}
      >
        <div className="h-full max-h-full flex flex-col justify-between px-2 pt-8 pb-3 overflow-y-auto">
          <div className="flex flex-col gap-5">
            {/* HEADER — hide logo when collapsed, show only DrawerIcon */}
            <div className={clsx("px-4")}>
              <div
                className={clsx(
                  "flex items-center",
                  collapsed ? "justify-center" : "justify-between"
                )}
              >
                {!collapsed && (
                  <Link
                    href="/"
                    aria-label="Go home"
                    className="cursor-pointer"
                  >
                    <AppLogo className="w-[75.1px] h-[19.97px]" />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={onToggleClick}
                  className={clsx(
                    "w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center"
                    // when expanded, keep at right; when collapsed, it's already centered
                  )}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  title={collapsed ? "Expand" : "Collapse"}
                >
                  <DrawerIcon aria-hidden className="cursor-pointer" />
                </button>
              </div>

              <div className="mt-3 h-px w-full bg-[#F5F5F5] rounded-lg" />
            </div>

            {/* NAV */}
            <nav className="px-3" aria-label="Primary">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const selected = pathname.startsWith(link.href)
                  return (
                    <li key={link.href} className="group relative">
                      <Link
                        href={link.href}
                        aria-current={selected ? "page" : undefined}
                        title={link.name}
                        className={clsx(
                          "flex items-center rounded-[12px] p-3 transition-all",
                          collapsed
                            ? "w-[46px] justify-center"
                            : "w-[226px] justify-start",
                          "h-[46px] font-sans font-medium text-[16px] leading-[22px]",
                          selected
                            ? "text-white bg-[#38494E] border-[1.5px] shadow-[-4px_-2px_6px_0px_#1E1E1E33_inset]"
                            : "text-[#424242] hover:bg-[#38494E]/15"
                        )}
                      >
                        <span aria-hidden>{link.icon}</span>
                        <span
                          className={clsx(
                            "ml-2 transition-opacity",
                            collapsed
                              ? "opacity-0 lg:sr-only absolute -left-[9999px]"
                              : "opacity-100"
                          )}
                        >
                          {link.name}
                        </span>
                      </Link>

                      {collapsed && (
                        <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">
                          {link.name}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* LEARNING */}
            <div className="w-[226px] h-[170px] px-3 flex flex-col gap-2">
              <h2 className="font-sans font-normal text-[14px]/[20px] tracking-normal text-[#616161]">
                Learning
              </h2>
              <nav aria-label="Primary">
                <ul className="flex flex-col gap-2">
                  {learningLinks.map((link) => {
                    const selected = pathname.startsWith(link.href)
                    return (
                      <li key={link.href} className="group relative">
                        <Link
                          href={link.href}
                          aria-current={selected ? "page" : undefined}
                          title={link.name}
                          className={clsx(
                            "flex items-center rounded-[12px] p-3 transition-all",
                            collapsed
                              ? "w-[46px] justify-center"
                              : "w-[226px] justify-start",
                            "h-[46px] font-sans font-medium text-[16px] leading-[22px]",
                            selected
                              ? "text-white bg-[#38494E] border-[1.5px] shadow-[-4px_-2px_6px_0px_#1E1E1E33_inset]"
                              : "text-[#424242] hover:bg-[#38494E]/15"
                          )}
                        >
                          <span aria-hidden>{link.icon}</span>
                          <span
                            className={clsx(
                              "ml-2 transition-opacity",
                              collapsed
                                ? "opacity-0 lg:sr-only absolute -left-[9999px]"
                                : "opacity-100"
                            )}
                          >
                            {link.name}
                          </span>
                        </Link>

                        {collapsed && (
                          <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">
                            {link.name}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* PRODUCTIVITY */}
            <div className="w-[226px] h-[122px] px-3 flex flex-col gap-2">
              <h2 className="font-sans font-normal text-[14px]/[20px] tracking-normal text-[#616161]">
                Productivity
              </h2>
              <nav aria-label="Primary">
                <ul className="flex flex-col gap-2">
                  {productivityLinks.map((link) => {
                    const selected = pathname.startsWith(link.href)
                    return (
                      <li key={link.href} className="group relative">
                        <Link
                          href={link.href}
                          aria-current={selected ? "page" : undefined}
                          title={link.name}
                          className={clsx(
                            "flex items-center rounded-[12px] p-3 transition-all",
                            collapsed
                              ? "w-[46px] justify-center"
                              : "w-[226px] justify-start",
                            "h-[46px] font-sans font-medium text-[16px] leading-[22px]",
                            selected
                              ? "text-white bg-[#38494E] border-[1.5px] shadow-[-4px_-2px_6px_0px_#1E1E1E33_inset]"
                              : "text-[#424242] hover:bg-[#38494E]/15"
                          )}
                        >
                          <span aria-hidden>{link.icon}</span>
                          <span
                            className={clsx(
                              "ml-2 transition-opacity",
                              collapsed
                                ? "opacity-0 lg:sr-only absolute -left-[9999px]"
                                : "opacity-100"
                            )}
                          >
                            {link.name}
                          </span>
                        </Link>

                        {collapsed && (
                          <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">
                            {link.name}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* COMMUNITY */}
            <div className="w-[226px] h-[170px] px-3 flex flex-col gap-2">
              <h2 className="font-sans font-normal text-[14px]/[20px] tracking-normal text-[#616161]">
                Community
              </h2>
              <nav aria-label="Primary">
                <ul className="flex flex-col gap-2">
                  {communicationLinks.map((link) => {
                    const selected = pathname.startsWith(link.href)
                    return (
                      <li key={link.href} className="group relative">
                        <Link
                          href={link.href}
                          aria-current={selected ? "page" : undefined}
                          title={link.name}
                          className={clsx(
                            "flex items-center rounded-[12px] p-3 transition-all",
                            collapsed
                              ? "w-[46px] justify-center"
                              : "w-[226px] justify-start",
                            "h-[46px] font-sans font-medium text-[16px] leading-[22px]",
                            selected
                              ? "text-white bg-[#38494E] border-[1.5px] shadow-[-4px_-2px_6px_0px_#1E1E1E33_inset]"
                              : "text-[#424242] hover:bg-[#38494E]/15"
                          )}
                        >
                          <span aria-hidden>{link.icon}</span>
                          <span
                            className={clsx(
                              "ml-2 transition-opacity",
                              collapsed
                                ? "opacity-0 lg:sr-only absolute -left-[9999px]"
                                : "opacity-100"
                            )}
                          >
                            {link.name}
                          </span>
                        </Link>

                        {collapsed && (
                          <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">
                            {link.name}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
            {/* ACCOUNT */}
            <div className="flex flex-col gap-4">
              <div className="h-px w-full bg-[#F5F5F5] rounded-lg" />

              <nav className="px-3" aria-label="Primary">
                <ul className="flex flex-col gap-2">
                  {accountNav.map((link) => {
                    const selected = pathname.startsWith(link.href)
                    return (
                      <li key={link.href} className="group relative">
                        <Link
                          href={link.href}
                          aria-current={selected ? "page" : undefined}
                          title={link.name}
                          className={clsx(
                            "flex items-center rounded-[12px] p-3 transition-all",
                            collapsed
                              ? "w-[46px] justify-center"
                              : "w-[226px] justify-start",
                            "h-[46px] font-sans font-medium text-[16px] leading-[22px]",
                            selected
                              ? "text-white bg-[#38494E] border-[1.5px] shadow-[-4px_-2px_6px_0px_#1E1E1E33_inset]"
                              : "text-[#424242] hover:bg-[#38494E]/15"
                          )}
                        >
                          <span aria-hidden>{link.icon}</span>
                          <span
                            className={clsx(
                              "ml-2 transition-opacity",
                              collapsed
                                ? "opacity-0 lg:sr-only absolute -left-[9999px]"
                                : "opacity-100"
                            )}
                          >
                            {link.name}
                          </span>
                        </Link>

                        {collapsed && (
                          <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100">
                            {link.name}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="h-px w-full bg-[#F5F5F5] rounded-lg" />
            </div>
          </div>
          <div className="mt-4">
            <ProfileRow
              name="Blessing Dominic"
              email="blessingdo@gmail.com"
              avatarSrc="/images/users/blessing.png"
              href="/instructor/settings"
              collapsed={collapsed}
            />
          </div>
        </div>
      </aside>
    </>
  )
}
