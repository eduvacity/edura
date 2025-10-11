"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import RichTextEditor from "../../../../_components/RichTextEditor"
import SubmitAssignment from "./submit"

export default function StudentTopicAssignment({ params }: any) {
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic") || "Topic"
  const description = searchParams.get("description") || "Topic description"
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAssignmentCompleted, setIsAssignmentCompleted] = useState(false)

  const currentQuestion = assignments[currentQuestionIndex]

  const handleAnswerChange = (content: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: content,
    }))
  }

  const handleNextQuestion = () => {
    if (!answers[currentQuestionIndex]) {
      alert("Please provide an answer before proceeding.")
      return
    }
    if (currentQuestionIndex < assignments.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsAssignmentCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }
  return (
    <div className="min-h-screen w-full p-2 lg:p-4 xl:p-6 flex flex-col gap-[47px]">
      <div className="w-full lg-md:h-[57px] flex gap-[17px] justify-between">
        <div className="flex flex-col ">
          <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi">
            {topic}
          </h1>
          <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
            {description}
          </span>
        </div>
        <div className="w-[126px] h-[56px] flex flex-col">
          <h4 className="font-bold font-satoshi text-[#071C23] text-xl/[27px] text-left">
            Due Date
          </h4>
          <p className="font-medium font-satoshi text-[#868686] text-left text-sm/[24.08px]">
            25th October, 2024
          </p>
        </div>
      </div>

      <div className="w-full h-full flex flex-col bg-white rounded-[10px] p-[29px_23px_41.3px_27px] gap-[180px]">
        <div className="w-full bg-white flex flex-col gap-[53px]">
          <div className="w-full flex flex-col gap-[23px]">
            <h3 className="w-full text-left text-xl/[24px] text-[#000000] font-bold font-satoshi">{`Question ${
              currentQuestionIndex + 1
            } of ${assignments.length} `}</h3>
            <p className="w-full text-left text-lg/[27px] text-[#000000] font-medium font-satoshi">
              {currentQuestion?.question}
            </p>
          </div>
          <div className="w-full h-full flex flex-col gap-4">
            <RichTextEditor
              value={answers[currentQuestionIndex] || ""}
              onChange={handleAnswerChange}
            />
            {isAssignmentCompleted ? (
              <SubmitAssignment
                answers={answers}
                topic={topic}
                description={description}
              />
            ) : (
              <div className="w-full max-w-[571px] flex gap-4">
                {currentQuestionIndex >= 1 && (
                  <button
                    className="w-[174px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-transparent border border-solid border-[#3FA46E] font-arial font-bold text-base/[18.4px] text-[#3FA46E] transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/5"
                    onClick={handlePreviousQuestion}
                    aria-label="Go to the previous question"
                  >
                    Previous
                  </button>
                )}
                <button
                  className="w-[174px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-4 rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95"
                  onClick={handleNextQuestion}
                  aria-label="Go to the next question"
                >
                  Save & Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type Question = {
  id: string
  question: string
}

const assignments: Question[] = [
  {
    id: "q1",
    question: "What is the primary principle of User-Centered Design?",
  },
  {
    id: "q2",
    question: "Which of the following is a key step in User-Centered Design?",
  },
  {
    id: "q3",
    question: "What is a user persona in User-Centered Design?",
  },
  {
    id: "q4",
    question: "Why is usability testing important in User-Centered Design?",
  },
  {
    id: "q5",
    question: "What does iterative design mean in User-Centered Design?",
  },
]
