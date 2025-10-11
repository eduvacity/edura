"use client"
import { ArrowUp, ClockIconAlt, Locationicon } from "@/components/SVGs"
import { motion } from "framer-motion"

export default function PositionsSection() {
  return (
    <motion.section
      className="w-full relative grid gap-6 py-24 px-4 d:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 ">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col">
            <p className="font-normal font-avant-garde text-2xl text-left text-pcolor uppercase tracking-[0.5px]">
              Open positions
            </p>
            <div className="flex flex-col">
              <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left">
                We&apos;e looking for talented individuals
              </h2>
              <p className="font-normal font-avant-garde text-sm lg-md:text-xl text-left text-[#788B8F] tracking-[0.5px]">
                We operate in a hybrid setting spread all across the world. Join
                us!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg-md:grid-cols-2 gap-[20px]">
            {positions?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="w-full h-[147px] rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col gap-4 justify-between"
                >
                  <div className="w-full flex justify-between gap-1">
                    <p className="font-normal font-avant-garde text-sm text-pcolor tracking-[0.5px]">
                      {" "}
                      {v.category}
                    </p>
                    <button className="flex gap-[10px] font-bold text-sm font-avant-garde text-pcolor cursor-pointer">
                      Apply <ArrowUp />
                    </button>
                  </div>
                  <h4 className="text-xl/[29px] font-bold font-avant-garde text-[#071C23] tracking-[0.5px]">
                    {v.role}
                  </h4>
                  <div className="w-full flex gap-[10px]">
                    <p className="text-base font-medium font-avant-garde text-[#4B4B4B] tracking-[0.5px] flex  gap-2 items-center">
                      <Locationicon /> {v.type}
                    </p>
                    <p className="text-base font-medium font-avant-garde text-[#4B4B4B] tracking-[0.5px] flex  gap-2 items-center">
                      <ClockIconAlt /> {v.nature}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const positions = [
  {
    category: "Design",
    role: `Product Designer Tutor`,
    type: "Remote",
    nature: "Full-time",
  },
  {
    category: "Design",
    role: `Product Designer Tutor`,
    type: "Remote",
    nature: "Full-time",
  },
  {
    category: "Design",
    role: `Product Designer Tutor`,
    type: "Remote",
    nature: "Full-time",
  },
  {
    category: "Design",
    role: `Product Designer Tutor`,
    type: "Remote",
    nature: "Full-time",
  },
  {
    category: "Design",
    role: `Product Designer Tutor`,
    type: "Remote",
    nature: "Full-time",
  },
  {
    category: "Design",
    role: `Product Designer Tutor`,
    type: "Remote",
    nature: "Full-time",
  },
]
