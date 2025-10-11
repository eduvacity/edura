"use client"
import { WhiteCheckCircled } from "@/components/SVGs"
import { motion } from "framer-motion"

export default function ExperienceLeadersSection() {
  return (
    <motion.section
      className="w-full relative grid pb-12 gap-6 px-3 lg-md:px-6 xl:px-8"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 ">
        <div className="w-full max-w-[1550.67px] xl:py-12 flex flex-col justify-center items-center 3xl:gap-[64px]">
          <div className="w-full xl:py-12 flex flex-col gap-8 3xl:gap-[64px] px-4 xl:px-8 3xl:px-0">
            <div className="w-full flex flex-col xl:flex-row gap-6 xl:gap-12 justify-between">
              <div
                className="w-full h-[520px] 3xl:w-[668px] 3xl:h-[689.33px] xl:w-[600px] xl:h-[659.33px] bg-[url('/images/careerPerson.png')] object-fit bg-cover bg-center bg-no-repeat rounded-[16px]"
                data-aos="fade-up"
                data-aos-once={true}
              />
              <div
                className="max-w-[668px] 3xl:max-w-[668px] grid place-content-center gap-6"
                data-aos="fade-left"
                data-aos-once={true}
              >
                <h2 className="w-full text-base/[50px] lg-md:text-2xl/[40px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left capitalize">
                  We are looking for leaders with proven experience in their
                  field and with
                </h2>
                <div className="w-full grid grid-cols-1 gap-8">
                  {careers?.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className="w-full max-w-[502px] flex justify-start items-start gap-[12px] text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]"
                      >
                        <span className="flex-shrink-0">
                          <WhiteCheckCircled />
                        </span>
                        {v.title}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const careers = [
  {
    title: "A genuine enthusiasm for sharing knowledge and inspiring learners.",
  },
  {
    title:
      "The ability to clearly and effectively communicate complex concepts in a way that resonates with diverse learners.",
  },
  {
    title:
      "Familiarity with online learning platforms and comfortable creating engaging content.",
  },
]
