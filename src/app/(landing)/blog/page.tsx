"use client"
import { motion } from "framer-motion"
import AllPostsSection from "./_components/allPosts"
import Herosection from "./_components/herosection"
import LatestPostsSection from "./_components/latestPost"

export default function AboutUsPage() {
  return (
    <motion.div className="w-full flex flex-col">
      <Herosection />
      <LatestPostsSection />
      <AllPostsSection />
    </motion.div>
  )
}
