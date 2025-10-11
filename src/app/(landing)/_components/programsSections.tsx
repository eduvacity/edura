"use client"
import {
  AcademyCapIconAlt,
  BusinessCoursesIcon,
  CirCledArrowLeft,
  CirCledArrowRight,
  ClockAlt,
  FinanceCoursesIcon,
  LeadershipCoursesIcon,
  MasterCoursesIcon,
  PopularCoursesIcon,
  TechnologyCoursesIcon,
} from "@/components/SVGs"
import { Badge } from "@/components/ui/badge"
import { CourseService } from "@/lib/services/courses.service"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/navigation"
import { A11y, Grid, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/controls"
import {
  setCourseDetails,
  setLandingCourses,
} from "../../../lib/redux/features/coursesSlice"
import { Loader } from "@/components/ui/loader"

export default function ProgramSection() {
  const dispatch = useAppDispatch()
  const { landingCourses } = useAppSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const swiperRef = useRef<any>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const router = useRouter()

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
      className="w-full relative lg-md:py-[80px]"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full max-w-[1557px] mx-auto flex flex-col gap-[43px]  px-2.5 xl:px-9 2xl:px-12 3xl:px-8">
        <div className="w-full lg-md:w-[708px] px-2 flex flex-col">
          <h2 className="w-full text-2xl/[40px] lg-md:text-4xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left">
            Choose top rated programs
          </h2>
          <p className="text-base text-left font-medium font-avant-garde text-[#3D3D3D] max-w-[640px] tracking-[0.5px]">
            Learn from international experts and earn certifications from top
            universities worldwide.
          </p>
        </div>

        <div className="w-full flex flex-col xl:flex-row gap-4 lg-md:gap-4 3xl:gap-12">
          <div className="w-full xl:w-[350px] 3xl:w-[450px] bg-white border border-[#DDDDDD] h-[300px] lg:h-[480px] rounded-[10px]">
            <div className="w-full  h-[60px] px-[15px] py-[10px] border-b border-[#DDDDDD] font-semibold font-avant-garde text-lg/[39px] text-[#4A4A4A]">
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
                            ? "w-full py-[10px] pb-[5px] flex flex-row justify-between items-center cursor-pointer"
                            : "w-full py-[10px] pb-[5px] flex flex-row justify-between items-center opacity-50 cursor-not-allowed"
                        }
                      >
                        <div className="flex flex-row space-x-[10px] items-center">
                          {v.icon}
                          <span className="font-semibold font-avant-garde text-xs/[24px] lg:text-sm/[24px] lg-md:text-lg/[39px] text-[#4A4A4A]">
                            {v.name}
                          </span>
                        </div>
                        <div className="hidden lg:flex">
                          {v.isReady ? (
                            <KeyboardArrowRightIcon />
                          ) : (
                            <Badge className="w-[110px] text-[#E3A229] bg-[#fff5e3] font-semibold font-avant-garde py-[5px] hover:bg-[#fff5e3] rounded-[20px] shadow-[0px] flex justify-center items-center">
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
                          <span className="font-semibold font-avant-garde text-xs/[24px] lg:text-sm/[24px] lg-md:text-lg/[39px] text-[#071C23]">
                            {v?.name}
                          </span>
                        </div>
                        <div className="hidden lg:flex">
                          {v.isReady ? (
                            <KeyboardArrowRightIcon />
                          ) : (
                            <Badge className="w-[110px] text-[#E3A229] bg-[#fff5e3] font-semibold font-avant-garde py-[5px] hover:bg-[#fff5e3] rounded-[20px] shadow-[0px] flex justify-center items-center">
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
            <div className="w-full flex justify-center items-center text-sm font-avant-garde text-black">
              No data found
            </div>
          ) : (
            <div className="w-[95vw] flex flex-col gap-4 lg:w-[100vw] lg-md:w-[93vw] xl:w-[650px] 3xl:w-[1000px]">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, A11y, Grid]}
                spaceBetween={20}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning)
                  setIsEnd(swiper.isEnd)
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  768: {
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 1.4,
                    spaceBetween: 12,
                  },
                  1280: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1500: {
                    slidesPerView: 2,
                    spaceBetween: 16,

                    grid: {
                      rows: 2,
                      fill: "row",
                    },
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                className="h-full w-full xl:h-auto"
              >
                {landingCourses?.map((program: any, index: number) => {
                  return (
                    <SwiperSlide key={index} className="w-full h-full">
                      <div
                        className="w-full h-[463px] bg-[#FFFCF7] border border-[#DDDDDD] rounded-[5px] flex flex-col justify-start cursor-pointer gap-6"
                        onClick={() => router.push(`/program?id=${program.id}`)}
                      >
                        <div
                          style={{
                            backgroundImage: `url(${program.courseBanner?.publicUrl})`,
                          }}
                          className="w-full relative h-[200px] bg-cover bg-center bg-no-repeat bg-black rounded-t-[5px]"
                        ></div>
                        <div className="flex flex-col gap-4 px-4">
                          <div className="flex flex-row justify-between items-center">
                            <span className="text-xs lg:text-sm lg-md:text-lg font-bold font-arial tracking-[0.5px] text-[#071C23]">
                              {program.courseName}
                            </span>
                            <Badge className="text-xs rounded-[20px] font-normal font-arial bg-[#DFF1FF] shadow-none hover:bg-[#DFF1FF] text-[#2C3A50] border-[0.8px] border-[#DBDBDB] capitalize">
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
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              {/* Custom Navigation Buttons */}
              <div className="w-full flex justify-start items-center gap-8 h-14">
                <div className="w-[144px] flex gap-4">
                  <div
                    onClick={() => swiperRef.current.slidePrev()}
                    className={`flex justify-center items-center cursor-pointer w-14 h-14 transition-transform rounded-full ${
                      isBeginning
                        ? "opacity-50 cursor-not-allowed" // Disabled styling when no previous slide
                        : "hover:bg-pcolor/30 hover:scale-90 text-pcolor hover:text-pcolor/30"
                    }`}
                  >
                    <CirCledArrowLeft />
                  </div>
                  <div
                    onClick={() => !isEnd && swiperRef.current?.slideNext()} // Disable click if at the end
                    className={`flex justify-center items-center cursor-pointer w-14 h-14 transition-transform rounded-full ${
                      isEnd
                        ? "opacity-50 cursor-not-allowed" // Disabled styling when no next slide
                        : "hover:bg-pcolor/30 hover:scale-90 text-pcolor hover:text-pcolor/30"
                    }`}
                  >
                    <CirCledArrowRight />
                  </div>
                </div>
              </div>
            </div>
          )}
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
