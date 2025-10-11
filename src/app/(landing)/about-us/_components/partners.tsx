"use client"
import Image from "next/image"

export default function PartnersSection() {
  return (
    <section
      className="w-full relative grid gap-6 py-[100px] lg-md:py-[120px] xl:py-[90px] 3xl:py-[140px] px-4 lg-md:px-6 xl:px-[95px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex justify-center items-center ">
        <div className="w-full max-w-[1000px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col lg:flex-row gap-24 justify-center items-center bg-white rounded-[33px] border border-solid border-[#DDDDDD] px-2">
            <div className="w-full max-w-[1500px] flex-col gap-8 py-12 flex justify-center items-center">
              <p className="font-normal font-arial text-sm lg-md:text-lg text-[#788B8F] text-center max-w-[750px] -tracking-[0.01em]">
                Proudly collaborating with academic institutions and innovative
                organisations to foster excellence and drive positive impact.
              </p>
              <div className="w-full max-w-[1216px] flex flex-col lg-md:flex-row gap-4 lg-md:justify-center lg-md:items-center">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/images/assetium-logo.png"
                    alt="assetium new logo"
                    width={60}
                    height={60}
                    quality={100}
                    className="h-8"
                  />{" "}
                  <span className="font-avant-garde -tracking-[0.02em] font-bold text-[#000000] text-xs lg:text-sm lg-md:text-xl">
                    Assetium Capital Management Limited
                  </span>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/images/abu-zaria-logo.png"
                    alt="assetium new logo"
                    width={70}
                    height={100}
                    quality={100}
                    className="h-8"
                  />{" "}
                  <span className="font-avant-garde -tracking-[0.02em] font-bold text-[#000000] text-xs lg:text-sm lg-md:text-xl">
                    Ahmadu Bello University
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
