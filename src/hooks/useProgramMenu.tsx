"use client"
import React from "react"
import { CourseService } from "@/lib/services/courses.service"
import { useAppDispatch } from "@/lib/redux/controls"
import {
  setCourseDetails,
  setLandingCourses,
} from "@/lib/redux/features/coursesSlice"

export const useProgramsMenu = () => {
  const [loading, setLoading] = React.useState(true)
  const [programs, setPrograms] = React.useState([])
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const getAllCategoryList = async () => {
      try {
        const { error, payload } = await CourseService.getCourseListByCategory(
          0,
          200,
          "popular"
        )
        if (!error && payload) {
          dispatch(setLandingCourses(payload))
          dispatch(
            setCourseDetails({
              title: {
                title: "",
                uniqueId: 0,
                isSaved: false,
                details: {
                  0: {
                    label: "",
                    id: 0,
                  },
                },
              },
            })
          )
          const processedPrograms = processPrograms(payload)
          setPrograms(processedPrograms)
        } else {
          console.error("Failed to fetch courses:", error)
        }
      } catch (err) {
        console.error("Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    getAllCategoryList()
  }, [dispatch])

  return { programs, loading }
}

const processPrograms = (courses: any) => {
  return courses.reduce((acc: any, course: any) => {
    const category = acc.find((c: any) => c.name === course.programmeCategory)

    const contentItem = {
      id: course.id,
      title: course.courseName,
      starts: course.starts,
      duration: `${course.duration} ${course.durationType}`,
      active: true,
      link: "/program",
    }

    if (category) {
      let subpage = category.subpages.find(
        (sp: any) => sp.name === course.courseType
      )
      if (!subpage) {
        subpage = { name: course.courseType, content: [] }
        category.subpages.push(subpage)
      }

      const isDuplicate = subpage.content.some(
        (item: any) => item.title === contentItem.title
      )
      if (!isDuplicate) {
        subpage.content.push(contentItem)
      }
    } else {
      acc.push({
        name: course.programmeCategory,
        subpages: [
          {
            name: course.courseType,
            content: [contentItem],
          },
        ],
      })
    }
    return acc
  }, [])
}
