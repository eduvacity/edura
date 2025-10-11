"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import clsx from "clsx"

type Props = {
  name: string
  email: string
  href?: string
  avatarSrc?: string
  /** When true (mini-drawer), hide text and show only the icon/avatar */
  collapsed?: boolean
  /** Optional className to control width/placement where used */
  className?: string
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("")
}

export default function ProfileRow({
  name,
  email,
  href = "/account",
  avatarSrc,
  collapsed = false,
  className,
}: Props) {
  if (collapsed) {
    // Mini mode: just a circular avatar button
    return (
      <Link
        href={href}
        aria-label={`${name} – account`}
        className={clsx(
          "mx-3 h-[40px] w-[64px] rounded-[12px] flex items-center justify-center",
          "hover:bg-[#38494E]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38494E]/40",
          className
        )}
        title={`${name} · ${email}`}
      >
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={`${name} avatar`}
            width={32}
            height={32}
            className="rounded-full object-cover object-top"
          />
        ) : (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full  text-[#212121] text-xs font-semibold">
            {initials(name)}
          </span>
        )}
      </Link>
    )
  }

  // Expanded/default: full row like the screenshot
  return (
    <Link
      href={href}
      className={clsx(
        "mx-3 w-[226px] min-h-[40px] rounded-[12px] p-3",
        "flex items-center gap-3 bg-white hover:bg-[#38494E]/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38494E]/40",
        className
      )}
      aria-label={`${name} – account`}
    >
      {avatarSrc ? (
        <div className="relative h-[40px] w-[40px]">
          <Image
            src={avatarSrc}
            alt={`${name} avatar`}
            fill
            sizes="48px"
            className="rounded-full object-cover"
          />
        </div>
      ) : (
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm font-semibold">
          {initials(name)}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-sans font-semibold text-[16px] leading-[16px] text-[#212121] truncate tracking-normal">
          {name}
        </p>
        <p className="font-sans text-[12px] leading-[16px] text-[#7E7E7E] truncate">
          {email}
        </p>
      </div>

      <ChevronRight className="h-6 w-6 text-[#616161]" aria-hidden="true" />
    </Link>
  )
}
