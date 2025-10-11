"use client"
import {
  AcademyCap,
  AnchorIcon,
  BadgeIcon,
  ComputerIcon,
  PeopleIcon,
  StackedCard,
} from "@/components/SVGs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function WhyEduraSection() {
  return (
    <motion.section
      className="w-full relative pb-14"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full max-w-[1586px] mx-auto flex flex-col gap-[43px]  px-2.5 xl:px-9 2xl:px-12 3xl:px-8">
        <div className="w-full flex flex-col px-2">
          <Badge className="w-[120px] lg-md:w-[140px] px-[15px] py-[7px] text-[#4D6C62] text-xs/[24px] lg-md:text-sm/[24px] font-medium font-sans bg-[#FFF2DA] hover:bg-[#FFF2DA] rounded-[20px] border border-[#DBDBDB] flex justify-center items-center">
            Why Edura
          </Badge>
          <div className="px-2 lg:px-0">
            <h4 className="mt-4 lg-md:mt-0 w-full text-xl/[30px] lg-md:text-2xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left">
              We are Educating Africa&apos;s Next Billion Workforce.
            </h4>
            <p className="text-base text-left font-medium font-sans text-[#3D3D3D] max-w-[640px] tracking-[0.5px]">
              Delivering World-Class Education to Africa, empowering local
              talent to thrive globally.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg-md:grid-cols-2 xl:grid-cols-3 gap-[23px] xl:gap-[20px]">
          {whyList?.map((v, i) => {
            return (
              <div
                key={i}
                className="h-[248px] lg-md:h-[446px] rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col justify-between"
              >
                {v.icon}
                <div className="w-full flex flex-col gap-[10px]">
                  <h4 className="text-xl/[32px] font-semibold font-sans text-[#4D6C62] tracking-[0.5px]">
                    {v?.name}
                  </h4>
                  <p className="text-base/[28px] font-normal font-sans text-[#4B4B4B] tracking-[0.5px]">
                    {v.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

const whyList = [
  {
    name: "University-Based Learning",
    description: `Gain access to accredited programs developed in partnership with leading universities, ensuring academic excellence and global relevance.`,
    icon: <BadgeIcon />,
  },
  {
    name: "Industry-Relevant Curriculum",
    description: `Our courses are designed with input from top professionals and employers to equip you with skills that are in high demand across today's job market.`,
    icon: <StackedCard />,
  },
  {
    name: "Flexible Learning Options",
    description: `Learn at your own pace, from anywhere. Whether you’re working, parenting, or just busy, our flexible structure fits into your life, not the other way around.`,
    icon: <AcademyCap />,
  },
  {
    name: "Mentorship Opportunities",
    description: `Get guided by experienced mentors who provide personalized support, industry insights, and help you stay on track toward your goals.`,
    icon: <PeopleIcon />,
  },
  {
    name: "Professional Placement Support",
    description: `We go beyond learning by helping you apply your skills through internships, job placement assistance, and connections to top companies.`,
    icon: <ComputerIcon />,
  },
  {
    name: "Lifelong Learning Journey",
    description: `Our platform empowers you to keep growing personally and professionally by offering continuous access to relevant programs as your goals evolve.`,
    icon: <AnchorIcon />,
  },
]
