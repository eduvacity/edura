import { FormHelperText } from "@mui/material"
import React, { TextareaHTMLAttributes } from "react"
import { Controller } from "react-hook-form"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  id?: string
  placeholder?: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  name: string
  control?: any
  error?: boolean | undefined
  helperText?: string | undefined
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  placeholder,
  type,
  onChange,
  name,
  control,
  disabled,
  error,
  helperText,
  ...rest
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
            <textarea
              {...field}
              id={id}
              className={
                error === true
                  ? `peer w-full min-h-[108px] p-6 rounded-[6.94px] border border-solid border-[#FF0000] justify-start items-center gap-2.5 flex text-[#FF0000] font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text hover:border-[#FF0000] focus:outline-none focus:border-[#FF0000] bg-[#F8F8F8]`
                  : `peer w-full min-h-[108px] p-6 rounded-[6.94px] border border-solid border-[#BDBCBC] justify-start items-center gap-3 flex font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text text-[#4D6C62] hover:border-pcolor focus:outline-none focus:border-pcolor disabled:bg-[#F8F8F8] focus:bg-[#F8F8F8] disabled:hover:border-[#5C5C5C] disabled:cursor-not-allowed disabled:text-[#5C5C5C] placeholder:text-[#4D4D4D] bg-[#F8F8F8]`
              }
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              {...rest}
            />
          )}
        />
      ) : (
        <textarea
          id={id}
          className={
            error === true
              ? `peer w-full min-h-[108px] p-6 rounded-[6.94px] border border-solid border-[#FF0000] justify-start items-center gap-2.5 flex text-[#FF0000] font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text hover:border-[#FF0000] focus:outline-none focus:border-[#FF0000] bg-[#F8F8F8]`
              : `peer w-full min-h-[108px] p-6 rounded-[6.94px] border border-solid border-[#BDBCBC] justify-start items-center gap-3 flex font-arial text-sm lg-md:text-base/[18.4px] font-normal cursor-text text-[#4D6C62] hover:border-pcolor focus:outline-none focus:border-pcolor disabled:bg-[#F8F8F8] focus:bg-[#F8F8F8] disabled:hover:border-[#5C5C5C] disabled:cursor-not-allowed disabled:text-[#5C5C5C] placeholder:text-[#4D4D4D]`
          }
          placeholder={placeholder}
          name={name}
          {...rest}
        />
      )}
      <FormHelperText className="text-[#FF0000] text-xs font-arial font-normal ml-1">
        {helperText}
      </FormHelperText>
    </div>
  )
}

export default TextArea
