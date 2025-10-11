import SubmitButton from "@/components/Button"
import { CustomSelect, TextArea, TextField } from "@/components/Inputs"
import { CloseIcon } from "@/components/SVGs"
import { countries, states } from "@/util"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconButton } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
  profile: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    gender?: string
    dob: string
    country?: string
    state?: string
    address?: string
    admissionNumber?: string
  }
}

type FormData = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  gender?: string
  dob: string
  country?: string
  state?: string
  address?: string
  admissionNumber?: string
}

export default function EditProfileInformation({ profile }: Props) {
  const [loading, setLoading] = React.useState(false)

  const [open, setOpen] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
    dob: z.string().min(1, { message: "Date of birth is required" }),
    country: z
      .object({
        label: z.string().min(1, { message: "Label is required" }),
        value: z.string().min(1, { message: "Value is required" }),
      })
      .refine((data) => data.label && data.value, {
        message: "Country is required",
      }),
    state: z
      .object({
        label: z.string().min(1, { message: "Label is required" }),
        value: z.string().min(1, { message: "Value is required" }),
      })
      .refine((data) => data.label && data.value, {
        message: "State is required",
      }),
    address: z.string().min(1, { message: "Tell us about yourself" }),
  })

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
    const inputData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      gender: data?.gender,
      dob: data?.dob,
      country: data?.country,
      state: data?.state,
      address: data?.address,
      admissionNumber: data?.admissionNumber,
    }
  }

  return (
    <React.Fragment>
      <button
        className={`w-fit h-[59px] shadow-[0px_4px_2px_0px_#00000005] py-[5px] px-[23px] rounded-[13.33px] gap-[10.67px] bg-transparent border-[1.5px] border-solid border-[#3FA46E] font-arial font-normal text-[21.33px]/[24.53px] text-[#3FA46E] flex justify-center items-center`}
        onClick={handleClickOpen}
      >
        Edit details
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: { xs: "90%", md: "650px" }, // Responsive width
            },
          },
        }}
      >
        <div className="w-full rounded-[5px] bg-white border-2 border-[#DFDFDF] shadow-[0px_0px_63px_0px_#0000001A] flex flex-col gap-1 justify-center items-center p-4">
          <div className="w-full flex justify-between items-center gap-2">
            <h3 className="w-full font-bold font-arial text-[18px]/[24.3px] text-left text-[#0A323F] ">
              Update Personal Information
            </h3>
            <div className="w-[100px] flex justify-end items-end">
              <IconButton
                disableRipple
                className="bg-[#EEEEEE]/90"
                onClick={handleClose}
              >
                <CloseIcon className="text-[#2F2F2F]" />
              </IconButton>
            </div>
          </div>

          {submitted ? (
            <div className="w-[312px] flex flex-col justify-center items-center gap-[29px] py-4 px-4">
              <h4 className="font-arial font-bold text-2xl/[34.08px] text-center text-[#3FA46E]">
                Change Saved Successfully
              </h4>
              <p className="w-full font-arial font-normal text-[#707070] text-sm">
                {" "}
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna{" "}
              </p>
            </div>
          ) : (
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
                  name="dob"
                  control={control}
                  type="date"
                  label="Date of birth"
                  error={!!errors.dob}
                  placeholder="Enter date of birth"
                  helperText={errors.dob?.message}
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomSelect
                  name="country"
                  control={control}
                  label="country"
                  error={!!errors.country}
                  placeholder="Select your country"
                  helperText={errors.country?.message}
                  options={countries?.map((option: any) => {
                    return {
                      label: option.label,
                      value: option.label,
                    }
                  })}
                />
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
              </div>
              <div className="w-full grid grid-cols-1">
                <TextArea
                  name="address"
                  control={control}
                  type="address"
                  label="Address"
                  error={!!errors.address}
                  placeholder="Your address"
                  helperText={errors.address?.message}
                />
              </div>

              <div className="w-full">
                <SubmitButton>Update Information</SubmitButton>
              </div>
            </form>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  )
}
