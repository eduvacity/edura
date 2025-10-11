"use client"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative flex items-center h-[80vh] max-h-[1000px] justify-center">
      <div className="w-full absolute inset-0 bg-pdarkcolor lg-md:bg-transparent lg-md:bg-[linear-gradient(90.33deg,_#071C23_40.59%,_rgba(49,50,50,0.9)_53.37%,_rgba(149,152,152,0.05)_94.41%)] z-10" />

      <div className="w-full pt-[180px] lg-md:pt-[140px] xl:pt-[90px] 3xl:pt-[160px] pb-[80px] lg-md:pb-[120px] lg:pb-[100px] xl:pb-[80px] z-10">
        <div className="w-full relative flex flex-col lg:flex-row xl:justify-center xl:items-center gap-14 px-4 lg-md:pl-8 xl:pl-12 xl:pr-8">
          <div className="w-full max-w-[365px] lg-md:max-w-[695px] lg:max-w-[895px] xl:max-w-[785px] 3xl:max-w-[830px] grid grid-cols-1 gap-8 lg-md:gap-12  3xl:gap-12 xl:place-content-center">
            <div className="flex flex-col justify-start items-start gap-4 px-1.5 lg-md:px-0">
              <h1 className="w-full font-avant-garde font-normal text-base/[10px] text-pcolor uppercase tracking-[0.5px]">
                About Eduvacity
              </h1>
              <span className="font-avant-garde font-bold text-[36px]/[45px] lg-md:text-[72px]/[82px] lg:text-[40px]/[50px] xl:text-[55px]/[68px] 3xl:text-[70px]/[83px] tracking-[0.5px] text-left text-white">
                Experience the future of tertiary education
              </span>
              <p className="font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-xl 3xl:text-[22px]/[32px] text-left text-white tracking-[0.5px]">
                Enabling learners to take control of their career growth through
                accessible and high-quality education.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-[1500px] h-full z-0">
        <Image
          src="/images/about-hero.jpeg"
          alt="Hero Image"
          width={1500}
          height={1000}
          className="hidden lg-md:flex w-full object-cover h-full max-w-[1500px] max-h-[1000px]"
        />
      </div>
    </section>
  )
}
