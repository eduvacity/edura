"use client"
import { Divider, IconButton, Menu } from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useState } from "react"
import { HideIcon } from "../SVGs/portal"

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
  icon?: React.ReactNode | undefined
  button?: React.ReactNode | undefined
}
function Callout({
  FirstActionButton,
  SecondActionButton,
  ThirdActionButton,
  FourthActionButton,
  icon = <HideIcon />,
}: CalloutProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disableRipple
        disableTouchRipple
        sx={{
          cursor: "pointer",
          "&:hover": {
            background: "transparent",
          },
        }}
      >
        {icon}
      </IconButton>
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
export default Callout
