"use client"

import { ArrowRight } from "@/components/SVGs/portal"
import Link from "next/link"

export default function StudentClasses() {
  return (
    <div className="w-full relative p-2 lg:p-4 xl:p-6">
      {/* Greeting Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em] text-[#071C23]">
          Introduction to UI/UX Design
        </h1>
        <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
          Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit amet.
        </span>
      </div>

      {/* Layout Section */}
      <div className="flex flex-col lg-md:flex-row gap-6">
        {data?.map((course, index) => (
          <Link
            href={`/students/classes/topics/${course.id}?course=${course.title}`}
            key={index}
            className="bg-white w-full h-[177px] p-5 rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col transition-all  duration-300 hover:scale-[0.99] cursor-pointer"
          >
            <div className="w-full h-full flex flex-col gap-[14px] place-content-center">
              <h4 className="font-satoshi font-bold text-[16.83px] leading-[20.57px] -tracking-[0.001em] text-left text-[#2E3646]">
                {course.title}
              </h4>
              <span className="max-w-[400px] font-satoshi font-normal text-[16px] leading-[16.83px] overflow-hidden whitespace-nowrap -tracking-[0.001em] text-left text-[#2E3646] text-ellipsis">
                {course.description}
              </span>
            </div>
            <div className="w-full h-[20px] flex justify-end items-end">
              <ArrowRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const data = [
  {
    id: "2988493348",
    title: "Beta - Intro to Design Principle",
    description: `Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit 
mattis tincidunt dictum lobortis morbi ornare bibendum amet.`,
  },
  {
    id: "2988493318",
    title: "Alpha - Layout Design",
    description: `Faucibus hendrerit mattis tincidunt dictum lobortis morbi ornare bibendum amet. Libero aliquet at facilisis justo.`,
  },
  {
    id: "1188493348",
    title: "Gamma - Prototyping",
    description: `Faucibus hendrerit mattis tincidunt dictum lobortis morbi ornare bibendum amet.`,
  },
]
