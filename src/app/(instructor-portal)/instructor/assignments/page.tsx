"use client"
import {
  BiologyIcon,
  EnglishIcon,
  GeographyIcon,
  JavaIcon,
  MathIcon,
  PhysicsIcon,
} from "@/components/SVGs/portal"
import Link from "next/link"

// Define the union type for valid keys
type CourseKey = "mat" | "phy" | "eng" | "bio" | "geo" | "java"

// Define courseDetails using the union type
const courseDetails: Record<
  CourseKey,
  { color: string; src: string; icon: React.ReactNode }
> = {
  mat: { color: "#437EF7", src: "/math-vector.svg", icon: <MathIcon /> },
  phy: { color: "#FEB76A", src: "/physics-vector.svg", icon: <PhysicsIcon /> },
  eng: { color: "#EF5A0D", src: "/english-vector.svg", icon: <EnglishIcon /> },
  bio: { color: "#F14FAD", src: "/biology-vector.svg", icon: <BiologyIcon /> },
  geo: {
    color: "#2C3A50",
    src: "/geography-vector.svg",
    icon: <GeographyIcon />,
  },
  java: { color: "#2C3A50", src: "/java-vector.svg", icon: <JavaIcon /> },
}

function getCourseKey(course: string): CourseKey | null {
  const key = course.split(" ")[0].toLowerCase() as CourseKey
  return key in courseDetails ? key : null
}

function CourseAvatar({
  color,
  icon,
}: {
  color: string
  icon: React.ReactNode
}) {
  return (
    <div
      className="w-[57.03px] h-[57.03px] rounded-[59.4px] text-white flex justify-center items-center"
      style={{ background: color }}
    >
      {icon}
    </div>
  )
}

export default function Assignments() {
  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:p-6">
      <div className="w-full max-w-[583px] flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em]">
          Assignment
        </h1>
        <span className="font-satoshi font-normal text-lg leading-[27.9px] text-left text-[#494949]">
          Create and manage courses in your school.
        </span>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-[47px]">
        <div className="w-full max-w-[1501px] grid grid-cols-1 lg-md:grid-cols-3 gap-6">
          {assignments.map((item, index) => {
            const key = getCourseKey(item.course)
            if (key) {
              const { color, src, icon } = courseDetails[key]

              return (
                <Link
                  href={`/instructor/assignments/assignment/${item.id}`}
                  key={`${item.id}-${index}`}
                  className="bg-white w-full h-[126px] px-4 rounded-[14.03px] border-[0.93px] border-solid border-[#DDDDDD] relative flex items-center cursor-pointer"
                >
                  <div
                    className="absolute w-full h-full bg-no-repeat left-auto right-0 bottom-0"
                    style={{
                      backgroundImage: `url(${src})`,
                      backgroundPosition: "right bottom",
                    }}
                  />
                  <div className="w-[258px] flex gap-[14px]">
                    <CourseAvatar color={color} icon={icon} />
                    <div className="flex flex-col gap-[5px]">
                      <h4 className="font-arial font-bold text-lg leading-[20.57px] text-left text-[#2E3646] tracking-[0.1%]">
                        {item.course}
                      </h4>
                      <span className="max-w-[200px] font-satoshi font-medium text-sm leading-[27.29px] -tracking-[0.1%] text-left text-[#5B5B5B]">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

const assignments = [
  {
    id: "as01",
    course: "MAT 102",
    type: "Objectives",
  },
  {
    id: "as02",
    course: "PHY 101",
    type: "Theory",
  },
  {
    id: "as03",
    course: "ENG 103",
    type: "Theory",
  },
  {
    id: "as04",
    course: "BIO 104",
    type: "Objective",
  },
  {
    id: "as05",
    course: "Geo 104",
    type: "Objective",
  },
  {
    id: "as06",
    course: "Java 103",
    type: "Code test",
  },
]
