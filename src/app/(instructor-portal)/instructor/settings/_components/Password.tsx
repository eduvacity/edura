"use client"

import SubmitButton from "@/components/Button"
import { PasswordField } from "@/components/Inputs"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

interface FormData {
  currentPassword: string
  password: string
  confirmPassword: string
}
export default function ChangePasswordInformation() {
  const [loading, setLoading] = React.useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword)

  const FormSchema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: "Current/Old password is required" }),
      password: z.string().min(1, { message: "New password is required" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"], // Path where the error message will be attached
      message: "Passwords must match",
    })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const inputData = {
      currentPassword: data?.currentPassword,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-[25px] px-8">
        {/* PERSONAL INFORMATION */}
        <div className="w-full flex flex-col lg-md:flex-row gap-[22px]">
          <p className="font-normal font-arial text-base/[33.6px] text-left text-[#4A4949]">
            Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat
            quis vitae ut velit pharetra amet. Porttitor pellentesque lectus
            cursus amet.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className="w-full grid bg-white grid-cols-1 gap-6"
          >
            <div className="w-full grid grid-cols-1">
              <PasswordField
                name="currentPassword"
                label="Old Password"
                control={control}
                type={showCurrentPassword ? "text" : "password"}
                onClick={handleClickShowCurrentPassword}
                showPassword={showCurrentPassword}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                disabled={loading}
              />
            </div>

            <div className="w-full grid grid-cols-1">
              <PasswordField
                name="password"
                label="New Password"
                control={control}
                type={showPassword ? "text" : "password"}
                showPassword={showPassword}
                onClick={handleClickShowPassword}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={loading}
              />
            </div>
            <div className="w-full grid grid-cols-1">
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                control={control}
                type={showConfirmPassword ? "text" : "password"}
                showPassword={showConfirmPassword}
                onClick={handleClickShowConfirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                disabled={loading}
              />
            </div>
            <div className="w-full max-w-[325px] grid grid-cols-1 gap-[7px]">
              <h3 className="w-full font-normal forn-arial italic text-[#FD0E0E] text-base/[18.4px] text-left">
                Password must contain
              </h3>
              <p className="w-full font-normal forn-arial italic text-[#4C4C4C] text-base/[18.4px] text-left">
                Minimum of 8 character
              </p>
              <p className="w-full font-normal forn-arial italic text-[#4C4C4C] text-base/[18.4px] text-left">
                one uppercase letter and one lowercase letter
              </p>
              <p className="w-full font-normal forn-arial italic text-[#4C4C4C] text-base/[18.4px] text-left">
                one number
              </p>
              <p className="w-full font-normal forn-arial italic text-[#4C4C4C] text-base/[18.4px] text-left">
                one special character
              </p>
            </div>
            <div className="w-full grid grid-cols-1">
              <SubmitButton>Reset Password</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
