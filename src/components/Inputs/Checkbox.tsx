"use client"
import { styled } from "@mui/material"

export const BpIcon = styled("span")({
  width: 20.5,
  height: 20.5,
  backgroundColor: "#FFFFFF",
  border: `0.66px solid #3FA46E`,
  borderRadius: 2,
  ".Mui-focusVisible &": {
    outline: `2px auto #3FA46E`,
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#FFFFFF",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "#C6C7C9",
  },
})

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#3FA46E",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#3FA46E",
  },
})

export const BpRadioIcon = styled("span")(() => ({
  borderRadius: "50%",
  width: 22,
  height: 22,
  border: `0.66px solid #3FA46E`,
  backgroundColor: "#FFFFFF",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,120,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "#C6C7C9",
  },
}))
export const BpRadioCheckedIcon = styled(BpRadioIcon)({
  backgroundColor: "#3FA46E",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#FFFFFF",
  },
})
