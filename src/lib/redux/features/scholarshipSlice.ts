import api, { timeout } from "@/lib/services/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const applyScholarship = createAsyncThunk(
  "scholarship/applyScholarship",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("/scholarship/apply", inputData)
      return response?.data
    } catch (error: any) {
      let message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      const newMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.response?.data?.error
        ? error?.response?.data?.error
        : message
      toast.error(newMessage)
      return rejectWithValue()
    }
  }
)

const initialState: any = {
  params: {
    title: "",
    description: "",
    banner: {
      publicId: "",
      publicUrl: "",
    },
    programType: "",
    scholarshipValue: "",
    deadline: 0,
    requirements: {},
    information: {},
  },
  scholarship: null,
  scholarships: [],
  reload: false,
}

const scholarshipReducer = createSlice({
  name: "scholarship",
  initialState: initialState,
  reducers: {
    setScholarshipList: (state, action) => {
      state.scholarships = action.payload
    },
    setScholarshipParam: (state, action) => {
      state.params = action.payload
    },
  },
})

export const { setScholarshipList, setScholarshipParam } =
  scholarshipReducer.actions
export default scholarshipReducer.reducer
