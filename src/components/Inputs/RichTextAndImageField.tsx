"use client"

import { useEffect, useRef } from "react"
import { useQuill } from "react-quilljs"
import Quill from "quill"
import "quill/dist/quill.snow.css"

// Import highlight.js and a CSS theme
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css" // or any other theme you prefer

// ---------------------
// Custom SVG Icons (retained as provided)
// ---------------------

// Custom Undo icon
const CustomUndoIcon = `
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.27995 12H2.59995V10.4H8.27995C9.11995 10.4 9.84982 10.1333 10.4696 9.6C11.0898 9.06667 11.4 8.4 11.4 7.6C11.4 6.8 11.0898 6.13333 10.4696 5.6C9.84982 5.06667 9.11995 4.8 8.27995 4.8H3.23995L5.31995 6.88L4.19995 8L0.199951 4L4.19995 0L5.31995 1.12L3.23995 3.2H8.27995C9.57329 3.2 10.6834 3.62 11.6104 4.46C12.5368 5.3 13 6.34667 13 7.6C13 8.85333 12.5368 9.9 11.6104 10.74C10.6834 11.58 9.57329 12 8.27995 12Z" fill="#575353"/>
  </svg>
`

// Custom Redo icon
const CustomRedoIcon = `
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.72 12C3.42667 12 2.3168 11.58 1.3904 10.74C0.463467 9.9 0 8.85333 0 7.6C0 6.34667 0.463467 5.3 1.3904 4.46C2.3168 3.62 3.42667 3.2 4.72 3.2H9.76L7.68 1.12L8.8 0L12.8 4L8.8 8L7.68 6.88L9.76 4.8H4.72C3.88 4.8 3.15013 5.06667 2.5304 5.6C1.91013 6.13333 1.6 6.8 1.6 7.6C1.6 8.4 1.91013 9.06667 2.5304 9.6C3.15013 10.1333 3.88 10.4 4.72 10.4H10.4V12H4.72Z" fill="#575353"/>
  </svg>
`

// Custom Image icon – a simple picture frame icon.
const CustomImageIcon = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9912 25.6471H17.7947C23.4643 25.6471 25.7321 23.3793 25.7321 17.7097V10.9062C25.7321 5.23659 23.4643 2.96875 17.7947 2.96875H10.9912C5.32155 2.96875 3.05371 5.23659 3.05371 10.9062V17.7097C3.05371 23.3793 5.32155 25.6471 10.9912 25.6471Z" stroke="#243757" stroke-width="2.1261" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.9915 12.0401C12.244 12.0401 13.2593 11.0247 13.2593 9.77223C13.2593 8.51974 12.244 7.50439 10.9915 7.50439C9.73898 7.50439 8.72363 8.51974 8.72363 9.77223C8.72363 11.0247 9.73898 12.0401 10.9915 12.0401Z" stroke="#243757" stroke-width="2.1261" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.81348 22.1888L9.4037 18.4355C10.2995 17.8345 11.5922 17.9025 12.3972 18.5942L12.7714 18.9231C13.6559 19.6828 15.0846 19.6828 15.9691 18.9231L20.6862 14.875C21.5707 14.1152 22.9994 14.1152 23.8839 14.875L25.7321 16.4625" stroke="#243757" stroke-width="2.1261" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`

