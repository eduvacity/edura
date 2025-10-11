"use client"
import { EmailIcon, PhoneIcon, WhatsAppIcon } from "@/components/SVGs"
import Link from "next/link"

export default function ContactInformationSection() {
  return (
    <section
      className="w-full relative grid gap-6 pb-[120px] lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex justify-center items-center ">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div
            className={`w-full lg:h-[600px] lg:rounded-[20px] bg-[#071C23] 
          bg-[url('/pattern.svg')] bg-contain lg-md:px-[40px] px-[20px] py-[60px] lg:px-[50px] lg:py-[60px]`}
          >
            <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between">
              <div className="max-w-[500px] flex flex-col justify-center items-start gap-[25px] mt-5">
                <div className="w-full flex flex-col">
                  <p className="text-lg font-normal font-arial text-pcolor">
                    CONTACT
                  </p>
                  <span
                    className={
                      "text-[35px]/[40px] lg:text-[50px]/[60px] xl:text-[50px]/[59px] -tracking-[0.02em] text-[#fff] font-semibold font-avant-garde text-left"
                    }
                  >
                    Have any questions?
                  </span>
                </div>
                <p className="text-sm lg-md:text-lg/[32px] font-normal font-arial text-[#EEEEEE]">
                  Our team is here to support you with any questions about
                  courses, admissions, or guidance you may need—please
                  don&apos;t hesitate to reach out.
                </p>
                <div className="flex flex-row items-center gap-2">
                  <PhoneIcon />
                  <Link
                    href="tel:+2347088315122"
                    target="_blank"
                    className="text-lg font-normal font-arial text-[#fff]"
                  >
                    +234 7088315122
                  </Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <WhatsAppIcon />
                  <Link
                    href="https://wa.me/07088315122?text=Hi%2C%0AI%20would%20like%20to%20know%20more%20 information%20about%20eduvacity."
                    target="_blank"
                    className="text-lg font-normal font-arial text-[#fff]"
                  >
                    +234 7088315122
                  </Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <EmailIcon />
                  <Link
                    href="mailto:help@eduvacity.com"
                    className="text-lg font-normal font-arial text-[#fff]"
                  >
                    help@eduvacity.com
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-[600px] h-[390px] xl:w-[804.01px] xl:h-[490px] bg-[url('/landing/img_2.svg')] bg-cover bg-center bg-no-repeat border border-transparent border-solid rounded-[23.2px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
