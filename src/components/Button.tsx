"use client"

import { Button as MuiButton } from "@mui/material"
import type React from "react"
import { ThreeDots } from "react-loader-spinner"
import { twMerge } from "tailwind-merge"

interface ButtonProps {
  loading?: boolean
  children: React.ReactNode
  style?: any
  type?: string
  href?: string
  disabled?: boolean
  onClick?: any
  className?: string
  variant?: any
}

function SubmitButton({
  loading,
  style,
  children,
  disabled,
  onClick,
  className,
  href,
  variant,
  type = "submit",
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      type={type}
      href={href!}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={twMerge(
        `w-fit h-[55px] py-[15px] px-[18px] flex justify-center items-center shadow-[0px_4px_2px_0px_#00000005] rounded-[7px] bg-[#3FA46E] border border-solid border-[#C1C1C1] font-arial font-bold text-base/[18.4px] text-white transition-all duration-300 hover:scale-[0.99] hover:bg-[#3FA46E]/95 ease-in-out capitalize`,
        className
      )}
      {...props}
    >
      {loading ? (
        <ThreeDots
          height="28"
          width="28"
          radius="9"
          color="#FFFFFF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      ) : (
        children
      )}
    </MuiButton>
  )
}

export default SubmitButton
export { SubmitButton }
export { SubmitButton as Button }
