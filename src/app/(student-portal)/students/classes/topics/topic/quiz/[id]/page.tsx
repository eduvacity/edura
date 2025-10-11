"use client"

import CircularProgress from "@/app/(student-portal)/_components/CircularProgressbar"
import { CheckedIcon } from "@/components/SVGs/portal"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import SubmitQuiz from "./submit"

export default function StudentTopicQuiz({ params }: any) {
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic") || "Topic"
  const description = searchParams.get("description") || "Topic description"
  const defaultTime = 60000 // 1 minute in milliseconds
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeftMs, setTimeLeftMs] = useState(defaultTime)
  const [progress, setProgress] = useState(100)
  const [score, setScore] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)

  const handleOptionChange = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }))
  }

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quiz.length - 1) {
      const nextQuestionTime =
        quiz[currentQuestionIndex + 1]?.time || defaultTime
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeLeftMs(nextQuestionTime)
      setProgress(100)
    } else {
      const calculatedScore = Object.entries(selectedAnswers).reduce(
        (score, [index, answer]) =>
          answer === quiz[parseInt(index)].correct ? score + 1 : score,
        0
      )
      setScore(calculatedScore)
      setIsQuizCompleted(true)
    }
  }, [currentQuestionIndex, selectedAnswers])

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftMs((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          handleNextQuestion()
          return 0
        }
        return prev - 100
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentQuestionIndex, handleNextQuestion])

  useEffect(() => {
    setProgress((timeLeftMs / defaultTime) * 100)
  }, [timeLeftMs])

  const seconds = Math.floor(timeLeftMs / 1000)
  const ticks = Math.floor((timeLeftMs % 1000) / (1000 / 60))
  const formattedTimeLeft = `${seconds}:${String(ticks).padStart(2, "0")}`

  const percentageScore =
    quiz.length > 0 ? Math.round((score / quiz.length) * 100) : 0

  const currentQuestion = quiz[currentQuestionIndex]

  return (
    <div className="min-h-screen w-full p-2 lg:p-4 xl:p-6">
      <div className="flex flex-col mb-6">
        <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi">
          {topic}
        </h1>
        <span className="font-satoshi font-medium text-sm leading-[24.08px] text-left text-[#868686]">
          {description}
        </span>
      </div>

      <div className="w-full h-full lg:h-[800px] flex flex-col bg-white rounded-[10px] p-[29px_23px_41.3px_27px] gap-[180px]">
        <div className="w-full flex flex-col gap-[53px]">
          <div className="w-full flex flex-col gap-[47px]">
            <div className="w-full lg-md:h-[57px] flex gap-[17px] justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Instruction: </h3>
                <span className="max-w-[1146px] font-satoshi font-medium text-left text-base/[21.6px] text-[#000000]">
                  You have a 10-minute time frame to complete this 10-question
                  assessment. Each question is worth 2 marks. Upon submission,
                  your results will be displayed immediately. We wish you the
                  best of luck.
                </span>
              </div>
              {!isQuizCompleted && (
                <Timer percentage={progress} timeLeft={formattedTimeLeft} />
              )}
            </div>
          </div>
          {isQuizCompleted ? (
            <div className="w-full h-[260px] p-4 lg:p-6 flex flex-col items-center justify-center gap-4">
              <h1 className="text-[26px] lg-md:text-[28px] font-bold font-satoshi">
                Quiz Completed!
              </h1>
              <p className="text-lg font-satoshi font-semibold">
                Your Score: {score} / {quiz.length}
              </p>
              <CircularProgress
                className="w-[180px] h-[180px]"
                percentage={percentageScore}
              />
            </div>
          ) : (
            <div className="w-full h-[260px] bg-white flex flex-col gap-[53px]">
              <h3 className="w-full text-left text-xl/[30px] text-[#000000] font-medium font-satoshi">
                {`${currentQuestionIndex + 1}. ${currentQuestion?.question}`}
              </h3>
              <div className="flex flex-col gap-4">
                {Object.entries(currentQuestion?.options || {}).map(
                  ([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center gap-[23px] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={key}
                        checked={selectedAnswers[currentQuestionIndex] === key}
                        onChange={() => handleOptionChange(key)}
                        className="peer hidden"
                      />
                      <div className="w-7 h-7 border-2 border-[#3FA46E] rounded-full flex items-center justify-center peer-checked:bg-transparent">
                        {selectedAnswers[currentQuestionIndex] === key && (
                          <CheckedIcon />
                        )}
                      </div>
                      <span className="text-[#16191D] text-lg/[27px] text-left font-normal font-satoshi">
                        {value}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        {isQuizCompleted ? (
          <SubmitQuiz
            answers={selectedAnswers}
            topic={topic}
            description={description}
          />
        ) : (
          <div className="w-full max-w-[371px] flex gap-4">
            {currentQuestionIndex >= 1 && (
              <button
                className="w-[174px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-transparent border border-solid border-[#3FA46E] font-arial font-bold text-base/[18.4px] text-[#3FA46E] transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/5 flex justify-center items-center"
                onClick={handlePreviousQuestion}
              >
                Previous
              </button>
            )}
            <button
              className="w-[174px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95 flex justify-center items-center"
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestionIndex]}
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

type Question = {
  id: string
  question: string
  options: Record<string, string> // Key-value pairs for options
  correct: string
  time?: number
}

const quiz: Question[] = [
  {
    id: "q1",
    question: "What is the primary principle of User-Centered Design?",
    options: {
      a: "Focus on business needs",
      b: "Prioritize user needs and goals",
      c: "Minimize user feedback",
      d: "Follow strict design guidelines",
    },
    correct: "b",
  },
  {
    id: "q2",
    question: "Which of the following is a key step in User-Centered Design?",
    options: {
      a: "Conducting user research",
      b: "Eliminating user involvement",
      c: "Ignoring user preferences",
      d: "Developing for stakeholders only",
    },
    correct: "a",
  },
  {
    id: "q3",
    question: "What is a user persona in User-Centered Design?",
    options: {
      a: "A real user using the system",
      b: "A competitor's profile",
      c: "A fictional representation of a target user",
      d: "A system performance metric",
    },
    correct: "c",
  },
  {
    id: "q4",
    question: "Why is usability testing important in User-Centered Design?",
    options: {
      a: "To reduce production costs",
      b: "To identify user needs and pain points",
      c: "To focus on technical implementation",
      d: "To validate marketing strategies",
    },
    correct: "b",
  },
  {
    id: "q5",
    question: "What does iterative design mean in User-Centered Design?",
    options: {
      a: "A one-time design approach",
      b: "Continuous improvements based on user feedback",
      c: "Skipping the prototyping phase",
      d: "Designing for the development team only",
    },
    correct: "b",
  },
  {
    id: "q6",
    question: "Which of these is NOT a principle of User-Centered Design?",
    options: {
      a: "Early user involvement",
      b: "Iterative evaluation",
      c: "Stakeholder-only feedback",
      d: "Focus on user goals",
    },
    correct: "c",
  },
  {
    id: "q7",
    question: "What is the purpose of a user journey map in UCD?",
    options: {
      a: "To document development timelines",
      b: "To visually represent a user’s interaction with a system",
      c: "To design the visual appearance of a product",
      d: "To track competitors’ strategies",
    },
    correct: "b",
  },
  {
    id: "q8",
    question: "In UCD, what is the benefit of contextual inquiry?",
    options: {
      a: "Observing users in their natural environment",
      b: "Designing without user involvement",
      c: "Reducing the need for prototyping",
      d: "Collecting business requirements",
    },
    correct: "a",
  },
  {
    id: "q9",
    question: "Which phase comes first in User-Centered Design?",
    options: {
      a: "Prototyping",
      b: "Implementation",
      c: "User research",
      d: "Visual design",
    },
    correct: "c",
  },
  {
    id: "q10",
    question:
      "What does the 'user-centered' in User-Centered Design emphasize?",
    options: {
      a: "Creating designs that meet technical standards",
      b: "Prioritizing user needs, preferences, and behaviors",
      c: "Focusing only on aesthetic elements",
      d: "Minimizing user involvement to save time",
    },
    correct: "b",
  },
]

function Timer({
  percentage,
  timeLeft,
}: {
  percentage: number
  timeLeft: string
}) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  // Calculate stroke dasharray and stroke dashoffset based on the percentage
  const radius = 50 // Radius of the circle
  const strokeWidth = 10 // Stroke width of the circle
  const circumference = 2 * Math.PI * radius // Circumference of the circle
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference // Offset the stroke based on the percentage

  return (
    <div className="relative w-[70px] h-[70px] flex items-center justify-center">
      <svg
        width="70"
        height="70"
        className="transform -rotate-90"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#AEAEAE"
          opacity="0.3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#3FA46E"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-inter font-semibold text-sm text-[#3FA46E] -tracking-[0.001em]">
        {timeLeft}
      </span>
    </div>
  )
}
