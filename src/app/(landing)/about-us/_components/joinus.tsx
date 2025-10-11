"use client"
import { ArrwoUpCicled } from "@/components/SVGs"
import Link from "next/link"

export default function JoinUsSection() {
  return (
    <section
      className="w-full pb-[120px] relative grid gap-6 xl:pb-[120px] px-3 lg-md:px-4 lg:px-6 xl:px-[86px] 3xl:px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex justify-center items-center ">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div
            className={`w-full max-w-[1464px] min-h-[450px] lg:rounded-[20px] bg-[#4D6C62] 
          bg-[url('/pattern.svg')] bg-contain lg-md:px-[40px] px-[20px] py-[60px] lg:px-[50px] lg:py-[60px]`}
          >
            <div className="w-full flex flex-col justify-center items-center lg:flex-row gap-6 lg:gap-0">
              <div className="max-w-[705px] flex flex-col justify-center items-start gap-[25px] mt-5">
                <div className="w-full flex flex-row justify-center items-center gap-2">
                  <p
                    className={
                      "max-w-[510px] text-[28px]/[35px] lg:text-[50px]/[60px] xl:text-[45px]/[68px] -tracking-[0.02em] text-[#fff] font-semibold font-arial text-center"
                    }
                  >
                    Come work with highly motivated team
                  </p>
                </div>

                <p className="w-full text-sm lg-md:text-lg/[32px] font-normal font-arial text-[#EEEEEE] text-center">
                  Do you think you have what it takes to join the revolution of
                  shaping young minds? We would love the opportunity to meet
                  you.
                </p>

                <div className="w-full flex flex-row justify-center items-center">
                  <Link
                    href="https://portal.Edura.com/student-auth/signin"
                    className="w-full lg:w-1/2 lg-md:w-[200px] h-[58px] font-medium font-sans text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor hover:bg-pcolor/90 border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer"
                  >
                    Join the team <ArrwoUpCicled />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
