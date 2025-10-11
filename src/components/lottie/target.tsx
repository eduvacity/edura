"use client"
import { useLottie } from "lottie-react"
import target from "./target.json"

const style = {
  height: 52,
}
const Target = () => {
  const options = {
    animationData: target,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(options, style)

  return View
}

export default Target
