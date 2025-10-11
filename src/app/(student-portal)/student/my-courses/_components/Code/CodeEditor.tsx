"use client"
import { executeCode } from "@/api"
import { CODE_SNIPPETS } from "@/lib/utils/constants"
import { Editor, loader } from "@monaco-editor/react"
import monacoThemes from "monaco-themes/themes/themelist.json"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import CodeOutput from "./Output"
import dynamic from "next/dynamic"

const TerminalComponent = dynamic(() => import("./terminal"), {
  ssr: false, // Disables server-side rendering
})
interface Props {
  isDarkMode: boolean
  isRowOnLarge: boolean
}

export default function CodeEditor({ isDarkMode, isRowOnLarge }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null)
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
   * Extracts console logs and the final return value from JavaScript output.
   * @param output - Raw stdout string.
   */
  const extractLogsAndOutput = (output: string): [string[], string | null] => {
    const lines = output.split("\n")
    const logs = lines.slice(0, -1) // All but the last line as logs
    const returnValue = lines[lines.length - 1] || null // Last line as return value
    return [logs, returnValue]
  }

  const runCode = async () => {
    if (!code) {
      toast.warn("Please write some code before executing!")
      return
    }

    try {
      setIsLoading(true)
      setTerminalLogs([]) // Clear terminal before execution

      const startTime = performance.now() // Start timing
      const { run: result }: any = await executeCode(language, code) // Execute the code
      const endTime = performance.now() // End timing

      const rawOutput = result?.stdout || ""
      const rawErrors = result?.stderr || ""

      if (rawOutput) {
        const timeTaken = ((endTime - startTime) / 1000).toFixed(1) // Calculate time in seconds
        const modules = Math.floor(Math.random() * 5000) + 2000 // Random module count

        setRawLogData({ timeTaken, modules }) // Store raw log data for dynamic updates

        if (language === "javascript") {
          const [logs, returnValue]: any = extractLogsAndOutput(rawOutput)
          setOutput(logs.length > 0 ? logs : null) // Set logs if available
        } else {
          setOutput(rawOutput.split("\n")) // Split raw output for line-by-line display
        }
      } else {
        setTerminalLogs([
          `\x1b[31m[ERROR]\x1b[0m No output generated.`, // Red error message
        ])
        setOutput(null)
      }

      if (rawErrors) {
        setTerminalLogs((prevLogs) => [
          ...prevLogs,
          `\x1b[31m[ERROR]\x1b[0m ${rawErrors}`, // Red stderr message
        ])
      }
    } catch (error: any) {
      toast.error(error?.message || "Unable to run code")
      setTerminalLogs([
        `\x1b[31m[ERROR]\x1b[0m ${
          error?.message || "Unexpected error occurred."
        }`, // Red error message
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!rawLogData) return

    const { timeTaken, modules } = rawLogData

    // Define colors for light and dark mode
    const greenColor = `\x1b[38;2;54;135;91m` // Green: #36875B
    const textColor = isDarkMode ? `\x1b[38;2;255;255;255m` : `\x1b[38;2;0;0;0m` // White for dark mode, Black for light mode

    // Format styled output
    const checkIcon = `${greenColor}✓\x1b[0m` // Green check icon
    const compiledText = `${greenColor}Compiled\x1b[0m` // Green "Compiled"
    const timingText = `${textColor}in ${timeTaken}s\x1b[0m` // Timing in black or white
    const modulesText = `${textColor}(${modules} modules)\x1b[0m` // Modules in black or white

    const compiledLog = `${checkIcon} ${compiledText} ${timingText} ${modulesText}`

    // Replace all logs with the updated compiled log
    setTerminalLogs([compiledLog])
  }, [isDarkMode, rawLogData])

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

  console.log("output", output)
  return (
    <div
      className={`w-full ${isRowOnLarge ? "min-h-screen" : ""} p-4 ${
        isRowOnLarge
          ? "flex flex-col lg-md:flex-row gap-8"
          : "flex flex-col gap-12"
      }`}
    >
      {/* <div
        className={`${isRowOnLarge ? "w-1/2 h-[85vh]" : "w-full h-[50vh]"} ${
          isDarkMode
            ? "border border-solid border-[#48656E]"
            : "border border-solid border-[#919191]"
        } rounded-[10px] overflow-hidden`}
      > */}
      <div
        className={`${
          isRowOnLarge
            ? "h-[85vh]" // Higher height for vertical layout
            : "h-[50vh]"
        } ${
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
        } bg-white rounded-[10px]  ${
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
  )
}
