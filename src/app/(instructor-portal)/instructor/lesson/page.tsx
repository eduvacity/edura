"use client"

import { ArrowDown } from "@/components/SVGs"
import Link from "next/link"

export default function InstructorLessons() {
  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:py-0 xl:px-0">
      {/* Layout Section */}
      <div className="w-full h-full flex flex-col lg-md:flex-row gap-6">
        {data?.map((course, index) => (
          <Link
            href={`/instructor/lesson/modules/${course.id}?course=${course.title}`}
            key={index}
            className="bg-white rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col transition-all duration-300 hover:scale-[0.99] cursor-pointer"
          >
            <div
              className="w-full h-[153px] bg-cover bg-no-repeat rounded-t-[14px] bg-center"
              style={{
                backgroundImage: `url(${course.imgSrc})`,
              }}
            ></div>
            <div className="w-full flex flex-col gap-3 px-4 py-4">
              <div className="w-full flex justify-between gap-[14px]">
                <h4 className="font-satoshi font-bold text-lg leading-[24.3px] -tracking-[0.001em] text-left text-[#071C23]">
                  {course.title}
                </h4>
                <div className="w-20px] h-[20px] flex justify-end items-end transform rotate-[270deg]">
                  <ArrowDown />
                </div>
              </div>
              <span className="max-w-[436px] font-satoshi font-normal text-sm leading-[24.08px] text-left text-[#868686] line-clamp-3">
                {course.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const data = [
  {
    id: "les01",
    title: "Introduction to UI/UX designs",
    description: `Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit 
mattis tincidunt dictum lobortis morbi ornare bibendum amet.`,
    imgSrc: "/images/uiux.png",
  },
  {
    id: "les02",
    title: "Elementary React Js 18.2.0",
    description: `Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit 
mattis tincidunt dictum lobortis morbi ornare bibendum amet.`,
    imgSrc: "/images/react.png",
  },
  {
    id: "lez03",
    title: "Introduction Modelling",
    description: `Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit 
mattis tincidunt dictum lobortis morbi ornare bibendum amet.`,
    imgSrc: "/images/science.png",
  },
]
