"use client"

import { executeCode } from "@/api"
import { CODE_SNIPPETS } from "@/lib/utils/constants"
import { Editor } from "@monaco-editor/react"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import CodeOutput from "./Output"

const TerminalComponent = dynamic(() => import("./terminal"), {
  ssr: false,
})

interface Props {
  isDarkMode: boolean
  isRowOnLarge: boolean
}

export default function CodeEditor({ isDarkMode, isRowOnLarge }: Props) {
  const editorRef = useRef<any>(null)

  const [language, setLanguage] = useState<string>("java")
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])
  const [theme, setTheme] = useState<string>(isDarkMode ? "vs-dark" : "vs")
  const [code, setCode] = useState<string>(
    CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS],
  )
  const [output, setOutput] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)

  const [rawLogData, setRawLogData] = useState<{
    timeTaken: string
    modules: number
  } | null>(null)

  /**
   * Extract console logs and the final return value
   * from JavaScript output.
   */
  const extractLogsAndOutput = (
    rawOutput: string,
  ): [string[], string | null] => {
    const lines = rawOutput.split("\n")
    const logs = lines.slice(0, -1)
    const returnValue = lines[lines.length - 1] || null

    return [logs, returnValue]
  }

  const runCode = async () => {
    if (!code.trim()) {
      toast.warn("Please write some code before executing!")
      return
    }

    try {
      setIsLoading(true)
      setIsError(null)
      setOutput(null)
      setTerminalLogs([])

      const startTime = performance.now()

      const { run: result }: any = await executeCode(language, code)

      const endTime = performance.now()
      const rawOutput = result?.stdout || ""
      const rawErrors = result?.stderr || ""

      if (rawOutput) {
        const timeTaken = ((endTime - startTime) / 1000).toFixed(1)
        const modules = Math.floor(Math.random() * 5000) + 2000

        setRawLogData({
          timeTaken,
          modules,
        })

        if (language === "javascript") {
          const [logs, returnValue] = extractLogsAndOutput(rawOutput)

          const javascriptOutput = returnValue ? [...logs, returnValue] : logs

          setOutput(javascriptOutput.length > 0 ? javascriptOutput : null)
        } else {
          setOutput(
            rawOutput.split("\n").filter((line: string) => line.length > 0),
          )
        }
      } else if (!rawErrors) {
        const message = "No output generated."

        setIsError(message)
        setTerminalLogs([`\x1b[31m[ERROR]\x1b[0m ${message}`])
      }

      if (rawErrors) {
        setIsError(rawErrors)

        setTerminalLogs((previousLogs) => [
          ...previousLogs,
          `\x1b[31m[ERROR]\x1b[0m ${rawErrors}`,
        ])
      }
    } catch (error: any) {
      const message = error?.message || "Unexpected error occurred."

      toast.error(message)
      setIsError(message)
      setOutput(null)

      setTerminalLogs([`\x1b[31m[ERROR]\x1b[0m ${message}`])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setTheme(isDarkMode ? "vs-dark" : "vs")
  }, [isDarkMode])

  useEffect(() => {
    const nextSnippet = CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]

    if (nextSnippet !== undefined) {
      setCode(nextSnippet)
    }
  }, [language])

  useEffect(() => {
    if (!rawLogData) return

    const { timeTaken, modules } = rawLogData

    const greenColor = "\x1b[38;2;54;135;91m"
    const textColor = isDarkMode ? "\x1b[38;2;255;255;255m" : "\x1b[38;2;0;0;0m"

    const checkIcon = `${greenColor}✓\x1b[0m`
    const compiledText = `${greenColor}Compiled\x1b[0m`
    const timingText = `${textColor}in ${timeTaken}s\x1b[0m`
    const modulesText = `${textColor}(${modules} modules)\x1b[0m`

    setTerminalLogs([
      `${checkIcon} ${compiledText} ${timingText} ${modulesText}`,
    ])
  }, [isDarkMode, rawLogData])

  const onMount = (editor: any) => {
    editorRef.current = editor
    editor.focus()
  }

  return (
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
            width="100%"
            height={isRowOnLarge ? "80%" : "100%"}
            language={language}
            value={code}
            onMount={onMount}
            theme={theme}
            onChange={(value) => {
              setCode(value ?? "")
            }}
            options={{
              fontSize: 14,
              padding: {
                top: 20,
                bottom: 20,
              },
              selectOnLineNumbers: true,
              smoothScrolling: true,
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
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
  )
}
