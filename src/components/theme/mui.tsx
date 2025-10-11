"use client"
import { createTheme } from "@mui/material/styles"
import { Colors } from "./colors"
import { Fonts } from "./fonts"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  typography: {
    fontFamily: Fonts.primary,
  },
})

export default theme
