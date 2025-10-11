"use client"
import { ABUZariaAffliate } from "@/components/SVGs"
import { motion } from "framer-motion"
import ContactInformationSection from "./_components/contactSection"
import EmpoweringSection from "./_components/empoweringYouthSection"
import FaqsSection from "./_components/faqsSections"
import Herosection from "./_components/herosection"
import LiveLessonsSection from "./_components/liveLesson"
import ProgrammesCardsSection from "./_components/programmesCards"
import ProgramSection from "./_components/programsSections"
import WhyEduvacitySection from "./_components/whyUsSection"

export default function HomePage() {
  return (
    <motion.div className="w-full flex flex-col">
      <Herosection />
      <div className="relative w-full flex justify-center items-center">
        <div className="bg-[#FFFCF7] h-[100px] absolute -bottom-13 md:-bottom-12 xl:-bottom-12 2xl:-bottom-14 w-[95vw] lg-md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1040px] 2xl:max-w-[1550px] flex items-center border border-solid border-[#DDDDDD] rounded-[10px] px-3 md:px-8 py-2">
          <div className="w-full max-w-[380px] sm:max-w-[518px] flex justify-start items-center gap-2 md:gap-4">
            <ABUZariaAffliate className="w-[48px] h-[48px] sm:w-[58px] sm:h-[58px]" />
            <div className="flex flex-col">
              <h6 className="font-semibold font-avant-garde text-xs/[18px] italic tracking-[0.5px] text-left text-[#071C23]">
                Eduvacity is Affiliated with
              </h6>
              <h4 className="font-bold font-avant-garde text-sm  md:text-[21px]/[28px] tracking-[0.5px] text-left text-pcolor">
                Ahmadu Bello University, Zaria
              </h4>
            </div>
          </div>
        </div>
      </div>
      <ProgramSection />
      <WhyEduvacitySection />
      <EmpoweringSection />
      <LiveLessonsSection />
      <ProgrammesCardsSection />
      <FaqsSection />
      <ContactInformationSection />
    </motion.div>
  )
}
