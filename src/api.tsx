import axios from "axios"
import { LANGUAGE_VERSIONS } from "./lib/utils/constants"

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  timeout: 10000, // Set a timeout of 10 seconds
})

interface ExecuteResponse {
  language: string
  version: string
  run: {
    stdout: string
    stderr: string
    output: string // Concatenated stdout and stderr
    code: number // Exit code
    signal: string | null // Termination signal
  }
  compile?: {
    stdout: string
    stderr: string
    code: number
  }
}

export const executeCode = async (
  language: string,
  sourceCode: string
): Promise<ExecuteResponse> => {
  // Validate language and sourceCode
  if (
    !language ||
    !LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS]
  ) {
    throw new Error(`Unsupported or missing language: ${language}`)
  }

  if (!sourceCode.trim()) {
    throw new Error("Source code cannot be empty.")
  }
  try {
    // Make the API request
    const response = await API.post<ExecuteResponse>("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS],
      files: [{ content: sourceCode }],
    })

    return response?.data
  } catch (error: any) {
    // Handle errors from the API
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Unknown error occurred."
    throw new Error(`Failed to execute code: ${errorMessage}`)
  }
}
