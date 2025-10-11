import API from "./api"

export const CourseService = {
  register: async (param: any) => {
    try {
      const { data } = await API.post("/courses/create", param, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  getCourseList: async (skip: number, limit: number) => {
    try {
      const { data } = await API.get(`/courses/list/${skip}/${limit}`, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  getCourseListByType: async (skip: number, limit: number, param: any) => {
    try {
      const { data } = await API.patch(
        `/courses/list-type/${skip}/${limit}`,
        param,
        { withCredentials: true }
      )
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  getCourseListByCategory: async (
    skip: number,
    limit: number,
    category: string
  ) => {
    try {
      const { data } = await API.get(
        `/courses/list/${skip}/${limit}/${category}`,
        { withCredentials: true }
      )
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  addCourseDetails: async (param: any, courseId: string) => {
    try {
      const { data } = await API.put(
        `/course/details/update/${courseId}`,
        param,
        { withCredentials: true }
      )
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  findCourseDetail: async (courseId: string) => {
    try {
      const { data } = await API.get(`/course/details/get/${courseId}`, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },
}
