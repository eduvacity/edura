"use client"

import { LockIcon, UserProfileIcon } from "@/components/SVGs/portal"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { LogOut } from "lucide-react"
import dynamic from "next/dynamic"
import * as React from "react"

const ProfileInformation = dynamic(() => import("./_components/profile"), {
  ssr: false,
})
const PasswordInformation = dynamic(() => import("./_components/Password"), {
  ssr: false,
})
const LogUserOut = dynamic(() => import("./_components/logout"), {
  ssr: false,
})
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <div className="py-6">{children}</div>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

export default function StudentSettings() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="flex-grow flex min-h-screen gap-3">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="setting tabs"
        className="w-full lg-md:w-[439px]"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {data?.map((tab, index) => (
          <Tab
            disableRipple
            key={index}
            label={
              tab.name.toLowerCase() === "logout" ? (
                <LogUserOut tab={tab} />
              ) : (
                <div
                  className={`w-full h-[120px] flex items-center gap-6 rounded-[14.02px] py-2 px-4 bg-white normal-case  ${
                    value === index ? "text-primary" : "text-[#777777]"
                  } ${
                    value === index
                      ? "border-[0.93px] border-solid border-primary"
                      : "border-[0.93px] border-solid border-[#DDDDDD]"
                  }`}
                >
                  {tab.icon}
                  <div className="flex flex-col gap-1">
                    <h3
                      className={`font-bold font-arial text-[19px]/[20.57px] -tracking-[0.001em] text-left ${
                        value === index ? "text-primary" : "text-[#777777]"
                      }`}
                    >
                      {tab.name}
                    </h3>
                    <p className="font-arial font-normal text-[#6F6F6F] text-base/[24.31px] text-left -tracking-[0.001em]">
                      {tab.description}
                    </p>
                  </div>
                </div>
              )
            }
            {...a11yProps(index)}
            className="px-0 py-[6px]"
          />
        ))}
      </Tabs>
      <div
        className={`w-full ${
          value === 2 ? "hidden" : "block"
        } bg-white rounded-[17px] border-2 border-solid border-[#DDDDDD]`}
      >
        <TabPanel value={value} index={0}>
          <ProfileInformation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PasswordInformation />
        </TabPanel>
      </div>
    </div>
  )
}

const data = [
  {
    name: "Profile",
    description: " View and update your profile information",
    icon: <UserProfileIcon />,
  },
  {
    name: "Password",
    description: " View and update your password information",
    icon: <LockIcon />,
  },
  {
    name: "Logout",
    description: "Logout of the application",
    icon: <LogOut />,
  },
]
