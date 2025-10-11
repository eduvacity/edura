"use client"
import { EclipseIcon } from "@/components/SVGs"

export default function CoreValuesSection() {
  return (
    <section
      className="w-full relative grid gap-6 py-16 lg-md:py-24 px-3 lg-md:px-6 lg:px-24 3xl:px-0"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] flex flex-col gap-[43px]">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col gap-4">
              <h4 className="max-w-[722px] text-2xl/[45px] font-semibold font-avant-garde text-pcolor tracking-[0.5px] text-left capitalize">
                Our Core Values
              </h4>
              <span className="max-w-[841px] text-[#424242] text-sm lg:text-base lg-md:text-lg font-medium font-avant-garde">
                Enabling learners to take control of their career growth through
                accessible and high-quality education.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg-md:grid-cols-2 lg:grid-cols-3 gap-[20px] min-h-[248.87px]">
            {valueLists?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="w-full max-w-[466px] h-full rounded-lg border border-[#DDDDDD] bg-white px-[25px] py-[20px] flex flex-col justify-between gap-6"
                >
                  {v.icon}
                  <div className="w-full flex flex-col gap-[10px]">
                    <h4 className="text-xl/[39px] font-semibold font-avant-garde text-[#071C23] tracking-[0.5px]">
                      {v.name}
                    </h4>
                    <p className="text-base/[30.4px] font-normal font-avant-garde text-[#4B4B4B] tracking-[0.5px]">
                      {v.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
const valueLists = [
  {
    name: "Innovation",
    description: `Continuously improving and adapting our programs to meet the evolving needs of the global workforce`,
    icon: <EclipseIcon className="text-[#F8C16F]" />,
  },
  {
    name: "Inclusivity",
    description: `Ensuring that education is accessible to everyone, regardless of background or circumstances`,
    icon: <EclipseIcon className="text-[#475467]" />,
  },
  {
    name: "Collaboration",
    description: `Building strong partnerships with industry experts and educational institutions to provide the best learning experience.`,
    icon: <EclipseIcon className="text-[#6741A3]" />,
  },
  {
    name: "Integrity",
    description: `Maintaining honesty, transparency, and fairness in all our interactions and operations.`,
    icon: <EclipseIcon className="text-[#81A341]" />,
  },
  {
    name: "Excellence",
    description: `Maintaining honesty, transparency, and fairness in all our interactions and operations.`,
    icon: <EclipseIcon className="text-[#4193A3]" />,
  },
]
