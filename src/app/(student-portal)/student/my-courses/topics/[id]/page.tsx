"use client"

import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import QuizPerformanceChart from "../../../dashboard/_components/quizChart"

export default function StudentClassDetail() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const course = searchParams.get("course")

  return (
    <div className="min-h-screen w-full relative p-2 lg:p-4 xl:p-6">
      {/* Greeting Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em]">
          {course}
        </h1>
        <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
          Explore the topics in {course || "this course"} below.
        </span>
      </div>

      {/* Layout Section */}
      <div className="min-h-screen flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <section className="flex-[1] xl:max-w-[920px] w-full flex flex-col gap-[17px]">
          {(COURSE_TOPICS[params.id] || []).map((topic, index) => (
            <Link
              href={`/student/my-courses/topics/topic/${
                topic.id
              }?topic=${encodeURIComponent(topic.title)}`}
              key={index}
              className="bg-white w-full h-[91px] p-5 rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col"
            >
              <div className="w-full h-full flex justify-between items-center gap-[14px]">
                <h4 className="font-satoshi font-bold text-[16.83px] leading-[20.57px] -tracking-[0.001em] text-left text-[#2E3646]">
                  {topic.title}
                </h4>

                <div className="w-fit h-[44px] py-[11px] px-[17px] gap-[10px] rounded-[7px] bg-[#E9E9EF] flex justify-center items-center border border-solid border-[#ACACAC] transform duration-300 hover:scale-[0.99] cursor-pointer">
                  Open
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Right Section */}
        <section className="flex-[541/1461] xl:max-w-[541px] w-full">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Course Performance (Quiz) */}
            <div className="bg-white w-full h-[305px] rounded-[17px] border border-solid border-[#E5E5E5]">
              <h4 className="text-[#263238] text-base leading-[21.6px] text-left font-bold font-satoshi p-4 border-b-[3px] border-[#F0F0F0]">
                Course Performance (Quiz)
              </h4>

              <QuizPerformanceChart />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

type CourseTopic = {
  id: string
  title: string
}

const COURSE_TOPICS: Record<string, CourseTopic[]> = {
  "design-foundations": [
    {
      id: "visual-hierarchy-gestalt",
      title: "Visual Hierarchy & Gestalt",
    },
    {
      id: "color-theory-screens",
      title: "Color Theory for Screens",
    },
    {
      id: "typography-essentials",
      title: "Typography Essentials",
    },
    {
      id: "grid-layout-systems",
      title: "Grid & Layout Systems",
    },
  ],

  "user-research-empathy": [
    {
      id: "research-planning",
      title: "Research Planning",
    },
    {
      id: "user-interviews",
      title: "User Interviews",
    },
    {
      id: "usability-testing",
      title: "Usability Testing",
    },
    {
      id: "synthesis-affinity-mapping",
      title: "Synthesis & Affinity Mapping",
    },
  ],

  "information-architecture": [
    {
      id: "mental-models-taxonomy",
      title: "Mental Models & Taxonomy",
    },
    {
      id: "card-sorting",
      title: "Card Sorting",
    },
    {
      id: "site-maps-flows",
      title: "Site Maps & Flows",
    },
    {
      id: "navigation-patterns",
      title: "Navigation Patterns",
    },
  ],

  "wireframing-ideation": [
    {
      id: "sketching-techniques",
      title: "Sketching Techniques",
    },
    {
      id: "lo-fi-wireframing",
      title: "Lo-Fi Wireframing",
    },
    {
      id: "design-patterns-library",
      title: "Design Patterns Library",
    },
    {
      id: "critique-iteration",
      title: "Critique & Iteration",
    },
  ],

  "interaction-design-prototyping": [
    {
      id: "interaction-principles",
      title: "Interaction Principles",
    },
    {
      id: "figma-prototyping",
      title: "Figma Prototyping",
    },
    {
      id: "micro-interactions",
      title: "Micro-interactions",
    },
    {
      id: "motion-transitions",
      title: "Motion & Transitions",
    },
  ],

  "ui-design-design-systems": [
    {
      id: "ui-component-design",
      title: "UI Component Design",
    },
    {
      id: "figma-variables-tokens",
      title: "Figma Variables & Tokens",
    },
    {
      id: "design-system-documentation",
      title: "Design System Documentation",
    },
    {
      id: "handoff-developer-collaboration",
      title: "Handoff & Developer Collaboration",
    },
  ],
}
