"use client"

import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const AssignmentUplaod = dynamic(
  () => import("./_components/AssignmentUplaod"),
  {
    ssr: false,
  }
)
const AudioUpload = dynamic(() => import("./_components/AudioUpload"), {
  ssr: false,
})
const CodeUpload = dynamic(() => import("./_components/CodeUpload"), {
  ssr: false,
})
const EmbeddedUpload = dynamic(() => import("./_components/EmbeddedUpload"), {
  ssr: false,
})
const PDFUpload = dynamic(() => import("./_components/PDFUpload"), {
  ssr: false,
})
const PowerPointUpload = dynamic(() => import("./_components/PowerPoint"), {
  ssr: false,
})
const QuizUpload = dynamic(() => import("./_components/QuizUpload"), {
  ssr: false,
})
const ResourceUpload = dynamic(() => import("./_components/Resource"), {
  ssr: false,
})
const TextAndImages = dynamic(() => import("./_components/TextAndImages"), {
  ssr: false,
})
const VideoUpload = dynamic(() => import("./_components/Video"), {
  ssr: false,
})
export default function ModuleContent() {
  const search = useSearchParams()
  const moduleId = search.get("id") || ""
  const type = search.get("type") || ""
  const checkType = type?.toLowerCase()

  return (
    <div>
      {checkType === "text" ? (
        <TextAndImages moduleId={moduleId} />
      ) : checkType === "ppt" ? (
        <PowerPointUpload moduleId={moduleId} />
      ) : checkType === "video" ? (
        <VideoUpload moduleId={moduleId} />
      ) : checkType === "audio" ? (
        <AudioUpload moduleId={moduleId} />
      ) : checkType === "pdf" ? (
        <PDFUpload moduleId={moduleId} />
      ) : checkType === "embedded" ? (
        <EmbeddedUpload moduleId={moduleId} />
      ) : checkType === "resources" ? (
        <ResourceUpload moduleId={moduleId} />
      ) : checkType === "code" ? (
        <CodeUpload moduleId={moduleId} />
      ) : checkType === "quiz" ? (
        <QuizUpload moduleId={moduleId} />
      ) : checkType === "quiz" ? (
        <AssignmentUplaod moduleId={moduleId} />
      ) : null}
    </div>
  )
}
