"use client"
import {
  ClockIcon,
  CreditCardIcon,
  GraduationCapIcon,
  MonitorComputerIcon,
  RatioIcon,
  VideoRcorderIcon,
} from "@/components/SVGs"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CourseOverviewSection({ course }: any) {
  return (
    <motion.section
      className="w-full relative grid gap-6 py-[50px] lg-md:py-[90px] 3xl:py-[80px]px-4 lg-md:px-12 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col lg:flex-row xl:justify-center xl:items-center gap-6 lg-md:gap-12">
        <div className="w-full max-w-[1500px] flex flex-col gap-4 lg-md:gap-8 xl:gap-[16px] 3xl:gap-[43px] px-4 lg-md:px-0">
          <h2 className="w-full text-2xl/[40px] lg-md:text-4xl/[60px] font-semibold font-avant-garde text-[#011B23] -tracking-[2%] text-left">
            Course Overview
          </h2>
          <div className="w-full flex flex-col lg:flex-row gap-[61px] justify-between">
            <div className="w-full xl:w-[640px] 3xl:w-[822px] flex flex-col gap-[43px]">
              {overviews?.map((v, i) => {
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <h4 className="w-full font-medium font-avant-garde text-2xl text-[#101828]">
                      {v.title}
                    </h4>
                    <p className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-sm/[26px] xl:text-base text-[#868B93]">
                      {v.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="w-full xl:w-[430px] 3xl:w-[542px]  flex flex-col gap-8 shadow-[0px_4px_6px_-2px_#10182808,0px_12px_16px_-4px_#10182814 rounded-2xl">
              <div className="w-full flex-col gap-4 bg-white flex border-b border-[#EAECF0] px-4 py-8 xl:px-8 3xl:py-12 rounded-t-2xl">
                <h4 className="text-xl text-[#011B23] font-medium font-avant-garde">
                  Programme Summary
                </h4>
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex gap-3">
                    <GraduationCapIcon />
                    <div className="flex flex-col">
                      <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93] capitalize">
                        Certification
                      </h4>
                      <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base lg-md:text-lg text-[#101828]">
                        {course?.courseName}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <GraduationCapIcon />
                    <div className="flex flex-col">
                      <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93] capitalize">
                        Course type
                      </h4>
                      <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base lg-md:text-lg text-[#101828]">
                        {course?.courseType}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <MonitorComputerIcon />
                    <div className="flex flex-col">
                      <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93]">
                        Learning Mode
                      </h4>
                      <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base text-[#101828]">
                        Online
                      </span>
                    </div>
                  </div>
                  {course?.courseType?.toLowerCase() !== "certificate" && (
                    <div className="w-full flex gap-3">
                      <CreditCardIcon />
                      <div className="flex flex-col">
                        <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93]">
                          Application fees
                        </h4>
                        <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base text-[#101828]">
                          {course?.applicationFee
                            ? `₦${Number(course?.applicationFee).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                }
                              )} naira`
                            : null}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="w-full flex gap-3">
                    <RatioIcon />
                    <div className="flex flex-col">
                      <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93]">
                        Teacher student ratio
                      </h4>
                      <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base text-[#101828]">
                        1:20
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <VideoRcorderIcon />
                    <div className="flex flex-col">
                      <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93]">
                        Hours of live session
                      </h4>
                      <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base text-[#101828]">
                        200+
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex gap-3">
                    <ClockIcon />
                    <div className="flex flex-col">
                      <h4 className="w-full font-medium font-avant-garde text-xs lg-md:text-sm text-[#868B93]">
                        Live sessions
                      </h4>
                      <span className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-base text-[#101828]">
                        25+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#F6F7F6] flex justify-center items-center py-2 px-4 h-[80px]">
                <Link
                  href="https://portal.eduvacity.com/student-auth/signin"
                  className="w-full h-[56px] gap-2 rounded-[10px] flex justify-center items-center bg-pcolor hover:bg-pcolor/90 text-base text-[#E6F4ED] font-medium font-avant-garde hover:scale-[0.99]"
                >
                  Start your application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
const overviews = [
  {
    title: "Duration",
    description: `Immerse yourself in over 400 hours of immersive learning, designed to provide you with a comprehensive understanding and skill development of computer engineering principles and practices.`,
  },
  {
    title: "24/7 Career Support",
    description: `Receive comprehensive support throughout your career journey, including personalized 1:1 career coaching sessions and access to live sessions that cover industry-driven projects, case studies, and more.`,
  },
  {
    title: "Live Learning Sessions",
    description: `Engage in more than 25 live sessions, where you'll delve into industry-relevant topics such as business growth strategies, leadership skills, teamwork dynamics, problem-solving strategies and more`,
  },
  {
    title: "Career Growth Opportunities",
    description: `Take advantage of the projected 5% growth in management occupations from 2019 to 2029, offering ample opportunities for career advancement and professional development.`,
  },
]
