import axios from "axios"

export const timeout = 15000
const baseURL = `https://portal.backend.Edura.com/v1`
const API = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-type": "application/json",
  },
})

export default API
