"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const ApplyScholarshipForm = dynamic(() => import("../_components/form"), {
  ssr: false,
})
export default function ApplyForScholarship() {
  const search = useSearchParams()
  const name = search.get("name")
  return (
    <section
      className="w-full relative min-h-[80vh] 3xl:min-h-[75vh] place-content-center pt-[180px] lg-md:pt-[140px] xl:pt-[90px] 3xl:pt-[160px] pb-[80px] lg-md:pb-[120px] lg:pb-[100px] xl:pb-[80px] grid gap-6"
      data-aos="fade-down"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full max-w-[1280px] px-4 flex flex-col gap-4 justify-center items-center ">
            <div className="w-full flex gap-2 items-center justify-center">
              <span className="w-[60px] h-[60px] lg-md:w-[100px] lg-md:h-[90px] rounded-[20px] flex justify-center items-center bg-white border-1 border-[#000000]/10 border-solid flex-shrink-0">
                <Image
                  src="/images/assetium-logo.png"
                  width={80}
                  height={80}
                  quality={100}
                  alt="logo"
                  className="w-[38px] h-[38px] lg-md:w-[60px] lg-md:h-[60px]"
                />
              </span>{" "}
              <h2 className="text-2xl lg-md:text-[40px]/[48px] font-semibold font-sans text-pcolor -tracking-[0.02em] text-left flex gap-2">
                Assetium Impact Scholarship Program
              </h2>
            </div>
            <p className="w-full text-base lg-md:text-lg font-sans font-normal text-[#868B93] text-center -tracking-[0.02em]">
              Fill in your information are required to complete your scholarship
              application.
            </p>
          </div>
          <div className="w-full bg-white py-6  px-2 lg:px-6">
            <ApplyScholarshipForm course={name} />
          </div>
        </div>
      </div>
    </section>
  )
}
