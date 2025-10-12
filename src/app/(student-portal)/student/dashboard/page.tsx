"use client"

import { GreenArrowUp } from "@/components/SVGs/portal"
import WavingPalm from "@/components/SVGs/portal/wavingPalm"
import Image from "next/image"
import CircularProgress from "../../_components/CircularProgressbar"
import Badges from "./_components/badges"
import QuizPerfomanceChart from "./_components/quizChart"
import DashboardVideo from "./_components/video"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:p-6">
      {/* Greeting Section */}
      <div className="mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] lg:text-[32px] font-bold font-satoshi -tracking-[0.001em]">
          Hello! Blessing
        </h1>
      </div>

      {/* Layout Section */}
      <div className="min-h-screen flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <section className="flex-[1] xl:max-w-[920px] w-full flex flex-col gap-[17px]">
          <div className="relative w-full h-full min-h-[305px] xl:h-[305px] bg-white shadow-[0px_0px_27.9px_0px_#33404F05] overflow-hidden border border-solid border-[#DDDDDD] rounded-[17px]">
            <div className="absolute inset-0 bg-pdarkcolor lg-md:bg-transparent lg-md:bg-[linear-gradient(90.33deg,_#4D6C62_40.59%,_rgba(49,50,50,0.9)_53.37%,_rgba(149,152,152,0.05)_94.41%)] z-[2] p-6">
              <div className="w-full h-full flex flex-col justify-between">
                <h4 className="text-[#CACACA] font-jost font-normal text-base leading-[23.12px] tracking-[0.02em]">
                  Your Learning performance
                </h4>
                <div className="w-full flex gap-8">
                  <p className="text-[#FFFFFF] font-satoshi font-[900] text-[50px] flex flex-col">
                    2 Hrs{" "}
                    <span className="font-medium text-sm">
                      Average Daily Attendance
                    </span>
                  </p>
                  <p className="text-[#FFFFFF] font-satoshi font-[900] text-[50px] flex flex-col">
                    10 Hrs{" "}
                    <span className="font-medium text-sm">
                      Average weekly Attendance
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <GreenArrowUp />
                  <p className="text-[#00FF40] font-jost font-normal text-lg leading-[24.31px] -tracking-[0.001em]">
                    6% from last week
                  </p>
                </div>
              </div>
            </div>
            {/* Image that covers the container */}
            <div className="hidden lg-md:block absolute top-0 right-0 w-[552px] h-[305px] z-0">
              <Image
                src="/images/dashboard-image.png"
                alt="Hero Image"
                width={552}
                height={305}
                className="w-full h-full object-cover transform scale-x-[-1]"
              />
            </div>
          </div>

          {/*Learning Continuation */}
          <div className="bg-white w-full rounded-[17px] border-2 border-solid border-[#DDDDDD] py-[18px] px-[9px] gap-[10px]">
            <div className="w-full flex flex-col gap-[22px]">
              <h4 className="text-[#263238] text-base leading-[21.6px] text-left font-bold font-satoshi">
                Learning Continuation
              </h4>
              <DashboardVideo video="/videos/vid-3.mp4" />
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold font-satoshi text-black text-[22px] leading-[20.57px] -tracking-[0.001em]">
                    Chemistry
                  </h4>
                  <span className="font-normal font-satoshi text-black text-[20px] leading-[16.83px] -tracking-[0.001em]">
                    Introduction to chemistry
                  </span>
                </div>
                <CircularProgress percentage={65} />
              </div>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex-[541/1461] xl:max-w-[541px] w-full">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Course Performance (Quiz) */}
            <div className="bg-white w-full h-[305px] rounded-[17px] border border-solid border-[#E5E5E5]">
              <h4 className="text-[#263238] text-base leading-[21.6px] text-left font-bold font-satoshi p-4 border-b-[3px] border-[#F0F0F0]">
                Course Performance (Quiz)
              </h4>

              <QuizPerfomanceChart />
            </div>
            {/* Course Performance (Quiz) */}
            <div className="bg-white w-full h-[305px] rounded-[17px] p-4 border-b-[3px] border-[#DDDDDD] flex flex-col gap-[22px]">
              <h4 className="text-[#263238] text-base leading-[22px] text-left font-bold font-satoshi">
                Top quiz scorer of the week
              </h4>

              <Badges />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
