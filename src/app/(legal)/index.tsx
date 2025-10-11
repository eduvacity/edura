"use client"
import { AppBar, CssBaseline, Toolbar } from "@mui/material"
import { motion, useAnimation, useInView } from "framer-motion"
import React from "react"
// import FooterPage from "./footer"
import AppLogo from "@/components/SVGs/logo"
import Link from "next/link"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  React.useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

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

        <AppBar
          position="fixed"
          className={`h-[100px] bg-pdarkcolor shadow-sm px-2 lg-md:px-6 lg:px-[10px] xl:px-[40px] 3xl:px-[80px] py-4 lg-md:py-6 lg:py[10px]`}
        >
          <div className="w-full flex justify-between items-center gap-3">
            <Link href="/">
              <AppLogo className="px-2 lg-md:px-4 w-[180px] h-[48px] xl:w-[240px] xl:h-[48px]" />
            </Link>
          </div>
        </AppBar>
        <main className="w-full flex-grow bg-[#F8F8F8]">
          <Toolbar />
          {children}
        </main>
      </motion.div>
    </div>
  )
}
