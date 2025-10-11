import api, { timeout } from "@/lib/services/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState: any = {
  lessons: null,
}

const lessonsReducer = createSlice({
  name: "lessons",
  initialState: initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload
    },
  },
})

export const { setLessons } = lessonsReducer.actions
export default lessonsReducer.reducer
