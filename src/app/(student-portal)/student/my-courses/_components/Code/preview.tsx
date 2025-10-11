"use client"
import {
  DarkLightToggler,
  HorizontalRotationIcon,
  LongArrowLeft,
  LongArrowRight,
} from "@/components/SVGs/portal"
import AppBar from "@mui/material/AppBar"
import Dialog from "@mui/material/Dialog"
import IconButton from "@mui/material/IconButton"
import Slide from "@mui/material/Slide"
import Toolbar from "@mui/material/Toolbar"
import { TransitionProps } from "@mui/material/transitions"
import * as React from "react"
import CodeEditor from "./CodeEditor"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function RunCodeExample() {
  const [open, setOpen] = React.useState(false)
  const [isRowOnLarge, setIsRowOnLarge] = React.useState(true)
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [code, setCode] = React.useState<string>(
    `function greet() { 
      let result = 40 + 40;
      console.log("Hello, world!");
      return result;
    }

    greet();`
  )
  const toggleLayout = () => {
    setIsRowOnLarge(!isRowOnLarge)
  }

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {}

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="w-fit h-[54px] flex items-center justify-center gap-2 bg-transparent font-satoshi font-medium text-base leading-[21.6px] text-left text-white p-[7px_8px_7px_9px] rounded-[7px] cursor-pointer border border-solid border-[#A7A7A7] hover:scale-[0.99]"
      >
        <span>Run Example</span>
        <LongArrowRight />
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className={`${isDarkMode ? "dark" : ""}`}
      >
        <div
          className={`min-h-screen flex flex-col ${
            isDarkMode ? "bg-[#203A42] text-white" : "bg-[#F7F7F9] text-black"
          }`}
        >
          <AppBar
            sx={{ position: "relative" }}
            className="w-full h-[100px] bg-[#F7F7F9] dark:bg-[#203A42] shadow-none place-content-center px-6"
          >
            <Toolbar>
              <div className="w-[126px] h-[33.55px] flex justify-between gap-2">
                <IconButton
                  disableRipple
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  className="bg-transparent"
                >
                  <LongArrowLeft
                    className={isDarkMode ? "text-white" : "text-[#7E7E7E]"}
                  />
                </IconButton>
                <IconButton
                  disableRipple
                  edge="start"
                  color="inherit"
                  onClick={toggleLayout}
                  aria-label="close"
                  className="bg-transparent"
                >
                  <HorizontalRotationIcon
                    className={`${
                      isRowOnLarge ? "block" : "transform rotate-90"
                    } ${isDarkMode ? "text-white" : "text-[#7E7E7E]"}`}
                  />
                </IconButton>
                <IconButton
                  disableRipple
                  edge="start"
                  color="inherit"
                  onClick={handleThemeChange}
                  aria-label="toggle theme"
                  className="bg-transparent"
                >
                  <DarkLightToggler
                    className={isDarkMode ? "text-white" : "text-[#7E7E7E]"}
                  />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <CodeEditor isDarkMode={isDarkMode} isRowOnLarge={isRowOnLarge} />
        </div>
      </Dialog>
    </div>
  )
}
