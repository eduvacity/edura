"use client"

import React, { useEffect, useRef } from "react"
import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"

interface Props {
  isDarkMode: boolean
  isRowOnLarge: boolean
  logs: string[]
}

const TerminalComponent: React.FC<Props> = ({
  isDarkMode,
  logs,
  isRowOnLarge,
}) => {
  const terminalRef = useRef<HTMLDivElement | null>(null)
  const terminalInstance = useRef<Terminal | null>(null)
  const fitAddon = useRef<FitAddon>(new FitAddon())
  console.log("isDarkMode", isDarkMode)
  useEffect(() => {
    if (!terminalRef.current) return
    if (!terminalInstance.current) {
      const terminal = new Terminal({
        fontFamily: "monospace", // Custom font family
        fontSize: 17, // Font size
        letterSpacing: -1,
        cursorBlink: false,
        theme: {
          background: isDarkMode ? "#0E2831" : "#E9E9E9",
          foreground: isDarkMode ? "#FFFFFF" : "#000000",
          cursor: "#FFD700",
          selectionBackground: "rgba(255,255,255,0.3)", // Selection highlight
        },
        scrollback: 1000, // Allow scrolling through terminal history
      })

      terminal.loadAddon(fitAddon.current)
      terminal.open(terminalRef.current)
      fitAddon.current.fit()

      terminalInstance.current = terminal
    } else {
      terminalInstance.current.options.theme = {
        background: isDarkMode ? "#0E2831" : "#E9E9E9",
        foreground: isDarkMode ? "#FFFFFF" : "#000000",
        cursor: "#FFD700",
        selectionBackground: "rgba(255,255,255,0.3)",
      }
    }
  }, [isDarkMode])

  useEffect(() => {
    const terminal = terminalInstance.current

    if (terminal) {
      terminal.clear() // Clear terminal before updating logs
      logs.forEach((log) => {
        terminal.writeln(log) // Write each log to the terminal
      })
    }
  }, [logs]) // Update terminal when logs change

  return (
    <div
      ref={terminalRef}
      className={`font-satoshi ${isRowOnLarge ? "w-full" : "w-[624px]"} ${
        isRowOnLarge ? "h-[235px]" : "h-full"
      } overflow-hidden px-5 py-6 ${
        isDarkMode ? "bg-[#0E2831]" : "bg-[#E9E9E9]"
      }`}
    />
  )
}

export default TerminalComponent
