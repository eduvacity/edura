import SubmitButton from "@/components/Button"
import { CustomSelect } from "@/components/Inputs"
import { CloseIcon } from "@/components/SVGs"
import {
  AnnouncementIcon,
  CopyIconOutLine,
  EncircledDoneIcon,
} from "@/components/SVGs/portal"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconButton } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import { useRouter } from "next/navigation"
import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

interface Props {
  topic?: string
}
interface FormData {
  batches: string
}
const FormSchema = z.object({
  batches: z
    .object({
      label: z.string().min(1, { message: "Label is required" }),
      value: z.string().min(1, { message: "Value is required" }),
    })
    .refine((data) => data.label && data.value, {
      message: "batches is required",
    }),
})
export default function PublishSection({ topic }: Props) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [published, setPublished] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const handleSubmit = () => {
  //   setPublished(true)
  // }

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setPublished(true)
    const inputData = {
      batches: data?.batches,
    }

    console.log("inputs", inputData)

    // router.push("/")
  }
  return (
    <React.Fragment>
      <button
        type="button"
        onClick={handleClickOpen}
        className="w-[162px] h-[46px] py-[13px] flex justify-start items-center px-4  bg-white font-arial font-normal text-base/[18.4px] text-left text-[#505F79]"
      >
        Publish Section
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: { xs: "90%", md: "762px" },
            borderRadius: 2,
          },
        }}
      >
        <div className="w-full lg-md:w-[762px] h-full rounded-2xl bg-[#ECEDF1] flex flex-col gap-1 justify-center items-center">
          <div className="w-full flex justify-end items-end mr-4 mt-4">
            <IconButton
              disableRipple
              className="bg-[#EEEEEE]"
              onClick={handleClose}
            >
              <CloseIcon className="text-[#2F2F2F]" />
            </IconButton>
          </div>
          {published ? (
            <div className="w-full lg-md:w-[762px] flex flex-col justify-center items-center gap-[29px] py-4 px-4">
              <div className="w-full flex gap-[25px]">
                <EncircledDoneIcon className="flex-shrink-0" />
                <div className="flex flex-col gap-[7px]">
                  <h4 className="font-satoshi font-bold text-[26px]/[35.1px] text-left text-[#2C3A50] capitalize">
                    your course has launched!
                  </h4>
                  <p className="font-satoshi font-normal text-base/[30.4px] text-left text-[#3F3F3F]">
                    Lorem ipsum dolor sit amet consectetur. Urna facilisis
                    sollicitudin tristique dolor quisque in morbi pharetra.
                  </p>
                  <div className="w-full grid grid-cols-1 px-4 py-8 gap-6">
                    <div className="w-full relative flex flex-col gap-[9.92px]">
                      <label
                        className="text-[#4D6C62] font-medium font-arial text-sm lg-md:text-base/[18.4px] text-left capitalize"
                        htmlFor="copy"
                      >
                        Your sales page link
                      </label>
                      <div className="w-full relative">
                        <div
                          className={`w-full h-[60px] px-6 rounded-[7px] border-[0.99px] border-solid border-[#BDBCBC] justify-start items-center gap-3 flex font-arial text-[15.87px]/[18.25px] font-normal cursor-text text-[#4D4D4D] hover:border-primary focus:outline-none focus:border-primary disabled:bg-[#F8F8F8] focus:bg-[#F8F8F8] disabled:hover:border-[#5C5C5C] disabled:cursor-not-allowed disabled:text-[#5C5C5C] placeholder:text-[#4D4D4D] bg-[#F5F5F5]`}
                        >
                          http:Edura/ggdy38836d/ui/uxdesigncoures
                        </div>
                        <div className="w-fit h-[50px] py-[13px] px-[20px] rounded-[3px] bg-[#DAEEE3] absolute right-[3px] top-[5px]">
                          <CopyToClipboard
                            text={` http:Edura/ggdy38836d/ui/uxdesigncoures`}
                            onCopy={() =>
                              toast.success("Code copied to clipboard")
                            }
                          >
                            <div className="w-full h-[54px] flex gap-[7px] cursor-pointer">
                              <CopyIconOutLine />
                              Copy link
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full lg-md:w-[762px] flex flex-col justify-center items-center gap-[29px] py-4 px-4">
              <div className="w-full flex gap-[25px]">
                <AnnouncementIcon className="flex-shrink-0" />
                <div className="flex flex-col gap-[7px]">
                  <h4 className="font-satoshi font-bold text-[26px]/[35.1px] text-left text-[#2C3A50]">
                    Publish Beta-introduction to UI/UX?
                  </h4>
                  <p className="font-satoshi font-normal text-base/[30.4px] text-left text-[#3F3F3F]">
                    Publishing means any sales pages will be publicly visible,
                    and that students can purchase and enroll in your course and
                    access any published lessons.
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    autoComplete="off"
                    className="w-full grid grid-cols-1 px-4 py-8 gap-6"
                  >
                    <CustomSelect
                      name="batches"
                      control={control}
                      label="Select Batches to Apply for this Section"
                      error={!!errors.batches}
                      placeholder="Select"
                      helperText={errors.batches?.message}
                      options={[
                        { label: "Batch A", value: "batch A" },
                        { label: "Batch B", value: "batch B" },
                      ]}
                    />
                    <div className="w-full flex justify-end items-end">
                      <SubmitButton
                        className={`w-fit h-[55px] shadow-[0px_4px_2px_0px_#00000005] p-[19px_55px_18px_55px] rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95 flex justify-center items-center`}
                      >
                        Publish Course
                      </SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  )
}
