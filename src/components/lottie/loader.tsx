"use client"
import { useLottie } from "lottie-react"
import loader from "./pageloader.json"

const style = {
  height: 180,
}
const Loader = () => {
  const options = {
    animationData: loader,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(options, style)

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center py-8">
      {View}
    </div>
  )
}

export default Loader
