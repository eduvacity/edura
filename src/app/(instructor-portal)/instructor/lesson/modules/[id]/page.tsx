"use client"

import { ArrowRight } from "@/components/SVGs/portal"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function LessonModules({ params }: any) {
  const searchParams = useSearchParams()
  const course = searchParams.get("course")

  return (
    <div className="w-full relative p-2 lg:p-4 xl:py-6 xl:px-0 flex flex-col gap-[54px]">
      <div className="w-full flex flex-col lg-md:flex-row justify-between">
        <Link
          href={`/instructor/lesson`}
          className="flex mb-6 gap-2 items-center cursor-pointer"
        >
          <ArrowRight className="transform rotate-180 text-[#4D6C62]" />
          <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em] text-[#4D6C62]">
            {course}
          </h1>
        </Link>
      </div>

      {/* Layout Section */}
      <div className="w-full flex flex-col lg-md:flex-row gap-6">
        {(COURSE_MODULES[params.id] || [])?.map((course, index) => (
          <Link
            href={`/instructor/lesson/modules/${params.id}/add?course=${encodeURIComponent(
              course.id,
            )}`}
            key={index}
            className="bg-white w-full h-[177px] py-5 px-4 rounded-[14px] border border-solid border-[#DDDDDD] flex flex-col transition-all  duration-300 hover:scale-[0.99] cursor-pointer"
          >
            <div className="w-full h-full flex flex-col gap-[13px]">
              <h4 className="font-satoshi font-bold text-[22px] leading-[25.57px] -tracking-[0.001em] text-left text-[#4D6C62]">
                {course.title}
              </h4>
              <span className="max-w-[400px] font-satoshi font-normal text-sm leading-[24.08px] line-clamp-3 text-left text-[#868686] text-ellipsis">
                {course.description}
              </span>
            </div>
            <div className="w-full flex justify-between gap-1">
              {course?.published ? (
                <span className="w-fit h-[27.38px] py-[7.69px] px-[11.54px] flex gap-[7.69px] rounded-[17px] border-[0.77px] border-solid border-[#E3E3E3] bg-[#E0FAEC] font-satoshi font-normal text-[10.77px] leading-[12.38px] text-left text-[#545454] uppercase">
                  Published
                </span>
              ) : (
                <span className="w-fit h-[27.38px] py-[7.69px] px-[11.54px] flex gap-[7.69px] rounded-[17px] border-[0.77px] border-solid border-[#E3E3E3] bg-[#E4EDF5] font-satoshi font-normal text-[10.77px] leading-[12.38px] text-left text-[#545454] uppercase">
                  Unpublished
                </span>
              )}
              <div className="w-full h-[20px] flex justify-end items-end">
                <ArrowRight className="text-[#868686]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

type LessonModule = {
  id: string
  title: string
  description: string
  published: boolean
}

const COURSE_MODULES: Record<string, LessonModule[]> = {
  "design-foundations": [
    {
      id: "visual-hierarchy-gestalt",
      title: "Introduction",
      description:
        "Learn how the eye moves across a screen and how to direct attention using size, contrast, alignment, and proximity.",
      published: true,
    },
    {
      id: "color-theory-screens",
      title: "Color Theory for Screens",
      description:
        "Understand hue, saturation, and value while building accessible, consistent, and on-brand colour palettes for digital products.",
      published: true,
    },
    {
      id: "typography-essentials",
      title: "Typography Essentials",
      description:
        "Explore type anatomy, pairing logic, scale systems, readability, and typography best practices for digital interfaces.",
      published: false,
    },
    {
      id: "grid-layout-systems",
      title: "Grid & Layout Systems",
      description:
        "Use columns, gutters, spacing, and baseline grids to create structured, balanced, and scannable interface layouts.",
      published: false,
    },
  ],

  "user-research-empathy": [
    {
      id: "research-planning",
      title: "Research Planning",
      description:
        "Define research goals, select appropriate methods, and prepare discussion guides that produce meaningful user insights.",
      published: true,
    },
    {
      id: "user-interviews",
      title: "User Interviews",
      description:
        "Learn facilitation techniques, active listening, and how to ask effective questions without leading participants.",
      published: true,
    },
    {
      id: "usability-testing",
      title: "Usability Testing",
      description:
        "Plan moderated and unmoderated usability tests, define tasks, record observations, and reduce research bias.",
      published: false,
    },
    {
      id: "synthesis-affinity-mapping",
      title: "Synthesis & Affinity Mapping",
      description:
        "Turn research notes into patterns, affinity diagrams, insight statements, and validated design opportunities.",
      published: false,
    },
  ],

  "information-architecture": [
    {
      id: "mental-models-taxonomy",
      title: "Mental Models & Taxonomy",
      description:
        "Understand how users categorise information and organise content in ways that reduce cognitive load.",
      published: true,
    },
    {
      id: "card-sorting",
      title: "Card Sorting",
      description:
        "Run open and closed card-sorting sessions, analyse the findings, and translate results into clear content structures.",
      published: true,
    },
    {
      id: "site-maps-flows",
      title: "Site Maps & Flows",
      description:
        "Create site maps and task flows that clearly communicate product structure and user journeys.",
      published: false,
    },
    {
      id: "navigation-patterns",
      title: "Navigation Patterns",
      description:
        "Explore global navigation, local navigation, tabs, breadcrumbs, and when each pattern should be used.",
      published: false,
    },
  ],

  "wireframing-ideation": [
    {
      id: "sketching-techniques",
      title: "Sketching Techniques",
      description:
        "Use Crazy-8s, storyboards, and thumbnail wireframes to explore design ideas quickly and effectively.",
      published: true,
    },
    {
      id: "lo-fi-wireframing",
      title: "Lo-Fi Wireframing",
      description:
        "Translate sketches into grayscale digital wireframes in Figma using components, structure, and annotations.",
      published: true,
    },
    {
      id: "design-patterns-library",
      title: "Design Patterns Library",
      description:
        "Study common interface patterns such as forms, modals, carousels, cards, and empty states.",
      published: false,
    },
    {
      id: "critique-iteration",
      title: "Critique & Iteration",
      description:
        "Run structured design critiques, give actionable feedback, and improve designs through purposeful iteration.",
      published: false,
    },
  ],

  "interaction-design-prototyping": [
    {
      id: "interaction-principles",
      title: "Interaction Principles",
      description:
        "Apply feedback, affordance, discoverability, and mapping to create intuitive digital interactions.",
      published: true,
    },
    {
      id: "figma-prototyping",
      title: "Figma Prototyping",
      description:
        "Use Smart Animate, component states, overlays, and scrolling interactions to create realistic prototypes.",
      published: true,
    },
    {
      id: "micro-interactions",
      title: "Micro-interactions",
      description:
        "Design loading states, button feedback, form validation, and other small moments that improve the user experience.",
      published: false,
    },
    {
      id: "motion-transitions",
      title: "Motion & Transitions",
      description:
        "Use easing, duration, and motion principles to communicate hierarchy, feedback, and changes in interface state.",
      published: false,
    },
  ],

  "ui-design-design-systems": [
    {
      id: "ui-component-design",
      title: "UI Component Design",
      description:
        "Design reusable buttons, inputs, cards, badges, and other interface components with all required states.",
      published: true,
    },
    {
      id: "figma-variables-tokens",
      title: "Figma Variables & Tokens",
      description:
        "Create colour, typography, spacing, and other design tokens and apply them consistently across a design system.",
      published: true,
    },
    {
      id: "design-system-documentation",
      title: "Design System Documentation",
      description:
        "Write clear usage guidelines, accessibility notes, and do-and-don't examples for reusable components.",
      published: false,
    },
    {
      id: "handoff-developer-collaboration",
      title: "Handoff & Developer Collaboration",
      description:
        "Prepare specifications, use Figma Dev Mode, document design decisions, and collaborate effectively with developers.",
      published: false,
    },
  ],
}
