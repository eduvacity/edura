"use client"
import { ABUZariaWhiteLogo, ArrwoUpCicled } from "@/components/SVGs"
import { AuthService } from "@/lib/services/auth.service"
import { motion } from "framer-motion"
import moment from "moment"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import ProgramVideo from "./video"

export default function Herosection({ course }: any) {
  const [deadline, setDeadline] = useState<Date | null>(null)
  const initializeDeadline = useCallback(async () => {
    const { error, payload } = await AuthService.getDeadline()
    if (!error && payload) {
      if (payload.deadline) {
        const deadlineTimestamp = parseInt(payload.deadline, 10)
        const date = new Date(deadlineTimestamp)
        setDeadline(date)
      }
    }
  }, [])
  useEffect(() => {
    initializeDeadline()
  }, [initializeDeadline])

  return (
    <section className="w-full relative min-h-[80vh] 3xl:min-h-[85vh] place-content-center pt-[180px] lg-md:pt-[140px] xl:pt-[90px] 3xl:pt-[160px] pb-[80px] lg-md:pb-[120px] lg:pb-[100px] xl:pb-[80px] grid gap-6 bg-pdarkcolor">
      <motion.div
        className="absolute bg-cover bg-center bg-repeat top-0 left-0 w-full h-full sclae-[0.5px]"
        style={{
          background: "url(/images/grid.svg)",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.div
        className="absolute top-[60%] left-[45%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "url(/rocket.svg) no-repeat center",
          width: "180px",
          height: "180px",
        }}
      />
      <div className="w-full relative flex flex-col lg:flex-row xl:justify-center xl:items-center gap-14 px-4 lg-md:pl-8 xl:pl-20 xl:pr-14">
        <div className="w-full max-w-[365px] 3xl:h-[618.86px] lg-md:max-w-[695px] lg:max-w-[895px] xl:max-w-[695px] 3xl:max-w-[1280px] grid grid-cols-1 gap-8 lg-md:gap-[47px] xl:gap-[20px] 3xl:gap-12 xl:place-content-center">
          <span className="xl:pt-12 3xl:pt-0 block text-pcolor text-xl lg:text-xl xl:text-2xl capitalize">
            {course?.school?.schoolName ? (
              <ABUZariaWhiteLogo className="w-[50px] h-[50px]" />
            ) : (
              ""
            )}
          </span>{" "}
          <div className="flex flex-col xl:w-[652px] justify-start items-start gap-4 px-1.5 lg-md:px-0">
            <h1 className="font-sans font-bold text-[28px]/[40px] lg-md:text-[45px]/[42px] lg:text-[30px]/[38px] xl:text-[38px]/[40px] 3xl:text-[48px]/[52px] tracking-[0.5px] text-left text-white px-4 lg-md:px-0">
              <span className="block text-pcolor text-xl lg:text-xl xl:text-xl/[38px] capitalize">
                {course?.school?.schoolName
                  ? `${course?.school?.schoolName}:`
                  : ""}
              </span>
              {course?.courseName}
            </h1>
            <div className="flex flex-col gap-4">
              <p className="max-w-[380px] lg:max-w-[400px] xl:max-w-[450px] 3xl:max-w-[600px] px-4 lg-md:px-0 font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-base 3xl:text-lg text-left text-[#959B9D] tracking-[0.5px]">
                {course?.description}
              </p>
              <p className="max-w-[420px] px-4 lg-md:px-0 font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-sm 3xl:text-sm/[26.67px] text-left text-[#FFFCF7] tracking-[0.5px]">
                {`${course?.duration} ${course?.durationType}`} | Recorded
                Lectures by Edura | Mentorship from Edura Experts
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full max-w-[465px] flex flex-col lg:flex-row justify-start items-start gap-6 px-4 lg-md:px-0">
              <Link
                href="https://portal.Edura.com/student-auth/signin"
                className="w-full lg:w-1/2 lg-md:w-[170px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor hover:bg-pcolor/90 border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                Enroll now <ArrwoUpCicled />
              </Link>
              <button
                onClick={() => {
                  window.open("/Students Handbook.pdf", "_blank")
                }}
                className="w-full lg:w-1/2 lg-md:w-[182px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 border-2 border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                View handbook
              </button>
            </div>

            {deadline ? (
              <p className="max-w-[420px] px-4 lg-md:px-0 font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-base 3xl:text-sm/[26.67px] text-left text-[#FFFCF7] tracking-[0.5px] italic">
                Application Closes: {moment(deadline).format("ll")}
              </p>
            ) : null}
          </div>
        </div>

        <ProgramVideo video={course?.courseVideo} />
      </div>
    </section>
  )
}
