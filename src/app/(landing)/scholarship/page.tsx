"use client"
import { motion } from "framer-motion"
import CourseOverviewSection from "./_components/courses"
import Herosection from "./_components/heroSection"
import RequirementSection from "./_components/requirement"

export default function HomePage() {
  return (
    <motion.div className="w-full flex flex-col">
      <Herosection />
      <CourseOverviewSection />
      <RequirementSection />
    </motion.div>
  )
}
