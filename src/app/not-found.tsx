"use client"
import { ArrwoUpCicled } from "@/components/SVGs"
import AppLogo from "@/components/SVGs/logo"
// import NotFound from "@/components/lottie/notfound"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"

const NotFound = dynamic(() => import("@/components/lottie/notfound"), {
  ssr: false,
})
export default function PageNotFound() {
  return (
    <div className="w-full flex flex-col min-h-screen gap-16 3xl:gap-24 bg-[#4D6C62]">
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
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "url(/rocket.svg) no-repeat center",
          width: "150px",
          height: "150px",
        }}
      />
      <div className="w-full flex flex-col justify-center items-center py-8 gap-16 place-content-center mt-[120px] lg-md:mt-24 xl:mt-[140px] z-10">
        <Link href="/">
          <AppLogo />
        </Link>
        <div className="w-full flex justify-center items-center flex-col gap-4">
          <NotFound />

          <p className="font-medium font-sans text-[28px]/[36px] tracking-normal text-primary capitalize z-[100]">
            Sorry page not found
          </p>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <Link
            href="/"
            className="w-full lg:w-1/2 lg-md:w-[200px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-primary border border-solid border-primary rounded-xl hover:scale-[0.99] cursor-pointer"
          >
            Go home <ArrwoUpCicled />
          </Link>
        </div>
      </div>
    </div>
  )
}
