"use client"

import {
  ArrowRight,
  CompletedAssignmentIcon,
  HourGlassIcon,
} from "@/components/SVGs/portal"
import Link from "next/link"
import CircularProgress from "../../_components/CircularProgressbar"

export default function StudentClasses() {
  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:p-6">
      <div className="w-full max-w-[583px] flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em]">
          Assignment Summary
        </h1>
        <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut magna aliqua consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut magna aliqua.
        </span>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-[47px]">
        {/* Layout Section */}
        <div className="w-full max-w-[1503px] flex flex-col lg-md:flex-row gap-6">
          {/* COMPLETED */}
          <div className="bg-white w-full h-[140px] px-4 rounded-[14px] border border-solid border-[#DDDDDD] place-content-center">
            <div className="w-[258px] h-[57px] flex gap-[14px] items-center">
              <CompletedAssignmentIcon />{" "}
              <div className="flex flex-col gap-[5px]">
                <h4 className="font-arial font-normal text-lg leading-[20.7px] text-left text-[#868686]">
                  Completed
                </h4>
                <span className="max-w-[400px] font-satoshi font-bold text-[22px] leading-[25px] -tracking-[2%] text-left text-[#3F4040]">
                  {summary?.completed}
                </span>
              </div>
            </div>
          </div>
          {/* PASSED */}
          <div className="bg-white w-full h-[140px] px-4 rounded-[14px] border border-solid border-[#DDDDDD] place-content-center">
            <div className="w-[258px] h-[57px] flex gap-[14px] items-center">
              <CompletedAssignmentIcon />{" "}
              <div className="flex flex-col gap-[5px]">
                <h4 className="font-arial font-normal text-lg leading-[20.7px] text-left text-[#868686]">
                  Passes
                </h4>
                <span className="max-w-[400px] font-satoshi font-bold text-[22px] leading-[25px] -tracking-[2%] text-left text-[#3F4040]">
                  {summary?.passed}
                </span>
              </div>
            </div>
          </div>
          {/* OVERDUE */}
          <div className="bg-white w-full h-[140px] px-4 rounded-[14px] border border-solid border-[#DDDDDD] place-content-center">
            <div className="w-[258px] h-[57px] flex gap-[14px] items-center">
              <CompletedAssignmentIcon />{" "}
              <div className="flex flex-col gap-[5px]">
                <h4 className="font-arial font-normal text-lg leading-[20.7px] text-left text-[#868686]">
                  Overdue
                </h4>
                <span className="max-w-[400px] font-satoshi font-bold text-[22px] leading-[25px] -tracking-[2%] text-left text-[#3F4040]">
                  {summary?.overdue}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit min-h-[267px] flex flex-col lg-md:flex-row gap-[21px]">
          {assignment?.map((course, index) => (
            <div
              key={index}
              className={`bg-white w-[488px] p-6 rounded-lg border border-solid border-[#DDDDDD] border-l-4 ${
                course.completion === 100
                  ? "border-l-[#F3D16F]"
                  : "border-l-[#3FA46E]"
              } flex flex-col"
               justify-center items-center`}
            >
              <div className="w-[488px] h-[194px] flex flex-col gap-[38px]">
                <div className="w-full lg-md:h-[57px] flex gap-[17px] justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg/[27px] font-satoshi text-left font-bold text-[#091E42]">
                      {course.title}
                    </h3>
                    <span className="w-[188px] flex gap-1 items-center">
                      <HourGlassIcon />{" "}
                      <span className="font-satoshi font-normal text-left text-sm/[21px] text-[#505F79]">
                        Due date: 19th Oct, 2024
                      </span>
                    </span>
                  </div>
                  <CircularProgress
                    color="#4D6C62"
                    className="w-[52px] h-[52px]"
                    percentage={course.completion}
                    text="text-[11px]/[19.5px]"
                  />
                </div>

                <span className="max-w-[428px] font-satoshi font-normal text-base -tracking-[0.001em] text-left text-[#505F79]">
                  {course.description}
                </span>
                {course.completion === 100 ? (
                  <Link
                    href="/"
                    className="font-arial font-normal text-base/[18.4px] text-[#4D6C62] underline"
                  >
                    View Feedback
                  </Link>
                ) : (
                  <Link
                    href={`/students/assignments/assignment/${course.id}?topic=${course.title}&description=${course.description}`}
                    className="font-arial font-normal text-base/[18.4px] text-[#4D6C62] underline"
                  >
                    Continue
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const summary = {
  completed: "09",
  passed: "03",
  overdue: "05",
}
const assignment = [
  {
    id: "as01",
    title: "Introduction to product design",
    description: `The assignment covers the lessons in the introduction to product design video of week 1.`,
    dueDate: "19th Oct, 2024",
    completion: 100,
  },
  {
    id: "as02",
    title: "Introduction to UI/UX design",
    description: `The assignment covers the lessons in the introduction to product design video of week 1.`,
    dueDate: "19th Oct, 2024",
    completion: 65,
  },
]
