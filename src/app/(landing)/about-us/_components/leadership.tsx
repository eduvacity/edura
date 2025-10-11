"use client"
import { CirCledArrowLeft, CirCledArrowRight } from "@/components/SVGs"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import { A11y, Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function LeadershipSection() {
  const swiperRef = useRef<any>(null)
  const [isBeginning, setIsBeginning] = useState(true) // Track if swiper is at the beginning
  const [isEnd, setIsEnd] = useState(false) // Track if swiper is at the end

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
    <section
      className="w-full relative grid gap-6 pt-24 px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 bg-[#F8EFDF] pt-12 pb-20">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col px-2 lg-md:px-8 lg:mb-12 lg:pl-16 lg:pr-0">
            <div className="w-full flex flex-col gap-4">
              <h4 className="max-w-[841px] text-xl/[50px] lg-md:text-2xl/[45px] xl:text-3xl/[45px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left capitalize">
                Our Leadership
              </h4>
              <span className="max-w-[841px] text-[#788B8F] text-base lg-md:text-lg font-medium font-sans">
                Meet the distinguished young and intelligent minds who guide and
                inspire our community here at Edura.
              </span>
            </div>
          </div>
          <div className="w-[98vw] h-[380px] flex lg-md:w-[98vw] xl:w-[1250px] 3xl:w-[1500px]  lg-md:h-[500px] lg:h-[500px] xl:h-[440px] 3xl:h-[460px] flex-col gap-6 justify-center px-4 xl:pr-0 3xl:pr-0 xl:pl-8 3xl:px-1">
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
                    <div className="relative mx-auto w-full h-[340px] aspect-[2/1] max-w-[508px] lg-md:h-[480px] lg-md:w-[685px] lg:w-[400px] lg:h-[450px] xl:w-[390px] xl:h-[400px] 3xl:w-[400px] 3xl:h-[420px] overflow-hidden rounded-[15.56px]">
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
                        className="object-center bg-center rounded-[15.56px]"
                      />
                      {/* Animate the overlay if the slide is active */}
                      <AnimatePresence>
                        <motion.div className="absolute bottom-0 w-full h-full  flex justify-center items-end  bg-[linear-gradient(180deg,rgba(217,217,217,0.1)_14.69%,rgba(1,27,35,0.2)_49.05%,rgba(1,27,35,0.730841)_76.15%,#011B23_103.76%)]">
                          <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute bottom-8 lg-md:bottom-6 left-10 lg-md:left-10 flex flex-col"
                          >
                            <div className="w-full flex items-center gap-2 font-sans font-bold text-base  lg-md:text-lg text-white">
                              {slide.name}
                            </div>
                            <div className="w-full flex items-center gap-2 font-sans font-medium text-sm lg-md:text-base text-[#E3A22B] italic">
                              {slide.title}
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex justify-start items-center h-14 lg:pr-0 pl-1">
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
    </section>
  )
}
const leaders = [
  {
    name: "Musa Alibaba",
    title: `Director`,
    img: "/images/Musa Alibaba.jpeg",
  },
  {
    name: "Ayoola Gbadegesin Abdrazaqh",
    title: `Director`,
    img: "/images/Ayoola Gbadegesin Abdrazaqh.jpg",
  },
  {
    name: "Ibrahim Musa Abbah",
    title: `Director/CEO`,
    img: "/images/ibrahim-musa-abbah.jpg",
  },
  {
    name: "Nasir Ibrahim Abbah",
    title: `Chief Operating Officer`,
    img: "/images/Nasir Ibrahim Abbah.jpg",
  },
]