// Custom List icon – for bullet lists.
const CustomListIcon = `
  <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_753_2652" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="29">
      <rect x="0.158203" width="28.915" height="28.915" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_753_2652)">
      <path d="M5.57965 23.4932C5.07765 23.4932 4.65115 23.3173 4.30016 22.9655C3.94836 22.6145 3.77246 22.188 3.77246 21.6861C3.77246 21.1841 3.94836 20.7576 4.30016 20.4066C4.65115 20.0548 5.07765 19.8789 5.57965 19.8789C6.08164 19.8789 6.50814 20.0548 6.85913 20.4066C7.21093 20.7576 7.38683 21.1841 7.38683 21.6861C7.38683 22.188 7.21093 22.6145 6.85913 22.9655C6.50814 23.3173 6.08164 23.4932 5.57965 23.4932ZM9.79641 22.8908V20.4813H25.4587V22.8908H9.79641ZM5.57965 16.2645C5.07765 16.2645 4.65115 16.0886 4.30016 15.7368C3.94836 15.3858 3.77246 14.9593 3.77246 14.4573C3.77246 13.9553 3.94836 13.5288 4.30016 13.1778C4.65115 12.826 5.07765 12.6501 5.57965 12.6501C6.08164 12.6501 6.50814 12.826 6.85913 13.1778C7.21093 13.5288 7.38683 13.9553 7.38683 14.4573C7.38683 14.9593 7.21093 15.3858 6.85913 15.7368C6.50814 16.0886 6.08164 16.2645 5.57965 16.2645ZM9.79641 15.6621V13.2525H25.4587V15.6621H9.79641ZM5.57965 9.03576C5.07765 9.03576 4.65115 8.85986 4.30016 8.50806C3.94836 8.15706 3.77246 7.73057 3.77246 7.22857C3.77246 6.72658 3.94836 6.30008 4.30016 5.94908C4.65115 5.59729 5.07765 5.42139 5.57965 5.42139C6.08164 5.42139 6.50814 5.59729 6.85913 5.94908C7.21093 6.30008 7.38683 6.72658 7.38683 7.22857C7.38683 7.73057 7.21093 8.15706 6.85913 8.50806C6.50814 8.85986 6.08164 9.03576 5.57965 9.03576ZM9.79641 8.43336V6.02378H25.4587V8.43336H9.79641Z" fill="#243757"/>
    </g>
  </svg>
`

// Custom Code icon – for code blocks.
const CustomCodeIcon = `
  <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_753_2649" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="28">
      <rect x="0.926758" y="0.700684" width="27.2141" height="27.2141" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_753_2649)">
      <path d="M11.812 18.3899L13.3995 16.7741L10.9332 14.3078L13.3995 11.8415L11.812 10.2257L7.72988 14.3078L11.812 18.3899ZM17.2548 18.3899L21.3369 14.3078L17.2548 10.2257L15.6673 11.8415L18.1336 14.3078L15.6673 16.7741L17.2548 18.3899ZM6.59596 24.5131C5.97231 24.5131 5.43823 24.2912 4.99374 23.8475C4.55 23.403 4.32812 22.8689 4.32812 22.2453V6.37038C4.32812 5.74672 4.55 5.21265 4.99374 4.76815C5.43823 4.32441 5.97231 4.10254 6.59596 4.10254H22.4708C23.0945 4.10254 23.6286 4.32441 24.0731 4.76815C24.5168 5.21265 24.7387 5.74672 24.7387 6.37038V22.2453C24.7387 22.8689 24.5168 23.403 24.0731 23.8475C23.6286 24.2912 23.0945 24.5131 22.4708 24.5131H6.59596ZM6.59596 22.2453H22.4708V6.37038H6.59596V22.2453Z" fill="#243757"/>
    </g>
  </svg>
`

// Custom Bold icon
const CustomBoldIcon = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_753_2637" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
      <rect y="0.700684" width="27.2141" height="27.2141" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_753_2637)">
      <path d="M7.9375 21.1112V5.23633H14.1741C15.4592 5.23633 16.5836 5.62375 17.5475 6.3986C18.5113 7.17344 18.9932 8.16562 18.9932 9.37514C18.9932 10.0933 18.8042 10.7593 18.4263 11.3731C18.0483 11.9877 17.538 12.4556 16.8955 12.7769V13.0037C17.6892 13.2683 18.3318 13.7358 18.8231 14.4063C19.3145 15.0776 19.5602 15.8385 19.5602 16.6889C19.5602 17.9929 19.0359 19.0562 17.9874 19.8786C16.9382 20.7003 15.7237 21.1112 14.3441 21.1112H7.9375ZM10.9424 11.6997H13.9473C14.5142 11.6997 15.015 11.5201 15.4497 11.1611C15.8844 10.802 16.1017 10.3484 16.1017 9.80035C16.1017 9.25229 15.8844 8.79873 15.4497 8.43965C15.015 8.08058 14.5142 7.90104 13.9473 7.90104H10.9424V11.6997ZM10.9424 18.3898H14.1741C14.8166 18.3898 15.3741 18.1959 15.8466 17.8081C16.3191 17.4211 16.5553 16.9252 16.5553 16.3204C16.5553 15.7156 16.3191 15.2194 15.8466 14.8316C15.3741 14.4445 14.8166 14.251 14.1741 14.251H10.9424V18.3898Z" fill="#243757"/>
    </g>
  </svg>
