"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import QuizPerformanceChart from "../../../dashboard/_components/quizChart"

export default function StudentClassDetail({ params }: any) {
  const searchParams = useSearchParams()
  const course = searchParams.get("course")

  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:p-6">
      {/* Greeting Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em]">
          {course}
        </h1>
        <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
          Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit amet.
        </span>
      </div>

      {/* Layout Section */}
      <div className="min-h-screen flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <section className="flex-[1] xl:max-w-[920px] w-full flex flex-col gap-[17px]">
          {data?.map((topic, index) => (
            <Link
              href={`/students/classes/topics/topic/${topic.id}?topic=${topic.title}`}
              key={index}
              className="bg-white w-full h-[91px] p-5 rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col"
            >
              <div className="w-full h-full flex justify-between items-center gap-[14px]">
                <h4 className="font-satoshi font-bold text-[16.83px] leading-[20.57px] -tracking-[0.001em] text-left text-[#2E3646]">
                  {topic.title}
                </h4>

                <div className="w-fit h-[44px] py-[11px] px-[17px] gap-[10px] rounded-[7px] bg-[#E9E9EF] flex justify-center items-center border border-solid border-[#ACACAC] transform duration-300 hover:scale-[0.99] cursor-pointer">
                  Open
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Right Section */}
        <section className="flex-[541/1461] xl:max-w-[541px] w-full">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Course Performance (Quiz) */}
            <div className="bg-white w-full h-[305px] rounded-[17px] border border-solid border-[#E5E5E5]">
              <h4 className="text-[#263238] text-base leading-[21.6px] text-left font-bold font-satoshi p-4 border-b-[3px] border-[#F0F0F0]">
                Course Performance (Quiz)
              </h4>

              <QuizPerformanceChart />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const data = [
  {
    id: "2988493348",
    title: "User-Centered Design",
  },
  {
    id: "2988493318",
    title: "User Journey Mapping",
  },
  {
    id: "1188493348",
    title: "Wireframing and Prototyping",
  },
  { id: "1188493348", title: "Clarity and Simplicity" },
  { id: "238493348", title: "Consistency and Standard" },
]
