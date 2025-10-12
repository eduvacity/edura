"use client"

import SubmitButton from "@/components/Button"
import {
  AddFileIcon,
  ArrowRight,
  CloudIcon,
  DropboxIcon,
  GoogleDriveIcon,
} from "@/components/SVGs/portal"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import SubmitUpload from "../submit"

// Extend the global Window interface
declare global {
  interface Window {
    gapi: any
    google: any
    Dropbox: any
  }
}

// Zod schema for validating a local PowerPoint file (PPT/PPTX)
const pptFileSchema = z
  .instanceof(File)
  .refine(
    (file) =>
      file.type === "application/vnd.ms-powerpoint" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    {
      message:
        "Invalid file type. Please upload a PowerPoint file (.ppt or .pptx).",
    }
  )
  .refine((file) => file.size <= 2147483648, {
    message: "File size exceeds 2GB limit.",
  })

// Define a type for a cloud file
type CloudFile = {
  id: string
  name: string
  previewUrl: string
}

export default function PowerPointUpload({ moduleId }: { moduleId: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [active, setActive] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedCloudFile, setSelectedCloudFile] = useState<CloudFile | null>(
    null
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false)
  // New state for the pasted link in embedded mode (if needed)
  const [pastedLink, setPastedLink] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dummy cloud files for demonstration (using PPT/PPTX samples)
  const dummyCloudFiles: CloudFile[] = [
    {
      id: "1",
      name: "CloudPPT1.ppt",
      previewUrl:
        "https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_500kB.ppt",
    },
    {
      id: "2",
      name: "CloudPPT2.pptx",
      previewUrl:
        "https://file-examples.com/wp-content/uploads/2017/08/file_example_PPTX_500kB.pptx",
    },
  ]

  // Cleanup preview URL when component unmounts or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  // File Input Change Handler for local files
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Clear any cloud or pasted link selection
      setSelectedCloudFile(null)
      setPastedLink("")
      handleFiles(files)
    }
  }

  // Validate and process a local file using Zod
  const handleFiles = (files: FileList) => {
    const file = files[0]
    const result = pptFileSchema.safeParse(file)
    if (!result.success) {
      alert(result.error.errors[0].message)
      return
    }
    console.log("Valid local PPT/PPTX file selected:", file)
    setSelectedFile(file)
    setSelectedCloudFile(null)
    setPreviewUrl(URL.createObjectURL(file))
    // Reset pasted link if any
    setPastedLink("")
    // Reset file input for future uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Implement cloud upload integrations
  const handleCloudUpload = async (
    provider: "googleDrive" | "dropbox" | "cloud"
  ) => {
    try {
      if (provider === "dropbox") {
        if (typeof window.Dropbox === "undefined") {
          alert("Dropbox Chooser is not loaded. Please include its script.")
          return
        }
        window.Dropbox.choose({
          success: (files: any) => {
            console.log("Dropbox files:", files)
            // For demonstration, pick the first file returned
            const file = files[0]
            setSelectedCloudFile({
              id: file.id || "dropbox-" + Date.now(),
              name: file.name,
              previewUrl: file.link,
            })
            setSelectedFile(null)
            setPreviewUrl(file.link)
            // Clear pasted link if any
            setPastedLink("")
          },
          cancel: () => {
            console.log("Dropbox chooser cancelled.")
          },
          linkType: "preview",
          multiselect: false,
          extensions: [".ppt", ".pptx"],
        })
      } else if (provider === "googleDrive") {
        if (
          typeof window.gapi === "undefined" ||
          typeof window.google === "undefined"
        ) {
          alert(
            "Google API is not loaded. Please include the required scripts."
          )
          return
        }
        const developerKey = "YOUR_DEVELOPER_KEY"
        const clientId = "YOUR_CLIENT_ID"
        const scope = ["https://www.googleapis.com/auth/drive.readonly"]

        window.gapi.load("auth", {
          callback: () => {
            window.gapi.auth.authorize(
              {
                client_id: clientId,
                scope: scope,
                immediate: false,
              },
              (authResult: any) => {
                if (authResult && !authResult.error) {
                  window.gapi.load("picker", {
                    callback: () => {
                      const view = new window.google.picker.DocsView(
                        window.google.picker.ViewId.DOCS
                      )
                        .setIncludeFolders(true)
                        .setSelectFolderEnabled(false)
                      const picker = new window.google.picker.PickerBuilder()
                        .addView(view)
                        .setOAuthToken(authResult.access_token)
                        .setDeveloperKey(developerKey)
                        .setCallback((data: any) => {
                          if (
                            data.action === window.google.picker.Action.PICKED
                          ) {
                            const doc = data.docs[0]
                            console.log("Google Drive file picked:", doc)
                            setSelectedCloudFile({
                              id: doc.id,
                              name: doc.name,
                              previewUrl: doc.url,
                            })
                            setSelectedFile(null)
                            setPreviewUrl(doc.url)
                            setPastedLink("")
                          }
                        })
                        .build()
                      picker.setVisible(true)
                    },
                  })
                } else {
                  alert("Failed to authorize with Google Drive")
                }
              }
            )
          },
        })
      } else if (provider === "cloud") {
        // For custom cloud storage, open a modal with our dummy files
        setIsCloudModalOpen(true)
      }
    } catch (error) {
      console.error("Cloud upload error:", error)
    }
  }

  // Handle form submission for all modes
  const handleSubmit = async () => {
    if (selectedFile) {
      const result = pptFileSchema.safeParse(selectedFile)
      if (!result.success) {
        alert(result.error.errors[0].message)
        return
      }
      const formData = new FormData()
      formData.append("ppt", selectedFile)
      try {
        const response = await fetch("/api/upload-ppt", {
          method: "POST",
          body: formData,
        })
        if (!response.ok) throw new Error("Failed to upload PowerPoint file.")
        alert("Local PowerPoint file uploaded successfully!")
        setSelectedFile(null)
        setPreviewUrl(null)
        setIsSubmitted(true)
      } catch (error: any) {
        alert("Upload error: " + error.message)
      }
    } else if (selectedCloudFile) {
      try {
        const response = await fetch("/api/upload-ppt-from-cloud", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileId: selectedCloudFile.id,
            name: selectedCloudFile.name,
          }),
        })
        if (!response.ok)
          throw new Error("Failed to submit cloud PowerPoint file.")
        alert("Cloud PowerPoint file submitted successfully!")
        setSelectedCloudFile(null)
        setPreviewUrl(null)
      } catch (error: any) {
        alert("Upload error: " + error.message)
      }
    } else {
      alert("Please select a PowerPoint file to upload.")
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
                  Add PowerPoint
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
                Upload a PowerPoint file that can be viewed in your lesson. You
                can also include the link for your student to download the file.
                Max file size is 2GB.
              </p>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={handleFileInputChange}
            />
            <div className="w-full max-w-[1499px] min-h-[431px] border border-solid border-[#DDDDDD] rounded-2xl flex rounded-bl-[0] rounded-tl-[0]">
              {/* Sidebar with Cloud Storage Icons */}
              <div className="min-h-[431px] h-full w-[80px] border-r border-solid border-[#DDDDDD] bg-[#F8F8F8] grid place-content-center relative z-20 pointer-events-auto">
                <div className="w-[64px] h-[272px] flex flex-col gap-10">
                  <div
                    className="w-[64px] h-[64px] rounded-full bg-[#E9E9E9] flex justify-center items-center cursor-pointer hover:bg-[#E0FAEC] transition-colors pointer-events-auto"
                    onClick={() => handleCloudUpload("googleDrive")}
                  >
                    <GoogleDriveIcon />
                  </div>
                  <div
                    className="w-[64px] h-[64px] rounded-full bg-[#E9E9E9] flex justify-center items-center cursor-pointer hover:bg-[#E0FAEC] transition-colors pointer-events-auto"
                    onClick={() => handleCloudUpload("cloud")}
                  >
                    <CloudIcon />
                  </div>
                  <div
                    className="w-[64px] h-[64px] rounded-full bg-[#E9E9E9] flex justify-center items-center cursor-pointer hover:bg-[#E0FAEC] transition-colors pointer-events-auto"
                    onClick={() => handleCloudUpload("dropbox")}
                  >
                    <DropboxIcon />
                  </div>
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div
                className={`flex-1 min-h-full flex justify-center items-center relative z-10 ${
                  isDragging ? "bg-[#E0FAEC] border-2 border-[#3FA46E]" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {isDragging ? (
                  <div className="w-[254px] h-[93px] flex flex-col gap-[9px] justify-center items-center">
                    <AddFileIcon />
                    <p className="font-arial font-normal tracking-normal text-xl leading-[23px] text-[#4D4D4D]">
                      Drop your PowerPoint file to upload
                    </p>
                  </div>
                ) : (
                  <div className="w-[254px] h-[93px] flex flex-col gap-[9px] justify-center items-center cursor-pointer">
                    <AddFileIcon />
                    <p className="font-arial font-normal tracking-normal text-xl leading-[23px] text-[#4D4D4D]">
                      Select file or drag to upload
                    </p>
                    <span className="font-arial font-normal text-[10px] leading-[18px] tracking-normal text-center text-[#475467]">
                      Supported file: PPT or PPTX
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Preview Section */}
            {previewUrl && (
              <div className="mt-4 flex flex-col items-center">
                {/* Using Google Docs viewer in an iframe for preview */}
                <iframe
                  src={`https://docs.google.com/gview?url=${previewUrl}&embedded=true`}
                  width="100%"
                  height="600px"
                  className="rounded-md shadow-md"
                ></iframe>
                <p className="mt-2 text-sm text-gray-700">
                  {selectedFile ? selectedFile.name : selectedCloudFile?.name}
                </p>
              </div>
            )}
          </div>
          {/* Custom Cloud Modal */}
          {isCloudModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-md p-6 w-80">
                <h2 className="mb-4 text-lg font-bold">Select a Cloud File</h2>
                <ul className="max-h-60 overflow-y-auto">
                  {dummyCloudFiles.map((file) => (
                    <li
                      key={file.id}
                      className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCloudFile(file)
                        setSelectedFile(null)
                        setPreviewUrl(file.previewUrl)
                        setPastedLink("")
                        setIsCloudModalOpen(false)
                      }}
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 w-full rounded bg-red-500 py-2 text-white"
                  onClick={() => setIsCloudModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
