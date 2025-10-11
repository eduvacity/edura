"use client"

export default function AdmissionProcessSection() {
  return (
    <section
      className="w-full relative grid gap-6 py-24 px-4 lg-md:px-6 xl:px-[86px] 3xl:px-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12 ">
        <div className="w-full max-w-[1280px] xl:py-12 flex flex-col gap-8 3xl:gap-[64px] px-4 xl:px-8 3xl:px-0">
          <div className="w-full flex flex-col gap-3">
            <h2 className="w-full text-base/[50px] lg-md:text-2xl/[60px] font-semibold font-avant-garde text-[#011B23] tracking-[0.5px] text-left capitalize">
              How the admission process works
            </h2>
            <p className="xl:w-[768px] text-lg font-avant-garde font-normal text-[#868B93]">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
          <div className="w-full max-w-[1000px] flex flex-col gap-6">
            {processes?.map((v, i) => {
              return (
                <div
                  key={i}
                  className={
                    i === 0
                      ? "flex flex-col gap-1 border-l-4 border-solid border-pcolor px-4"
                      : "flex flex-col gap-1 border-l-4 border-solid border-[#F2F4F7] px-4"
                  }
                >
                  <h4 className="w-full font-medium font-avant-garde text-xl text-[#101828]">
                    {v.title}
                  </h4>
                  <p className="w-full font-medium font-avant-garde text-sm/[24px] lg:text-sm/[26px] xl:text-base text-[#868B93]">
                    {v.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

const processes = [
  {
    title: "Choose your Program",
    description: `Begin your academic journey by exploring the diverse range of programs offered by our institution. Browse through our catalog to find the program that aligns with your interests, goals, and career aspirations.`,
  },
  {
    title: "Start your application",
    description: `Begin your academic journey by exploring the diverse range of programs offered by our institution. Browse through our catalog to find the program that aligns with your interests, goals, and career aspirations.`,
  },
  {
    title: "Start your application",
    description: `Once you've chosen your ideal program, it's time to kick-start the application process. Access our user-friendly online application portal and provide the required information, including personal details, academic history, and any supporting documentation.`,
  },
  {
    title: "Application review & admission",
    description: `After submitting your application, our admissions team diligently reviews all submitted materials. This comprehensive evaluation ensures that you meet the program's prerequisites. You may be contacted for additional information or clarification.`,
  },
  {
    title: "Program kick-off & onboarding",
    description: `With your admission confirmed, it's time to embark on your educational journey. Your program kick-off will be marked by a detailed onboarding process, providing you with access to course materials, resources, and communication channels. `,
  },
]
