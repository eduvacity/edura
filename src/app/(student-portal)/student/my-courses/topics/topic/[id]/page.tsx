"use client"

import {
  AngleDown,
  AudioIcon,
  CheckedRadiusButton,
  CodeIcon,
  EmbeddedIcon,
  PDFIcon,
  PPTIcon,
  TextIcon,
  UnCheckedRadiusButton,
  VideoIcon,
} from "@/components/SVGs/portal"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import CodeSection from "../../../_components/Code"
import EmbeddedSection from "../../../_components/EmbeddedSection"
import PDFSection from "../../../_components/PDFSection"
import PPTSection from "../../../_components/PPTSection"
import TextSection from "../../../_components/TextSection"
import VideoSection from "../../../_components/VideoSection"
import { cn } from "@/lib/utils"

const AudioPlayer = dynamic(() => import("../../../_components/AudioPlayer"), {
  ssr: false,
})

export default function StudentTopicDetail({ params }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic") || "Topic"
  const [currentTopic, setCurrentTop] = useState<any>(null)
  const [expanded, setExpanded] = useState<string | false>("panel1")

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleCurrentTopicChange = (topic: {
    title: string
    code: boolean
    text: boolean
    pdf: boolean
    ppt: boolean
    video: boolean
    audio: boolean
    embedded: boolean
    progress: number
  }) => {
    setCurrentTop(topic)
  }

  return (
    <div className="min-h-screen w-full  p-2 lg:p-4 xl:p-6">
      {/* Greeting Section */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi -tracking-[0.001em]">
          {topic}
        </h1>
        <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
          Explore the details of {topic} and its modules below.
        </span>
      </div>

      {/* Layout Section */}
      <div className="min-h-screen flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <section className="flex-[541/1461] xl:max-w-[541px] w-full">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Course Performance (Quiz) */}
            <div className="w-full flex flex-col gap-[19px]">
              {data?.map((topic, index) => {
                const isExpanded = expanded === `panel${index + 1}`
                return (
                  <Accordion
                    key={`topic-${index + 1}`}
                    expanded={isExpanded}
                    onChange={handleChange(`panel${index + 1}`)}
                    elevation={0}
                    className={cn(
                      "px-4",
                      isExpanded
                        ? "w-full bg-white border border-solid border-[#DDDDDD] shadow-none first:rounded-t-[17px] rounded-t-[17px]"
                        : "w-full bg-white border border-solid border-[#DDDDDD] shadow-none first:rounded-t-[10px] last:rounded-b-[10px] rounded-[10px] ",
                    )}
                    sx={{
                      "&.MuiAccordion-root:before": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <AngleDown
                          className={
                            isExpanded ? "text-black" : "text-black/40"
                          }
                        />
                      }
                      aria-controls={`panel${index + 1}bh-content`}
                      id={`panel${index + 1}bh-header`}
                      className="h-[91px] place-content-center"
                    >
                      <h4
                        className={
                          isExpanded
                            ? "text-[#263238] text-base leading-[21.6px] text-left font-bold font-satoshi"
                            : "text-[#263238] text-base leading-[21.6px] text-left font-bold font-satoshi opacity-40"
                        }
                      >
                        {topic.title}
                      </h4>
                    </AccordionSummary>
                    {topic?.modules.map((module, index) => {
                      return (
                        <AccordionDetails
                          key={index}
                          className={
                            currentTopic?.title === module.title
                              ? "bg-[#EAFFF4] border-l-[5px] border-l-[#3FA46E] border-t border-[#DDDDDD] w-full h-[99px] p-[21px_42.5px_22px_23.5px] flex gap-[15px] items-center cursor-pointer"
                              : "border-t border-[#DDDDDD] w-full h-[99px] p-[21px_42.5px_22px_23.5px] flex gap-[15px] items-center cursor-pointer"
                          }
                          onClick={
                            module.title.toLowerCase() === "quiz"
                              ? () => {
                                  router.push(
                                    `/student/my-courses/topics/topic/quiz/${topic.id}?topic=${topic.title}&description=${topic.description}`,
                                  )
                                }
                              : () => handleCurrentTopicChange(module)
                          }
                        >
                          {module.progress === 100 ? (
                            <CheckedRadiusButton className="flex-shrink-0" />
                          ) : (
                            <UnCheckedRadiusButton className="flex-shrink-0" />
                          )}
                          <div className="flex flex-col gap-[12px]">
                            <p className="font-satoshi font-medium text-base leading-[21.6px] text-left">
                              {module.title}
                            </p>
                            <div className="flex gap-[15px]">
                              {module.code === true && (
                                <div className="flex items-center gap-[10px]">
                                  <CodeIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Code
                                  </span>
                                </div>
                              )}
                              {module.text === true && (
                                <div className="flex items-center gap-[10px]">
                                  <TextIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Text
                                  </span>
                                </div>
                              )}
                              {module.pdf === true && (
                                <div className="flex items-center gap-[10px]">
                                  <PDFIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    PDF
                                  </span>
                                </div>
                              )}
                              {module.ppt === true && (
                                <div className="flex items-center gap-[10px]">
                                  <PPTIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    PPT
                                  </span>
                                </div>
                              )}
                              {module.video === true && (
                                <div className="flex items-center gap-[10px]">
                                  <VideoIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Video
                                  </span>
                                </div>
                              )}
                              {module.audio === true && (
                                <div className="flex items-center gap-[10px]">
                                  <AudioIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Audio
                                  </span>
                                </div>
                              )}
                              {module.embedded === true && (
                                <div className="flex items-center gap-[10px]">
                                  <EmbeddedIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Embedded
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </AccordionDetails>
                      )
                    })}
                  </Accordion>
                )
              })}
            </div>
          </div>
        </section>
        {/* Right Section */}
        <section className="flex-[1] min-h-screen xl:max-w-[920px] w-full flex flex-col gap-[17px] overflow-y-auto">
          {/* {currentTopic?.code === true && <CodeSection />} */}
          {currentTopic?.audio === true && <AudioPlayer />}
          {currentTopic?.video === true && <VideoSection />}
          {currentTopic?.text === true && <TextSection />}
          {currentTopic?.pdf === true && <PDFSection />}
          {currentTopic?.ppt === true && <PPTSection />}
          {currentTopic?.embedded === true && <EmbeddedSection />}
        </section>
      </div>
    </div>
  )
}

const data = [
  {
    id: "2988493348",
    title: "User-Centered Design",
    description: "User-Centered Design",
    modules: [
      {
        title: "Empathy: Understand users' needs, goals, and behaviors.",
        code: false,
        text: true,
        pdf: true,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 100,
      },
      {
        title: "User involvement: Engage with users ",
        code: false,
        text: true,
        pdf: false,
        ppt: true,
        video: true,
        audio: false,
        embedded: false,
        progress: 65,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",
        code: false,
        text: true,
        pdf: false,
        ppt: true,
        video: true,
        audio: false,
        embedded: false,
        progress: 55,
      },
      {
        title: "Contextual understanding: Study users.",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: true,
        audio: true,
        embedded: true,
        progress: 95,
      },
      {
        title: "Quiz",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
    ],
  },
  {
    id: "2988493318",
    title: "User Journey Mapping",
    description: "User Journey Mapping",
    modules: [
      {
        title: "Empathy: Understand users' needs, goals, and behaviors.",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: false,
        audio: true,
        embedded: false,
        progress: 65,
      },
      {
        title: "User involvement: Engage with users",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: true,
        audio: false,
        embedded: false,
        progress: 85,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",
        code: false,
        text: true,
        pdf: false,
        ppt: true,
        video: true,
        audio: false,
        embedded: false,
        progress: 55,
      },
      {
        title: "Contextual understanding: Study users.",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: true,
        audio: true,
        embedded: true,
        progress: 95,
      },
      {
        title: "Quiz",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
    ],
  },
  {
    id: "1188493348",
    title: "Wireframing and Prototyping",
    description: "Wireframing and Prototyping",
    modules: [
      {
        title: "Empathy: Understand users' needs, goals, and behaviors.",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
      {
        title: "User involvement: Engage with users ",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: true,
        audio: false,
        embedded: false,
        progress: 85,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",
        code: false,
        text: true,
        pdf: false,
        ppt: true,
        video: true,
        audio: false,
        embedded: false,
        progress: 55,
      },
      {
        title: "Contextual understanding: Study users.",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: true,
        audio: true,
        embedded: true,
        progress: 95,
      },
      {
        title: "Quiz",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
    ],
  },
  {
    id: "1188493348",
    title: "Clarity and Simplicity",
    description: "Clarity and Simplicity",
    modules: [
      {
        title: "Empathy: Understand users' needs, goals, and behaviors.",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
      {
        title: "User involvement: Engage with users ",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: true,
        audio: false,
        embedded: false,
        progress: 85,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",
        code: false,
        text: true,
        pdf: false,
        ppt: true,
        video: true,
        audio: false,
        embedded: false,
        progress: 55,
      },
      {
        title: "Contextual understanding: Study users.",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: true,
        audio: true,
        embedded: true,
        progress: 95,
      },
      {
        title: "Quiz",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
    ],
  },
  {
    id: "238493348",
    title: "Consistency and Standard",
    description: "Clarity and Simplicity",
    modules: [
      {
        title: "Empathy: Understand users' needs, goals, and behaviors.",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
      {
        title: "User involvement: Engage with users ",
        code: false,
        text: true,
        pdf: false,
        ppt: false,
        video: true,
        audio: false,
        embedded: false,
        progress: 85,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",
        code: false,
        text: true,
        pdf: false,
        ppt: true,
        video: true,
        audio: false,
        embedded: false,
        progress: 55,
      },
      {
        title: "Contextual understanding: Study users.",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: true,
        audio: true,
        embedded: true,
        progress: 95,
      },
      {
        title: "Quiz",
        code: false,
        text: false,
        pdf: false,
        ppt: false,
        video: false,
        audio: false,
        embedded: false,
        progress: 65,
      },
    ],
  },
]
