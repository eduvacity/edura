"use client"
import { ABUZariaAffliate } from "@/components/SVGs"
import { motion } from "framer-motion"
import CoreValuesSection from "./_components/corevalues"
import Herosection from "./_components/herosection"
import JoinUsSection from "./_components/joinus"
import LeadershipSection from "./_components/leadership"
import MissionAndVisionSection from "./_components/mission"
import PartnersSection from "./_components/partners"
import QualityEducationSection from "./_components/qualityeducation"

export default function AboutUsPage() {
  return (
    <motion.div className="w-full flex flex-col">
      <Herosection />
      <div className="relative w-full flex justify-center items-center">
        <div className="bg-[#FFFCF7] h-[92px] absolute -bottom-[50px] lg-md:-bottom-10 xl:-bottom-12 3xl:-bottom-14 w-full max-w-[350px] lg-md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1200px] 3xl:max-w-[1500px] flex items-center border border-solid border-[#DDDDDD] rounded-[10px] px-3 lg-md:px-8 py-2 z-50">
          <div className="w-full max-w-[380px] lg:max-w-[518px] flex justify-start items-center gap-2 lg-md:gap-4">
            <ABUZariaAffliate className="w-[48px] h-[48px] lg:w-[58px] lg:h-[58px]" />
            <div className="flex flex-col">
              <h6 className="font-semibold font-avant-garde text-xs/[18px] italic tracking-[0.5px] text-left text-[#071C23]">
                Eduvacity is Affiliated with
              </h6>
              <h4 className="font-bold font-avant-garde text-base  lg-md:text-[21px]/[28px] tracking-[0.5px] text-left text-pcolor">
                Ahmadu Bello University, Zaria
              </h4>
            </div>
          </div>
        </div>
      </div>
      <QualityEducationSection />
      <CoreValuesSection />
      <MissionAndVisionSection />
      <LeadershipSection />
      <PartnersSection />
      <JoinUsSection />
    </motion.div>
  )
}