`

// Custom Italic icon
const CustomItalicIcon = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_753_2640" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
      <rect x="0.231445" y="0.700684" width="27.2141" height="27.2141" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_753_2640)">
      <path d="M5.90137 23.379V19.9773H9.72835L14.264 8.63809H10.437V5.23633H21.7762V8.63809H17.9493L13.4136 19.9773H17.2406V23.379H5.90137Z" fill="#243757"/>
    </g>
  </svg>
`

// Custom Strikethrough icon
const CustomStrikethroughIcon = `
 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
   <mask id="mask0_753_2643" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
     <rect x="0.462891" y="0.700684" width="27.2141" height="27.2141" fill="#D9D9D9"/>
   </mask>
   <g mask="url(#mask0_753_2643)">
     <path d="M14.2398 23.3787C12.8035 23.3787 11.5278 22.9535 10.4128 22.1031C9.29775 21.2526 8.49456 20.0904 8.0032 18.6163L10.4978 17.539C10.7624 18.4462 11.2205 19.1927 11.8721 19.7785C12.5245 20.3644 13.3326 20.6573 14.2965 20.6573C15.0902 20.6573 15.8083 20.4683 16.4509 20.0904C17.0935 19.7124 17.4147 19.1076 17.4147 18.2761C17.4147 17.9359 17.3486 17.6241 17.2163 17.3406C17.084 17.0571 16.9045 16.802 16.6777 16.5752H19.8527C19.9472 16.8398 20.0182 17.1089 20.0658 17.3826C20.1127 17.657 20.1361 17.9548 20.1361 18.2761C20.1361 19.9014 19.5548 21.1581 18.3922 22.0464C17.2303 22.9346 15.8461 23.3787 14.2398 23.3787ZM2.73047 14.3074V12.0395H25.4089V14.3074H2.73047ZM14.1264 5.06592C15.3737 5.06592 16.4653 5.37283 17.4011 5.98666C18.3362 6.60125 19.0589 7.54164 19.5692 8.80785L17.0746 9.91343C16.9045 9.36536 16.5877 8.874 16.1243 8.43933C15.6617 8.00466 15.0146 7.78733 14.1831 7.78733C13.4082 7.78733 12.7657 7.96233 12.2554 8.31233C11.7451 8.66158 11.4617 9.14803 11.405 9.77169H8.68355C8.72135 8.46768 9.23652 7.35719 10.2291 6.44023C11.2209 5.52402 12.52 5.06592 14.1264 5.06592Z" fill="#243757"/>
   </g>
 </svg>
`

// Custom Alignment icon (for left, center, right, justify – using the same icon)
const CustomAlignIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="6" x2="20" y2="6" stroke="#243757" stroke-width="2"/>
    <line x1="4" y1="12" x2="14" y2="12" stroke="#243757" stroke-width="2"/>
    <line x1="4" y1="18" x2="20" y2="18" stroke="#243757" stroke-width="2"/>
  </svg>
