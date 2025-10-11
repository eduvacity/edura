"use client"
import { motion } from "framer-motion"
import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/controls"
import { setCourseDetails } from "../../../lib/redux/features/coursesSlice"
import { CourseService } from "../../../lib/services/courses.service"
import ProgramSection from "./_components/courses"
import { useSearchParams } from "next/navigation"

export default function CoursesPage() {
  const search = useSearchParams()
  const id = search.get("id")
  const dispatch = useAppDispatch()
  const { landingCourses } = useAppSelector((state) => state.course)
  const selectedCourse = landingCourses?.find((course: any) => course.id === id)

  const getCourseDetail = useCallback(async () => {
    const id = selectedCourse?._id
    const { error, payload } = await CourseService.findCourseDetail(id)
    if (!error && payload) {
      if (payload?.data) {
        dispatch(setCourseDetails(payload?.data))
      }
    }
  }, [dispatch, selectedCourse])

  useEffect(() => {
    getCourseDetail()
  }, [getCourseDetail])
  return (
    <div className="w-full flex flex-col">
      <section className="w-full relative h-[450px] pt-[180px] lg-md:pt-[140px] xl:pt-[90px] 3xl:pt-[140px] pb-[80px] lg-md:pb-[120px] lg:pb-[100px] xl:pb-[80px] grid gap-6 bg-pdarkcolor">
        <motion.div
          className="absolute bg-cover bg-center bg-repeat top-0 left-0 w-full h-full sclae-[0.5px]"
          style={{
            background: "url(/images/grid.svg)",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="w-full max-w-[1280px] 3xl:px-24 3xl:py-8">
          <div className="w-full max-w-[708px] flex flex-col gap-1 px-1 lg:px-12 xl:px-1">
            <h1 className="font-sans font-bold text-[28px]/[40px] lg-md:text-[45px]/[42px] lg:text-[30px]/[38px] xl:text-[38px]/[40px] 3xl:text-[48px]/[52px] tracking-[0.5px] text-left text-white px-4 lg-md:px-0">
              Choose top rated programs
            </h1>
            <p className="max-w-[600px] px-4 lg-md:px-0 font-normal font-arial text-sm/[24px] lg-md:text-xl lg:lg-md:text-[15px]/[24px] xl:text-xl 3xl:text-lg text-left text-[#959B9D] tracking-[0.5px]">
              Learn from international experts and earn certifications from top
              universities worldwide.
            </p>
          </div>
        </div>
      </section>
      <ProgramSection />
    </div>
  )
}
