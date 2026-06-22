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
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { readSheet } from "read-excel-file/browser"
import { useRef, useState } from "react"
import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
  type UseFieldArrayUpdate,
  type UseFormGetValues,
  type UseFormSetValue,
} from "react-hook-form"
import { z } from "zod"

import DeleteSection from "./delete"
import EditSection from "./edit"
import PublishSection from "./publish"

// -------------------------------------
// Zod schema and form types
// -------------------------------------
const lessonSchema = z.object({
  title: z.string().min(1, {
    message: "Lesson title is required",
  }),
  isPublished: z.boolean(),
})

const moduleSchema = z.object({
  name: z.string().min(1, {
    message: "Module name is required",
  }),
  lessons: z.array(lessonSchema),
})

const validationSchema = z.object({
  modules: z.array(moduleSchema),
})

type FormData = z.infer<typeof validationSchema>
type ModuleData = FormData["modules"][number]

type ModuleItemProps = {
  control: Control<FormData>
  module: ModuleData & { id: string }
  moduleIndex: number
  editMode: Record<string, boolean>
  toggleEditMode: (
    type: "module" | "lesson",
    index: number,
    moduleIndex?: number,
  ) => void
  removeModule: (index: number) => void
  getValues: UseFormGetValues<FormData>
  setValue: UseFormSetValue<FormData>
  updateField: UseFieldArrayUpdate<FormData, "modules">
  handleLessonDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    moduleIndex: number,
    lessonIndex: number,
  ) => void
  handleLessonDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  handleLessonDrop: (
    event: React.DragEvent<HTMLDivElement>,
    targetModuleIndex: number,
    targetLessonIndex: number | null,
  ) => void
}

