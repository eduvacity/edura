"use client"
import { ArrwoUpCicled, CheckCircled } from "@/components/SVGs"
import { motion } from "framer-motion"
import Link from "next/link"

export default function RequirementSection({
  requirements,
  description,
  type,
}: any) {
  return (
    <motion.section
      className="w-full relative grid gap-6 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 px-4 xl:px-8 3xl:px-0">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px] justify-center items-center">
          <div className="w-full max-w-[1280px] xl:py-12 flex flex-col gap-8 3xl:gap-[64px] px-4 xl:px-8 3xl:px-0">
            <div className="w-full flex flex-col">
              <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left capitalize">
                Requirements
              </h2>
              {type?.toLowerCase() === "certificate" ? (
                <p className="text-lg font-sans font-normal text-[#868B93]">
                  {description ? description : null}
                </p>
              ) : (
                <p className="text-lg font-sans font-normal text-[#868B93]">
                  No requirement
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-[20px]">
              {type?.toLowerCase() === "certificate" ? (
                <div className="w-full max-w-[502px] flex justify-start items-start gap-[12px] text-base/[30.4px] font-normal font-sans text-[#4B4B4B] tracking-[0.5px]">
                  <span className="flex-shrink-0">
                    <CheckCircled />
                  </span>
                  No requirement
                </div>
              ) : (
                requirements?.map((v: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="w-full max-w-[502px] flex justify-start items-start gap-[12px] text-base/[30.4px] font-normal font-sans text-[#4B4B4B] tracking-[0.5px]"
                    >
                      <span className="flex-shrink-0">
                        <CheckCircled />
                      </span>
                      {v}
                    </div>
                  )
                })
              )}
              <Link
                href="https://portal.Edura.com/student-auth/signin"
                className="w-full mt-4 lg:w-1/2 lg-md:w-[170px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor hover:bg-pcolor/90 border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                Enroll now <ArrwoUpCicled />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
