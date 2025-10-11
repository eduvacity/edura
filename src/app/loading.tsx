import Image from "next/image"

export default function PageLoading() {
  return (
    <div className="w-full grid place-content-center bg-pdarkcolor min-h-screen gap-16 3xl:gap-24 ">
      <div className="w-full h-full flex flex-col justify-center items-center py-12 gap-16 place-content-center">
        <div className="w-full flex justify-center items-center flex-col gap-8">
          <Image
            src="/images/loader.gif"
            width={200}
            height={200}
            alt="loading"
          />

          <p className="font-medium font-arial text-[28px]/[36px] tracking-normal text-[#CDE1D5] capitalize">
            Loading ...
          </p>
        </div>
      </div>
    </div>
    // <PageLoader />
  )
}