`

// Custom Number List icon (ordered list)
const CustomNumberListIcon = `
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_753_2655" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
<rect x="0.0908203" y="0.700684" width="27.2141" height="27.2141" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_753_2655)">
<path d="M3.49219 23.379V22.2451H5.76003V21.6782H4.62611V20.5442H5.76003V19.9773H3.49219V18.8434H6.89395V23.379H3.49219ZM9.16179 22.2451V19.9773H23.9027V22.2451H9.16179ZM3.49219 16.5755V15.555L5.53324 13.1738H3.49219V12.0398H6.89395V13.0604L4.85289 15.4416H6.89395V16.5755H3.49219ZM9.16179 15.4416V13.1738H23.9027V15.4416H9.16179ZM4.62611 9.77201V6.37025H3.49219V5.23633H5.76003V9.77201H4.62611ZM9.16179 8.63809V6.37025H23.9027V8.63809H9.16179Z" fill="#243757"/>
</g>
</svg>

`

// ---------------------
// Override Quill Default Icons
// ---------------------
const icons = Quill.import("ui/icons") as Record<string, any>
// Override icons for image, code block, and list
icons.image = CustomImageIcon
icons["code-block"] = CustomCodeIcon
if (icons.list) {
  icons.list.bullet = CustomListIcon
  icons.list.ordered = CustomNumberListIcon
}
// Override icons for text formatting
icons.bold = CustomBoldIcon
icons.italic = CustomItalicIcon
icons.strike = CustomStrikethroughIcon
if (icons.align) {
  icons.align.left = CustomAlignIcon
  icons.align.center = CustomAlignIcon
  icons.align.right = CustomAlignIcon
  icons.align.justify = CustomAlignIcon
}

// ---------------------
// Rich Text Editor Component with highlight.js Code Highlighting
// ---------------------

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  height?: string | number
  maxLength?: number
}

export default function RichTextAndImageEditor({
  value,
  onChange,
  placeholder = "",
  height = "458px",
}: RichTextEditorProps) {
  const theme = "snow"

  // Define toolbar options including our custom formatting buttons.
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "strike", "underline", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    [{ color: [] }],
    ["code-block"],
    ["custom-undo", "custom-redo"],
  ]

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: function (this: any) {
          const input = document.createElement("input")
          input.setAttribute("type", "file")
          input.setAttribute("accept", "image/*")
          input.click()
          input.onchange = () => {
            const file = input.files ? input.files[0] : null
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => {
                const range = this.quill.getSelection()
                this.quill.insertEmbed(range.index, "image", e.target?.result)
              }
              reader.readAsDataURL(file)
            }
          }
        },
        "custom-undo": function (this: any) {
          this.quill.history.undo()
        },
        "custom-redo": function (this: any) {
          this.quill.history.redo()
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
    "strike",
    "underline",
    "blockquote",
    "align",
    "list",
    "indent",
    "link",
    "image",
    "code-block",
    "color",
  ]

  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder })

  const lastSyncedValue = useRef<string | null>(null)

  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar") as { container: HTMLElement }

      // Apply custom icons for undo/redo buttons.
      const undoButton = toolbar.container.querySelector(".ql-custom-undo")
      const redoButton = toolbar.container.querySelector(".ql-custom-redo")
      if (undoButton) undoButton.innerHTML = CustomUndoIcon
      if (redoButton) redoButton.innerHTML = CustomRedoIcon

      // Update editor if parent value changes.
      if (value !== lastSyncedValue.current) {
        quill.clipboard.dangerouslyPasteHTML(value || "")
        lastSyncedValue.current = value
      }

      // On text-change, update content and highlight code blocks with highlight.js.
      quill.on("text-change", () => {
        const content = quill.root.innerHTML
        lastSyncedValue.current = content
        if (typeof onChange === "function") {
          onChange(content)
        }
        // Find all <pre><code> blocks within the editor and highlight them.
        const codeBlocks = quill.root.querySelectorAll("pre code")
        codeBlocks.forEach((block) => {
          hljs.highlightElement(block as HTMLElement)
        })
      })

      return () => {
        quill.off("text-change")
      }
    }
  }, [quill, value, onChange])

  return (
    <div
      className="w-full rounded-[16px] bg-white border border-solid border-[#DDDDDD] "
      style={{ minHeight: height, height }}
    >
      <div ref={quillRef} />
    </div>
  )
}
