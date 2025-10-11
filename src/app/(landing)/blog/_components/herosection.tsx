"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function Herosection() {
  const [email, setEmail] = useState("")
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
        <div className="w-full max-w-[620px] grid grid-cols-1 gap-12 xl:place-content-center">
          <div className="w-full ">
            <h1 className="font-semibold font-avant-garde text-sm text-pcolor">
              Blog
            </h1>
            <p className="font-avant-garde font-bold text-[28px]/[38px] lg-md:text-[45px]/[42px] lg:text-[30px]/[38px] xl:text-[38px]/[40px] 3xl:text-[48px]/[58px] tracking-[0.5px] text-left text-white">
              Resource library
            </p>
          </div>
          <div className="w-full max-w-[640px] flex flex-col gap-4">
            <form className="flex gap-4 items-center">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-[456px] h-[64px] p-[18.67px] rounded-[21.33px] border-[1.33px] border-solid border-[#1B3139] bg-[#1018280D] focus:outline-none hover:border-pcolor focus:border-pcolor font-normal font-avant-garde text-sm text-left text-white placeholder:text-[#858C8E]"
              />
              <button className="w-[120px] h-[54px] font-medium font-avant-garde text-base xl:text-base text-white flex justify-center items-center gap-2 bg-pcolor border-2 border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer">
                Get started
              </button>
            </form>
            <span className="font-normal font-arial text-sm text-left text-[#959B9D] px-1">
              We care about your data in our{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-[2.8px] cursor-pointer hover:text-pcolor"
              >
                privacy policy.
              </Link>
            </span>
          </div>
        </div>

        <p className="max-w-[640px] font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-xl 3xl:text-lg text-left text-[#959B9D] tracking-[0.5px] xl:px-6">
          Subscribe to learn about new product features, the latest in
          technology, solutions, and updates.
        </p>
      </div>
    </motion.section>
  )
}
