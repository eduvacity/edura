"use client"
import { motion } from "framer-motion"

export default function Herosection() {
  return (
    <motion.section className="w-full relative min-h-[50vh] place-content-center grid gap-6 bg-pdarkcolor pt-[185px] pb-[60px] lg:py-40">
      <motion.div
        className="absolute bg-cover bg-center bg-repeat top-0 left-0 w-full h-full sclae-[0.5px]"
        style={{
          background: "url(/images/grid.svg)",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.div
        className="absolute top-[60%] left-[45%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "url(/rocket.svg) no-repeat center",
          width: "180px",
          height: "180px",
        }}
      />
      <div className="w-full relative flex flex-col lg:flex-row xl:justify-center xl:items-center gap-2 lg:gap-14 px-6 lg-md:pl-8 xl:pl-12 xl:pr-8">
        <div className="w-full grid grid-cols-1 gap-8 lg-md:gap-[47px] 3xl:gap-12 xl:place-content-center">
          <h1 className="font-avant-garde font-bold text-[28px]/[38px] lg-md:text-[45px]/[42px] lg:text-[30px]/[38px] xl:text-[38px]/[40px] 3xl:text-[48px]/[58px] tracking-[0.5px] text-left text-white">
            Become an Instructor on Eduvacity
          </h1>
        </div>
      </div>
    </motion.section>
  )
}
