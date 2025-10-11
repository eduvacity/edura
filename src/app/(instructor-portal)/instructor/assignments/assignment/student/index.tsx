import { CloseIcon } from "@/components/SVGs"
import { FemaleProfileAvatar, ViewEyeIcon } from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import * as React from "react"

export default function StudentDetail({ student }: any) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton disableRipple onClick={handleClickOpen}>
        <ViewEyeIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              padding: "16px 18px",
              maxWidth: { xs: "90%", md: "650px" },
              borderRadius: 2,
              overflowY: "scroll",
            },
          },
        }}
      >
        <div className="w-full rounded-2xl bg-white flex flex-col gap-4 px-4">
          <div className="w-full flex justify-between  items-center">
            <h4 className="w-full font-satoshi font-medium text-xl leading-[27px] tracking-normal text-[#191C1F]">
              Adbul Fatai Saheed
            </h4>
            <div className="w-full flex justify-end items-end mt-4">
              <IconButton
                disableRipple
                className="bg-[#EEEEEE]"
                onClick={handleClose}
              >
                <CloseIcon className="text-[#2F2F2F]" />
              </IconButton>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-[210px] h-[194.83px] rounded-full border border-solid border-[#DBDBDB] overflow-hidden bg-[#DBDBDB]">
              <FemaleProfileAvatar className="w-[220px] h-[200px]" />
            </div>
            <div className="w-full rounded-[15px] border border-solid border-[#BAB9B9] flex flex-col gap-2 p-6">
              {/* Row I */}
              <div className="w-full flex justify-between gap-2">
                <div className="w-full flex flex-col gap-[2px]">
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#191C1F]">
                    {student?.name}
                  </p>
                  <h3 className="font-normal font-arial text-[15.83px]/[24.05px] text-left text-[#6F6F6F] tracking-[-0.1%]">
                    Fullname
                  </h3>
                </div>
                <div className="w-[250px] flex flex-col gap-[2px]">
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#191C1F]">
                    {student?.number}
                  </p>
                  <h3 className="font-normal font-arial text-[15.83px]/[24.05px] text-left text-[#6F6F6F] tracking-[-0.1%]">
                    Student ID
                  </h3>
                </div>
              </div>
              {/* Row II */}
              <div className="w-full flex justify-between gap-2">
                <div className="w-full flex flex-col gap-[2px]">
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#191C1F]">
                    {student?.type}
                  </p>
                  <h3 className="font-normal font-arial text-[15.83px]/[24.05px] text-left text-[#6F6F6F] tracking-[-0.1%]">
                    Programme Type
                  </h3>
                </div>
                <div className="w-[250px] lex flex-col gap-[2px]">
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#191C1F]">
                    {student?.topic}
                  </p>
                  <h3 className="font-normal font-arial text-[15.83px]/[24.05px] text-left text-[#6F6F6F] tracking-[-0.1%]">
                    Topic
                  </h3>
                </div>
              </div>
              {/* Row III */}
              <div className="w-full flex justify-between gap-2">
                <div className="w-full flex flex-col gap-[2px]">
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#191C1F]">
                    {student?.duration}
                  </p>
                  <h3 className="font-normal font-arial text-[15.83px]/[24.05px] text-left text-[#6F6F6F] tracking-[-0.1%]">
                    Duration
                  </h3>
                </div>
                <div className="w-[250px] flex flex-col gap-[2px]">
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#191C1F]">
                    {student?.grade}
                  </p>
                  <h3 className="font-normal font-arial text-[15.83px]/[24.05px] text-left text-[#6F6F6F] tracking-[-0.1%]">
                    Grade
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-full h-[155px] rounded-[15px] border border-solid border-[#BAB9B9] flex flex-col gap-2 p-6">
              <div className="w-[99px] h-[99px] gap-[20.63px] rounded-[49.5px] bg-white border-[2.48px] border-solid border-[#3FA46E] flex justify-center items-center">
                <p className="font-arial font-semibold text-[16.78px]/[37.13px] -tracking-[0.1%] text-center text-black">
                  {student?.grade} Points
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  )
}
