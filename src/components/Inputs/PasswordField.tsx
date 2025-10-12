"use client"
import { FormHelperText, IconButton } from "@mui/material"
import React, { InputHTMLAttributes } from "react"
import { Controller } from "react-hook-form"
import { EyeVisibilityOnIcon, EyevisibilityOffIcon } from "../SVGs/portal"

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
  placeholder?: string
  value?: string | number
  type?: string
  onChange?: any
  htmlFor?: string
  name: string
  showPassword?: boolean
  onClick?: () => void
  control?: any
  error?: boolean | undefined
  helperText?: string | undefined | any
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  placeholder,
  type,
  value,
  onChange,
  name,
  htmlFor,
  control,
  disabled,
  error,
  onClick,
  helperText,
  showPassword,
  ...props
}) => {
  return (
    <div className="w-full relative flex flex-col gap-1">
      <label
        className="text-[#4D6C62] font-medium font-arial text-sm lg-md:text-base/[18.4px] text-left capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      {control ? (
        <>
          <Controller
            name={name}
            control={control}
            defaultValue={""}
            render={({ field }: any) => (
              <div className="relative">
                <input
                  {...field}
                  autoComplete={name}
                  className={
                    error === true
                      ? `peer w-full h-[54px] px-6 rounded-[6.94px] border border-solid border-[#FF0000] justify-start items-center gap-2.5 flex text-[#FF0000] font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text hover:border-[#FF0000] focus:outline-none focus:border-[#FF0000] bg-[#F4F4F4]`
                      : `peer w-full h-[54px] px-6 rounded-[6.94px] border border-solid border-[#BDBCBC] justify-start items-center gap-3 flex font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text text-[#4D6C62] hover:border-primary focus:outline-none focus:border-primary disabled:bg-[#F4F4F4] focus:bg-[#F4F4F4] disabled:hover:border-[#5C5C5C] disabled:cursor-not-allowed disabled:text-[#5C5C5C] placeholder:text-[#4D4D4D] bg-[#F4F4F4]`
                  }
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  disabled={disabled}
                  {...props}
                />
                <div className="absolute right-2 top-2 w-[52px] h-[40px] flex justify-center cursor-pointer">
                  {showPassword ? (
                    <IconButton disableRipple onClick={onClick}>
                      <EyevisibilityOffIcon />
                    </IconButton>
                  ) : (
                    <IconButton disableRipple onClick={onClick}>
                      <EyeVisibilityOnIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            )}
          />
        </>
      ) : (
        <div className="relative w-full">
          <input
            id={id}
            autoComplete={name}
            className={
              error === true
                ? `w-full px-[18px] py-2 h-[40px] border border-solid border-primary justify-start items-center gap-3 flex font-arial text-[16px]/[24px] font-normal cursor-text text-primary hover:border-solid hover:border-b-0 hover:shadow-[0px_2px_0px_0px_#E4F222] hover:border-primary focus:outline-none focus:border-solid focus:border-b-0 focus:border-primary focus:shadow-[0px_2px_0px_0px_#E4F222] disabled:bg-[#E1E1E1] disabled:hover:border disabled:hover:border-primary  disabled:hover:shadow-none disabled:cursor-not-allowed disabled:text-[#98A2B3] placeholder:text-[#98A2B3] placeholder:text-[15px]/[17.5px]`
                : `w-full px-[18px] py-2 h-[40px] border border-solid border-border justify-start items-center gap-3 flex font-arial text-[16px]/[24px] font-normal cursor-text text-[#667085] hover:border-solid hover:border-b-0 hover:shadow-[0px_2px_0px_0px_#E4F222] hover:border-[#E4E5FC] focus:outline-none focus:border-solid focus:border-b-0 focus:border-[#E4E5FC] focus:shadow-[0px_2px_0px_0px_#E4F222] disabled:bg-[#E1E1E1] disabled:hover:border-[#F5F5F5] disabled:cursor-not-allowed disabled:text-[#98A2B3] placeholder:text-[#98A2B3] placeholder:text-[15px]/[17.5px]`
            }
            style={{
              background:
                "linear-gradient(0deg, #FFFFFF, #FFFFFF),linear-gradient(360deg, rgba(239, 239, 253, 0.1) 0%, rgba(239, 239, 253, 0.2) 100%)",
            }}
            value={value}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            onChange={onChange}
            {...props}
          />
          <div
            className="absolute right-[1px] top-[0px] border-l border-y border-x border-solid border-[#E4E5FC] w-[52px] h-[40px] flex justify-center cursor-pointer"
            style={{
              background:
                "linear-gradient(0deg, #FFFFFF, #FFFFFF),linear-gradient(360deg, rgba(239, 239, 253, 0.1) 0%, rgba(239, 239, 253, 0.2) 100%)",
            }}
          >
            {showPassword ? (
              <IconButton onClick={onClick}>
                <EyevisibilityOffIcon />
              </IconButton>
            ) : (
              <IconButton onClick={onClick}>
                <EyeVisibilityOnIcon />
              </IconButton>
            )}
          </div>
        </div>
      )}
      {error && (
        <FormHelperText className="text-primary text-[16px]/[23.2px] font-arial font-bold ml-1">
          {helperText}
        </FormHelperText>
      )}
    </div>
  )
}

export default PasswordField
