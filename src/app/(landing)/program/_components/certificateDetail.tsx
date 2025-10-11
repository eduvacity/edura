"use client"
import { Loader } from "@/components/ui/loader"
import LearningPathSection from "./learningPath"

export default function CertificateDetailSection({
  detail,
  course,
  loading,
}: any) {
  return (
    <section
      className="w-full relative grid gap-6 py-24 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1507px] flex items-center flex-col gap-[43px] bg-white">
          <div className="w-full max-w-[1280px] flex-col gap-6 px-[32px] pt-12 py-24 flex justify-center items-center">
            <div className="w-full flex flex-col gap-1">
              <h4 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-medium font-avant-garde text-[#011B23] tracking-[0.5px] text-left">
                {course?.courseName}
              </h4>
              <p className="w-full text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]">
                {course?.description}
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <h4 className="w-full text-base/[50px] lg-md:text-[22px]/[27.5px] font-medium font-avant-garde text-[#000000] tracking-[0.5px] text-left">
                Learning path
              </h4>
            </div>
            {loading ? (
              <Loader />
            ) : "title" in detail ? (
              <p className=" text-center w-full text-base font-medium font-avant-garde text-[#011B23] -tracking-[0.02em] opacity-60">
                No learning path details found
              </p>
            ) : (
              <LearningPathSection paths={detail && Object.values(detail)} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
