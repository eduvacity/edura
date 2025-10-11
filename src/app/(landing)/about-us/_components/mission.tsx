"use client"
import dynamic from "next/dynamic"

const EyeVision = dynamic(() => import("@/components/lottie/eye"), {
  ssr: false,
})
const Target = dynamic(() => import("@/components/lottie/target"), {
  ssr: false,
})
export default function MissionAndVisionSection() {
  return (
    <section
      className="w-full relative grid gap-6 pt-[100px] lg-md:pt-[120px] xl:pt-[90px] 3xl:pt-[140px] pb-[50px] px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div
        className="w-full relative flex justify-center items-center min-h-[655px] bg-cover bg-center bg-no-repeat lg-md:px-12 xl:px-[86px] 3xl:px-6"
        style={{
          backgroundImage: `url(/images/valueWoman.jpeg)`,
        }}
      >
        <div
          className="absolute inset-0 "
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(1, 27, 35, 0.8), rgba(1, 27, 35, 0.8)),linear-gradient(0deg, rgba(21, 39, 45, 0.2), rgba(21, 39, 45, 0.2)),linear-gradient(0deg, rgba(21, 39, 45, 0.2), rgba(21, 39, 45, 0.2))`,
          }}
        />
        <div className="w-full flex flex-col gap-[43px]">
          <div className="relative w-full flex flex-col lg:flex-row gap-24 justify-center items-center">
            <div className="w-full max-w-[1500px] flex-col lg:flex-row gap-8 py-12 flex justify-center items-center">
              <div className="h-full lg-md:h-[400px]  py-2 bg-[#071C23] rounded-lg border border-solid border-[#A8A8A8] flex flex-col justify-center items-center">
                <div className="max-w-[94vw] lg-md:w-[621px] xl:w-[550px] h-full flex flex-col gap-6 py-[45px] px-6 lg-md:px-[46px]">
                  <span className="w-[62px] h-[62px]">
                    <Target />
                  </span>
                  <div className="w-full flex flex-col gap-[10px]">
                    <h4 className="text-xl/[39px] font-semibold font-avant-garde text-white tracking-[0.5px]">
                      Mission
                    </h4>
                    <p className="text-base/[30.4px] font-normal font-avant-garde text-white tracking-[0.5px] flex flex-col gap-2">
                      Our mission is to give every African student a chance for
                      quality education.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="h-full lg-md:h-[400px] py-2 bg-[#071C23] rounded-lg border border-solid border-[#A8A8A8] flex flex-col justify-center items-center">
                  <div className="max-w-[94vw] lg-md:w-[621px] xl:w-[550px] h-full flex flex-col gap-6 py-[45px] px-6 lg-md:px-[46px]">
                    <span className="w-[62px] h-[62px]">
                      <EyeVision />
                    </span>
                    <div className="w-full flex flex-col gap-[10px]">
                      <h4 className="text-xl/[39px] font-semibold font-avant-garde text-white tracking-[0.5px]">
                        Vision
                      </h4>
                      <p className="text-base/[30.4px] font-normal font-avant-garde text-white tracking-[0.5px]">
                        To become the Africa leader in providing access to
                        higher education, bridging skill gaps, and delivering
                        lifelong learning by leveraging technology and
                        innovation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
