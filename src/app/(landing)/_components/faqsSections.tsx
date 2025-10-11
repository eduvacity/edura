"use client"
import { CircledMinusIcon, CircledPlusIcon } from "@/components/SVGs"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import { useState } from "react"

const questions = [
  {
    id: 1,
    question: "Do you have post-graduate courses?",
    answer: `We do not offer postgraduate courses yet, but you can visit our website at www.Edura.com and click on explore courses to see all the courses we offer. 
`,
  },
  {
    id: 2,
    question: "Where are you located?",
    answer: `Plot 41/42 Independence Way, Kaduna, opposite ASD City Mall, Marafa.`,
  },
  {
    id: 3,
    question: "Can I work while studying?",
    answer: `Yes, you can work while studying`,
  },
  {
    id: 4,
    question: "Do you offer a scholarship?",
    answer: `Yes, we offer scholarships supported by both international and local organizations, as well as individual sponsors.`,
  },
  {
    id: 5,
    question: "What are the requirements for admission?",
    answer: `A minimum of 5 credits in WAEC, NECO, GCE, or NABTEC Math, English, and any other three subjects.`,
  },

  {
    id: 7,
    question: "What are your business hours daily?",
    answer: ` 9:00 am to 5:00 pm.`,
  },
  {
    id: 10,
    question: "Do you have a physical campus?",
    answer: `Yes, we have a physical campus at Plot 41/42 Independence Way, Kaduna, opposite ASD City Mall, Marafa`,
  },
  {
    id: 11,
    question: "Can I get job with an online degree?",
    answer: ` Yes you can get a job with an online degree, we are equipping you with in-demand skills, practical experience, and career support to boost your chances of getting hired. We also math you with employers that are looking for individuals that has the right skill set for there orgnization needs.`,
  },
  {
    id: 12,
    question: "Are Edura graduate eligible for NYSC",
    answer: `Yes, students who graduate from our degree programs offered in partnership with universities are fully eligible for NYSC. All NYSC documentation and processing are handled on the university campus, just like for on-campus students.`,
  },
  {
    id: 13,
    question: "Can I take a study break?",
    answer: `Edura students can take a study break, but the student seeking the break must provide a valid reason and submit the request to the admission officer via the program managers. `,
  },
]
export default function FaqsSection() {
  const [expanded, setExpanded] = useState<string | false>("panel1")
  const handleChange =
    (panel: string) => (event: any, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }
  return (
    <section
      id="faqs"
      className="w-full relative grid gap-6 pb-24  px-3 lg-md:px-6 xl:px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] flex flex-col justify-center items-center gap-[43px]">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col gap-1 justify-center items-center">
              <h4 className="w-[140px] px-[15px] text-pcolor text-xs/[24px] lg-md:text-[30px]/[24px] font-medium font-sans rounded-[20px] flex justify-center items-center">
                FAQs
              </h4>
              <span className="max-w-[722px] text-base/[50px] lg-md:text-2xl/[45px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left capitalize">
                Frequently asked questions
              </span>
            </div>
          </div>
          <div className="w-full max-w-[925px] rounded-br-[32px] rounded-bl-[32px] px-[2px] py-0 gap-6">
            {questions?.map((item, index) => (
              <Accordion
                key={`question-${index}`}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                sx={{
                  "&:before": {
                    display: "none", // This removes the default divider
                  },
                }}
                className={
                  expanded === `panel${index + 1}`
                    ? "bg-transparent shadow-none bg-white rounded-[15px] border border-[#DDDDDD] border-solid p-3 my-12"
                    : "bg-transparent shadow-none  border-b border-[#EAECF0]"
                }
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${index + 1}` ? (
                      <CircledMinusIcon />
                    ) : (
                      <CircledPlusIcon />
                    )
                  }
                  aria-controls={`panel${index + 1}d-content`}
                  id={`panel${index + 1}d-header`}
                  className={
                    expanded === `panel${index + 1}`
                      ? "w-full font-sans font-medium text-left text-lg text-[#011B23] border-none py-2"
                      : "w-full font-sans font-medium text-left text-lg text-[#011B23] py-4 px-4 border-none"
                  }
                >
                  {item.question}
                </AccordionSummary>
                <AccordionDetails className="w-full font-sans font-normal text-left text-base text-[#505F79] tracking-[0.5px]">
                  {item.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
