"use client"
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  Youtube,
} from "@/components/SVGs"
import AppLogo from "@/components/SVGs/logo"
import { useAppSelector } from "@/lib/redux/controls"
import { Divider } from "@mui/material"
import Link from "next/link"

const Footer = () => {
  const today = new Date()
  const { landingCourses } = useAppSelector((state) => state.course)

  return (
    <div className="w-full min-h-[450px] bg-[#011B23]  bg-[url('/images/grid.svg')] bg-contain ">
      <div className="max-w-[1534px] mx-auto flex flex-col">
        <div className="w-full flex flex-col 2xl:flex-row gap-[40px] 2xl:gap-[72px] px-[20px] py-[20px] 2xl:py-[100px]">
          {/* LOGO AND ADDRESS */}
          <div className="2xl:w-[340px] space-y-4">
            <Link href="/">
              <AppLogo className="w-[180px] h-[48px] xl:w-[200px] 2xl:w-auto" />
            </Link>
            <h4 className="text-xs/[24px] lg:text-sm/[30px] font-semibold font-sans text-[#fff] text-left">
              we bridge the education gap and assist individuals in building
              their technical, business, and interpersonal skills.
            </h4>
            <h6 className="text-sm font-semibold font-sans text-pcolor">
              Address
            </h6>
            <h4 className="text-xs/[24px] lg:text-sm/[30px]  font-sans font-medium text-[#fff] text-left">
              <span className="font-semibold">Head office: </span>Plot 41/42
              Independence Way, Kaduna, opposite ASD City Mall, Marafa. <br />
              <span className="font-semibold">Liaison office:</span> No. 56
              Lobito Crescent, Wuse 2, Abuja.
            </h4>
          </div>
          <div className="w-full min-w-[800px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8">
            {/* COURSES */}
            <div className="flex flex-col items-start 2xl:col-span-2 gap-2">
              <h4 className="text-sm font-semibold font-sans text-pcolor">
                Courses
              </h4>
              <div className="flex flex-col items-start gap-4">
                {landingCourses?.map((course: any) => (
                  <Link
                    key={course.id}
                    href={`/program?id=${course.id}`}
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4 cursor-pointer"
                  >
                    {course.courseName}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
              {/* COMPANY */}
              <div className="flex flex-col items-start">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold font-sans text-pcolor">
                    Company
                  </h4>
                  <div className="flex flex-col items-start gap-4">
                    <Link
                      href=""
                      className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                    >
                      Who we are
                    </Link>
                    <Link
                      href=""
                      className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                    >
                      Careers
                    </Link>
                    <Link
                      href=""
                      className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                    >
                      Partners
                    </Link>
                    <Link
                      href=""
                      className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                    >
                      Become an instructor
                    </Link>
                  </div>
                </div>
              </div>
              {/* ACADEMICS */}
              <div className="flex flex-col items-startgap-4">
                <h4 className="text-sm font-semibold font-sans text-pcolor">
                  Academics
                </h4>
                <div className="flex flex-col items-start gap-4">
                  <Link
                    href="/scholarship"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Scholarship
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Blog
                  </Link>
                  <Link
                    href="tel:+2348101831001"
                    target="_blank"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              {/* RESOURCES */}
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-sm font-semibold font-sans text-pcolor">
                  Resources
                </h4>
                <div className="flex flex-col items-start gap-4">
                  <Link
                    href="#"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    E-Library
                  </Link>
                  <Link
                    href="/#faqs"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/program#process"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    How to get started
                  </Link>
                </div>
              </div>
              {/* LEGAL */}
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-sm font-semibold font-sans text-pcolor">
                  Legal
                </h4>
                <div className="flex flex-col items-start gap-4">
                  <Link
                    href="/terms-of-service"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Cookies
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="text-sm/[30px] font-semibold font-sans text-[#fff] text-left hover:underline hover:underline-offset-4"
                  >
                    Licenses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Divider className="border-[#FFF7E1] border-[0.5px]" />
        </div>
        <div className="w-full flex justify-between items-center min-h-[110px] py-3">
          <div className="w-full h-[30px] text-[#E6F4ED] flex flex-col gap-3 lg-md:gap-1 lg-md:flex-row justify-between px-4">
            <h4 className="w-full lg-md:w-[359px] text-[#E6F4ED] text-xs lg:text-sm/[30px] font-normal font-arial">
              © {today.getFullYear()} Edura. All rights reserved.
            </h4>
            <div className="w-full lg-md:w-[270px] gap-[16px] flex items-center space-x-[15px] justify-end">
              <Link href="https://twitter.com/eduvasity" target="_blank">
                <Twitter className="w-[20px] h-[20px]" />
              </Link>
              <Link href="https://www.linkedin.com/eduvasity/" target="_blank">
                <LinkedIn className="w-[20px] h-[20px]" />
              </Link>
              <Link href="https://www.facebook.com/eduvasity/" target="_blank">
                <Facebook className="w-[24px] h-[24px]" />
              </Link>
              <Link href="https://www.youtube.com/eduvasity/" target="_blank">
                <Youtube className="w-[28px] h-[28px]" />
              </Link>
              <Link href="https://www.instagram.com/eduvasity/" target="_blank">
                <Instagram className="w-[24px] h-[24px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
