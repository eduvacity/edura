"use client"

import {
  ArrowRight,
  AssignmentsIcon,
  GroupedPeopleIcon,
  LessonPublishedIcon,
  QuizesIcon,
} from "@/components/SVGs/portal"
import WavingPalm from "@/components/SVGs/portal/wavingPalm"
import Link from "next/link"
import CourseProgressTable from "./_components/courses"

export default function StudentDashboard() {
  // Optional: Dynamic greeting logic
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening"

  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:p-6">
      {/* Greeting Section */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] lg:text-[32px] font-bold font-satoshi -tracking-[0.001em]">
          {greeting} <span className="text-primary font-[900]">Charles</span>
        </h1>
        <WavingPalm />
      </div>

      {/* Layout Section */}
      <div className="min-h-screen flex flex-col gap-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg-md:grid-cols-4 gap-[21px]">
          {summary?.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="h-[136px] bg-white flex flex-col justify-between rounded-[14px] border border-solid border-[#DDDDDD] px-4 pb-4 pt-6 cursor-pointer transition-all duration-300 hover:scale-[0.99]"
            >
              <div className="flex gap-[14px] h-[65px] items-center">
                {item.icon}{" "}
                <div className="flex flex-col gap-[9px] h-full">
                  <h3 className="text-[#868686] font-medium font-satoshi text-lg leading-[30.96px]">
                    {item.title}
                  </h3>
                  <p className="text-[#4D6C62] font-bold font-arial text-[22px] leading-[25.3px] tracking-[0.02em]">
                    {item.total}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end items-end">
                <ArrowRight className="text-[#868686]" />
              </div>
            </Link>
          ))}
        </div>
        <CourseProgressTable />
      </div>
    </div>
  )
}

const summary = [
  {
    title: "Lesson Published",
    total: "10",
    icon: <LessonPublishedIcon />,
    link: "/instructor/lesson",
  },
  {
    title: "Total Students",
    total: "567",
    icon: <GroupedPeopleIcon />,
    link: "/instructor/student",
  },
  {
    title: "Assignments",
    total: "04",
    icon: <AssignmentsIcon />,
    link: "/instructor/assignement",
  },
  {
    title: "Quizes",
    total: "04",
    icon: <QuizesIcon />,
    link: "/instructor/quiz",
  },
]
