import API from "./api"

export const ScholarshipService = {
  register: async (param: any) => {
    try {
      const { data } = await API.post("/scholarship/apply", param, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  getScholarshipList: async (skip: number, limit: number) => {
    try {
      const { data } = await API.get(`/scholarship/list/${skip}/${limit}`, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },
}
