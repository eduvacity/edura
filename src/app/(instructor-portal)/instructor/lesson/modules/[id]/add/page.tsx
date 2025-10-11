"use client"

import Callout from "@/components/Callout"
import ButtonCallout from "@/components/Callout/button"
import {
  ArrowRight,
  CircledPlusIcon,
  DragAndDropIcon,
  SquaredPlusIcon,
  UploadIcon,
} from "@/components/SVGs/portal"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconButton } from "@mui/material"
import ExcelJS from "exceljs"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import DeleteSection from "./delete"
import EditSection from "./edit"
import PublishSection from "./publish"

// -------------------------------------
// ZOD SCHEMA + TYPE
// -------------------------------------
const validationSchema = z.object({
  modules: z.array(
    z.object({
      name: z.string().min(1, { message: "Module name is required" }),
      lessons: z.array(
        z.object({
          title: z.string().min(1, { message: "Lesson title is required" }),
          isPublished: z.boolean(),
        })
      ),
    })
  ),
})
type FormData = z.infer<typeof validationSchema>

// -------------------------------------
// ModuleItem Component
// -------------------------------------
// Renders a module with its lessons and native drag/drop support for lessons.
function ModuleItem({
  control,
  module,
  moduleIndex,
  editMode,
  toggleEditMode,
  removeModule,
  getValues,
  setValue,
  updateField,
  handleLessonDragStart,
  handleLessonDragOver,
  handleLessonDrop,
}: {
  control: any
  module: any
  moduleIndex: number
  editMode: Record<string, boolean>
  toggleEditMode: (
    type: "module" | "lesson",
    index: number,
    moduleIndex?: number
  ) => void
  removeModule: (index: number) => void
  getValues: any
  setValue: any
  updateField: (index: number, value: any) => void
  handleLessonDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    moduleIndex: number,
    lessonIndex: number
  ) => void
  handleLessonDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleLessonDrop: (
    e: React.DragEvent<HTMLDivElement>,
    targetModuleIndex: number,
    targetLessonIndex: number | null
  ) => void
}) {
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  })

  const handleSave = () => {
    const updatedValue = getValues(`modules.${moduleIndex}.name`)
    updateField(moduleIndex, { ...module, name: updatedValue })
    toggleEditMode("module", moduleIndex)
  }

  const handleAddLesson = () => {
    const newIndex = lessonFields.length
    appendLesson({ title: "", isPublished: false })
    toggleEditMode("lesson", newIndex, moduleIndex)
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleBulkUploadLessons = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)
      const worksheet = workbook.worksheets[0]

      const newLessons: any[] = []
      let isFirstRow = true
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        if (isFirstRow) {
          isFirstRow = false
          return
        }
        const lessonTitleCell = row.getCell(1).value
        const isPublishedCell = row.getCell(2).value
        const lessonTitle = lessonTitleCell
          ? lessonTitleCell.toString().trim()
          : "Untitled Lesson"
        const isPublished = isPublishedCell
          ? ["yes", "true"].includes(isPublishedCell.toString().toLowerCase())
          : false
        newLessons.push({ title: lessonTitle, isPublished })
      })

      const currentModules = getValues("modules")
      if (currentModules.length === 0) {
        alert("No modules available. Please add a module first.")
        return
      }
      const latestModuleIndex = currentModules.length - 1
      const updatedLessons = [
        ...currentModules[latestModuleIndex].lessons,
        ...newLessons,
      ]
      setValue(`modules.${latestModuleIndex}.lessons`, updatedLessons)
      e.target.value = ""
    } catch (error) {
      console.error("Error uploading lessons:", error)
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full min-h-[380px] flex flex-col gap-10 rounded-[16px] border border-[#DDDDDD] bg-white pl-5">
      <div className="w-full flex justify-between items-start gap-6 relative">
        <IconButton disableRipple className="flex-shrink-0 relative top-6">
          <DragAndDropIcon />
        </IconButton>
        <div className="w-full flex flex-col">
          {/* MODULE Header */}
          <div className="w-full py-6 pl-10 pr-5 border border-[#F3F5F6] flex justify-between items-center gap-6">
            {editMode[`module-${moduleIndex}`] ? (
              <Controller
                name={`modules.${moduleIndex}.name`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="New Module"
                    className="peer w-full h-[56px] py-[18px] px-6 rounded-[7px] border border-[#DDDDDD] text-[#071C23] bg-[#F5F6F7] focus:outline-none"
                  />
                )}
              />
            ) : (
              <span className="font-normal font-satoshi text-xl text-[#091E42]">
                {module?.name || "Untitled Module"}
              </span>
            )}

            {editMode[`module-${moduleIndex}`] ? (
              <div className="w-[191px] h-[46px] flex gap-3">
                <button
                  type="button"
                  className="w-[75px] py-2 px-4 rounded-[7px] border border-[#DFE2E6] font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                  onClick={() => removeModule(moduleIndex)}
                  // onClick={() => toggleEditMode("module", moduleIndex)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-[81px] py-[11px] px-4 rounded-[7px] bg-[#011B23] border border-[#DFE2E6] font-satoshi text-base text-white hover:scale-[0.99]"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="w-[111px] h-[46px] flex gap-3">
                <button
                  type="button"
                  onClick={() => toggleEditMode("module", moduleIndex)}
                  className="w-[75px] py-2 px-4 rounded-[7px] border border-[#DFE2E6] font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                >
                  Edit
                </button>
                <Callout
                  FirstActionButton={
                    <button
                      className="w-[162px] h-[46px] py-[13px] px-4 flex justify-start items-center bg-white font-arial text-base/[18.4px] text-left text-[#FB9797]"
                      type="button"
                      onClick={() => removeModule(moduleIndex)}
                    >
                      Delete Module
                    </button>
                  }
                />
              </div>
            )}
          </div>

          {/* LESSONS List (using native drag and drop) */}
          {/* Outer container allows dropping at the end of the list */}
          <div
            className="w-full flex flex-col"
            onDragOver={handleLessonDragOver}
            onDrop={(e) => handleLessonDrop(e, moduleIndex, null)}
          >
            {lessonFields.map((lesson, lessonIndex) => (
              <div
                key={lesson.id}
                draggable
                onDragStart={(e) => {
                  console.log("Lesson drag start:", moduleIndex, lessonIndex)
                  handleLessonDragStart(e, moduleIndex, lessonIndex)
                }}
                onDragOver={(e) => {
                  e.stopPropagation()
                  handleLessonDragOver(e)
                }}
                onDrop={(e) => {
                  console.log("Lesson drop:", moduleIndex, lessonIndex)
                  handleLessonDrop(e, moduleIndex, lessonIndex)
                }}
              >
                <div className="w-full py-6 pl-10 pr-5 border border-[#F3F5F6] flex justify-between items-center gap-6">
                  <IconButton disableRipple>
                    <DragAndDropIcon />
                  </IconButton>
                  <div className="w-full flex justify-between items-center gap-10">
                    {editMode[`module-${moduleIndex}-lesson-${lessonIndex}`] ? (
                      <Controller
                        name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="New Lesson"
                            onBlur={() =>
                              toggleEditMode("lesson", lessonIndex, moduleIndex)
                            }
                            autoFocus
                            className="peer w-full h-[56px] py-[18px] px-6 rounded-[7px] border border-solid border-[#DDDDDD] font-arial text-sm lg-md:text-base/[18.4px] text-[#071C23] bg-[#F5F6F7] focus:outline-none"
                          />
                        )}
                      />
                    ) : (
                      <span>
                        {getValues(
                          `modules.${moduleIndex}.lessons.${lessonIndex}.title`
                        ) || ""}
                      </span>
                    )}
                    {editMode[`module-${moduleIndex}-lesson-${lessonIndex}`] ? (
                      <div className="w-[191px] h-[46px] flex gap-3">
                        <button
                          type="button"
                          className="w-[75px] py-2 px-4 rounded-[7px] border border-[#DFE2E6] font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                          onClick={() =>
                            toggleEditMode("lesson", lessonIndex, moduleIndex)
                          }
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            toggleEditMode("lesson", lessonIndex, moduleIndex)
                          }
                          className="w-[81px] py-[11px] px-4 rounded-[7px] bg-[#011B23] border border-[#DFE2E6] font-satoshi text-base text-white hover:scale-[0.99]"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="w-auto h-[46px] flex gap-3 items-center">
                        <button
                          type="button"
                          onClick={() =>
                            toggleEditMode("lesson", lessonIndex, moduleIndex)
                          }
                          className="w-[75px] py-2 px-4 rounded-[7px] border border-[#DFE2E6] font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                        >
                          Edit
                        </button>
                        {/* View button navigates to the lesson view page */}

                        <Callout
                          FirstActionButton={
                            <Link
                              href={`/instructor/lesson/modules/module/${lesson.id}`}
                            >
                              <button
                                type="button"
                                className="w-fit py-2 px-4 rounded-[7px] font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                              >
                                View
                              </button>
                            </Link>
                          }
                          SecondActionButton={
                            <button
                              className="w-[162px] h-[46px] py-[13px] px-4 flex justify-start items-center bg-white font-arial text-base/[18.4px] text-left text-[#FB9797]"
                              type="button"
                              onClick={() => removeLesson(lessonIndex)}
                            >
                              Delete Lesson
                            </button>
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Lesson & Bulk Upload Buttons */}
          <div className="w-full py-6 pl-10 pr-5 border border-[#F3F5F6] flex items-center gap-6">
            <button
              type="button"
              onClick={handleAddLesson}
              className="w-fit h-[40px] py-2 px-0 flex items-center gap-4 font-satoshi text-base text-[#011B23] hover:scale-[0.99]"
            >
              <SquaredPlusIcon /> Add Lesson
            </button>
            <div className="flex items-center gap-4">
              <button
                className="w-fit h-[40px] py-2 px-0 flex items-center gap-4 font-satoshi text-base text-[#011B23] hover:scale-[0.99]"
                type="button"
                onClick={handleUploadButtonClick}
              >
                <UploadIcon /> Bulk Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleBulkUploadLessons}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// -------------------------------------
// Main AddModule Component
// -------------------------------------
export default function AddModule({ params }: any) {
  const searchParams = useSearchParams()
  const course = searchParams.get("course")
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
    ["module-0"]: true,
  })

  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormData>({
      resolver: zodResolver(validationSchema),
      defaultValues: {
        modules: [
          {
            name: "",
            lessons: [],
          },
        ],
      },
    })
  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
    move: moveModule,
    update,
  } = useFieldArray({
    control,
    name: "modules",
  })
  const modules = watch("modules")

  // -------------------------------------
  // Global Drag Item Ref (for modules & lessons)
  // -------------------------------------
  const dragItemRef = useRef<{
    type: "module" | "lesson"
    moduleIndex: number
    lessonIndex?: number
  } | null>(null)

  // Module drag handlers
  const handleModuleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    moduleIndex: number
  ) => {
    console.log("Module drag start:", moduleIndex)
    dragItemRef.current = { type: "module", moduleIndex }
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", "module") // Needed for some browsers
  }

  const handleModuleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleModuleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetModuleIndex: number
  ) => {
    e.preventDefault()
    if (dragItemRef.current && dragItemRef.current.type === "module") {
      const sourceModuleIndex = dragItemRef.current.moduleIndex
      console.log("Module drop:", sourceModuleIndex, "->", targetModuleIndex)
      moveModule(sourceModuleIndex, targetModuleIndex)
    }
    dragItemRef.current = null
  }

  // Lesson drag handlers
  const handleLessonDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    sourceModuleIndex: number,
    sourceLessonIndex: number
  ) => {
    console.log("Lesson drag start:", sourceModuleIndex, sourceLessonIndex)
    dragItemRef.current = {
      type: "lesson",
      moduleIndex: sourceModuleIndex,
      lessonIndex: sourceLessonIndex,
    }
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", "lesson") // Needed for some browsers
  }

  const handleLessonDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleLessonDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetModuleIndex: number,
    targetLessonIndex: number | null
  ) => {
    e.preventDefault()
    if (dragItemRef.current && dragItemRef.current.type === "lesson") {
      const { moduleIndex: sourceModuleIndex, lessonIndex: sourceLessonIndex } =
        dragItemRef.current
      console.log(
        "Lesson drop:",
        sourceModuleIndex,
        sourceLessonIndex,
        "->",
        targetModuleIndex,
        targetLessonIndex
      )
      if (sourceModuleIndex === targetModuleIndex) {
        // Reorder lessons within the same module
        const lessons = [...getValues(`modules.${sourceModuleIndex}.lessons`)]
        const [movedLesson] = lessons.splice(sourceLessonIndex!, 1)
        if (targetLessonIndex === null) {
          lessons.push(movedLesson)
        } else {
          lessons.splice(targetLessonIndex, 0, movedLesson)
        }
        setValue(`modules.${sourceModuleIndex}.lessons`, lessons)
      } else {
        // Cross-module lesson move
        const sourceLessons = [
          ...getValues(`modules.${sourceModuleIndex}.lessons`),
        ]
        const [movedLesson] = sourceLessons.splice(sourceLessonIndex!, 1)
        setValue(`modules.${sourceModuleIndex}.lessons`, sourceLessons)
        const targetLessons = [
          ...getValues(`modules.${targetModuleIndex}.lessons`),
        ]
        if (targetLessonIndex === null) {
          targetLessons.push(movedLesson)
        } else {
          targetLessons.splice(targetLessonIndex, 0, movedLesson)
        }
        setValue(`modules.${targetModuleIndex}.lessons`, targetLessons)
      }
    }
    dragItemRef.current = null
  }

  const toggleEditMode = (
    type: "module" | "lesson",
    index: number,
    moduleIndex?: number
  ) => {
    const key =
      type === "module"
        ? `module-${index}`
        : `module-${moduleIndex}-lesson-${index}`
    setEditMode((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const addNewModule = () => {
    const newIndex = moduleFields.length
    appendModule({ name: "", lessons: [] })
    setEditMode((prev) => ({ ...prev, [`module-${newIndex}`]: true }))
  }

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data)
    // ... handle submission logic
  }

  return (
    <div className="w-full pb-[104px] flex flex-col gap-[54px]">
      <div className="w-full flex flex-col lg-md:flex-row justify-between">
        <Link
          href={`/instructor/lesson/topics/${params?.id}?course=${course}`}
          className="flex mb-6 gap-2 items-center cursor-pointer"
        >
          <ArrowRight className="transform rotate-180 text-[#071C23]" />
          <h1 className="text-[26px] lg-md:text-[26px] leading-[34.8px] font-bold font-satoshi -tracking-[0.001em] text-[#071C23]">
            Create your Module
          </h1>
        </Link>
        <ButtonCallout
          FirstActionButton={<PublishSection />}
          SecondActionButton={<EditSection />}
          ThirdActionButton={<DeleteSection />}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        {moduleFields.map((module, moduleIndex) => (
          <div
            key={module.id}
            draggable
            onDragStart={(e) => handleModuleDragStart(e, moduleIndex)}
            onDragOver={handleModuleDragOver}
            onDrop={(e) => handleModuleDrop(e, moduleIndex)}
          >
            <ModuleItem
              control={control}
              module={module}
              moduleIndex={moduleIndex}
              editMode={editMode}
              toggleEditMode={toggleEditMode}
              removeModule={removeModule}
              getValues={getValues}
              setValue={setValue}
              updateField={update}
              handleLessonDragStart={handleLessonDragStart}
              handleLessonDragOver={handleLessonDragOver}
              handleLessonDrop={handleLessonDrop}
            />
          </div>
        ))}
        <div className="w-full h-[72px] py-4 px-6 rounded-[16px] border border-dashed border-[#646566] flex items-center">
          <button
            type="button"
            onClick={addNewModule}
            className="w-fit h-[40px] py-2 px-0 flex items-center gap-4 font-arial font-bold text-base text-[#011B23] hover:scale-[0.99]"
          >
            <CircledPlusIcon /> New Module
          </button>
        </div>
      </form>
    </div>
  )
}
