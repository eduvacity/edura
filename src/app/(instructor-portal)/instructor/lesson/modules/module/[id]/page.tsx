"use client"

import ButtonCallout from "@/components/Callout/button"
import {
  AngleDown,
  ArrowRight,
  AssignmentAltIcon,
  AudioIcon,
  CodeIcon,
  EmbeddedIcon,
  PDFIcon,
  PPTIcon,
  QuizAltIcon,
  QuizIcon,
  ResourceIcon,
  TextIcon,
  VideoIcon,
} from "@/components/SVGs/portal"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function ModuleContentDetail({ params }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleId = searchParams.get("moduleId") || ""
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
  }) => {
    setCurrentTop(topic)
  }

  return (
    <div className="min-h-screen w-full  p-2 lg:p-4 xl:p-6 flex flex-col gap-[54px]">
      <div className="w-full flex flex-col lg-md:flex-row justify-between">
        <div className="flex flex-col  mb-6">
          <Link
            href={`/instructor/lesson/modules/module/${moduleId}`}
            className="flex gap-2 items-center cursor-pointer"
          >
            <ArrowRight className="transform rotate-180 text-[#4D6C62]" />
            <h1 className="text-[26px] lg-md:text-[26px] leading-[34.8px] font-bold font-satoshi -tracking-[0.001em] text-[#4D6C62]">
              Add Content
            </h1>
          </Link>
          <h4 className="text-[#464646] font-normal font-satoshi text-base text-left">
            Lorem ipsum dolor sit amet consectetur. Urna facilisis sollicitudin
            tristique dolor quisque in morbi pharetra.
          </h4>
        </div>
        <ButtonCallout
          FirstActionButton={<div>Add Content</div>}
          SecondActionButton={<div>Edit content</div>}
          ThirdActionButton={<div>Delete Content</div>}
        />
      </div>

      {/* Layout Section */}
      <div className="min-h-screen flex flex-col xl:flex-row gap-6">
        {/* Left Section */}
        <section className="flex-[541/1461] xl:max-w-[541px] w-full">
          <div className="w-full grid grid-cols-1 gap-4">
            {/* Course Performance (Quiz) */}
            <div className="w-full flex flex-col gap-[19px] ">
              {data?.map((topic, index) => {
                const isExpanded = expanded === `panel${index + 1}`
                return (
                  <Accordion
                    key={`topic-${index + 1}`}
                    expanded={isExpanded}
                    onChange={handleChange(`panel${index + 1}`)}
                    elevation={0}
                    className={
                      isExpanded
                        ? "w-full bg-white border border-solid border-[#DDDDDD] shadow-none first:rounded-t-[17px] rounded-t-[17px]"
                        : "w-full bg-white border border-solid border-[#DDDDDD] shadow-none first:rounded-t-[10px] last:rounded-b-[10px] rounded-[10px] "
                    }
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
                    {topic?.modules.map((module: any, index) => {
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
                                    `/student/my-courses/topics/topic/quiz/${topic.id}?topic=${topic.title}&description=${topic.description}`
                                  )
                                }
                              : () => handleCurrentTopicChange(module)
                          }
                        >
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
                              {module.resource === true && (
                                <div className="flex items-center gap-[10px]">
                                  <ResourceIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Resource
                                  </span>
                                </div>
                              )}
                              {module.quiz === true && (
                                <div className="flex items-center gap-[10px]">
                                  <QuizIcon className="w-[16.59px] h-[22px] text-[#7E7E7E]" />
                                  <span className="font-satoshi font-medium text-base/[21.6px] tracking-normal text-[#7E7E7E]">
                                    Quiz
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
        <section className="flex-[1] xl:max-w-[920px] w-full flex flex-col gap-[17px] overflow-y-auto">
          <div className="w-full max-w-[703px] h-[690px] rounded-[10px] border border-solid border-[#D7D7D7] bg-[#ECEDF1] flex flex-col gap-[24px]">
            <div className="w-full flex flex-col gap-[17px]">
              <div className="w-full bg-white h-[65px] flex items-center  rounded-t-[10px]">
                <h2 className="w-full px-4 font-satoshi font-bold text-[18px]/[24.3px] text-pcolor tracking-normal ">
                  Add Contents
                </h2>
              </div>
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-[17px] py-[22px] px-4">
                {contents?.map((item, index) => (
                  <Link
                    key={index}
                    href={`/instructor/lesson/modules/module/content?id=${params?.id}&type=${item.type}`}
                    className="w-[150px.33px] h-[150px.33px] bg-white flex flex-col justify-center items-center gap-[25.33px] rounded-[11.63px] border-[0.89px] border-solid border-[#BDBCBC] py-[21.98px] hover:scale-[0.99] cursor-pointer"
                  >
                    {item.icon}
                    <span className="w-full font-satoshi font-medium text-[14.07px]/[19px] tracking-normal text-center text-[#404040]">
                      {item.text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <h4 className="w-full px-4 font-satoshi font-bold text-[18px]/[24.3px] text-[#4D6C62] tracking-normal">
                More Content
              </h4>
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-[17px] py-[22px] px-4">
                {moreContents?.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/instructor/lesson/modules/module/content?id=${params?.id}&type=${item.type}`}
                    className="w-[150px.33px] h-[150px.33px] bg-white flex flex-col justify-center items-center gap-[25.33px] rounded-[11.63px] border-[0.89px] border-solid border-[#BDBCBC] py-[21.98px] hover:scale-[0.99] cursor-pointer"
                  >
                    {item.icon}
                    <span className="w-full font-satoshi font-medium text-[14.07px]/[19px] tracking-normal text-center text-[#404040]">
                      {item.text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const contents = [
  {
    icon: <TextIcon className="w-[30.96px] h-[17.69px] text-[#2C3A50]" />,
    text: "Text & Images",
    type: "text",
  },
  {
    icon: <VideoIcon className="w-[37.52px] h-[37.52px] text-[#2C3A50]" />,
    text: "Video",
    type: "video",
  },
  {
    icon: <AudioIcon className="w-[20.08px] h-[37.39px] text-[#2C3A50]" />,
    text: "Audio",
    type: "audio",
  },
  {
    icon: <PDFIcon className="w-[30.96px] h-[37.15px] text-[#2C3A50]" />,
    text: "PDF",
    type: "pdf",
  },
  {
    icon: <ResourceIcon className="w-[30.59px] h-[36.59px] text-[#2C3A50]" />,
    text: "Resources",
    type: "resources",
  },
  {
    icon: <PPTIcon className="w-[29.66px] h-[32.06px] text-[#2C3A50]" />,
    text: "PPT",
    type: "ppt",
  },
  {
    icon: <EmbeddedIcon className="w-[40.34px] h-[36.3px] text-[#2C3A50]" />,
    text: "Embeded",
    type: "embedded",
  },
  {
    icon: <CodeIcon className="w-[37.52px] h-[37.52px] text-[#2C3A50]" />,
    text: "Code Example",
    type: "code",
  },
]
const moreContents = [
  {
    icon: <QuizAltIcon className="w-[36.59px] h-[36.59px] text-[#2C3A50]" />,
    text: "Quiz",
    type: "quiz",
  },
  {
    icon: <AssignmentAltIcon className="w-[36px] h-[40px] text-[#2C3A50]" />,
    text: "Assignment",
    type: "assignment",
  },
]
const data = [
  {
    id: "2988493348",
    title: "User-Centered Design",
    description: "User-Centered Design",
    modules: [
      {
        title: "Empathy: Understand users' needs, goals, and behaviors.",
        code: true,
        text: true,
      },
      {
        title: "User involvement: Engage with users ",
        text: true,
        video: true,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",

        text: true,
        ppt: true,
        video: true,
      },
      {
        title: "Holistic design: Consider the context and ecosystem",

        text: true,
        ppt: true,
      },
      {
        title: "Contextual understanding: Study users.",

        video: true,
        audio: true,
        embedded: true,
      },
      {
        title: "Quiz",
      },
    ],
  },
]
