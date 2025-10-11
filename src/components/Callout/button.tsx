"use client"
import { Divider, Menu } from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useState } from "react"

const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    minWidth: 168,
    padding: "0 3px",
    gap: 4,
    borderRadius: "7px",
    border: "2px solid #DFDFDF",
    background: "#FEFFFF",
    boxShadow: "0px 0px 63px 0px #0000001A",
    "& .MuiMenu-list": {
      padding: 0,
    },
  },
}))
interface CalloutProps {
  FirstActionButton?: string | React.ReactNode
  SecondActionButton?: string | React.ReactNode
  ThirdActionButton?: string | React.ReactNode
  FourthActionButton?: string | React.ReactNode
  buttonText?: string
}
function ButtonCallout({
  FirstActionButton,
  SecondActionButton,
  ThirdActionButton,
  FourthActionButton,
  buttonText = "Action",
}: CalloutProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="w-[127px] h-[56px] shadow-[0px_4px_2px_0px_#00000005] py-[17px] rounded-[7px] bg-[#3FA46E] border border-solid border-[#3FA46E] font-satoshi font-bold text-base text-white hover:scale-[0.99]"
      >
        {buttonText}
      </button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {FirstActionButton && (
          <div>
            {FirstActionButton}
            {SecondActionButton ? (
              <Divider className="border-[#DFDFDF]" />
            ) : null}
          </div>
        )}
        {SecondActionButton && (
          <div>
            {SecondActionButton}
            {ThirdActionButton ? (
              <Divider className="border-[#DFDFDF]" />
            ) : null}
          </div>
        )}

        {ThirdActionButton && (
          <div>
            {ThirdActionButton}
            {FourthActionButton ? (
              <Divider className="border-[#DFDFDF]" />
            ) : null}
          </div>
        )}

        {FourthActionButton && <div>{FourthActionButton}</div>}
      </StyledMenu>
    </div>
  )
}
export default ButtonCallout
