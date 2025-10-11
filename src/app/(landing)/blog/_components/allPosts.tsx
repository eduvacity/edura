"use client"
import { ArrowUp } from "@/components/SVGs"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AllPostsSection() {
  const router = useRouter()
  return (
    <motion.section
      className="w-full relative grid pb-12 gap-6 px-3 lg-md:px-6 xl:px-8"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] xl:py-12 flex flex-col justify-center items-center 3xl:gap-[64px]">
          <div className="w-full xl:py-12 flex flex-col gap-8 3xl:gap-[64px] px-4 xl:px-8 3xl:px-0">
            <h2 className="w-full text-2xl/[50px] lg-md:text-3xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left capitalize">
              Recent blog posts
            </h2>
            <div className="grid grid-cols-1 lg-md:grid-cols-2 lg:grid-cols-3 gap-[20px] min-h-[300px]">
              {posts?.map((post, index) => {
                return (
                  <div
                    key={index}
                    className="xl:max-w-[512px] xl:h-[566.33px] h-full flex flex-col gap-[26.67px] cursor-pointer"
                    onClick={() => router.push(`/blog/${post.id}`)}
                  >
                    <Image
                      width={512}
                      height={320}
                      src={post.image}
                      alt={post.title}
                      className="w-full h-[125px] lg-md:h-[320px] object-cover rounded-[20.7px] xl:[512px] xl:h-[320px]"
                    />
                    <div className="w-full flex flex-col gap-8">
                      <div className="flex flex-col gap-[10.67px]">
                        <div className="text-lg text-pcolor text-left font-bold font-arial">
                          {post.author} <span>&bull;</span>{" "}
                          <span>{post.date}</span>
                        </div>
                        <div className="w-full flex justify-between gap-1">
                          <h3 className="w-full text-[#101828] text-left font font-medium font-arial text-xl lg-md:text-3xl">
                            {post.title}
                          </h3>
                          <ArrowUp className="w-8 h-8" />
                        </div>
                        <p className="w-full line-clamp-2 text-[#475467] font-arial font-normal text-lg text-left">
                          {post.description}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag, tagIndex) => {
                          const color = tagColors[tagIndex % tagColors.length]
                          return (
                            <span
                              key={tagIndex}
                              className={`${color.bg} ${color.text} ${color.border} border-[1.33px] px-[13.33px] py-2 rounded-full text-sm`}
                            >
                              {tag}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const tagColors = [
  { bg: "bg-[#F9F5FF]", text: "text-[#6941C6]", border: "border-[#E9D7FE]" },
  { bg: "bg-[#EEF4FF]", text: "text-[#3538CD]", border: "border-[#C7D7FE]" },
  { bg: "bg-[#FDF2FA]", text: "text-[#C11574]", border: "border-[#FCCEEE]" },
  { bg: "bg-[#ECFDF3]", text: "text-[#067647]", border: "border-[#ABEFC6]" },
  { bg: "bg-[#FEF6EE]", text: "text-[#B93815]", border: "border-[#F9DBAF]" },
  { bg: "bg-[#F8F9FC]", text: "text-[#363F72]", border: "border-[#D5D9EB]" },
]

const posts = [
  {
    id: 4,
    author: "Olivia Rhye",
    date: "20 Jan 2024",
    title: "UX review presentations",
    description: `How do you create compelling presentations that wow your colleagues and impress your managers?`,
    image: "/images/post4.png",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 5,
    author: "Phoenix Baker",
    date: "19 Jan 2024",
    title: "Migrating to Linear 101",
    description: `Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get.`,
    image: "/images/post5.png",
    tags: ["Software", "FrameWork", "Design"],
  },
  {
    id: 6,
    author: "Lana Steiner",
    date: "18 Jan 2024",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing APIs.",
    image: "/images/post6.jpeg",
    tags: ["Software", "Research"],
  },
  {
    id: 7,
    author: "Alec Whitten",
    date: "17 Jan 2024",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/post7.png",
    tags: ["Software", "Research"],
  },
  {
    id: 8,
    author: "Lana Steiner",
    date: "18 Jan 2024",
    title: "Building your API stack",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/post8.png",
    tags: ["Software", "Research"],
  },
  {
    id: 9,
    author: "Lana Steiner",
    date: "18 Jan 2024",
    title: "Building your API stack",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/post9.png",
    tags: ["Software", "Research"],
  },
]
