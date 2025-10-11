"use client"

import { executeCode } from "@/api"
import { RefreshIcon } from "@/components/SVGs/portal"
import { SmallSpinner } from "@/components/ui/loader"
import { IconButton } from "@mui/material"
import { useState } from "react"
import { toast } from "react-toastify"

interface Props {
  isDarkMode: boolean
  editorRef: any
  language: string
  terminalLogs: string[]
  output: string[] | null
  isLoading: boolean
  isError: string | null
  handleRunCode: () => void
}
export default function CodeOutput({
  isDarkMode,
  terminalLogs,
  output,
  isLoading,
  isError,
  handleRunCode,
}: Props) {
  // const [output, setOutput] = useState<string[] | null>(null)
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState<string | null>(null)

  // const runCode = async () => {
  //   const sourceCode = editorRef?.current?.getValue()
  //   if (!sourceCode) {
  //     toast.warn("Please write some code before executing!")
  //     return
  //   }
  //   try {
  //     setIsLoading(true)
  //     const { run: result }: any = await executeCode(language, sourceCode)
  //     setOutput(result?.stdout?.split("\n") || [])
  //     setIsError(result?.stderr || null)
  //   } catch (error: any) {
  //     toast.error(error?.message || "Unable to run code")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="w-full relative flex flex-col h-[75vh]">
      <div
        className={`w-full h-[90px] rounded-t-[10px] ${
          isDarkMode ? "bg-[#071C23]" : "bg-[#7E7E7E]"
        } flex gap-8 items-center justify-between place-content-center px-4`}
      >
        <div className="w-[66px] flex gap-[6.08px]">
          <span className="w-[17.94px] h-[17.94px] bg-[#DF1111] rounded-full"></span>
          <span className="w-[17.94px] h-[17.94px] bg-[#E0C11D] rounded-full"></span>
          <span className="w-[17.94px] h-[17.94px] bg-[#3FA46E] rounded-full"></span>
        </div>
        <div className="w-full max-w-[538px] h-[45] py-3 px-4 bg-white rounded-[28px] flex gap-2 items-center">
          <IconButton disableRipple onClick={handleRunCode}>
            <RefreshIcon className="w-5 h-5" />
          </IconButton>
          <p className="font-satoshi font-medium text-base/[21.6px] text-left text-black">
            localhost:3000
          </p>
        </div>
        <div className="w-[80px]"></div>
      </div>
      <div className="py-12 px-10 flex-1">
        {/* {isLoading ? (
          <SmallSpinner variants="blue" />
        ) : output || isError ? (
          <div className="w-full h-full overflow-y-auto">
            {output?.map((line, index) => (
              <p
                key={index}
                className="w-full font-satoshi font-bold text-black text-[25px]/[33.75px] text-left"
              >
                {line}
              </p>
            ))}
            {isError && (
              <p className="w-full font-satoshi font-normal text-red-500 text-[18px]/[24px] text-left mt-4">
                Error: {isError}
              </p>
            )}
          </div>
        ) : (
          <p
            className={`overflow-y-auto h-full w-full font-satoshi font-normal italic text-black/80 text-[18px]/[24px] text-left`}
          >
            Click on the refresh icon to see the output here.
          </p>
        )} */}
        {isLoading ? (
          <SmallSpinner variants="blue" />
        ) : isError ? (
          <p className="w-full font-satoshi font-normal text-red-500 text-[18px]/[24px] text-left mt-4">
            Error: {isError}
          </p>
        ) : (
          <>
            {/* Display terminal logs */}
            {output && output.length > 0 ? (
              <div className="w-full overflow-y-auto h-32 mb-4">
                {output?.map((line, index) => (
                  <p
                    key={index}
                    className="font-satoshi font-normal text-black text-[16px] text-left"
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p className="font-satoshi font-normal italic text-black/80 text-[18px]/[24px] text-left">
                No output to display.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