// -------------------------------------
// Module item
// -------------------------------------
function ModuleItem({
  control,
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
}: ModuleItemProps) {
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleSaveModule = () => {
    const updatedName = getValues(`modules.${moduleIndex}.name`)

    const lessons = getValues(`modules.${moduleIndex}.lessons`)

    updateField(moduleIndex, {
      name: updatedName,
      lessons,
    })

    toggleEditMode("module", moduleIndex)
  }

  const handleAddLesson = () => {
    const newLessonIndex = lessonFields.length

    appendLesson({
      title: "",
      isPublished: false,
    })

    toggleEditMode("lesson", newLessonIndex, moduleIndex)
  }

  const handleBulkUploadLessons = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      const rows = await readSheet(file)

      if (rows.length <= 1) {
        alert("The spreadsheet does not contain any lesson records.")
        return
      }

      const newLessons = rows
        .slice(1)
        .map((row) => {
          const lessonTitleCell = row[0]
          const isPublishedCell = row[1]

          const title =
            lessonTitleCell === null || lessonTitleCell === undefined
              ? ""
              : String(lessonTitleCell).trim()

          const publishedValue =
            isPublishedCell === null || isPublishedCell === undefined
              ? ""
              : String(isPublishedCell).trim().toLowerCase()

          const isPublished = ["yes", "true", "1", "published"].includes(
            publishedValue,
          )

          return {
            title,
            isPublished,
          }
        })
        .filter((lesson) => lesson.title.length > 0)

      if (newLessons.length === 0) {
        alert("No valid lessons were found in the spreadsheet.")
        return
      }

      const currentLessons = getValues(`modules.${moduleIndex}.lessons`) ?? []

      setValue(
        `modules.${moduleIndex}.lessons`,
        [...currentLessons, ...newLessons],
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      )
    } catch (error) {
      console.error("Error uploading lessons:", error)

      alert(
        "The spreadsheet could not be read. Please upload a valid .xlsx file.",
      )
    } finally {
      event.target.value = ""
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex min-h-[380px] w-full flex-col gap-10 rounded-[16px] border border-[#DDDDDD] bg-white pl-5">
      <div className="relative flex w-full items-start justify-between gap-6">
        <IconButton disableRipple className="relative top-6 flex-shrink-0">
          <DragAndDropIcon />
        </IconButton>

        <div className="flex w-full flex-col">
          {/* Module header */}
          <div className="flex w-full items-center justify-between gap-6 border border-[#F3F5F6] py-6 pl-10 pr-5">
            {editMode[`module-${moduleIndex}`] ? (
              <Controller
                name={`modules.${moduleIndex}.name`}
                control={control}
                render={({ field, fieldState }) => (
                  <div className="w-full">
                    <input
                      {...field}
                      autoFocus
                      placeholder="New Module"
                      className="h-[56px] w-full rounded-[7px] border border-[#DDDDDD] bg-[#F5F6F7] px-6 py-[18px] text-[#4D6C62] focus:outline-none"
                    />

                    {fieldState.error?.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            ) : (
              <span className="font-satoshi text-xl font-normal text-[#091E42]">
                {getValues(`modules.${moduleIndex}.name`) || "Untitled Module"}
              </span>
            )}

            {editMode[`module-${moduleIndex}`] ? (
              <div className="flex h-[46px] w-[191px] gap-3">
                <button
                  type="button"
                  className="w-[75px] rounded-[7px] border border-[#DFE2E6] px-4 py-2 font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                  onClick={() => toggleEditMode("module", moduleIndex)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveModule}
                  className="w-[81px] rounded-[7px] border border-[#DFE2E6] bg-[#011B23] px-4 py-[11px] font-satoshi text-base text-white hover:scale-[0.99]"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex h-[46px] w-[111px] gap-3">
                <button
                  type="button"
                  onClick={() => toggleEditMode("module", moduleIndex)}
                  className="w-[75px] rounded-[7px] border border-[#DFE2E6] px-4 py-2 font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                >
                  Edit
                </button>

                <Callout
                  FirstActionButton={
                    <button
                      type="button"
                      onClick={() => removeModule(moduleIndex)}
                      className="flex h-[46px] w-[162px] items-center justify-start bg-white px-4 py-[13px] text-left font-arial text-base/[18.4px] text-[#FB9797]"
                    >
                      Delete Module
                    </button>
                  }
                />
              </div>
            )}
          </div>

          {/* Lessons */}
          <div
            className="flex w-full flex-col"
            onDragOver={handleLessonDragOver}
            onDrop={(event) => handleLessonDrop(event, moduleIndex, null)}
          >
            {lessonFields.map((lesson, lessonIndex) => {
              const lessonEditKey = `module-${moduleIndex}-lesson-${lessonIndex}`

              return (
                <div
                  key={lesson.id}
                  draggable
                  onDragStart={(event) => {
                    event.stopPropagation()

                    handleLessonDragStart(event, moduleIndex, lessonIndex)
                  }}
                  onDragOver={(event) => {
                    event.stopPropagation()
                    handleLessonDragOver(event)
                  }}
                  onDrop={(event) => {
                    event.stopPropagation()

                    handleLessonDrop(event, moduleIndex, lessonIndex)
                  }}
                >
                  <div className="flex w-full items-center justify-between gap-6 border border-[#F3F5F6] py-6 pl-10 pr-5">
                    <IconButton disableRipple>
                      <DragAndDropIcon />
                    </IconButton>

                    <div className="flex w-full items-center justify-between gap-10">
                      {editMode[lessonEditKey] ? (
                        <Controller
                          name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <div className="w-full">
                              <input
                                {...field}
                                autoFocus
                                placeholder="New Lesson"
                                className="h-[56px] w-full rounded-[7px] border border-[#DDDDDD] bg-[#F5F6F7] px-6 py-[18px] font-arial text-sm text-[#4D6C62] focus:outline-none lg-md:text-base/[18.4px]"
                              />

                              {fieldState.error?.message && (
                                <p className="mt-1 text-sm text-red-500">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      ) : (
                        <span className="font-satoshi text-base text-[#091E42]">
                          {getValues(
                            `modules.${moduleIndex}.lessons.${lessonIndex}.title`,
                          ) || "Untitled Lesson"}
                        </span>
                      )}

                      {editMode[lessonEditKey] ? (
                        <div className="flex h-[46px] w-[191px] gap-3">
                          <button
                            type="button"
                            className="w-[75px] rounded-[7px] border border-[#DFE2E6] px-4 py-2 font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
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
                            className="w-[81px] rounded-[7px] border border-[#DFE2E6] bg-[#011B23] px-4 py-[11px] font-satoshi text-base text-white hover:scale-[0.99]"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-[46px] w-auto items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              toggleEditMode("lesson", lessonIndex, moduleIndex)
                            }
                            className="w-[75px] rounded-[7px] border border-[#DFE2E6] px-4 py-2 font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                          >
                            Edit
                          </button>

                          <Callout
                            FirstActionButton={
                              <Link
                                href={`/instructor/lesson/modules/module/${lesson.id}`}
                                className="block w-fit rounded-[7px] px-4 py-2 font-satoshi text-base text-[#091E42] hover:scale-[0.99]"
                              >
                                View
                              </Link>
                            }
                            SecondActionButton={
                              <button
                                type="button"
                                onClick={() => removeLesson(lessonIndex)}
                                className="flex h-[46px] w-[162px] items-center justify-start bg-white px-4 py-[13px] text-left font-arial text-base/[18.4px] text-[#FB9797]"
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
              )
            })}
          </div>

          {/* Add lesson and bulk upload */}
          <div className="flex w-full items-center gap-6 border border-[#F3F5F6] py-6 pl-10 pr-5">
            <button
              type="button"
              onClick={handleAddLesson}
              className="flex h-[40px] w-fit items-center gap-4 px-0 py-2 font-satoshi text-base text-[#011B23] hover:scale-[0.99]"
            >
              <SquaredPlusIcon />
              Add Lesson
            </button>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleUploadButtonClick}
                className="flex h-[40px] w-fit items-center gap-4 px-0 py-2 font-satoshi text-base text-[#011B23] hover:scale-[0.99]"
              >
                <UploadIcon />
                Bulk Upload
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="hidden"
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
// Main component
// -------------------------------------
type AddModuleProps = {
  params: {
    id: string
  }
}

export default function AddModule({ params }: AddModuleProps) {
  const searchParams = useSearchParams()
  const course = searchParams.get("course")

  const [editMode, setEditMode] = useState<Record<string, boolean>>({
    "module-0": true,
  })

  const { control, handleSubmit, setValue, getValues } = useForm<FormData>({
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

  const dragItemRef = useRef<{
    type: "module" | "lesson"
    moduleIndex: number
    lessonIndex?: number
  } | null>(null)

  const handleModuleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    moduleIndex: number,
  ) => {
    dragItemRef.current = {
      type: "module",
      moduleIndex,
    }

    event.dataTransfer.effectAllowed = "move"

    event.dataTransfer.setData("text/plain", "module")
  }

  const handleModuleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const handleModuleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetModuleIndex: number,
  ) => {
    event.preventDefault()

    const draggedItem = dragItemRef.current

    if (!draggedItem || draggedItem.type !== "module") {
      return
    }

    const sourceModuleIndex = draggedItem.moduleIndex

    if (sourceModuleIndex !== targetModuleIndex) {
      moveModule(sourceModuleIndex, targetModuleIndex)
    }

    dragItemRef.current = null
  }

  const handleLessonDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    sourceModuleIndex: number,
    sourceLessonIndex: number,
  ) => {
    event.stopPropagation()

    dragItemRef.current = {
      type: "lesson",
      moduleIndex: sourceModuleIndex,
      lessonIndex: sourceLessonIndex,
    }

    event.dataTransfer.effectAllowed = "move"

    event.dataTransfer.setData("text/plain", "lesson")
  }

  const handleLessonDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const handleLessonDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetModuleIndex: number,
    targetLessonIndex: number | null,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    const draggedItem = dragItemRef.current

    if (
      !draggedItem ||
      draggedItem.type !== "lesson" ||
      draggedItem.lessonIndex === undefined
    ) {
      return
    }

    const sourceModuleIndex = draggedItem.moduleIndex

    const sourceLessonIndex = draggedItem.lessonIndex

    const sourceLessons = [
      ...(getValues(`modules.${sourceModuleIndex}.lessons`) ?? []),
    ]

    const [movedLesson] = sourceLessons.splice(sourceLessonIndex, 1)

    if (!movedLesson) {
      dragItemRef.current = null
      return
    }

    if (sourceModuleIndex === targetModuleIndex) {
      let insertionIndex =
        targetLessonIndex === null ? sourceLessons.length : targetLessonIndex

      if (targetLessonIndex !== null && sourceLessonIndex < targetLessonIndex) {
        insertionIndex -= 1
      }

      sourceLessons.splice(Math.max(0, insertionIndex), 0, movedLesson)

      setValue(`modules.${sourceModuleIndex}.lessons`, sourceLessons, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    } else {
      const targetLessons = [
        ...(getValues(`modules.${targetModuleIndex}.lessons`) ?? []),
      ]

      const insertionIndex =
        targetLessonIndex === null ? targetLessons.length : targetLessonIndex

      targetLessons.splice(insertionIndex, 0, movedLesson)

      setValue(`modules.${sourceModuleIndex}.lessons`, sourceLessons, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })

      setValue(`modules.${targetModuleIndex}.lessons`, targetLessons, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }

    dragItemRef.current = null
  }

  const toggleEditMode = (
    type: "module" | "lesson",
    index: number,
    moduleIndex?: number,
  ) => {
    const key =
      type === "module"
        ? `module-${index}`
        : `module-${moduleIndex}-lesson-${index}`

    setEditMode((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  const addNewModule = () => {
    const newModuleIndex = moduleFields.length

    appendModule({
      name: "",
      lessons: [],
    })

    setEditMode((previous) => ({
      ...previous,
      [`module-${newModuleIndex}`]: true,
    }))
  }

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data)
  }

  const backHref = course
    ? `/instructor/lesson/modules/${params.id}?course=${encodeURIComponent(
        course,
      )}`
    : `/instructor/lesson/modules/${params.id}`

  return (
    <div className="flex w-full flex-col gap-[54px] pb-[104px]">
      <div className="flex w-full flex-col justify-between lg-md:flex-row">
        <Link
          href={backHref}
          className="mb-6 flex cursor-pointer items-center gap-2"
        >
          <ArrowRight className="rotate-180 transform text-[#4D6C62]" />

          <h1 className="font-satoshi text-[26px] font-bold leading-[34.8px] -tracking-[0.001em] text-[#4D6C62]">
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
        className="flex w-full flex-col gap-6"
      >
        {moduleFields.map((module, moduleIndex) => (
          <div
            key={module.id}
            draggable
            onDragStart={(event) => handleModuleDragStart(event, moduleIndex)}
            onDragOver={handleModuleDragOver}
            onDrop={(event) => handleModuleDrop(event, moduleIndex)}
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

        <div className="flex h-[72px] w-full items-center rounded-[16px] border border-dashed border-[#646566] px-6 py-4">
          <button
            type="button"
            onClick={addNewModule}
            className="flex h-[40px] w-fit items-center gap-4 px-0 py-2 font-arial text-base font-bold text-[#011B23] hover:scale-[0.99]"
          >
            <CircledPlusIcon />
            New Module
          </button>
        </div>

        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </div>
  )
}
