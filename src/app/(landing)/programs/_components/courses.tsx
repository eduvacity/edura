"use client"
import {
  AcademyCapIconAlt,
  BusinessCoursesIcon,
  ClockAlt,
  FinanceCoursesIcon,
  LeadershipCoursesIcon,
  MasterCoursesIcon,
  PopularCoursesIcon,
  TechnologyCoursesIcon,
} from "@/components/SVGs"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/loader"
import { useAppDispatch, useAppSelector } from "@/lib/redux/controls"
import {
  setCourseDetails,
  setLandingCourses,
} from "@/lib/redux/features/coursesSlice"
import { CourseService } from "@/lib/services/courses.service"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useEffect, useState } from "react"

export default function ProgramSection() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { landingCourses } = useAppSelector((state) => state.course)
  const [page, setPage] = useState(0)

  const handleCourseNav = async (i: number, label: string) => {
    setLoading(true)
    const { error, payload } = await CourseService.getCourseListByCategory(
      0,
      200,
      label
    )
    setLoading(false)
    if (!error && payload) {
      dispatch(setLandingCourses(payload))
      setPage(i)
    }
  }

  const getAllCategoryList = useCallback(async () => {
    setLoading(true)
    const { error, payload } = await CourseService.getCourseListByCategory(
      0,
      200,
      "popular"
    )
    setLoading(false)
    if (!error && payload) {
      dispatch(setLandingCourses(payload))
      dispatch(
        setCourseDetails({
          title: {
            title: "",
            uniqueId: 0,
            isSaved: false,
            details: {
              0: {
                label: "",
                id: 0,
              },
            },
          },
        })
      )
    }
  }, [dispatch])

  useEffect(() => {
    getAllCategoryList()
  }, [getAllCategoryList])

  return (
    <motion.section
      className="w-full relative grid gap-6 pt-[100px] lg-md:pt-[120px] xl:pt-[90px] 3xl:pt-[140px] pb-[50px] px-3 lg-md:px-6 xl:px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row xl:justify-center xl:items-center gap-12">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full max-w-[708px] flex flex-col gap-1 px-1">
            <h2 className="w-full text-2xl/[40px] lg-md:text-4xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left">
              Choose top rated programs
            </h2>
            <p className="text-base text-left font-medium font-sans text-[#3D3D3D] max-w-[640px] tracking-[0.5px]">
              Learn from international experts and earn certifications from top
              universities worldwide.
            </p>
          </div>
          <div className="w-full flex flex-col lg-md:flex-row gap-4 lg-md:gap-2 3xl:gap-12 lg:px-0 xl:px-6 px-0 lg-md:px-6 3xl:px-0">
            <div className="w-full lg-md:w-[450px] lg:w-[420px] xl:w-[420px] 3xl:w-[450px] bg-white border border-[#DDDDDD] h-[300px] lg-md:h-[480px] rounded-[10px]">
              <div className="w-full h-[60px] px-[15px] py-[10px] border-b border-[#DDDDDD] font-semibold font-sans text-lg/[39px] text-[#4A4A4A]">
                Categories
              </div>
              <div className="px-4 py-8 grid grid-cols-2 lg:grid-cols-1 gap-2">
                {list.map((v, i) => {
                  return (
                    <Fragment key={i}>
                      {i === page || (
                        <div
                          onClick={() => handleCourseNav(i, v?.label)}
                          className={
                            v.isReady
                              ? "w-full py-[10px] pb-[5px] px-[10px] flex flex-row justify-between items-center cursor-pointer"
                              : "w-full py-[10px] pb-[5px] px-[10px] flex flex-row justify-between items-center opacity-50 cursor-not-allowed"
                          }
                        >
                          <div className="flex flex-row space-x-[10px] items-center">
                            {v?.icon}
                            <span className="font-semibold font-sans text-xs/[24px] lg:text-sm/[24px] lg-md:text-lg/[39px] text-[#4A4A4A]">
                              {v.name}
                            </span>
                          </div>
                          <div className="hidden lg-md:flex">
                            {v.isReady ? (
                              <KeyboardArrowRightIcon />
                            ) : (
                              <Badge className="w-[110px] text-[#E3A229] bg-[#fff5e3] font-semibold font-sans py-[5px] hover:bg-[#fff5e3] rounded-[20px] shadow-[0px] flex justify-center items-center">
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {i === page && (
                        <div className="w-full py-[12px] pb-[5px] bg-[#EFFFF7] border-l-[3px] border-[#3FA46E] px-[10px] flex flex-row justify-between items-center">
                          <div className="flex flex-row space-x-[10px] items-center">
                            {v.icon}
                            <span className="font-semibold font-sans text-xs/[24px] lg:text-sm/[24px] lg-md:text-lg/[39px] text-[#4D6C62]">
                              {v?.name}
                            </span>
                          </div>
                          <div className="hidden lg-md:flex">
                            {v.isReady ? (
                              <KeyboardArrowRightIcon />
                            ) : (
                              <Badge className="w-[110px] text-[#E3A229] bg-[#fff5e3] font-semibold font-sans py-[5px] hover:bg-[#fff5e3] rounded-[20px] shadow-[0px] flex justify-center items-center">
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            </div>
            {loading && landingCourses?.length === 0 ? (
              <div className="w-full">
                <Loader />
              </div>
            ) : landingCourses?.length === 0 ? (
              <div className="w-full flex justify-center items-center text-[14px]">
                No data found
              </div>
            ) : (
              <div className="w-full lg-md:w-[430px] lg:w-[680px] xl:w-[900px] 3xl:w-[1036px] grid grid-cols-1 lg-md:grid-cols-2 gap-8">
                {landingCourses?.map((program: any, index: number) => (
                  <div
                    key={index}
                    className="w-full h-[483px] max-w-[502px] bg-[#FFFCF7] border border-[#DDDDDD] rounded-[5px] flex flex-col justify-start cursor-pointer gap-6"
                    onClick={() => router.push(`/program?id=${program.id}`)}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${program.courseBanner?.publicUrl})`,
                      }}
                      className="w-full relative h-[180px] bg-cover bg-center bg-no-repeat bg-black"
                    ></div>
                    <div className="flex flex-col gap-4 px-4">
                      <div className="flex flex-row justify-between items-center">
                        <h4 className="text-xs lg:text-lg font-bold font-arial tracking-[0.5px] text-[#4D6C62]">
                          {program.courseName}
                        </h4>
                        <Badge className="text-xs rounded-[20px] font-normal font-arial bg-[#DFF1FF] shadow-none hover:bg-[#DFF1FF] text-[#2C3A50] border-[0.8px] border-[#DBDBDB]">
                          {program.courseType}
                        </Badge>
                      </div>
                      <p className="w-full text-base font-normal font-arial text-[#727272] pt-2">
                        {program.description}
                      </p>
                      <div className="w-full flex justify-between gap-2 py-4">
                        <div className="w-full flex flex-col gap-2">
                          <div className="flex flex-row gap-1 items-center">
                            <ClockAlt className="w-5 h-5" />
                            <span className="text-sm text-[#494747] font-normal font-arial">
                              {`${program.duration} ${program.durationType}`}
                            </span>
                          </div>
                          <div className="flex flex-row gap-2 items-center">
                            <AcademyCapIconAlt className="w-5 h-5" />
                            <span className="text-sm text-[#494747] font-normal font-arial capitalize">
                              {program.school.schoolName}
                            </span>
                          </div>
                        </div>

                        <button className="w-[180px] h-[19px] mt-[30px] text-base text-pcolor font-semibold font-arial cursor-pointer flex justify-center items-center">
                          View Program
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const list = [
  {
    name: "Popular Courses",
    label: "popular",
    icon: <PopularCoursesIcon />,
    isReady: true,
  },
  {
    name: "Business",
    label: "business",
    icon: <BusinessCoursesIcon />,
    isReady: true,
  },
  {
    name: "Technology",
    label: "technology",
    icon: <TechnologyCoursesIcon />,
    isReady: true,
  },
  {
    name: "Finance",
    label: "finance",
    icon: <FinanceCoursesIcon />,
    isReady: true,
  },
  {
    name: "Leadership",
    label: "leadership",
    icon: <LeadershipCoursesIcon />,
    isReady: false,
  },
  {
    name: "Masterclass",
    label: "masterclass",
    icon: <MasterCoursesIcon />,
    isReady: false,
  },
]
