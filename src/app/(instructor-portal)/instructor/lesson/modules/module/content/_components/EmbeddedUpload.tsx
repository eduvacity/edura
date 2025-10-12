"use client"

import SubmitButton from "@/components/Button"
import { ArrowRight } from "@/components/SVGs/portal"
import Link from "next/link"
import { useState } from "react"
import SubmitUpload from "../submit"

export default function EmbeddedUpload({ moduleId }: { moduleId: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [pastedLink, setPastedLink] = useState<string>("")

  // Handle form submission for all modes
  const handleSubmit = async () => {
    // Embedded video submission using the pasted link
    if (pastedLink.trim() === "") {
      alert("Please paste a valid video link.")
      return
    }
    // Optional: add URL validation if needed
    try {
      if (pastedLink) {
        setIsSubmitted(true)
        setPastedLink("")
      }
    } catch (error: any) {}
  }

  return (
    <div className="min-h-screen w-full p-2 lg:p-4 xl:p-6 flex flex-col gap-[54px]">
      {isSubmitted ? (
        <SubmitUpload
          submitted={isSubmitted}
          reUpload={() => setIsSubmitted(false)}
          back={`/instructor/lesson/modules/module/${moduleId}`}
        />
      ) : (
        <>
          {" "}
          <div className="w-full flex flex-col lg-md:flex-row justify-between">
            <div className="flex flex-col mb-6">
              <Link
                href={`/instructor/lesson/modules/module/${moduleId}`}
                className="flex gap-2 items-center cursor-pointer"
              >
                <ArrowRight className="transform rotate-180 text-[#4D6C62]" />
                <h1 className="text-xl lg-md:text-[24px] leading-[30.8px] font-bold font-satoshi tracking-normal text-[#4D6C62]">
                  Embedded
                </h1>
              </Link>
            </div>
            <div className="w-[246px] h-[48px] flex gap-3">
              <button
                type="button"
                className="w-[123px] h-full py-[18px] px-[36px] rounded-[7px] border border-primary font-satoshi text-base text-primary hover:scale-[0.99] flex justify-center items-center"
              >
                Cancel
              </button>
              <SubmitButton
                onClick={handleSubmit}
                className="w-[107px] h-full py-[18px] px-[36px] rounded-[7px]"
              >
                Save
              </SubmitButton>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <div className="w-full max-w-[636px] flex flex-col gap-[10px]">
              <p className="font-arial font-normal text-base leading-[27.2px] tracking-normal text-[#535353]">
                Paste link to any content you want to upload
              </p>
            </div>

            {/* // Paste link field for embedded videos */}
            <input
              type="text"
              value={pastedLink}
              onChange={(e) => setPastedLink(e.target.value)}
              placeholder="Paste your link here"
              className="w-full max-w-[1499px] min-h-[56px] border border-solid border-[#DDDDDD] bg-[#F5F6F7] rounded-[7px] py-[18px] px-6 font-satoshi font-normal text-base tracking-normal text-[#333333] placeholder:text-[#7A8699] outline-none hover:border-primary focus:border-primary"
            />
          </div>
        </>
      )}
    </div>
  )
}
