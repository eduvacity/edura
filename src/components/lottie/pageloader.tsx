"use client"
// import { useLottie } from "lottie-react"
// import loader from "./pageloader.json"
import Image from "next/image"

// const style = {
//   height: 200,
// }
const PageLoader = () => {
  //   const options = {
  //     animationData: loader,
  //     loop: true,
  //     autoplay: true,
  //   }

  //   const { View } = useLottie(options, style)

  return (
    // <div className="w-full grid place-content-center bg-[#001408] min-h-screen gap-16 3xl:gap-24 ">
    //   <div className="w-full h-full flex flex-col justify-center items-center py-12 gap-16 place-content-center">
    //     <div className="w-full flex justify-center items-center flex-col gap-8">
    //       {View}
    //       <p className="font-medium font-arialMedium text-[28px]/[36px] tracking-normal text-[#CDE1D5] capitalize">
    //         Loading ...
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full grid place-content-center bg-pdarkcolor min-h-screen gap-16 3xl:gap-24 ">
      <div className="w-full h-full flex flex-col justify-center items-center py-12 gap-16 place-content-center">
        <div className="w-full flex justify-center items-center flex-col gap-8">
          <Image
            src="/images/loader.gif"
            width={220}
            height={200}
            alt="loading"
            unoptimized
          />

          <p className="font-medium font-arialMedium text-[28px]/[36px] tracking-normal text-[#CDE1D5] capitalize">
            Loading ...
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
