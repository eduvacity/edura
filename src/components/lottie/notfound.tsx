"use client"
import { useLottie } from "lottie-react"
import notfound from "./notfound.json"

const style = {
  height: 120,
}
const NotFound = () => {
  const options = {
    animationData: notfound,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(options, style)

  return View
}

export default NotFound
