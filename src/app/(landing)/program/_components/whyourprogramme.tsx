"use client"
import {
  ClipBoardIcon,
  CommentIcon,
  PieIcon,
  SparkIcon,
} from "@/components/SVGs"
import { motion } from "framer-motion"

export default function WhyOurProgrammeSection() {
  return (
    <motion.section
      className="w-full relative grid gap-6 py-24 px-4 lg-md:px-12 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col px-2">
            <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left ">
              Why join the program
            </h2>
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
                    <h4 className="text-2xl/[39px] font-normal font-sans text-[#4D6C62] tracking-[0.5px]">
                      {v.name}
                    </h4>
                    <p className="text-base/[30.4px] font-normal font-sans text-[#4B4B4B] tracking-[0.5px]">
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
    name: "Integrated Curriculum:",
    description: `Seamlessly blend technical and business courses to provide a comprehensive understanding of computer engineering within a broader business context.`,
    icon: <CommentIcon />,
  },
  {
    name: "Handson Projects:",
    description: `Engage in practical, realworld projects that allow you to apply theoretical knowledge to solve complex problems and develop tangible skills.`,
    icon: <SparkIcon />,
  },
  {
    name: "Industry Relevant Skills:",
    description: `Acquire skills directly relevant to the demands of today's technology driven industries, including software development, IT and emerging technologies.`,
    icon: <ClipBoardIcon />,
  },
  {
    name: "Networking Opportunities:",
    description: `Seamlessly blend technical and business courses to provide a comprehensive understanding of computer engineering within a broader business context.`,
    icon: <PieIcon />,
  },
  {
    name: "Career Support services:",
    description: `Access career support services, including resume building, interview preparation, and job placement assistance, to help you launch or advance your career.`,
    icon: <PieIcon />,
  },
  {
    name: "Flexibility:",
    description: `Benefit from flexible learning options, including parttime and online courses, allowing you to balance your studies with work or other commitments.`,
    icon: <ClipBoardIcon />,
  },
]
