import { CloseIcon } from "@/components/SVGs"
import { InfoIcon } from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import { useRouter } from "next/navigation"
import * as React from "react"

interface Props {
  answers: Record<number, string>
  topic: string
  description: string
}
export default function SubmitQuiz({ answers, topic, description }: Props) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    console.log(answers)
    setSubmitted(true)
  }

  return (
    <React.Fragment>
      <button
        className={`w-[174px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95`}
        onClick={handleClickOpen}
      >
        Submit
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-full lg-md:w-[477px] h-full rounded-[5px] bg-white border-2 border-[#DFDFDF] shadow-[0px_0px_63px_0px_#0000001A] flex flex-col gap-1 justify-center items-center p-2">
          <div className="w-full flex justify-end items-end">
            <IconButton
              disableRipple
              className="bg-[#EEEEEE]"
              onClick={() => {
                submitted
                  ? router.push(
                      `/student/my-courses/topics/topic/${topic}?description=${description}`
                    )
                  : handleClose()
              }}
            >
              <CloseIcon className="text-[#2F2F2F]" />
            </IconButton>
          </div>
          {submitted ? (
            <div className="w-[312px] flex flex-col justify-center items-center gap-[29px] py-4 px-4">
              <h4 className="font-arial font-bold text-2xl/[34.08px] text-center text-[#3FA46E]">
                Quiz Submitted Successfully
              </h4>
              <p className="w-full font-arial font-normal text-[#707070] text-sm">
                {" "}
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna{" "}
              </p>
            </div>
          ) : (
            <div className="w-[312px] flex flex-col justify-center items-center gap-[29px] py-4 px-4">
              <InfoIcon />
              <p className="font-arial font-bold text-2xl/[34.08px] text-center text-[#000000]">
                Are you sure you want to Submit?
              </p>
              <div className="w-full max-w-[226px] flex gap-4">
                <button
                  className={`w-[104.51px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-transparent border border-solid border-[#3FA46E] font-arial font-bold text-base/[18.4px] text-[#3FA46E] transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/5 flex justify-center items-center`}
                  onClick={handleClose}
                >
                  No
                </button>

                <button
                  className={`w-[104.51px] h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95 flex justify-center items-center`}
                  onClick={handleSubmit}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  )
}
