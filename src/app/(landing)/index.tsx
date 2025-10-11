"use client"
import { UserIcon } from "@/components/SVGs"
import AppLogo from "@/components/SVGs/logo"
import { AuthService } from "@/lib/services/auth.service"
import { AppBar, CssBaseline, Toolbar } from "@mui/material"
import AOS from "aos"
import "aos/dist/aos.css"
import { motion, useAnimation, useInView } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback } from "react"
import Footer from "./_components/footer"
import { useMenu } from "./_components/menu"
import MenuLists from "./_components/menuList"
import MenuDropdown from "./_components/sidebar/dropdown"
import TimerComponent from "./_components/timer"

function updateKey(str: string) {
  if (typeof str !== "string") return ""
  const regex = / /g
  const newStr = str.toLowerCase()
  const update = newStr.replace(regex, "-")
  return update
}
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const pathname = usePathname()
  const { menu } = useMenu()

  const initializeDeadline = useCallback(async () => {
    const { error, payload } = await AuthService.getDeadline()
    if (!error && payload) {
      if (payload.deadline) {
        const deadlineTimestamp = parseInt(payload.deadline, 10)
        const deadlineDate = new Date(deadlineTimestamp)
        startCountdown(deadlineDate)
      }
    }
  }, [])

  React.useEffect(() => {
    initializeDeadline()
  }, [initializeDeadline])

  React.useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  React.useEffect(() => {
    AOS.init({
      duration: 1100,
      once: false,
    })
  }, [])

  const startCountdown = (deadline: any) => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const timeDifference = deadline.getTime() - now

      if (timeDifference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timerInterval)
        return
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      )
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const timerInterval = setInterval(updateCountdown, 1000)
    return () => clearInterval(timerInterval)
  }
  return (
    <div ref={ref} className="w-full overflow-hidden relative">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <CssBaseline />
        {timeLeft.days * 86400 +
          timeLeft.hours * 3600 +
          timeLeft.minutes * 60 +
          timeLeft.seconds >
          0 && <TimerComponent timeLeft={timeLeft} />}
        <AppBar
          position="fixed"
          className={
            timeLeft.days * 86400 +
              timeLeft.hours * 3600 +
              timeLeft.minutes * 60 +
              timeLeft.seconds >
            0
              ? `h-[100px] top-[100px] lg-md:top-[65px] bg-pdarkcolor shadow-none px-2 2xl:px-[20px] 3xl:px-[80px] py-4 lg-md:py-6 lg:py[10px]`
              : `h-[100px] bg-pdarkcolor shadow-sm px-1 2xl:px-6 lg:px-[10px] 3xl:px-[80px] py-4 lg-md:py-6 lg:py[10px]`
          }
        >
          <Toolbar className="w-full flex justify-between items-center gap-3">
            <Link href="/">
              <AppLogo className="w-[180px] h-[48px] xl:w-[200px] 2xl:w-auto" />
            </Link>

            <MenuLists />

            <div className="hidden w-fit h-[60px] xl:flex justify-between items-center gap-[15px] rounded-full border-[0.8px] border-pcolor py-[17px] xl:px-[20px] 2xl:px-[35px]">
              {menu?.map((item, i) => {
                const selected = pathname.startsWith(
                  `/${updateKey(item.name.toLowerCase())}`
                )
                return (
                  <div key={i}>
                    {item && item.children ? (
                      <MenuDropdown item={item} selected={selected} />
                    ) : (
                      <Link
                        href={`/${updateKey(item.name.toLocaleLowerCase())}`}
                        className={
                          selected
                            ? "w-auto font-semibold font-avant-garde lg-md:text-sm xl:text-sm text-pcolor tracking-[0.5px] hover:text-white"
                            : "font-semibold font-avant-garde lg-md:text-sm xl:text-sm text-white tracking-[0.5px] hover:text-pcolor"
                        }
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="hidden xl:flex gap-4">
              <Link
                href="https://portal.eduvacity.com/student-auth/signin"
                className="w-full lg:w-fit h-[58px] flex items-center gap-2 text-white hover:text-white/90 text-sm xl:text-lg tracking-[0.5px] font-semibold font-avant-garde hover:scale-[0.99] cursor-pointer"
              >
                <UserIcon /> Student portal
              </Link>
              <Link
                href="https://portal.eduvacity.com/student-auth/signin"
                className="w-full lg:w-fit h-[58px] font-bold font-avant-garde text-base xl:text-lg/[21.6px] text-white flex justify-center items-center gap-2 bg-pcolor hover:bg-pcolor/90 border border-solid border-pcolor rounded-xl hover:scale-[0.99] cursor-pointer px-4"
              >
                Apply now
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <main className="w-full flex-grow bg-[#F8F8F8]">
          <Toolbar />
          {children}
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
