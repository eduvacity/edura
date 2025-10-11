"use client"

import ReactPlayer from "react-player"

export default function EmpoweringSection() {
  return (
    <section
      className="w-full relative"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full max-w-[1586px] mx-auto flex flex-col gap-[43px]  px-2.5 xl:px-9 2xl:px-12 3xl:px-8 relative lg:h-[600px]">
        <div
          className={`
          bg-[url('/images/grid.png')] inset-0 bg-no-repeat bg-contain opacity-50 z-[1]`}
        ></div>
        <div
          className={`w-full h-full px-4 xl:px-14 lg:rounded-[20px] bg-[#4D6C62] bg-[url('/images/grid.png')] bg-no-repeat bg-cover py-[40px] lg-md:py-[60px] z-10 grid grid-cols-1 xl:grid-cols-2`}
        >
          <div className="flex flex-col items-start justify-center gap-[25px] lg-md:w-[586px]">
            <p
              className={
                "text-[28px]/[30px] lg:text-[50px]/[65px] lg-md:text-[50px]/[60px] xl:text-[40px]/[50px] -tracking-[0.02em] text-pcolor font-semibold font-sans text-left"
              }
            >
              <span className="text-[#fff]">We are</span> empowering <br />
              Africa Youths
            </p>

            <p className="w-full text-sm lg:text-[18px]/[32px] lg-md:text-[18px]/[32px]  font-normal font-arial text-[#EEEEEE]">
              Bringing World-Class Education to Africa. Access Elite Resources
              Locally, Empowering Local Talent for Global Success.
            </p>
          </div>

          <div className="relative w-full h-[320px] aspect-[2/1] lg:w-[600px] lg-md:w-[680px] lg-md:h-[400px] md:w-[404px] lg:h-[400px] xl:w-[720px] xl:h-[400px] overflow-hidden rounded-[18px] lg-md:rounded-[20px] xl:rounded-[28.02px] border-solid border-[1.32px] border-[#FFF2DA] bg-[#282828]/[33]">
            <ReactPlayer
              src="https://www.youtube.com/watch?v=BtdBuAo7auU"
              playing={false}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
