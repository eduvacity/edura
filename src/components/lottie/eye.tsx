"use client"
import { useLottie } from "lottie-react"
import eye from "./eye.json"

const style = {
  height: 52,
}
const EyeVision = () => {
  const options = {
    animationData: eye,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(options, style)

  return View
}

export default EyeVision
