"use client"

import { MenuIconAlt, NotificationBell } from "@/components/SVGs/portal"
import { Badge, Divider, IconButton, Menu, MenuItem } from "@mui/material"
import clsx from "clsx"
import {
  ChevronDown,
  Info,
  LayoutGrid,
  Search as SearchIcon,
  Trophy,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useMemo, useState } from "react"
import { navLinks } from "./navLinks"

interface AppBarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
  activePath: string

  // optional hooks for interactivity
  onSearch?: (q: string) => void
  onAskAI?: () => void
  onOpenPoints?: () => void
  onLanguageChange?: (lang: { code: string; label: string }) => void

  // optional data overrides
  notificationsCount?: number
  points?: number
  initialLanguage?: { code: string; label: string }
  userName?: string
  userEmail?: string
  avatarSrc?: string
}

const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  // Local languages (using 🇳🇬 as context flag)
  { code: "yo", label: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
] as const

export default function AppBar({
  isSidebarOpen,
  setIsSidebarOpen,
  activePath,

  onSearch,
  onAskAI,
  onOpenPoints,
  onLanguageChange,

  notificationsCount = 3,
  points = 1250,
  initialLanguage = { code: "en", label: "English" },
  userName = "Ibrahim Musa Abba",
  userEmail = "blessingdominic@gmail.com",
  avatarSrc = "/images/ibrahim-musa-abbah.jpg",
}: AppBarProps) {
  const [q, setQ] = useState("")
  const [lang, setLang] = useState(initialLanguage)
  const activeFlag = useMemo(
    () => LANGS.find((l) => l.code === lang.code)?.flag ?? "🌐",
    [lang.code]
  )

  // Menus
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null)
  const [appsAnchor, setAppsAnchor] = useState<null | HTMLElement>(null)

  const activeLink =
    navLinks.find((link) => activePath.startsWith(`${link.href}`))?.name ||
    "Dashboard"

  function submit(e: FormEvent) {
    e.preventDefault()
    const query = q.trim()
    if (query) onSearch?.(query)
  }

  const openLang = Boolean(langAnchor)
  const openApps = Boolean(appsAnchor)

  return (
    <header className="sticky top-0 z-40 h-[73px] bg-white border-b border-[#DADADA] py-3 lg:pl-3 lg:pr-8 px-3 flex items-center justify-between gap-3 lg:gap-4 w-full">
      {/* Sidebar toggle (mobile) */}
      <IconButton
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
        className="lg:hidden"
        size="large"
      >
        <MenuIconAlt className="w-10 h-10" />
      </IconButton>

      {/* Search */}
      <form
        onSubmit={submit}
        role="search"
        aria-label="Search"
        className="relative flex-1 max-w-[560px] min-w-[160px]"
      >
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#212121]" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className={clsx(
            "w-full h-[42px] pl-10 pr-3 rounded-[12px] bg-white",
            "border border-[#E0E0E0] text-[#212121] placeholder:text-[#A1A1A1] font-sans font-normal",
            "outline-none focus:ring-0 focus:ring-[#38494E]/30 focus:border-[#4D6C62]"
          )}
        />
      </form>
      <div className="h-10 flex items-center gap-[48px]">
        {/* Ask Edura AI */}
        <button
          type="button"
          onClick={() => onAskAI?.()}
          className="w-fit h-[38px] inline-flex items-center justify-center gap-1 rounded-[8px] border-[0.6px] border-solid border-transparent font-medium text-white leading-none py-2 px-3"
          style={{
            background:
              "radial-gradient(58.61% 62.77% at 50.39% 113.83%, #70E0BC 0%, #4D6C62 76.44%)",
            borderImageSource:
              "linear-gradient(180deg, #5B9985 0%, rgba(255, 255, 255, 0) 17.08%)",
            borderImageSlice: "0.6px",
            // outer glow
            boxShadow: "0 0 0 2px rgba(172, 228, 210, 0.102)",
          }}
          aria-label="Ask Edura AI"
        >
          <Image
            src="/white-edura-head.svg"
            alt="edura logo"
            width={20}
            height={20}
          />

          <span>Ask Edura AI</span>
        </button>
        <div className="flex items-center gap-[32px]">
          {/* Notifications */}
          <IconButton
            className="bg-transparent"
            disableRipple
            aria-label="Notifications"
            size="large"
          >
            <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] grid place-content-center">
              <Badge
                color="error"
                overlap="circular"
                badgeContent={notificationsCount > 0 ? notificationsCount : 0}
                invisible={notificationsCount <= 0}
              >
                <NotificationBell className="w-[22px] h-[22px] lg:w-[26px] lg:h-[26px]" />
              </Badge>
            </div>
          </IconButton>

          {/* Language selector (opens menu) */}
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={openLang ? "true" : "false"}
            onClick={(e) => setLangAnchor(e.currentTarget)}
            className="hidden sm:inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <span className="text-base leading-none">{activeFlag}</span>
            <span className="text-sm">{lang.label}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          <Menu
            anchorEl={langAnchor}
            open={openLang}
            onClose={() => setLangAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: { minWidth: 220 } } }}
          >
            {LANGS.map((opt) => (
              <MenuItem
                key={opt.code}
                selected={opt.code === lang.code}
                onClick={() => {
                  setLang({ code: opt.code, label: opt.label })
                  setLangAnchor(null)
                  onLanguageChange?.({ code: opt.code, label: opt.label })
                }}
              >
                <span className="mr-2">{opt.flag}</span>
                <span className="text-sm">{opt.label}</span>
              </MenuItem>
            ))}
          </Menu>

          {/* Points chip */}
          <div className="hidden md:inline-flex items-center gap-2 h-10">
            <button
              type="button"
              onClick={() => onOpenPoints?.()}
              className="flex items-center h-full px-3 rounded-full bg-[#FFF8E6] text-[#7A5A00] border border-[#F1D187] hover:bg-[#FFF2CF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1D187]"
              aria-label={`${points.toLocaleString()} points`}
              title={`${points.toLocaleString()} points`}
            >
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {points.toLocaleString()} pts
              </span>
            </button>
            <Info className="h-3.5 w-3.5 text-[#C7C7C7]" aria-hidden="true" />
          </div>

          {/* Apps grid — now contains the ACCOUNT INFO so it’s hidden from the bar */}
          <IconButton
            aria-label="Open apps"
            aria-haspopup="menu"
            aria-expanded={openApps ? "true" : "false"}
            onClick={(e) => setAppsAnchor(e.currentTarget)}
            size="large"
            className="bg-[#F5F5F5] hover:bg-[#eaeaea] text-slate-700"
          >
            <LayoutGrid className="h-5 w-5" />
          </IconButton>

          <Menu
            anchorEl={appsAnchor}
            open={openApps}
            onClose={() => setAppsAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: { width: 360, p: 1 } } }}
          >
            {/* Profile row (ACCOUNT INFO moved here) */}
            <div className="flex items-center gap-3 px-3 py-2">
              <Image
                src={avatarSrc}
                alt={`${userName} avatar`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-sans font-semibold text-[15px] leading-5 text-slate-900 truncate">
                  {userName}
                </p>
                <p className="font-sans text-[13px] leading-5 text-slate-500 truncate">
                  {userEmail}
                </p>
              </div>
              <Link
                href="/students/settings"
                onClick={() => setAppsAnchor(null)}
                className="text-[13px] text-[#4D6C62] hover:underline"
              >
                View
              </Link>
            </div>

            <Divider className="my-1" />

            {/* Quick apps grid (from your navLinks) */}
            <div className="px-2 pb-2">
              <div className="grid grid-cols-3 gap-2">
                {navLinks.slice(0, 9).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setAppsAnchor(null)}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 hover:bg-slate-50 py-3"
                    title={item.name}
                  >
                    <span className="h-5 w-5">{item.icon}</span>
                    <span className="text-[11px] text-slate-700 text-center line-clamp-1">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Divider className="my-1" />

            {/* Footer actions */}
            <div className="flex items-center justify-between px-2 py-1">
              <Link
                href="/students/settings"
                onClick={() => setAppsAnchor(null)}
                className="text-[13px] text-slate-700 hover:underline"
              >
                Settings
              </Link>
              <Link
                href="/logout"
                onClick={() => setAppsAnchor(null)}
                className="text-[13px] text-red-600 hover:underline"
              >
                Sign out
              </Link>
            </div>
          </Menu>
        </div>
      </div>
    </header>
  )
}
