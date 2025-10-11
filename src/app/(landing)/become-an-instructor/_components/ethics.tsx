"use client"
import {
  ClipBoardIcon,
  CommentIcon,
  PieIcon,
  SparkIcon,
} from "@/components/SVGs"
import { motion } from "framer-motion"

export default function OurEthicsSection() {
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
              Our ethics
            </p>
            <div className="flex flex-col">
              <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left">
                Ready to make an impact?
              </h2>
              <p className="font-normal font-avant-garde text-sm lg-md:text-xl text-left text-[#788B8F] tracking-[0.5px]">
                Our ethics keep us connected and guide us as one team.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg-md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {whyList?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="w-full max-w-[502px] h-[350px] rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col justify-between"
                >
                  {v.icon}
                  <div className="w-full flex flex-col gap-[10px]">
                    <h4 className="text-2xl/[39px] font-normal font-avant-garde text-[#071C23] tracking-[0.5px]">
                      {v.name}
                    </h4>
                    <p className="text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]">
                      {v.description}
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

const whyList = [
  {
    name: "Care about our team",
    description: `Understand what matters to our employees. Give them what they need to do their best work.`,
    icon: <CommentIcon />,
  },
  {
    name: "Be excellent to each other",
    description: `No games, No shade. We rely on our peers to improve. Be open, honest and kind.`,
    icon: <SparkIcon />,
  },
  {
    name: "Pride in what we do",
    description: `Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.`,
    icon: <ClipBoardIcon />,
  },
  {
    name: "Pride in what we do",
    description: `Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.`,
    icon: <PieIcon />,
  },
  {
    name: "Pride in what we do",
    description: `Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.`,
    icon: <PieIcon />,
  },
  {
    name: "Pride in what we do",
    description: `Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.`,
    icon: <ClipBoardIcon />,
  },
]
