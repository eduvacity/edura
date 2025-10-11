"use client"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/controls"
import { setCourseDetails } from "../../../lib/redux/features/coursesSlice"
import { CourseService } from "../../../lib/services/courses.service"
import AdmissionProcessSection from "./_components/admission"
import CareerPath from "./_components/careerPath"
import CertificateSection from "./_components/certificate"
import CertificateDetailSection from "./_components/certificateDetail"
import Herosection from "./_components/heroSection"
import KeyFeatures from "./_components/keyFeatures"
import CourseOverviewSection from "./_components/overview"
import PricingSection from "./_components/pricing"
import RequirementSection from "./_components/requirement"
import WhyOurProgrammeSection from "./_components/whyourprogramme"

export default function HomePage() {
  const search = useSearchParams()
  const id = search.get("id")
  const dispatch = useAppDispatch()
  const { courseDetails, landingCourses } = useAppSelector(
    (state) => state.course
  )
  const [detailLoading, setDetailLoading] = useState(false)
  const selectedCourse = landingCourses?.find((course: any) => course.id === id)

  const getCourseDetail = useCallback(async () => {
    setDetailLoading(true)
    const id = selectedCourse?._id
    const { error, payload } = await CourseService.findCourseDetail(id)
    setDetailLoading(false)
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
      <Herosection course={selectedCourse} />
      <CourseOverviewSection course={selectedCourse} />
      <WhyOurProgrammeSection />
      {selectedCourse?.courseType?.toLowerCase() === "certificate" ? (
        <CertificateDetailSection
          detail={courseDetails}
          course={selectedCourse}
          loading={detailLoading}
        />
      ) : null}
      <KeyFeatures
        features={selectedCourse && Object.values(selectedCourse?.features)}
      />
      {selectedCourse?.courseType?.toLowerCase() === "certificate" && (
        <CertificateSection course={selectedCourse} />
      )}
      {selectedCourse?.courseType?.toLowerCase() === "certificate" ? null : (
        <AdmissionProcessSection />
      )}
      <PricingSection course={selectedCourse} />

      <RequirementSection
        requirements={
          selectedCourse && Object.values(selectedCourse?.requirements)
        }
        type={selectedCourse?.courseType}
        description={selectedCourse?.requirementDescription}
      />

      <CareerPath
        careers={selectedCourse && Object.values(selectedCourse?.careerPath)}
      />
    </div>
  )
}
