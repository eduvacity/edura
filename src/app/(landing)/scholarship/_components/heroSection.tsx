"use client"
import { ArrwoUpCicled } from "@/components/SVGs"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ProgramVideo from "./video"

export default function Herosection() {
  return (
    <section className="w-full relative min-h-[80vh] 3xl:min-h-[75vh] place-content-center pt-[180px] lg-md:pt-[140px] xl:pt-[90px] 3xl:pt-[160px] pb-[80px] lg-md:pb-[120px] lg:pb-[100px] xl:pb-[80px] grid gap-6 bg-pdarkcolor">
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
      <div className="w-full flex flex-col lg:flex-row xl:justify-center xl:items-center gap-14 px-4 lg-md:pl-8 xl:pl-20 xl:pr-14 z-10">
        <div className="w-full max-w-[365px] 3xl:h-[618.86px] lg-md:max-w-[695px] lg:max-w-[895px] xl:max-w-[695px] 3xl:max-w-[1280px] grid grid-cols-1 gap-8 lg-md:gap-[47px] xl:gap-[20px] 3xl:gap-12 xl:place-content-center">
          <div className="w-[116.px] h-[64px] flex relative px-4 lg:px-0 items-center">
            <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center bg-[#41A36E] border-2 border-[#67B58B] border-solid shadow-[0px_3.98px_3.98px_0px_#00000008]">
              <Image
                src="/images/Edura-cap.png"
                width={48}
                height={48}
                quality={100}
                alt="logo"
              />
            </div>
            <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center bg-white border-2 border-[#67B58B] border-solid shadow-[0px_3.98px_3.98px_0px_#00000008] absolute left-[70px]">
              <Image
                src="/images/assetium-logo.png"
                width={50}
                height={50}
                quality={100}
                alt="logo"
              />
            </div>
          </div>

          <div className="flex flex-col xl:w-[652px] justify-start items-start gap-4 px-1.5 lg-md:px-0">
            <h1 className="font-sans font-bold text-[28px]/[40px] lg-md:text-[45px]/[42px] lg:text-[30px]/[38px] xl:text-[38px]/[40px] 3xl:text-[48px]/[52px] tracking-[0.5px] text-left text-white px-4 lg-md:px-0">
              Assetium Impact Scholarship Program
            </h1>
            <div className="flex flex-col gap-4">
              <p className="max-w-[380px] lg:max-w-[400px] xl:max-w-[450px] 3xl:max-w-[600px] px-4 lg-md:px-0 font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-base 3xl:text-lg text-left text-[#959B9D] tracking-[0.5px]">
                Empowering Nigerian youth to reach the top 1% by delivering
                transformative programs that ensure employability and provide
                essential skills for real-world impact. These initiatives are
                designed to help young people unlock their potential, position
                themselves as leaders in their fields, and contribute
                meaningfully to Nigeria&apos;s future.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full max-w-[465px] flex flex-col lg:flex-row justify-start items-start gap-6 px-4 lg-md:px-0">
              <Link
                href="#scholarship-courses"
                className="w-full lg:w-1/2 lg-md:w-[170px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                Apply now <ArrwoUpCicled />
              </Link>
              <Link
                href="https://wa.me/08101831001?text=Hi%2C%0AI%20would%20like%20to%20know%20more%20 information%20about%20Edura's%20scholarship%20programs."
                target="_blank"
                className="w-full lg:w-1/2 lg-md:w-[152px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 border-2 border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <ProgramVideo />
      </div>
    </section>
  )
}
