"use client"

import { executeCode } from "@/api"
import SubmitButton from "@/components/Button"
import { AngleDown } from "@/components/SVGs"
import {
  ArrowRight,
  DarkLightToggler,
  HorizontalRotationIcon,
} from "@/components/SVGs/portal"
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "@/lib/utils/constants"
import { Editor, loader } from "@monaco-editor/react"
import { AppBar, IconButton, Toolbar } from "@mui/material"
import monacoThemes from "monaco-themes/themes/themelist.json"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import SubmitUpload from "../../submit"
import CodeOutput from "./Output"

const TerminalComponent = dynamic(() => import("./terminal"), {
  ssr: false,
})

export default function EmbeddedUpload({ moduleId }: { moduleId: string }) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [isRowOnLarge, setIsRowOnLarge] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [language, setLanguage] = useState<string>("java")
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])
  const [theme, setTheme] = useState("light")
  const [code, setCode] = useState<string>(
    CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]
  )
  const [output, setOutput] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)
  const [rawLogData, setRawLogData] = useState<{
    timeTaken: string
    modules: number
  } | null>(null)

  /**
   * Extract logs and final return value from the code execution output.
   */
  const extractLogsAndOutput = (output: string): [string[], string | null] => {
    const lines = output.split("\n")
    const logs = lines.slice(0, -1)
    const returnValue = lines[lines.length - 1] || null
    return [logs, returnValue]
  }

  const runCode = async () => {
    if (!code) {
      toast.warn("Please write some code before executing!")
      return
    }

    try {
      setIsLoading(true)
      setTerminalLogs([])

      const startTime = performance.now()
      const { run: result }: any = await executeCode(language, code)
      const endTime = performance.now()

      const rawOutput = result?.stdout || ""
      const rawErrors = result?.stderr || ""

      if (rawOutput) {
        const timeTaken = ((endTime - startTime) / 1000).toFixed(1)
        const modules = Math.floor(Math.random() * 5000) + 2000

        setRawLogData({ timeTaken, modules })

        if (language === "javascript") {
          const [logs] = extractLogsAndOutput(rawOutput)
          setOutput(logs.length > 0 ? logs : null)
        } else {
          setOutput(rawOutput.split("\n"))
        }
      } else {
        setTerminalLogs([`\x1b[31m[ERROR]\x1b[0m No output generated.`])
        setOutput(null)
      }

      if (rawErrors) {
        setTerminalLogs((prevLogs) => [
          ...prevLogs,
          `\x1b[31m[ERROR]\x1b[0m ${rawErrors}`,
        ])
      }
    } catch (error: any) {
      toast.error(error?.message || "Unable to run code")
      setTerminalLogs([
        `\x1b[31m[ERROR]\x1b[0m ${
          error?.message || "Unexpected error occurred."
        }`,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!rawLogData) return

    const { timeTaken, modules } = rawLogData

    const greenColor = `\x1b[38;2;54;135;91m`
    const textColor = isDarkMode ? `\x1b[38;2;255;255;255m` : `\x1b[38;2;0;0;0m`

    const checkIcon = `${greenColor}✓\x1b[0m`
    const compiledText = `${greenColor}Compiled\x1b[0m`
    const timingText = `${textColor}in ${timeTaken}s\x1b[0m`
    const modulesText = `${textColor}(${modules} modules)\x1b[0m`

    const compiledLog = `${checkIcon} ${compiledText} ${timingText} ${modulesText}`

    setTerminalLogs([compiledLog])
  }, [isDarkMode, rawLogData])

  const toggleLayout = () => {
    setIsRowOnLarge(!isRowOnLarge)
  }

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    loader.init().then(async (monacoInstance) => {
      const molokaiThemePath = monacoThemes["github-dark"]
      const lightThemePath = monacoThemes["github-light"]

      if (molokaiThemePath && lightThemePath) {
        const [molokaiTheme, lightTheme] = await Promise.all([
          import(`monaco-themes/themes/${molokaiThemePath}`),
          import(`monaco-themes/themes/${lightThemePath}`),
        ])

        monacoInstance.editor.defineTheme("molokai", molokaiTheme)
        monacoInstance.editor.defineTheme("light", lightTheme)

        setTheme(isDarkMode ? "molokai" : "light")
      }
    })
  }, [isDarkMode])

  const onMount = (editor: any) => {
    editorRef.current = editor
    editor.focus()
  }

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.warn("Please write some code before submitting!")
      return
    }
    try {
      const payload = { language, code }
      console.log("Submitting payload:", payload)
      // Replace with API call if needed.
      toast.success("Code snippet submitted successfully!")
      setIsSubmitted(true)
    } catch (error: any) {
      toast.error(error?.message || "Submission failed!")
    }
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
          <div className="w-full flex flex-col lg-md:flex-row justify-between">
            <div className="flex flex-col mb-6">
              <Link
                href={`/instructor/lesson/modules/module/${moduleId}`}
                className="flex gap-2 items-center cursor-pointer"
              >
                <ArrowRight className="transform rotate-180 text-[#4D6C62]" />
                <h1 className="text-xl lg-md:text-[24px] leading-[30.8px] font-bold font-satoshi tracking-normal text-[#4D6C62]">
                  Code Example Block
                </h1>
              </Link>
            </div>
            <div className="w-[246px] h-[48px] flex gap-3">
              <button
                type="button"
                className="w-[123px] h-full py-[18px] px-[36px] rounded-[7px] border border-pcolor font-satoshi text-base text-pcolor hover:scale-[0.99] flex justify-center items-center"
                onClick={() => toast.info("Submission cancelled")}
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
                Edit your code snippet and select the language you want to
                submit
              </p>
            </div>
            {/* Native select for language selection using LANGUAGE_VERSIONS */}
            <div className="max-w-[300px]">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-[#4D6C62] mb-1"
              >
                Select Language:
              </label>
              <div className="w-full relative">
                <select
                  id="language"
                  value={language}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const newLanguage = e.target.value
                    console.log("New language selected:", newLanguage)
                    console.log(
                      "New code snippet:",
                      CODE_SNIPPETS[newLanguage as keyof typeof CODE_SNIPPETS]
                    )
                    setLanguage(newLanguage)
                    setCode(
                      CODE_SNIPPETS[
                        newLanguage as keyof typeof CODE_SNIPPETS
                      ] || ""
                    )
                  }}
                  className="w-full h-[50px] border border-solid border-[#DDDDDD] bg-[#F5F6F7] rounded-[7px] py-1 px-6 font-satoshi font-normal text-base tracking-normal text-[#333333] placeholder:text-[#7A8699] outline-none hover:border-pcolor focus:border-pcolor flex appearance-none "
                >
                  {Object.keys(LANGUAGE_VERSIONS)?.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)} (
                      {
                        LANGUAGE_VERSIONS[
                          lang as keyof typeof LANGUAGE_VERSIONS
                        ]
                      }
                      )
                    </option>
                  ))}
                </select>
                <span className="absolute top-5 right-3">
                  <AngleDown />
                </span>
              </div>
            </div>
            <div
              className={`min-h-screen flex flex-col ${
                isDarkMode
                  ? "bg-[#203A42] text-white"
                  : "bg-[#F7F7F9] text-black"
              }`}
            >
              <AppBar
                sx={{ position: "relative" }}
                className={`w-full h-[100px] ${
                  isDarkMode
                    ? "bg-[#195568] text-white"
                    : "bg-[#F7F7F9] text-black"
                } shadow-none place-content-center px-6`}
              >
                <Toolbar>
                  <div className="w-[126px] h-[33.55px] flex justify-between gap-2">
                    <IconButton
                      disableRipple
                      edge="start"
                      color="inherit"
                      onClick={toggleLayout}
                      aria-label="close"
                      className="bg-transparent"
                    >
                      <HorizontalRotationIcon
                        className={`${
                          isRowOnLarge ? "block" : "transform rotate-90"
                        } ${isDarkMode ? "text-white" : "text-[#7E7E7E]"}`}
                      />
                    </IconButton>
                    <IconButton
                      disableRipple
                      edge="start"
                      color="inherit"
                      onClick={handleThemeChange}
                      aria-label="toggle theme"
                      className="bg-transparent"
                    >
                      <DarkLightToggler
                        className={isDarkMode ? "text-white" : "text-[#7E7E7E]"}
                      />
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
              <div
                className={`w-full ${isRowOnLarge ? "min-h-screen" : ""} p-4 ${
                  isRowOnLarge
                    ? "flex flex-col lg-md:flex-row gap-8"
                    : "flex flex-col gap-12"
                }`}
              >
                <div
                  className={`${isRowOnLarge ? "h-[85vh]" : "h-[50vh]"} ${
                    isDarkMode
                      ? "border border-solid border-[#48656E]"
                      : "border border-solid border-[#919191]"
                  } rounded-[10px] overflow-hidden`}
                >
                  <div
                    className={`w-full h-full flex ${
                      isRowOnLarge ? "flex-col" : "flex-row"
                    } justify-between`}
                  >
                    <Editor
                      key={language} // Forces remount when language changes.
                      width="100%"
                      height={`${isRowOnLarge ? "80%" : "100%"}`}
                      language={language}
                      value={code}
                      onMount={onMount}
                      theme={theme}
                      onChange={(value: string | undefined) => {
                        if (value !== undefined) {
                          setCode(value)
                        }
                      }}
                      options={{
                        fontSize: 14,
                        padding: { top: 20, bottom: 20 },
                        selectOnLineNumbers: true,
                        smoothScrolling: true,
                      }}
                    />
                    <TerminalComponent
                      isDarkMode={isDarkMode}
                      isRowOnLarge={isRowOnLarge}
                      logs={terminalLogs}
                    />
                  </div>
                </div>
                <div
                  className={`${
                    isRowOnLarge ? "w-1/2 h-[85vh]" : "w-full h-[50vh]"
                  } bg-white rounded-[10px] ${
                    isDarkMode
                      ? "border border-solid border-[#48656E]"
                      : "border border-solid border-[#919191]"
                  }`}
                >
                  <CodeOutput
                    editorRef={editorRef}
                    language={language}
                    isDarkMode={isDarkMode}
                    handleRunCode={runCode}
                    output={output}
                    terminalLogs={terminalLogs}
                    isLoading={isLoading}
                    isError={isError}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
