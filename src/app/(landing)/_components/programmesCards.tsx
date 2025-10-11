"use client"
import { Badge } from "@/components/ui/badge"
import EastIcon from "@mui/icons-material/East"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function ProgrammesCardsSection() {
  return (
    <motion.section
      className="w-full relative grid gap-6 py-24 px-3 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col gap-4">
              <Badge className="w-[140px] px-[15px] py-[7px] text-[#4D6C62] text-xs/[24px] lg-md:text-sm/[24px] font-medium font-sans bg-[#D9F1FF] hover:bg-[#D9F1FF] rounded-[20px] border border-[#DBDBDB] flex justify-center items-center capitalize">
                Programmes
              </Badge>
              <h4 className="max-w-[722px] text-base/[50px] lg-md:text-2xl/[45px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left capitalize">
                Comprehensive Programmes for Professional Mastery
              </h4>
            </div>
          </div>
          <div className="grid grid-cols-1 lg-md:grid-cols-4 lg:grid-cols-2 gap-[20px] min-h-[300px]">
            {programList?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="h-[422px] rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col justify-between"
                >
                  <Image src={v?.icon} width={40} height={40} alt="icon" />
                  <div className="w-full flex flex-col gap-[10px]">
                    <h4 className="text-xl/[39px] font-semibold font-sans text-[#4D6C62] tracking-[0.5px]">
                      {v.name}
                    </h4>
                    <p className="text-base/[30.4px] font-normal font-sans text-[#4B4B4B] tracking-[0.5px]">
                      {v.description}
                    </p>
                    {!v.soon && (
                      <Link
                        href="/student/signup/details"
                        className="flex gap-1 text-sm font-semibold font-sans  text-pcolor hover:scale-[0.99]"
                      >
                        Get Started
                        <EastIcon sx={{ fontSize: "18px" }} />
                      </Link>
                    )}
                    {v.soon && (
                      <Badge className="w-[110px] text-[#E3A229] bg-[#fff5e3] font-semibold font-sans py-[5px] mt-[20px] hover:bg-[#fff5e3] rounded-[20px] shadow-[0px] flex justify-center items-center">
                        Coming Soon
                      </Badge>
                    )}
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
const programList = [
  {
    name: "Bootcamps",
    description: `Rapidly enhance skills in software development, UX/UI design, project management, and lots more. Our bootcamps provide a direct path to career success.`,
    icon: "/landing/boot.svg",
    soon: false,
  },
  {
    name: "Diploma",
    description: `Explore focused diploma programs in data analytics, digital marketing, and cybersecurity. Swift and comprehensive, these diplomas are tailored for expertise seekers.`,
    icon: "/landing/diploma.svg",
    soon: false,
  },
  {
    name: "Degrees",
    description: `Choose from accredited degree programs in computer science, business administration, and more. Align your education with aspirations for a thriving career.`,
    icon: "/landing/degree.svg",
    soon: true,
  },
  {
    name: "Masters",
    description: `Tailored for professionals, our masters programs offer advanced skills in disciplines like artificial intelligence, business analytics, and more for career enhancement.`,
    icon: "/landing/masters.svg",
    soon: true,
  },
  {
    name: "Doctorate",
    description: `Our executive Ph.D. program offers in-depth modern management theory knowledge, culminating in a focused dissertation or research for mastery in one's domain.`,
    icon: "/landing/doctorate.svg",
    soon: true,
  },
]
