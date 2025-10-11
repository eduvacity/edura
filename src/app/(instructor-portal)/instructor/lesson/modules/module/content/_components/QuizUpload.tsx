"use client"

import SubmitButton from "@/components/Button"
import {
  ArrowRight,
  CheckedIcon,
  CircledPlusIcon,
  DeleteIcon,
  DragAndDropIcon,
  ImageIcon,
  PlusIcon,
} from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import SubmitUpload from "../submit"

/** Types for questions and options */
interface Option {
  text: string
  isCorrect: boolean
}

interface Question {
  text: string
  image?: string
  options: Option[]
}

/** Helper function to reorder questions */
function reorder(
  list: Question[],
  startIndex: number,
  endIndex: number
): Question[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const clsx =
  "w-full h-[56px] py-[18px] px-6 rounded-[7px] border border-[#DDDDDD] text-[#4D6C62] bg-[#F5F6F7] focus:outline-none"

export default function QuizUpload({ moduleId }: { moduleId: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([
    {
      text: "",
      image: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  /** Native drag event handlers */
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", index.toString())
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault()
    if (draggedIndex === null) return
    if (dropIndex === draggedIndex) return
    const newQuestions = reorder(questions, draggedIndex, dropIndex)
    setQuestions(newQuestions)
    setDraggedIndex(null)
  }

  /** Quiz builder functions */
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        image: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ])
  }

  const handleRemoveQuestion = (qIndex: number) => {
    setQuestions((prev) => prev.filter((_, index) => index !== qIndex))
  }

  const handleQuestionChange = (
    qIndex: number,
    field: "text" | "image",
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q, index) => (index === qIndex ? { ...q, [field]: value } : q))
    )
  }

  const handleAddOption = (qIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index === qIndex
          ? { ...q, options: [...q.options, { text: "", isCorrect: false }] }
          : q
      )
    )
  }

  const handleRemoveOption = (qIndex: number, oIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index === qIndex
          ? { ...q, options: q.options.filter((_, i) => i !== oIndex) }
          : q
      )
    )
  }

  const handleOptionTextChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q, index) => {
        if (index === qIndex) {
          const updatedOptions = q.options.map((opt, i) =>
            i === oIndex ? { ...opt, text: value } : opt
          )
          return { ...q, options: updatedOptions }
        }
        return q
      })
    )
  }

  const handleMarkCorrect = (qIndex: number, oIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, index) => {
        if (index === qIndex) {
          const updatedOptions = q.options.map((opt, i) => ({
            ...opt,
            isCorrect: i === oIndex,
          }))
          return { ...q, options: updatedOptions }
        }
        return q
      })
    )
  }

  const handleCancel = () => {
    setQuestions([
      {
        text: "",
        image: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ])
    alert("Quiz creation cancelled")
  }

  const handleSubmit = () => {
    console.log("Quiz saved:", questions)
    alert("Quiz saved! Check console for details.")
  }

  return (
    <div className="min-h-screen w-full p-2 lg:p-4 xl:p-6 flex flex-col gap-[54px]">
      {isSubmitted ? (
        <SubmitUpload
          submitted={isSubmitted}
          reUpload={() => setIsSubmitted(false)}
          back={`/instructor/lesson/modules/module/${moduleId}`}
        />
      ) : (
        <>
          <div className="w-full flex flex-col lg-md:flex-row justify-between">
            <div className="flex flex-col mb-6">
              <Link
                href={`/instructor/lesson/modules/module/${moduleId}`}
                className="flex gap-2 items-center cursor-pointer"
              >
                <ArrowRight className="transform rotate-180 text-[#4D6C62]" />
                <h1 className="text-xl lg-md:text-[24px] leading-[30.8px] font-bold font-satoshi tracking-normal text-[#4D6C62]">
                  Quiz
                </h1>
              </Link>
            </div>
            <div className="w-[246px] h-[48px] flex gap-3">
              <button
                type="button"
                className="w-[123px] h-full py-[18px] px-[36px] rounded-[7px] border border-pcolor font-satoshi text-base text-pcolor hover:scale-[0.99] flex justify-center items-center"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <SubmitButton
                onClick={handleSubmit}
                className="w-[107px] h-full py-[18px] px-[36px] rounded-[7px]"
              >
                Save
              </SubmitButton>
            </div>
          </div>
          <div className="w-full max-w-[1499px] border border-solid border-[#DDDDDD] rounded-2xl flex flex-col gap-[2px] bg-white py-4">
            {/* Questions List */}
            <div className="w-full max-w-[1424px] flex flex-col gap-[29px] pb-[20px] px-[37.5px]">
              {questions.map((question, qIndex) => {
                return (
                  <div
                    key={qIndex}
                    draggable
                    onDragStart={(e) => handleDragStart(e, qIndex)}
                    onDragOver={(e) => handleDragOver(e, qIndex)}
                    onDrop={(e) => handleDrop(e, qIndex)}
                    className=" w-full flex flex-col"
                  >
                    <div className="flex justify-between items-center">
                      <div className="h-[30px] flex gap-2 items-center">
                        <DragAndDropIcon className="w-[11px] h-[28.58px]" />
                        <h2 className="font-satoshi font-medium text-[20px] leading-[30px] text-black tracking-normal">
                          Question {qIndex + 1}
                        </h2>
                      </div>

                      <div className="w-[191px] h-[46px] flex gap-3">
                        <button
                          type="button"
                          className="w-[75px] py-2 px-4 rounded-[7px] border border-[#DFE2E6] font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="w-[81px] py-[11px] px-4 rounded-[7px] bg-[#011B23] border border-[#DFE2E6] font-satoshi text-base text-white hover:scale-[0.99]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex flex-col">
                      {/* Question Text */}
                      <div className="w-full h-[104px] py-6 pl-5 pr-10 border-t border-l border-solid border-[#F3F5F6]">
                        <input
                          type="text"
                          placeholder="Enter question here"
                          value={question.text}
                          onChange={(e) =>
                            handleQuestionChange(qIndex, "text", e.target.value)
                          }
                          className={clsx}
                        />
                      </div>
                      {/* Image URL */}

                      <label className="flex gap-4 w-fit h-[43.21px] rounded-2xl py-2 font-satoshi font-normal text-base tracking-normal text-[#011B23]">
                        <ImageIcon /> Add Image
                        <input
                          type="file"
                          placeholder="Enter image URL"
                          value={question.image}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "image",
                              e.target.value
                            )
                          }
                          className="hidden w-full border border-gray-300 rounded p-2"
                        />
                      </label>
                    </div>
                    {/* Image Preview */}
                    {question.image && (
                      <Image
                        width={200}
                        height={200}
                        src={question.image}
                        alt="Question preview"
                        className="w-full max-h-40 object-cover border rounded"
                      />
                    )}

                    {/* Options */}
                    <h3 className="font-satoshi font-medium text-xl leading-[30px] tracking-normal text-black">
                      Choose right Answer
                    </h3>
                    <div className="w-full flex flex-col">
                      <div className="w-full py-6 pl-5 pr-10 border-t border-l border-solid border-[#F3F5F6]">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={oIndex}
                            className="w-full relative flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              placeholder="Enter option here"
                              value={option.text}
                              onChange={(e) =>
                                handleOptionTextChange(
                                  qIndex,
                                  oIndex,
                                  e.target.value
                                )
                              }
                              className={clsx}
                            />
                            <div className="w-[63px] flex items-center justify-between absolute right-3">
                              <label className="flex items-center gap-[23px] cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  checked={option.isCorrect}
                                  onChange={() =>
                                    handleMarkCorrect(qIndex, oIndex)
                                  }
                                  className="peer hidden"
                                />
                                <div
                                  className="w-[25.57px] h-[25.57px] border-2 border-[#3FA46E] rounded-full flex items-center justify-center peer-checked:bg-transparent"
                                  onClick={() =>
                                    handleMarkCorrect(qIndex, oIndex)
                                  }
                                >
                                  {option.isCorrect && <CheckedIcon />}
                                </div>
                                {/* <span className="text-[#16191D] text-lg/[27px] text-left font-normal font-satoshi">
                                {value}
                              </span> */}
                              </label>
                              {question.options.length > 1 && (
                                <IconButton
                                  disableRipple
                                  onClick={() =>
                                    handleRemoveOption(qIndex, oIndex)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleAddOption(qIndex)}
                        className="flex items-center gap-4 w-fit h-[43.21px] rounded-2xl py-2 font-satoshi font-normal text-base tracking-normal text-[#011B23]"
                      >
                        <PlusIcon /> Add Option
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Add New Question */}
            <div className="px-[37.5px]">
              <div className="w-full h-[72px] py-4 px-6 rounded-[16px] border border-dashed border-[#646566] flex items-center">
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="w-fit h-[40px] py-2 px-0 flex items-center gap-4 font-arial font-bold text-base text-[#011B23] hover:scale-[0.99]"
                >
                  <CircledPlusIcon /> Add New Question
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
