"use client"
import { WhiteCheckCircled } from "@/components/SVGs"

export default function CareerPathSection({ careers }: any) {
  return (
    <section
      className="w-full relative grid py-12 gap-6 px-4 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 ">
        <div className="w-full max-w-[1500px] xl:py-12 flex flex-col justify-center items-center 3xl:gap-[64px]">
          <div className="w-full max-w-[1280px] xl:py-12 flex flex-col gap-8 3xl:gap-[64px] xl:px-8 3xl:px-0">
            <h2 className="w-full text-2xl/[50px] lg-md:text-2xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left capitalize">
              Career path
            </h2>
            <div className="w-full flex flex-col lg:flex-row gap-12 lg:justify-center">
              <div
                className="w-[92vw] h-[300px] lg-md:h-[340px] lg:w-[400px] lg:h-[400px] bg-[url('/images/careerWomen.jpeg')] bg-cover bg-center bg-no-repeat rounded-[20px]"
                data-aos="fade-right"
                data-aos-once={true}
              />

              <div
                className="w-[550px] xl:w-[800px] flex lg-md:justify-center items-center"
                data-aos="fade-left"
                data-aos-once={true}
              >
                <div className="w-[680px] grid grid-cols-1 lg-md:grid-cols-2 gap-4">
                  {careers?.map((v: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="w-full max-w-[502px] flex justify-start items-start gap-[12px] text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]"
                      >
                        <span className="flex-shrink-0">
                          <WhiteCheckCircled />
                        </span>
                        {v}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
