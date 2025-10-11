"use client"
import {
  CirCledArrowLeft,
  CirCledArrowRight,
  LinkedInAltIcon,
} from "@/components/SVGs"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { A11y, Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function TeamSection() {
  // const landingCourses = useAppSelector((state) => state.program.landingCourses)
  const swiperRef = useRef<any>(null)
  const [isBeginning, setIsBeginning] = useState(true) // Track if swiper is at the beginning
  const [isEnd, setIsEnd] = useState(false) // Track if swiper is at the end
  const [activeIndex, setActiveIndex] = useState(0)

  const overlayVariants = {
    hidden: {
      y: "100%", // Start off-screen (below the container)
      opacity: 0, // Hidden
    },
    visible: {
      y: "0%", // Move up to its original position
      opacity: 1, // Fully visible
      transition: {
        duration: 0.6, // Adjust duration for smoothness
        ease: "easeOut",
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: {
      y: "100%", // Start below the container
      opacity: 0, // Hidden
    },
    visible: {
      y: "0%", // Slide up into place
      opacity: 1, // Fully visible
      transition: {
        duration: 0.8, // Slightly longer for smoother text reveal
        ease: "easeOut",
        delay: 0.2, // Add delay to make the text appear after the overlay
      },
    },
  }
  return (
    <motion.section
      className="w-full relative grid gap-6 py-12 lg-md:py-24 px-0 lg-md:px-0 3xl:px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col justify-center items-center gap-6 lg:gap-12">
        <div className="w-full flex flex-col mb-8 gap-1 px-4 lg-md:px-6 xl:px-14">
          <h4 className="max-w-[722px] text-[22px]/[45px] lg-md:text-3xl/[45px] xl:text-[36px]/[45px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left capitalize xl:px-12">
            We&apos;re a fast-growing team{" "}
          </h4>
          <span className="max-w-[841px] text-[#788B8F] text-sm lg-md:text-lg font-medium font-avant-garde xl:px-12">
            We&apos;re always on the lookout for passionate, dynamic, and
            talented individuals.
          </span>
        </div>

        <div className="w-full flex flex-col gap-[43px]">
          <div className="w-[98vw] flex lg-md:w-[98vw] xl:w-[1250px] 3xl:w-[98vw] h-[500px] flex-col gap-6 justify-center px-4">
            <div className="w-full h-full">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning)
                  setIsEnd(swiper.isEnd)
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 1.4,
                    spaceBetween: 20,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 1.4,
                    spaceBetween: 20,
                  },
                  // when window width is >= 1024px
                  1024: {
                    slidesPerView: 2.4,
                    spaceBetween: 12,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  1500: {
                    slidesPerView: 3.5,
                    spaceBetween: 16,
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                className="w-full h-full"
              >
                {leaders?.map((slide, index) => (
                  <SwiperSlide key={index} className="w-full h-full">
                    <div className="relative mx-auto 3xl:mx-0 w-[340px] h-[400px]  aspect-[2/1] max-w-[508px] lg-md:w-[380px] lg:w-[380px] xl:w-[400px] xl:h-[460px] 3xl:w-[450px] 3xl:h-[470px]  overflow-hidden rounded-[21.33px]">
                      <Image
                        src={slide.img}
                        alt={`Slide ${index + 1}`}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1024px) 100vw,
                                (max-width: 1280px) 100vw,
                                1020px"
                        priority
                        className="object-center  rounded-[21.33px]"
                      />
                      {/* Animate the overlay if the slide is active */}
                      <div className="w-full flex justify-center items-center">
                        <AnimatePresence>
                          <motion.div
                            className="absolute bottom-6 transform w-[300px] lg-md:w-[360px] lg:lg-md:w-[340px] h-[180px] flex justify-center items-end  bg-[#FFFFFF]/30 backdrop-blur-[32px] rounded-lg py-[32px] px-[26.67px] border-[1.33px] border-solid border-[#FFFFFF4D]"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            <motion.div className="flex flex-col gap-6">
                              <div className="w-full flex justify-between items-center gap-2 font-avant-garde font-bold text-lg  lg-md:text-xl text-white">
                                <h4 className="font-arial font-bold text-xl  lg-md:text-2xl text-white">
                                  {slide.name}
                                </h4>

                                <Link
                                  href={slide.linkedin}
                                  className="text-white"
                                >
                                  <LinkedInAltIcon />
                                </Link>
                              </div>
                              <div className="w-full flex flex-col gap-1">
                                <h4 className="w-full flex items-center gap-2 font-avant-garde font-semibold text-base  lg-md:text-lg text-white">
                                  {slide.title}
                                </h4>
                                <h4 className="w-full flex items-center gap-2 font-arial font-norma text-sm text-white">
                                  {slide.profile}
                                </h4>
                              </div>
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex justify-start items-center h-14 px-4 xl:px-8 3xl:px-2">
                <div className="w-[144px] flex gap-[13px]">
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
          </div>
        </div>
      </div>
    </motion.section>
  )
}
const leaders = [
  {
    name: "Musa Ibrahim Abbah",
    title: `Product Marketing`,
    img: "/images/team-member1.png",
    profile:
      "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    linkedin: "https://www.linkedin.com/in/musa-ibrahim-abbah-310453219/",
  },
  {
    name: "Yahya Felix James",
    title: `Chief operating officer`,
    img: "/images/team-member2.png",
    profile:
      "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    linkedin: "https://www.linkedin.com/in/musa-ibrahim-abbah-310453219/",
  },
  {
    name: "Charles Chamberlain",
    title: `Chief accounting officer`,
    img: "/images/team-member3.png",
    profile:
      "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    linkedin: "https://www.linkedin.com/in/musa-ibrahim-abbah-310453219/",
  },
  {
    name: "Alisa Hester",
    title: `Chief accounting officer`,
    img: "/images/team-member4.png",
    profile:
      "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    linkedin: "https://www.linkedin.com/in/musa-ibrahim-abbah-310453219/",
  },
]
