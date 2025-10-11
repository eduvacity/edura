"use client"

import { ArrowRight } from "@/components/SVGs/portal"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function LessonModules({ params }: any) {
  const searchParams = useSearchParams()
  const course = searchParams.get("course")

  return (
    <div className="w-full relative p-2 lg:p-4 xl:py-6 xl:px-0 flex flex-col gap-[54px]">
      <div className="w-full flex flex-col lg-md:flex-row justify-between">
        <Link
          href={`/instructor/lesson`}
          className="flex mb-6 gap-2 items-center cursor-pointer"
        >
          <ArrowRight className="transform rotate-180 text-[#071C23]" />
          <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em] text-[#071C23]">
            {course}
          </h1>
        </Link>
      </div>

      {/* Layout Section */}
      <div className="w-full flex flex-col lg-md:flex-row gap-6">
        {data?.map((course, index) => (
          <Link
            href={`/instructor/lesson/modules/${params.id}/add?course=${course?.id}`}
            key={index}
            className="bg-white w-full h-[177px] py-5 px-4 rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col transition-all  duration-300 hover:scale-[0.99] cursor-pointer"
          >
            <div className="w-full h-full flex flex-col gap-[13px]">
              <h4 className="font-satoshi font-bold text-[22px] leading-[25.57px] -tracking-[0.001em] text-left text-[#071C23]">
                {course.title}
              </h4>
              <span className="max-w-[400px] font-satoshi font-normal text-sm leading-[24.08px] line-clamp-3 text-left text-[#868686] text-ellipsis">
                {course.description}
              </span>
            </div>
            <div className="w-full flex justify-between gap-1">
              {course?.published ? (
                <span className="w-fit h-[27.38px] py-[7.69px] px-[11.54px] flex gap-[7.69px] rounded-[17px] border-[0.77px] border-solid border-[#E3E3E3] bg-[#E0FAEC] font-satoshi font-normal text-[10.77px] leading-[12.38px] text-left text-[#545454] uppercase">
                  Published
                </span>
              ) : (
                <span className="w-fit h-[27.38px] py-[7.69px] px-[11.54px] flex gap-[7.69px] rounded-[17px] border-[0.77px] border-solid border-[#E3E3E3] bg-[#E4EDF5] font-satoshi font-normal text-[10.77px] leading-[12.38px] text-left text-[#545454] uppercase">
                  Unpublished
                </span>
              )}
              <div className="w-full h-[20px] flex justify-end items-end">
                <ArrowRight className="text-[#868686]" />
              </div>
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
    published: true,
  },
  {
    id: "2988493318",
    title: "Alpha - Layout Design",
    description: `Faucibus hendrerit mattis tincidunt dictum lobortis morbi ornare bibendum amet. Libero aliquet at facilisis justo.`,
    published: false,
  },
  {
    id: "1188493348",
    title: "Gamma - Prototyping",
    description: `Faucibus hendrerit mattis tincidunt dictum lobortis morbi ornare bibendum amet.`,
    published: false,
  },
]
