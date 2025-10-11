import { CloseIcon } from "@/components/SVGs"
import { IconButton } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function SubmitUpload({
  submitted,
  reUpload,
  back,
}: {
  submitted: boolean
  reUpload: any
  back: string
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(submitted)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-full lg-md:w-[577px] h-full rounded-[5px] bg-white border-2 border-[#DFDFDF] shadow-[0px_0px_63px_0px_#0000001A] flex flex-col gap-1 justify-center items-center p-2">
          <div className="w-full flex justify-end items-end">
            <IconButton
              disableRipple
              className="bg-[#EEEEEE]"
              onClick={() => router.push(back)}
            >
              <CloseIcon className="text-[#2F2F2F]" />
            </IconButton>
          </div>
          <div className="w-full lg-md:w-[466px] flex flex-col justify-center items-center gap-[29px] py-4 px-4">
            <h4 className="font-arial font-bold text-2xl/[34.08px] text-center text-[#3FA46E]">
              Content Created Successfully
            </h4>
            <p className="w-full font-arial font-normal text-[#707070] text-sm text-center">
              {" "}
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna{" "}
            </p>
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <button
                className={`w-fit h-[55px] py-[15px] px-[18px] shadow-[0px_4px_2px_0px_#00000005] rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95 flex justify-center items-center`}
                onClick={reUpload}
              >
                Add More Content
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  )
}
