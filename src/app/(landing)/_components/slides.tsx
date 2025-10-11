"use client"
import { AnimatePresence, motion } from "framer-motion"
import { BookIcon, User2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import "swiper/css"
import { A11y, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = [
    {
      image: "/images/slider1.jpeg",
      name: "Mary Joseph",
      course: "Computer Science",
    },
    {
      image: "/images/slider2.jpeg",
      name: "Chales Johnson",
      course: "Civil Engineering",
    },
    {
      image: "/images/slider3.jpeg",
      name: "Christiana Moses",
      course: "Computer Engineering",
    },
    {
      image: "/images/slider4.jpeg",
      name: "Aisha Usman",
      course: "Biology",
    },
  ]

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
    <div className="w-full xl:w-[430px] 2xl:w-[772px]">
      <Swiper
        loop
        spaceBetween={30}
        slidesPerView={1}
        modules={[Autoplay, A11y]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Make sure the realIndex is used for looping correctly
        className="w-full h-full rounded-[20px] md:rounded-[24px] xl:rounded-[44px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="relative mx-auto w-full h-[320px] max-w-[360px] aspect-[2/1] sm:max-w-[600px] md:max-w-[938px] md:h-[400px] lg:max-w-[884px] lg:h-[280px] xl:w-[580px] xl:h-[380px] 3xl:w-[700px] 3xl:h-[480px] overflow-hidden rounded-[20px] md:rounded-[24px] xl:rounded-[44px]">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw,
                     (max-width: 1024px) 100vw,
                     (max-width: 1280px) 100vw,
                     1020px"
                priority
                className="object-cover rounded-[15px] md:rounded-[24px] xl:rounded-[44px]"
              />
              {/* Animate the overlay if the slide is active */}

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="absolute bottom-0 w-full h-full bg-gradient-to-t from-gray-900/90 via-gray-900/80 to-transparent flex justify-center items-end rounded-[20px] md:rounded-[24px] xl:rounded-[44px]"
                    variants={overlayVariants}
                    initial="hidden"
                    animate={activeIndex === index ? "visible" : "hidden"}
                  >
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute bottom-8 md:bottom-20 left-10  xl:left-5 2xl:left-20 flex flex-col gap-2 md:gap-4"
                    >
                      <div className="w-full flex items-center gap-2 font-avant-garde font-bold text-lg  md:text-[31.79px]/[38.15px] text-white">
                        <User2 /> {slide.name}
                      </div>
                      <div className="w-full flex items-center gap-2 font-avant-garde font-medium text-lg md:text-[31.79px]/[38.15px] text-white">
                        <BookIcon /> {slide.course}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
