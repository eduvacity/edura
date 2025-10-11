"use client"
import {
  ComputerAltIcon,
  MarkedUser,
  PeopleAltIcon,
  StackedAltCard,
} from "@/components/SVGs"
import Link from "next/link"

export default function RequirementSection() {
  return (
    <section
      className="w-full relative grid gap-6 pt-[100px] lg-md:pt-[120px] xl:pt-[160px] 3xl:pt-[140px] pb-[50px] px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6 bg-[#FFFFFF]"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex justify-center items-center ">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col lg:flex-row gap-24 justify-center items-center">
            <div className="max-w-[776px] flex flex-col gap-6 ">
              <div className="max-w-[555px] flex flex-col gap-4">
                <p className="w-full font-avant-garde font-bold flex flex-col text-pcolor text-2xl/[32px] lg-md:text-[35px]/[49px] -tracking-[2%]">
                  Scholarship Requirements
                </p>
                <p className="w-full text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px] flex flex-col gap-1">
                  Review the criteria needed to qualify for our scholarships.
                  Ensure you meet all requirements before applying.
                  <span>
                    You must have access to laptop and available data everyday
                    for better learning.
                  </span>
                </p>
              </div>
              <Link
                href="/scholarship/apply"
                className="w-[170px] h-[58px] font-medium font-avant-garde text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                Apply now
              </Link>
            </div>
            <div className="max-w-[584px] flex flex-col gap-3">
              {access?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center w-full bg-white border border-solid border-[#DDDDDD] rounded-lg"
                >
                  <div className="flex items-center gap-4 w-full h-full bg-white py-3 border-l-8 border-solid border-pcolor rounded-lg px-6">
                    {item.icon}{" "}
                    <p className="font-avant-garde font-normal text-left text-sm lg-md:text-base text-[#2E3948] tracking-[0.5px]">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const access = [
  {
    title:
      "All our Scholarships are Available to both Male and Female applicants from all Geo-political zones within Nigeria.",
    icon: <PeopleAltIcon className="flex-shrink-0 w-[55px] h-[55px]" />,
  },
  {
    title:
      "All our Scholarships applicants must possess a minimum of O’level certificate.",
    icon: <StackedAltCard className="flex-shrink-0 w-[55px] h-[55px]" />,
  },
  {
    title: "All applicants must be willing to commit and finish the program.",
    icon: <ComputerAltIcon className="flex-shrink-0 w-[55px] h-[55px]" />,
  },
]
