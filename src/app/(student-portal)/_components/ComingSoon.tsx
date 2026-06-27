"use client"

import { ArrowLeft, Clock3 } from "lucide-react"
import { useRouter } from "next/navigation"

type ComingSoonProps = {
  title: string
  description: string
  label?: string
}

const ComingSoon = ({
  title,
  description,
  label = "Coming soon",
}: ComingSoonProps) => {
  const router = useRouter()

  return (
    <section className="flex min-h-full w-full items-center justify-center">
      <div className="w-full rounded-[17px] bg-white px-5 py-12 text-center sm:px-8 lg:px-10">
        <p className="mt-5 font-satoshi text-sm font-bold uppercase tracking-[0.16em] text-[#55796D]">
          {label}
        </p>

        <h1 className="mx-auto mt-3 max-w-[720px] font-satoshi text-[28px] font-bold leading-tight text-[#0C2B36] sm:text-[36px]">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-[640px] font-satoshi text-base font-medium leading-7 text-[#667085]">
          {description}
        </p>
      </div>
    </section>
  )
}

export default ComingSoon
