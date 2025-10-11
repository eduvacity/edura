"use client"

import SubmitButton from "@/components/Button"
import { ArrowRight } from "@/components/SVGs/portal"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"

const RichTextAndImageEditor = dynamic(
  () => import("@/components/Inputs/RichTextAndImageField"),
  { ssr: false }
)
const sampleContent = `
  <p>This is a sample content with an embedded code snippet:</p>
  <pre><code class="language-javascript">
  // JavaScript Code Sample
  function helloWorld() {
    console.log("Hello, world!");
  }
  helloWorld();
  </code></pre>
  <p>End of code snippet.</p>
`
export default function TextAndImages({ moduleId }: { moduleId: string }) {
  const [content, setContent] = useState(sampleContent)

  return (
    <div className="min-h-screen w-full px-2 lg:p-4 xl:px-6 flex flex-col gap-[54px]">
      <div className="w-full flex flex-col lg-md:flex-row justify-between">
        <div className="flex flex-col">
          <Link
            href={`/instructor/lesson/modules/module/${moduleId}`}
            className="flex gap-2 items-center cursor-pointer"
          >
            <ArrowRight className="transform rotate-180 text-[#4D6C62]" />
            <h1 className="text-xl lg-md:text-[24px] leading-[30.8px] font-bold font-satoshi tracking-normal text-[#4D6C62]">
              Add Text and Images
            </h1>
          </Link>
        </div>
        <div className="w-[246px] h-[48px] flex gap-3">
          <button
            type="button"
            className="w-[123px] h-full py-[18px] px-[36px] rounded-[7px] border border-pcolor font-satoshi text-base text-pcolor hover:scale-[0.99] flex justify-center items-center"
          >
            Cancel
          </button>
          <SubmitButton className="w-[107px] h-full py-[18px] px-[36px] rounded-[7px]">
            Save
          </SubmitButton>
        </div>
      </div>
      <RichTextAndImageEditor
        value={content}
        onChange={(content: string) => setContent(content)}
        placeholder="Enter description"
      />
    </div>
  )
}
