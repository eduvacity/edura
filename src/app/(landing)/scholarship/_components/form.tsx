"use client"

import { CustomSelect, TextArea, TextField } from "@/components/Inputs"
import { UploadFileIcon } from "@/components/SVGs"
import { CustomButton } from "@/components/ui/button"
import { applyScholarship } from "@/lib/redux"
import { useAppDispatch } from "@/lib/redux/controls"
import { formatBytes, states } from "@/util"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormHelperText } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: { label: string; value: string }
  hours: string
  state: { label: string; value: string }
  city: string
  aboutYou: string
  certificate: string | object
}
const MAX_FILE_SIZE = 5000000 //5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "First name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  gender: z
    .object({
      label: z.string().min(1, { message: "Label is required" }),
      value: z.string().min(1, { message: "Value is required" }),
    })
    .refine((data) => data.label && data.value, {
      message: "Gender is required",
    }),
  hours: z.string().min(1, { message: "Number of hours is required" }),
  state: z
    .object({
      label: z.string().min(1, { message: "Label is required" }),
      value: z.string().min(1, { message: "Value is required" }),
    })
    .refine((data) => data.label && data.value, {
      message: "State is required",
    }),
  city: z.string().min(1, { message: "City is required" }),
  aboutYou: z.string().min(1, { message: "Tell us about yourself" }),
  certificate: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "pdf,.jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
})

const ApplyScholarshipForm = ({ course }: any) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

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

  const certificate: any = watch("certificate")
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const inputData = {
      course: course,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      gender: data?.gender?.value,
      hours: data?.hours,
      state: data?.state?.value,
      city: data?.city,
      aboutYou: data?.aboutYou,
      certificate: data?.certificate,
    }

    console.log("inputs", inputData)

    setLoading(true)
    dispatch(applyScholarship({ inputData }))
      .unwrap()
      .then(({ data }) => {
        console.log("data", data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })

    // router.push("/")
  }
  const suppress = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const handleDrop = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files && files[0]) setValue("certificate", files)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      className="w-full grid bg-white grid-cols-1 px-4 py-8 gap-6"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TextField
          name="firstName"
          control={control}
          type="firstName"
          label="First name"
          error={!!errors.firstName}
          placeholder="Enter your first name"
          helperText={errors.firstName?.message}
        />

        <TextField
          name="lastName"
          control={control}
          type="lastName"
          label="Last name"
          error={!!errors.lastName}
          placeholder="Enter your last name"
          helperText={errors.lastName?.message}
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TextField
          name="phone"
          control={control}
          type="phone"
          label="Phone number"
          error={!!errors.phone}
          placeholder="Enter your lastname"
          helperText={errors.phone?.message}
        />
        <TextField
          name="email"
          control={control}
          type="email"
          label="Email address"
          error={!!errors.email}
          placeholder="Enter your email"
          helperText={errors.email?.message}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CustomSelect
          name="gender"
          control={control}
          label="Gender"
          error={!!errors.gender}
          placeholder="Select your gender"
          helperText={errors.gender?.message}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <TextField
          name="hours"
          control={control}
          type="number"
          label="How many hour per day are you willing to commit"
          error={!!errors.hours}
          placeholder="Enter how many hour per day are you willing to commit"
          helperText={errors.hours?.message}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CustomSelect
          name="state"
          control={control}
          label="State"
          error={!!errors.state}
          placeholder="Select your State"
          helperText={errors.state?.message}
          options={states?.map((option: any) => {
            return {
              label: option.state,
              value: option.state,
            }
          })}
        />
        <TextField
          name="city"
          control={control}
          type="city"
          label="City"
          error={!!errors.city}
          placeholder="Select your city"
          helperText={errors.city?.message}
        />
      </div>
      <div className="w-full grid grid-cols-1">
        <TextArea
          name="aboutYou"
          control={control}
          type="aboutYou"
          label="Tell us about you?"
          error={!!errors.aboutYou}
          placeholder="Tell us about yourself"
          helperText={errors.aboutYou?.message}
        />
      </div>
      <div className="w-full grid grid-cols-1">
        <div
          className={
            !!errors.certificate
              ? "w-full min-h-[108px] p-6 rounded-[6.94px] border border-solid border-[#FF0000] justify-start items-center gap-3 flex bg-[#F8F8F8]"
              : "w-full min-h-[108px] p-6 rounded-[6.94px] border border-solid border-[#BDBCBC] justify-start items-center gap-3 flex  hover:border-pcolor bg-[#F8F8F8]"
          }
        >
          <div
            className="w-full py-[16px] px-[24px] gap-1 flex flex-col justify-center items-center rounded-xl"
            onDrop={handleDrop}
            onDragEnter={suppress}
            onDragOver={suppress}
          >
            <UploadFileIcon />
            <div className="w-full max-w-[250px] text-[#475467] font-arial font-normal text-[10px]/[18px] leading-[18px] text-center">
              <label className="text-[#4D4D4D] font-arial font-normal text-sm cursor-pointer">
                <input
                  type="file"
                  id="certificate"
                  accept={"image/*,.pdf"}
                  style={{ display: "none" }}
                  {...register("certificate")}
                />
                Click to upload or drag and drop
              </label>{" "}
              SVG, PNG, JPG or PDF (max. 800x400px /5MB)
            </div>
            {certificate?.[0] && (
              <span className="text-pcolor font-arial font-normal text-sm cursor-pointer">
                {`${certificate?.[0]?.name} (${formatBytes(
                  certificate?.[0]?.size
                )})`}
              </span>
            )}
          </div>
        </div>
        {!!errors.certificate && (
          <FormHelperText className="text-[#FF0000] text-xs font-arial font-normal ml-1">
            {errors.certificate?.message}
          </FormHelperText>
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <CustomButton
          callback={handleSubmit(onSubmit)}
          variant={"default"}
          style="w-[200px]"
          title="Submit"
        />
      </div>
    </form>
  )
}

export default ApplyScholarshipForm
