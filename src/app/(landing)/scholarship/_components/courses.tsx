"use client"
import {
  AcademyCapIconAlt,
  ArrwoUpCicled,
  ClockAlt,
  OpenBookAlt,
  TagIcon,
} from "@/components/SVGs"
import { setScholarshipList } from "@/lib/redux"
import { useAppDispatch, useAppSelector } from "@/lib/redux/controls"
import { ScholarshipService } from "@/lib/services/scholarship.service"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

export default function LiveLessonsSection() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { scholarships } = useAppSelector((state) => state.scholarship)

  const getScholarshipList = useCallback(async () => {
    setLoading(true)
    const { error, payload } = await ScholarshipService.getScholarshipList(
      0,
      100
    )
    setLoading(false)
    if (!error && payload) {
      dispatch(setScholarshipList(payload?.scholarship))
    }
  }, [dispatch])

  useEffect(() => {
    getScholarshipList()
  }, [getScholarshipList])
  console.log("scholarships", scholarships)
  return (
    <section
      id="scholarship-courses"
      className="w-full relative grid gap-6 py-24 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 ">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col gap-4">
            <h2 className="w-full text-2xl/[40px] lg-md:text-4xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left">
              Courses Available
            </h2>

            <div className="grid grid-cols-1 lg-md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
              {courses?.map((course, i) => {
                return (
                  <div
                    key={i}
                    className="w-full h-full rounded-lg border border-solid border-[#DDDDDD] bg-[#FFFCF7]  flex flex-col gap-4"
                  >
                    {/* Course Image */}
                    <div
                      className={`relative w-full h-[181px] ${course.src} bg-cover bg-no-repeat bg-[center_18%] border-b-[2.63px] border-solid rounded-t-lg`}
                    >
                      <div
                        className="absolute h-[182px] bg-black/55 w-full  border-b-[2.63px] border-solid"
                        style={{
                          borderImageSource: `linear-gradient(90deg, #E3A229 0%, #3FA46E 100%)`,
                        }}
                      >
                        <div className="p-4">
                          <Image
                            src="/images/assetium-logo.png"
                            alt="assetium new logo"
                            width={60}
                            height={43.83}
                            quality={100}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-4 pb-6 px-4">
                      <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1 items-center">
                            <OpenBookAlt className="w-[20px]" />{" "}
                            <div className="flex flex-col mt-4">
                              <span className="uppercase font-arial font-normal text-sm text-[#727272]">
                                Course
                              </span>
                              <p className="font-arial font-bold text-base/[20.7px] text-[#4D6C62]">
                                {course.course}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1 items-center">
                            <AcademyCapIconAlt className="w-[20px]" />{" "}
                            <div className="flex flex-col mt-4">
                              <span className="uppercase font-arial font-normal text-sm text-[#727272]">
                                Program
                              </span>
                              <p className="font-arial font-bold text-base/[20.7px] text-[#4D6C62]">
                                {course.program}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1 items-center">
                            <ClockAlt className="w-[20px]" />{" "}
                            <div className="flex flex-col mt-4">
                              <span className="uppercase font-arial font-normal text-sm text-[#727272]">
                                Deadline
                              </span>
                              <p className="font-arial font-bold text-base/[20.7px] text-[#4D6C62]">
                                {course.deadline}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 items-center">
                          <TagIcon className="w-[20px]" />{" "}
                          <div className="flex flex-col mt-4">
                            <span className="uppercase font-arial font-normal text-sm text-[#727272]">
                              Value
                            </span>
                            <p className="font-arial font-bold text-base/[20.7px] text-[#4D6C62]">
                              {course.value}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="https://portal.Edura.com/student-auth/signin"
                        className="mt-3 w-full h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer z-10"
                      >
                        Apply now <ArrwoUpCicled />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const courses = [
  {
    course: "Diploma in Computer Science",
    program: "Diploma",
    deadline: "30-11-2024",
    value: "70% Paid",
    src: "bg-[url(/images/scholarship1.png)]",
  },
  {
    course: "Diploma in Computer Engineering ",
    program: "Diploma",
    deadline: "30-11-2024",
    value: "70% Paid",
    src: "bg-[url(/images/scholarship2.png)]",
  },
  {
    course: "Diploma in Cyber Security",
    program: "Diploma",
    deadline: "30-11-2024",
    value: "70% Paid",
    src: "bg-[url(/images/scholarship3.png)]",
  },
  {
    course: "Data Analysis",
    program: "Bootcamp",
    deadline: "30-11-2024",
    value: "70% Paid",
    src: "bg-[url(/images/scholarship4.png)]",
  },
  {
    course: "Software Engineering",
    program: "Bootcamp",
    deadline: "30-11-2024",
    value: "70% Paid",
    src: "bg-[url(/images/scholarship5.png)]",
  },
  {
    course: "Product Design",
    program: "Bootcamp",
    deadline: "30-11-2024",
    value: "70% Paid",
    src: "bg-[url(/images/scholarship6.png)]",
  },
]
