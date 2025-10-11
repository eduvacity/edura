"use client"
import { CheckCircled } from "@/components/SVGs"
import { motion } from "framer-motion"

export default function KeyFeatures({ features }: any) {
  return (
    <section
      className="w-full relative grid gap-6 py-24 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 px-4 xl:px-8 3xl:px-0">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col">
            <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left capitalize">
              Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 lg-md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {features?.map((v: any, i: number) => {
              return (
                <div
                  key={i}
                  className="w-full max-w-[502px] flex justify-start items-start gap-[12px] text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]"
                >
                  <span className="flex-shrink-0">
                    <CheckCircled />
                  </span>
                  {v}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
