"use client"
import { Badge } from "@/components/ui/badge"
import EastIcon from "@mui/icons-material/East"
import Image from "next/image"
import Link from "next/link"

export const WhyGrid = ({ data }: any) => {
  return (
    <div className="w-full max-w-[502px] h-[350px] rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col justify-between">
      <Image src={data?.icon} width={40} height={40} alt="icon" />
      <div className="w-full flex flex-col gap-[10px]">
        <h4 className="text-xl/[39px] font-semibold font-avant-garde text-[#071C23] tracking-[0.5px]">
          {data?.name}
        </h4>
        <p className="text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]">
          Completing a higher education course at Eduvacity is equivalent to
          completing a course on campus. We collaborate with the world&apos;s
          best universities to offer you the best career path.
        </p>
      </div>
    </div>
  )
}

export const WhyProgrammeGrid = ({ data }: any) => {
  return (
    <div className="col-span-4 lg-md:col-span-2 lg:col-span-1 rounded-[5px] border border-[#DDDDDD] bg-white px-[20px] py-[20px]">
      <Image src={data?.icon} width={40} height={40} alt="icon" />
      <div className="text-sm font-avant-garde font-semibold text-[#071C23] mt-[50px]">
        {data?.name}
      </div>
      <p className="text-xs font-normal font-avant-garde text-[#4B4B4B] mt-[10px] leading-[30px]">
        {data.content}
      </p>
    </div>
  )
}

export const ProgramGrid = ({ data }: any) => {
  return (
    <div className="w-full max-w-[507.8px] h-[422px] rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col justify-between">
      <Image src={data?.icon} width={40} height={40} alt="icon" />
      <div className="w-full flex flex-col gap-[10px]">
        <h4 className="text-xl/[39px] font-semibold font-avant-garde text-[#071C23] tracking-[0.5px]">
          {data?.name}
        </h4>
        <p className="text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]">
          {data?.description}
        </p>
        {!data?.soon && (
          <Link
            href="/student/signup/details"
            className="flex gap-1 text-sm font-semibold font-avant-garde  text-pcolor hover:scale-[0.99]"
          >
            Get Started
            <EastIcon sx={{ fontSize: "18px" }} />
          </Link>
        )}
        {data.soon && (
          <Badge className="w-[110px] text-[#E3A229] bg-[#fff5e3] font-semibold font-avant-garde py-[5px] mt-[20px] hover:bg-[#fff5e3] rounded-[20px] shadow-[0px] flex justify-center items-center">
            Coming Soon
          </Badge>
        )}
      </div>
    </div>
  )
}
