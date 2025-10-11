"use client"
import { ArrwoUpCicled } from "@/components/SVGs"
import Link from "next/link"

export default function CertificateSection({ course }: any) {
  return (
    <section
      className="w-full relative grid gap-6 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6 bg-[#ECEDF1]"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 ">
        <div className="w-full h-full max-w-[1500px] py-8 lg-md:py-12 flex flex-col justify-center items-center 3xl:gap-[64px]">
          <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-[143px] justify-center items-center px-4 xl:px-8 3xl:px-0">
            <div className="w-full lg:w-1/2 3xl:py-24 flex flex-col gap-[48px]">
              <div className="w-full flex flex-col gap-3">
                <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left capitalize">
                  Earn a certificate in {course?.courseName}
                </h2>
                <p className="text-lg font-avant-garde font-normal text-[#868B93]">
                  {course?.description}
                </p>
              </div>
              <Link
                href="https://portal.eduvacity.com/student-auth/signin"
                className="w-full lg:w-1/2 lg-md:w-[170px] h-[58px] font-medium font-avant-garde text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor hover:bg-pcolor/90 border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
              >
                Enroll now <ArrwoUpCicled />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 h-[392px] lg-md:h-[692px] xl:h-[592px] bg-[url('/images/certificate.svg')] bg-contain lg-md:bg-cover bg-center bg-no-repeat"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
