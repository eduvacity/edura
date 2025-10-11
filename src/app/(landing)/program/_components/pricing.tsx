"use client"

export default function PricingSection({ course }: any) {
  return (
    <section
      className="w-full relative grid gap-6 py-24 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1280px] px-4 py-12 flex flex-col justify-center items-center bg-white">
          <div className="w-full flex flex-col gap-[28px]">
            <div className="w-full flex flex-col justify-start items-center lg-md:px-10">
              <h2 className="w-full text-4xl/[40px] lg-md:text-4xl/[50px] font-semibold font-sans text-[#101828] -tracking-[0.02em] text-left">
                Pricing
              </h2>
            </div>
            <div className="w-full flex flex-col xl:flex-row gap-8 justify-center items-center px-8">
              {course?.courseType?.toLowerCase() === "certificate" ? null : (
                <div className="w-full xl:w-1/2 rounded-2xl shadow-[0px_4px_6px_-2px_#10182808,0px_12px_16px_-4px_#10182814] border border-solid border-[#EAECF0] flex flex-col gap-6">
                  <div className="flex flex-col p-5 lg-md:p-8 gap-8 bg-white">
                    <div className="w-full  flex flex-col">
                      <div className="w-full flex justify-end items-end gap-1">
                        <span className="font-arial font-bold text-xl text-left text-pcolor bg-[#F5FFFA] border border-solid border-[#D7FEE9] flex justify-center items-center rounded-full px-4">
                          Per semester
                        </span>
                      </div>
                      <h4 className="w-full flex gap-1 font-arial font-bold text-4xl/[70px] lg-md:text-[60px]/[72px] -tracking-[0.02em] text-[#101828]">
                        {course?.tuitionFeePerSemester
                          ? `₦${Number(
                              course?.tuitionFeePerSemester
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}`
                          : null}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full xl:w-1/2 rounded-2xl shadow-[0px_4px_6px_-2px_#10182808,0px_12px_16px_-4px_#10182814] border border-solid border-[#EAECF0] flex flex-col gap-6">
                <div className="w-full  flex flex-col p-8 gap-8 bg-white">
                  <div className="w-full flex flex-col">
                    <div className="w-full flex justify-end items-end gap-1">
                      <span className="font-arial font-bold text-xl text-left text-pcolor bg-[#F5FFFA] border border-solid border-[#D7FEE9] flex justify-center items-center rounded-full px-4">
                        Per session
                      </span>
                    </div>
                    <h4 className="w-full flex gap-1 font-arial font-bold text-4xl/[70px] lg-md:text-[60px]/[72px] -tracking-[0.02em] text-[#101828]">
                      {course?.tuitionFeePerYear
                        ? `₦${Number(course?.tuitionFeePerYear).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                            }
                          )}`
                        : null}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
