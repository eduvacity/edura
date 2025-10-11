import API from "./api"

export const AuthService = {
  register: async (param: any) => {
    try {
      const { data } = await API.post("/user/create", param)
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  verification: async (param: any) => {
    try {
      const { data } = await API.post("/auth/verification", param)
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  login: async (param: any) => {
    try {
      const { data } = await API.post("/auth/login", param, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  studentLogin: async (param: any) => {
    try {
      const { data } = await API.post("/auth/student/login", param, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  logout: async () => {
    try {
      const { data } = await API.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      )
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  user: async (userId: string) => {
    try {
      const { data } = await API.get(`/user/get/${userId}`, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  setDeadline: async (param: any) => {
    try {
      const { data } = await API.post(`/auth/deadline`, param, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },

  getDeadline: async () => {
    try {
      const { data } = await API.get(`/auth/deadline`, {
        withCredentials: true,
      })
      return { error: false, payload: data }
    } catch (e: any) {
      return { error: true, payload: e.message }
    }
  },
}
