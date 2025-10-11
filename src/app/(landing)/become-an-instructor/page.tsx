"use client"
import { motion } from "framer-motion"
import OurEthicsSection from "./_components/ethics"
import Herosection from "./_components/heroSection"
import WhyJoinUsSection from "./_components/joinUs"
import PositionsSection from "./_components/positions"
import TeamSection from "./_components/team"
import ExperienceLeadersSection from "./_components/value"

export default function BecomeAnInstructionPage() {
  return (
    <motion.div className="w-full flex flex-col">
      <Herosection />
      <TeamSection />
      <WhyJoinUsSection />
      <ExperienceLeadersSection />
      <OurEthicsSection />
      <PositionsSection />
    </motion.div>
  )
}
