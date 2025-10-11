"use client"
import { Badge } from "@/components/ui/badge"

export default function LiveLessonsSection() {
  return (
    <section
      className="w-full relative gap-6"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full max-w-[1586px] mx-auto flex flex-col gap-[43px]  px-2.5 xl:px-9 2xl:px-12 3xl:px-8">
        <div className="w-full flex flex-col px-2">
          <Badge className="w-[120px] lg-md:w-[140px] px-[15px] py-[7px] text-[#4D6C62] text-xs/[24px] lg-md:text-sm/[24px] font-medium font-sans  bg-[#D9F1FF] hover:bg-[#D9F1FF] rounded-[20px] border border-[#DBDBDB] flex justify-center items-center">
            Live Lesson
          </Badge>
          <div className="px-2 lg:px-0">
            <h4 className="mt-4 lg-md:mt-0 w-full text-xl/[30px] lg-md:text-2xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left">
              Learning at Edura
            </h4>
            <p className="text-base text-left font-medium font-sans text-[#3D3D3D] max-w-[640px] tracking-[0.5px]">
              We offer a distinctive blend of learning approaches, featuring
              lectures from top faculty, interactive group discussions, and
              mentoring sessions, all designed to keep learners engaged and
              motivated throughout their journey.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg-md:grid-cols-4 gap-[20px] min-h-[300px]">
          {liveList?.map((v, i) => {
            return (
              <div
                key={v.id}
                className="h-[515px] rounded-[12px] border border-solid border-[#DDDDDD] bg-white px-4 py-[10px] flex flex-col gap-4"
              >
                <div
                  className={`h-[285.77px] ${v.icon} bg-cover bg-no-repeat rounded-[13.3px] border-[0.63px] border-solid border-[#FFF2DA] bg-[#28282833]`}
                ></div>
                <div className="text-xl lg-md:text-[22px]/[32px] font-semibold font-sans text-[#4D6C62]">
                  {v?.title}
                </div>
                <p className="text-base/[28px] font-normal font-arial text-[#868B93] leading-[30px]">
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const liveList = [
  {
    id: 1,
    title: "Introduction to Physics Electronics",
    description: `Gain a foundational understanding of electronic components, circuits, and the underlying physics principles. Explore topics such as semiconductors, diodes, transistors, and basic circuit analysis, essential for comprehending modern electronic systems.`,
    icon: "bg-[url('/landing/live.svg')]",
  },
  {
    id: 2,
    title: "Introduction to Programming",
    description: `Master the fundamentals of computer programming, including basic syntax, data types, control structures, functions, and algorithms. Develop problem-solving skills and the ability to write clean, efficient code in a popular programming language.
`,
    icon: "bg-[url('/landing/live_2.svg')]",
  },
  {
    id: 3,
    title: "Introduction to Computer Organization",
    description: `Discover the internal structure and functioning of computer systems. This course covers core concepts such as CPU architecture, memory hierarchy, input/output operations, and data representation, providing insight into how hardware and software interact.`,
    icon: "bg-[url('/landing/live_3.svg')]",
  },
  {
    id: 4,
    title: "Introduction to Digital Electronics",
    description: `Explore the design and analysis of digital circuits, the building blocks of all modern electronic devices. Topics include Boolean algebra, logic gates, combinational and sequential circuits, and digital system design principles.`,
    icon: "bg-[url('/landing/live_3.svg')]",
  },
]
