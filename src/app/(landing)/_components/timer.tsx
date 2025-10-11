"use client"
import { AppBar } from "@mui/material"
import Link from "next/link"

const TimerComponent = ({ timeLeft }: any) => {
  const formatTime = (time: any) => {
    return String(time).padStart(2, "0")
  }
  return (
    <AppBar
      position="fixed"
      className="top-0 w-full h-[110px] lg-md:h-[65px] flex justify-center items-center bg-[#FFF2DA] shadow-none overflow-scroll px-4 lg:px-0"
      data-aos="zoom-in"
      data-aos-once={true}
    >
      <div className="w-full flex flex-col lg:flex-row justify-start lg-md:justify-center items-center gap-1 lg-md:gap-6">
        <p className="text-xs lg:text-base xl:text-lg text-[#000000] font-semibold font-avant-garde tracking-[0.5px] text-left pl-10 lg:pl-6 xl:pl-0">
          Admissions for the September 2024 academic session ends in
        </p>
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="w-[47px] h-[45px] rounded-[3px] flex flex-col items-center justify-center border border-[#ACACAC] bg-white">
            <h4 className="text-lg/[20px] text-[#071C23] font-semibold font-avant-garde tracking-[0.5px]">
              {formatTime(timeLeft?.days)}
            </h4>
            <span className="font-medium font-avant-gardeMd text-xs text-[#071C23] uppercase tracking-[0.5px]">
              Days
            </span>
          </div>
          <div className="w-[47px] h-[45px] rounded-[3px] flex flex-col items-center justify-center border border-[#ACACAC] bg-white">
            <h4 className="text-lg/[20px] text-[#071C23] font-semibold font-avant-garde tracking-[0.5px]">
              {formatTime(timeLeft?.hours)}
            </h4>
            <span className="font-medium font-avant-gardeMd text-xs text-[#071C23] uppercase tracking-[0.5px]">
              hrs
            </span>
          </div>
          <div className="w-[47px] h-[45px] rounded-[3px] flex flex-col items-center justify-center border border-[#ACACAC] bg-white">
            <h4 className="text-lg/[20px] text-[#071C23] font-semibold font-avant-garde tracking-[0.5px]">
              {formatTime(timeLeft?.minutes)}
            </h4>
            <span className="font-medium font-avant-gardeMd text-xs text-[#071C23] uppercase tracking-[0.5px]">
              mins
            </span>
          </div>
          <div className="w-[47px] h-[45px] rounded-[3px] flex flex-col items-center justify-center border border-[#ACACAC] bg-white">
            <h4 className="text-lg/[20px] text-[#071C23] font-semibold font-avant-garde tracking-[0.5px]">
              {formatTime(timeLeft?.seconds)}
            </h4>
            <span className="font-medium font-avant-gardeMd text-xs text-[#071C23] uppercase tracking-[0.5px]">
              Secs
            </span>
          </div>
          <Link
            href="https://portal.eduvacity.com/student-auth/signin"
            className="w-[80px] lg:w-[160px] mt-4 lg:mt-0 text-xs lg:text-base/[41px] h-[45px] font-avant-garde font-semibold underline underline-offset-4 text-[#011B23] tracking-[0.5px] hover:scale-[0.99]"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </AppBar>
  )
}

export default TimerComponent
