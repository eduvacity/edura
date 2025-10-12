import { FormHelperText } from "@mui/material"
import React, { InputHTMLAttributes } from "react"
import { Controller } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
  placeholder?: string
  type?: string
  onChange?: any
  name: string
  control?: any
  error?: boolean | undefined
  helperText?: string | undefined
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  placeholder,
  type,
  onChange,
  name,
  control,
  disabled,
  error,
  className,
  helperText,
  ...props
}) => {
  return (
    <div className="w-full relative flex flex-col gap-[9.92px]">
      <label
        className="text-[#4D6C62] font-medium font-arial text-sm lg-md:text-base/[18.4px] text-left capitalize"
        htmlFor={id}
      >
        {label}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          render={({ field }: any) => (
            <input
              {...field}
              className={
                error === true
                  ? `peer w-full h-[54px] px-6 rounded-[6.94px] border border-solid border-[#FF0000] justify-start items-center gap-2.5 flex text-[#FF0000] font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text hover:border-[#FF0000] focus:outline-none focus:border-[#FF0000] bg-[#F8F8F8]`
                  : `${twMerge(
                      `peer w-full h-[54px] px-6 rounded-[6.94px] border border-solid border-[#BDBCBC] justify-start items-center gap-3 flex font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text text-[#4D6C62] hover:border-primary focus:outline-none focus:border-primary disabled:bg-[#F8F8F8] focus:bg-[#F8F8F8] disabled:hover:border-[#5C5C5C] disabled:cursor-not-allowed disabled:text-[#5C5C5C] placeholder:text-[#4D4D4D] bg-[#F8F8F8]`,
                      className
                    )}`
              }
              type={type}
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              {...props}
            />
          )}
        />
      ) : (
        <>
          <input
            id={id}
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
        </>
      )}
      {error && (
        <FormHelperText className="text-[#FF0000] text-xs font-arial font-normal ml-1">
          {helperText}
        </FormHelperText>
      )}
    </div>
  )
}

export default TextField
