"use client"
import { ArrowUp } from "@/components/SVGs"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LatestPostsSection() {
  const router = useRouter()
  return (
    <motion.section
      className="w-full relative grid py-12 gap-6 px-3 lg-md:px-6 xl:px-8"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="w-full relative flex flex-col xl:flex-row justify-center items-center gap-12">
        <div className="w-full max-w-[1500px] xl:py-12 flex flex-col justify-center items-center 3xl:gap-[64px]">
          <div className="w-full xl:py-12 flex flex-col gap-8 3xl:gap-[64px] px-4 xl:px-8 3xl:px-0">
            <h2 className="w-full text-2xl/[50px] lg-md:text-3xl/[60px] font-semibold font-sans text-[#011B23] tracking-[0.5px] text-left capitalize">
              Recent blog posts
            </h2>
            <div className="flex flex-col xl:flex-row gap-[42.67px] xl:h-[576px]">
              {/* First half with the first post */}
              <div
                className="xl:max-w-[789.33px] h-full flex flex-col gap-[26.67px] cursor-pointer"
                onClick={() => router.push(`/blog/${latestPosts[0].id}`)}
              >
                <Image
                  width={789.33}
                  height={329.67}
                  src={latestPosts[0].image}
                  alt={latestPosts[0].title}
                  className="w-full h-[125px] lg-md:h-[329.67px] object-cover rounded-[20.7px] xl:[789.33px] xl:h-[329.67px]"
                />
                <div className="w-full flex flex-col gap-[10.67px]">
                  <div className="text-lg text-pcolor text-left font-bold font-arial">
                    {latestPosts[0].author} <span> &bull;</span>{" "}
                    {latestPosts[0].date}
                  </div>
                  <div className="w-full flex justify-between gap-1">
                    <h3 className="w-full text-[#101828] text-left font font-medium font-arial text-xl lg-md:text-3xl">
                      {latestPosts[0].title}
                    </h3>{" "}
                    <ArrowUp className="w-8 h-8" />
                  </div>
                  <p className="w-full line-clamp-2 text-[#475467] font-arial font-normal text-lg text-left">
                    {latestPosts[0].description}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {latestPosts[0].tags.map((tag, index) => {
                    const color = tagColors[index % tagColors.length]
                    return (
                      <span
                        key={index}
                        className={`${color.bg} ${color.text} ${color.border} border-[1.33px] px-[13.33px] py-2 rounded-full text-sm`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Second half with the last two posts stacked */}
              <div
                className="xl:max-w-[789.33px] h-full flex flex-col gap-[26.67px] cursor-pointer"
                onClick={() => router.push("/blog/1")}
              >
                {latestPosts.slice(1).map((post, index) => {
                  return (
                    <div
                      key={index}
                      className="h-full xl:h-[266.67px] flex flex-col xl:flex-row gap-[26.67px] cursor-pointer"
                      onClick={() => router.push(`/blog/${post.id}`)}
                    >
                      <Image
                        width={426.67}
                        height={266.67}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-[125px] lg-md:h-[329.67px] object-cover rounded-[20.7px] xl:w-[326.67px] xl:h-[266.67px]"
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

const latestPosts = [
  {
    id: 1,
    author: "Olivia Rhye",
    date: "20 Jan 2024",
    title: "UX review presentations",
    description: `How do you create compelling presentations that wow your colleagues and impress your managers?`,
    image: "/images/post1.png",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 2,
    author: "Phoenix Baker",
    date: "19 Jan 2024",
    title: "Migrating to Linear 101",
    description: `Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get.`,
    image: "/images/post2.png",
    tags: ["Design", "Research"],
  },
  {
    id: 3,
    author: "Lana Steiner",
    date: "18 Jan 2024",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing APIs.",
    image: "/images/post3.png",
    tags: ["Software", "Research"],
  },
]
