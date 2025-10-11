"use client"
import { ArrwoUpCicled, WhatsAppIcon } from "@/components/SVGs"
import { motion } from "framer-motion"
import Link from "next/link"
import ImageSlider from "./slides"

export default function Herosection() {
  return (
    <motion.section className="w-full relative min-h-[980px] sm:min-h-[869px] md:min-h-[940px] xl:min-h-[90vh] bg-pdarkcolor">
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
        className="absolute top-[60%] left-[42%] transform -translate-x-1/2 -translate-y-1/2 z-[1] opacity-50"
        style={{
          background: "url(/rocket.svg) no-repeat center",
          width: "180px",
          height: "180px",
        }}
      />
      <div className="w-full flex flex-col xl:flex-row gap-12 max-w-[1575px] mx-auto px-4 xl:pl-10 2xl:pl-12 xl:pr-8 pt-[80px] md:pt-[80px] lg-md:pt-[110px] xl:py-[70px] 3xl:pt-[160px] z-50">
        <div className="flex flex-col gap-12 xl:w-[470px] 2xl:w-[695px]">
          <div className="flex flex-col justify-start items-start gap-4 ">
            <h1 className="font-sans font-bold text-[38px]/[50px] md:text-[48px]/[62px] lg:text-[40px]/[50px] xl:text-[52px]/[68px] 3xl:text-[80px]/[90px] tracking-[0.5px] text-left text-pcolor px-4 md:px-0">
              Learn <span className="text-white">today,</span>
              <span className="block">
                Lead <span className="text-white">tomorrow.</span>
              </span>
            </h1>
            <p className="max-w-[480px] 3xl:max-w-[600px] px-4 md:px-0 font-normal font-sans text-sm/[24px] lg:md:text-[15px]/[24px] xl:text-base 3xl:text-[22px]/[30px] text-left text-white/70 tracking-[0.5px]">
              Gain access to top-tier higher education programs and in-demand
              skills that empower you to build the career you want
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-start items-start gap-[9.77px] xl:gap-6 z-[100]">
            <Link
              href="/programs"
              className="w-full lg:w-fit h-[58px] font-medium font-sans text-[10px]/[100%] xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer lg-md:px-4"
            >
              Explore all course <ArrwoUpCicled />
            </Link>
            <Link
              href="https://wa.me/07088315122?text=Hi%2C%0AI%20would%20like%20to%20know%20more%20 information%20about%20Edura."
              target="_blank"
              className="w-full lg:w-fit h-[58px] font-medium font-sans text-[10px]/[100%] xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 border-2 border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer lg-md:px-4"
            >
              Get one-in-one chat <WhatsAppIcon />
            </Link>
          </div>
        </div>
        <ImageSlider />
      </div>
    </motion.section>
  )
}
