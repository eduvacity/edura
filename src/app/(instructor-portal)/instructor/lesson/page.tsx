"use client"

import { ArrowDown } from "@/components/SVGs"
import Link from "next/link"

export default function InstructorLessons() {
  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:py-0 xl:px-0">
      {/* Layout Section */}
      <div className="w-full h-full flex flex-col lg-md:flex-row gap-6">
        {data?.map((course, index) => (
          <Link
            href={`/instructor/lesson/modules/${course.id}?course=${course.title}`}
            key={index}
            className="bg-white rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col transition-all duration-300 hover:scale-[0.99] cursor-pointer"
          >
            <div
              className="w-full h-[153px] bg-cover bg-no-repeat rounded-t-[14px] bg-center"
              style={{
                backgroundImage: `url(${course.imgSrc})`,
              }}
            ></div>

            <div className="w-full flex flex-col gap-3 px-4 py-4">
              <div className="w-full flex justify-between gap-[14px]">
                <h4 className="font-satoshi font-bold text-lg leading-[24.3px] -tracking-[0.001em] text-left text-[#4D6C62]">
                  {course.title}
                </h4>

                <div className="w-20px] h-[20px] flex justify-end items-end transform rotate-[270deg]">
                  <ArrowDown />
                </div>
              </div>

              <span className="max-w-[436px] font-satoshi font-normal text-sm leading-[24.08px] text-left text-[#868686] line-clamp-3">
                {course.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const data = [
  {
    id: "design-foundations",
    title: "Design Foundations",
    description:
      "Build the mental models every great designer relies on through visual hierarchy, Gestalt principles, colour theory, typography, grids, and layout systems.",
    imgSrc: "/images/courses/ui-1.webp",
  },
  {
    id: "user-research-empathy",
    title: "User Research & Empathy",
    description:
      "Discover how to uncover real user needs through research planning, user interviews, usability testing, observation, synthesis, and affinity mapping.",
    imgSrc: "/images/courses/ui-2.webp",
  },
  {
    id: "information-architecture",
    title: "Information Architecture",
    description:
      "Structure content and navigation so users understand where they are and where they can go using taxonomy, card sorting, site maps, flows, and navigation patterns.",
    imgSrc: "/images/courses/ui-3.webp",
  },
  {
    id: "wireframing-ideation",
    title: "Wireframing & Ideation",
    description:
      "Move from abstract ideas to tangible structures through sketching, Crazy-8s, low-fidelity wireframes, design patterns, critique, and rapid iteration.",
    imgSrc: "/images/courses/ui-4.webp",
  },
  {
    id: "interaction-design-prototyping",
    title: "Interaction Design & Prototyping",
    description:
      "Give designs motion and logic through interaction principles, Figma prototyping, component states, micro-interactions, motion, and transitions.",
    imgSrc: "/images/courses/ui-5.webp",
  },
  {
    id: "ui-design-design-systems",
    title: "UI Design & Design Systems",
    description:
      "Craft polished interfaces and reusable design systems using UI components, Figma variables, design tokens, documentation, and developer handoff.",
    imgSrc: "/images/courses/ui-6.webp",
  },
]
