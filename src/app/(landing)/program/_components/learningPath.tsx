"use client"
import { AngleDown } from "@/components/SVGs"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import { useState } from "react"

export default function LearningPathSection({ paths }: any) {
  const [expanded, setExpanded] = useState<string | false>("panel1")
  const handleChange =
    (panel: string) => (event: any, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }
  return (
    <div className="w-full flex flex-col gap-[12px]">
      {paths?.map((item: any, index: number) => {
        return (
          <Accordion
            key={`question-${index}`}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            className="rounded-lg border border-[#EAECF0] shadow-none"
          >
            <AccordionSummary
              expandIcon={
                <AngleDown
                  className={`transform transition-transform duration-300 ${
                    expanded === `panel${index + 1}` ? "rotate-180" : ""
                  }`}
                />
              }
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
              className="w-full py-[10.5px] px-[15px] font-medium font-avant-garde text-base"
              style={{
                height: expanded === `panel${index + 1}` ? "auto" : "53px",
              }}
            >
              {item.title}
            </AccordionSummary>
            <AccordionDetails className="w-full px-6 flex flex-col gap-4">
              {item?.details && Object.values(item?.details)?.length !== 0 ? (
                Object.values(item?.details)?.map((list: any, i: number) => {
                  return (
                    <p
                      key={i}
                      className="w-full font-avant-garde font-medium text-left text-base text-[#788B8F] -tracking-[0.02em]"
                    >
                      <span>&bull;</span> {list.label}
                    </p>
                  )
                })
              ) : (
                <p className="w-full font-avant-garde font-medium text-left text-base text-[#788B8F]">
                  No content available.
                </p>
              )}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
