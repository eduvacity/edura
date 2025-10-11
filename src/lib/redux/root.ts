import { combineReducers } from "@reduxjs/toolkit"
import courseReducer from "./features/coursesSlice"
import scholarshipReducer from "./features/scholarshipSlice"
import LessonReducer from "./features/instructors/lessonSlice"

export const rootReducer = combineReducers({
  course: courseReducer,
  scholarship: scholarshipReducer,
  lessons: LessonReducer,
})
