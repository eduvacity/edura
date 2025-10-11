import { createSlice } from "@reduxjs/toolkit"

// Function to safely retrieve and parse sessionStorage data as an array
const getInitialLandingCourses = (): any => {
  if (typeof window !== "undefined") {
    const storedCourses = sessionStorage.getItem("landingCourses")
    try {
      const parsedCourses = storedCourses ? JSON.parse(storedCourses) : []
      return Array.isArray(parsedCourses) ? parsedCourses : [] // Ensure it's an array
    } catch (error) {
      console.error(
        "Failed to parse landingCourses from sessionStorage:",
        error
      )
      return []
    }
  }
  return []
}

const initialState: any = {
  params: {
    courseName: "",
    courseType: "",
    programmeCategory: "",
    description: "",
    duration: "",
    durationType: "",
    courseVideo: {
      publicId: "",
      publicUrl: "",
    },
    courseBanner: {
      publicId: "",
      publicUrl: "",
    },
    tuitionFeePerSemester: "",
    tuitionFeePerYear: "",
    applicationFee: "",
    certification: "",
    certificateDescription: "",
    features: {},
    requirements: {},
    requirementDescription: {},
    careerPath: {},
    school: "",
  },
  course: null,
  courses: [],
  school: [],
  reload: false,
  landingCourses: getInitialLandingCourses(),
  courseDetails: {
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
  },
  singleCourseDetail: {
    features: {},
    requirements: {},
    careerPath: {},
  },
}

const courseReducer = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setCourseList: (state, action) => {
      state.courses = action.payload
    },
    setSchoolList: (state, action) => {
      state.school = action.payload
    },
    setCourseParams: (state, action) => {
      state.params = action.payload
    },
    setLandingCourses: (state, action) => {
      state.landingCourses = action.payload
      typeof window !== "undefined" &&
        sessionStorage.setItem("landingCourses", JSON.stringify(action.payload))
    },
    clearLandingCourses: (state) => {
      state.landingCourses = []
      typeof window !== "undefined" &&
        sessionStorage.removeItem("landingCourses")
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload
    },
    setSingleCourseDetail: (state, action) => {
      state.singleCourseDetail = action.payload
    },
    setReload: (state, action) => {
      state.reload = action.payload
    },
  },
})

export const {
  setCourseList,
  setReload,
  setSchoolList,
  setCourseParams,
  setLandingCourses,
  clearLandingCourses,
  setCourseDetails,
  setSingleCourseDetail,
} = courseReducer.actions
export default courseReducer.reducer
