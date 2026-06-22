"use client"

import { ClosedBook } from "@/components/SVGs/portal"
import { Filter, Info, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

export default function StudentCourses() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All courses")

  const total = COURSES.length
  const ongoing = COURSES.filter((c) => c.status === "Ongoing").length
  const completed = COURSES.filter((c) => c.status === "Completed").length

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return COURSES.filter((c) => {
      const matchesText =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)

      const matchesCat = category === "All courses" || c.category === category

      return matchesText && matchesCat
    })
  }, [query, category])

  return (
    <div className="w-full p-4 flex flex-col gap-10 font-sans font-normal tracking-normal">
      {/* Top banner */}
      <div className="grid gap-4 lg:grid-cols-12">
        <Banner />

        <div
          className={`h-[159px] rounded-[12px] py-[18px] px-3  flex flex-col justify-between gap-[10px] bg-white p-4 lg:col-span-2 font-sans tracking-normal`}
        >
          <div className="flex flex-col gap-3 text-[#616161]">
            <div className="w-10 h-10 rounded-[8px] p-2 bg-[#E8F5E9] text-[#2E7D32]">
              <ClosedBook />
            </div>

            <div className="text-[28px]/[48px] font-extrabold text-[#212121] tracking-normal">
              {total}
            </div>
          </div>

          <div className="font-normal text-[14px]/[20px] text-[#212121]">
            Total sections
          </div>
        </div>

        <div
          className={`h-[159px] rounded-[12px] py-[18px] px-3  flex flex-col justify-between gap-[10px] bg-white p-4 lg:col-span-2 font-sans tracking-normal`}
        >
          <div className="flex flex-col gap-3 text-[#616161]">
            <div className="w-10 h-10 rounded-[8px] p-2 bg-[#FFF8E1] text-[#E0AB00]">
              <ClosedBook />
            </div>

            <div className="text-[28px]/[48px] font-extrabold text-[#212121]">
              {ongoing}
            </div>
          </div>

          <div className="font-normal text-[14px]/[20px] text-[#212121]">
            Sections ongoing
          </div>
        </div>

        <div
          className={`h-[159px] rounded-[12px] py-[18px] px-3  flex flex-col justify-between gap-[10px] bg-white p-4 lg:col-span-2 font-sans tracking-normal`}
        >
          <div className="flex flex-col gap-3 text-[#616161]">
            <div className="w-10 h-10 rounded-[8px] p-2 bg-[#DCE6E2] text-[#4D6C62]">
              <ClosedBook />
            </div>

            <div className="text-[28px]/[48px] font-extrabold text-[#212121] tracking-normal">
              {completed}
            </div>
          </div>

          <div className="font-normal text-[14px]/[20px] text-[#212121]">
            Sections completed
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-[48px] lg:flex-row lg:items-center lg:justify-between">
        <div className="h-[49px] flex flex-col text-[12px]/[16px] gap-2 font-normal font-sans tracking-normal">
          <h4 className="text-[16px]/[25px] text-[#212121] font-extrabold">
            UI/UX Design Curriculum
          </h4>

          <div className="flex items-center gap-2 font-medium font-sans text-[#6E9988]">
            <span>Month 1</span>
            <span>|</span>
            <span>Beginner to Intermediate</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-40 rounded-[8px] border border-[#E0E0E0] bg-white py-2 pl-10 pr-8 text-sm focus:outline-none focus:ring-[0.5px] focus:ring-[#4D6C62]/30"
              >
                <option>All courses</option>

                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search UI/UX sections"
              className="w-full rounded-[8px] border border-[#E0E0E0] bg-white py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-[0.5px] focus:ring-[#4D6C62]/30"
            />

            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <button
            onClick={() => {
              setQuery("")
              setCategory("All courses")
            }}
            className="inline-flex items-center justify-center rounded-[8px] border border-[#E0E0E0] bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
          >
            View all sections
          </button>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid gap-[19px] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

function Banner() {
  const bg = "/images/courses/course-card-bg.svg"
  const bgUrl = encodeURI(bg)

  return (
    <div
      className="w-full relative overflow-hidden rounded-2xl p-5 lg:col-span-6 xl:col-span-6 bg-[#EAF5F0]"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Text block with background illustration */}
      <div className="flex flex-col items-start gap-3 relative w-full p-4 pr-40 min-h-[86px] text-white font-sans tracking-normal">
        <h2 className="text-[22px]/[30px] font-extrabold ">
          Build better experiences! 🎯
        </h2>

        <p className="font-normal max-w-[34ch] text-[16px]/[22px]">
          Progress from design fundamentals to a complete, testable UI design
          system in four structured weeks.
        </p>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-white p-3 flex flex-col gap-4">
      {/* Image */}
      <div className="relative w-full h-[127px] rounded-[8px] aspect-[16/9] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 font-sans tracking-normal">
          <h3 className="text-[16px]/[16px] font-semibold text-[#212121]">
            {course.title}
          </h3>

          <p className="font-normal line-clamp-2 text-[12px]/[16px] text-[#616161]">
            {course.description}
          </p>
        </div>

        <div className="w-full flex justify-between items-center gap-2 text-[12px]">
          <div className="w-full flex flex-wrap items-center gap-2">
            <div className="bg-[#F5F5F5] h-[24px] rounded py-1 px-2">
              <span className="mr-1 text-[#424242] font-normal font-sans text-[12px]/[16px]">
                {course.topics} modules
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="bg-[#FFF8E1] h-[24px] rounded py-1 px-2 border-[0.5px] border-[#F5BB00]">
                🏆 Points: 100 XP
              </div>

              <Info className="text-[#C7C7C7] w-[13.33px] h-[13.33px] cursor-pointer" />
            </div>
          </div>

          <StatusPill status={course.status} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[#7E7E7E] font-sans font-normal text-[12px]/[16px]">
          Progress:{" "}
          <span className="text-[#212121] font-medium">{course.progress}%</span>
        </span>

        <Link
          href={`/student/my-courses/topics/${
            course.id
          }?course=${encodeURIComponent(course.title)}`}
          className="h-[28px] inline-flex items-center gap-1 rounded text-[#212121] px-3 py-1 text-[14px]/[16px] tracking-normal font-semibold border border-[#E0E0E0] bg-white transition cursor-pointer"
        >
          Get started
        </Link>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: Course["status"] }) {
  const map = {
    Ongoing: {
      text: "Ongoing",
      className: "bg-[#FFF8E1] text-[#E0AB00] border-[#FFECB3]",
    },
    Completed: {
      text: "Completed",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    Upcoming: {
      text: "Upcoming",
      className: "bg-sky-50 text-sky-700 border-sky-200",
    },
  } as const

  const cfg = map[status] || map.Ongoing

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] ${cfg.className}`}
    >
      {cfg.text}
    </span>
  )
}

// A tiny helper icon (filled center) similar to the screenshot's small stat tile icon
function CircleDot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}

// ----------------------
// Data
// ----------------------

type Course = {
  id: string
  title: string
  description: string
  image: string
  topics: number
  points: number
  status: "Ongoing" | "Completed" | "Upcoming"
  progress: number
  category: string
}

const CATEGORIES = ["Week 1", "Week 2", "Week 3", "Week 4"]

const COURSES: Course[] = [
  {
    id: "design-foundations",
    title: "Design Foundations",
    description:
      "Build the mental models every great designer relies on through visual principles, design history, colour, typography, grids, and the language of UI.",
    image: "/images/courses/chemistry.webp",
    topics: 4,
    points: 100,
    status: "Ongoing",
    progress: 25,
    category: "Week 1",
  },
  {
    id: "user-research-empathy",
    title: "User Research & Empathy",
    description:
      "Discover how to uncover real user needs through research planning, interviews, usability testing, observation, and synthesis before drawing a single pixel.",
    image: "/images/courses/biology.webp",
    topics: 4,
    points: 100,
    status: "Upcoming",
    progress: 0,
    category: "Week 2",
  },
  {
    id: "information-architecture",
    title: "Information Architecture",
    description:
      "Structure content and navigation using mental models, taxonomy, card sorting, site maps, user flows, and navigation patterns.",
    image: "/images/courses/psychology.webp",
    topics: 4,
    points: 100,
    status: "Upcoming",
    progress: 0,
    category: "Week 2",
  },
  {
    id: "wireframing-ideation",
    title: "Wireframing & Ideation",
    description:
      "Move from abstract ideas to tangible structures through sketching, Crazy-8s, low-fidelity wireframes, design patterns, critique, and rapid iteration.",
    image: "/images/courses/math.webp",
    topics: 4,
    points: 100,
    status: "Upcoming",
    progress: 0,
    category: "Week 3",
  },
  {
    id: "interaction-design-prototyping",
    title: "Interaction Design & Prototyping",
    description:
      "Give designs motion and logic by applying interaction principles, Figma prototyping, micro-interactions, transitions, and realistic testable flows.",
    image: "/images/courses/geography.webp",
    topics: 4,
    points: 100,
    status: "Upcoming",
    progress: 0,
    category: "Week 4",
  },
  {
    id: "ui-design-systems",
    title: "UI Design & Design Systems",
    description:
      "Create pixel-perfect interfaces, reusable UI components, Figma variables, design tokens, documentation, and complete developer handoffs.",
    image: "/images/courses/coding-img.webp",
    topics: 4,
    points: 100,
    status: "Upcoming",
    progress: 0,
    category: "Week 4",
  },
]
