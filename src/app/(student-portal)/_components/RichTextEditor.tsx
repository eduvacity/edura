"use client"

import { useEffect, useRef } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

// Define custom icons for undo and redo
const CustomUndoIcon = `
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.27995 12H2.59995V10.4H8.27995C9.11995 10.4 9.84982 10.1333 10.4696 9.6C11.0898 9.06667 11.4 8.4 11.4 7.6C11.4 6.8 11.0898 6.13333 10.4696 5.6C9.84982 5.06667 9.11995 4.8 8.27995 4.8H3.23995L5.31995 6.88L4.19995 8L0.199951 4L4.19995 0L5.31995 1.12L3.23995 3.2H8.27995C9.57329 3.2 10.6834 3.62 11.6104 4.46C12.5368 5.3 13 6.34667 13 7.6C13 8.85333 12.5368 9.9 11.6104 10.74C10.6834 11.58 9.57329 12 8.27995 12Z"
      fill="#575353"
    />
  </svg>`
const CustomRedoIcon = `
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.72 12C3.42667 12 2.3168 11.58 1.3904 10.74C0.463467 9.9 0 8.85333 0 7.6C0 6.34667 0.463467 5.3 1.3904 4.46C2.3168 3.62 3.42667 3.2 4.72 3.2H9.76L7.68 1.12L8.8 0L12.8 4L8.8 8L7.68 6.88L9.76 4.8H4.72C3.88 4.8 3.15013 5.06667 2.5304 5.6C1.91013 6.13333 1.6 6.8 1.6 7.6C1.6 8.4 1.91013 9.06667 2.5304 9.6C3.15013 10.1333 3.88 10.4 4.72 10.4H10.4V12H4.72Z"
      fill="#575353"
    />
  </svg>`

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  height?: string | number
  maxLength?: number
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "",
  height = "458px",
}: RichTextEditorProps) {
  const theme = "snow"

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"],
    [{ color: [] }],
    ["custom-undo", "custom-redo"],
  ]

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        "custom-undo": function (this: any) {
          this.quill.history.undo() // Use 'this.quill'
        },
        "custom-redo": function (this: any) {
          this.quill.history.redo() // Use 'this.quill'
        },
      },
    },
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: true,
    },
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "align",
    "list",
    "indent",
    "link",
    "color",
  ]

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  })

  const lastSyncedValue = useRef<string | null>(null)
  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar") as {
        container: HTMLElement
      }

      // Add custom icons to the toolbar
      const undoButton = toolbar.container.querySelector(".ql-custom-undo")
      const redoButton = toolbar.container.querySelector(".ql-custom-redo")

      if (undoButton) undoButton.innerHTML = CustomUndoIcon
      if (redoButton) redoButton.innerHTML = CustomRedoIcon

      // Prevent cyclic updates
      if (value !== lastSyncedValue.current) {
        quill.clipboard.dangerouslyPasteHTML(value || "")
        lastSyncedValue.current = value
      }

      quill.on("text-change", () => {
        const content = quill.root.innerHTML
        lastSyncedValue.current = content
        if (typeof onChange === "function") {
          onChange(content)
        }
      })

      return () => {
        quill.off("text-change")
      }
    }
  }, [quill, value, onChange])

  return (
    <div
      className="w-full rounded-lg bg-[#F3F3F3]/50 border border-solid border-[#c6c6c6]"
      style={{ minHeight: height, height }}
    >
      <div ref={quillRef} />
    </div>
  )
}
