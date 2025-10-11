"use client"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import * as React from "react"
import dynamic from "next/dynamic"

const ProfileInformation = dynamic(() => import("./_components/Profile"), {
  ssr: false,
})
const ChangePasswordInformation = dynamic(
  () => import("./_components/Password"),
  {
    ssr: false,
  }
)
const NotificationSettings = dynamic(
  () => import("./_components/Notification"),
  {
    ssr: false,
  }
)
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

export default function InstructorSettings() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="flex-grow flex flex-col min-h-screen gap-3 bg-white">
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="setting tabs"
        className="w-full pb-4 border-b border-solid border-[#BDBCBC] px-2"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#3FA46E",
            borderRadius: "9px",
            height: "4px",
          },
        }}
      >
        {data?.map((tab, index) => (
          <Tab
            disableRipple
            key={index}
            label={tab.name}
            {...a11yProps(index)}
            className="w-fit font-satoshi font-medium text-xl leading-[27px] normal-case text-center text-[#757070] px-3"
            sx={{
              "&.Mui-selected": {
                color: "#3FA46E",
              },
            }}
          />
        ))}
      </Tabs>
      <div className="w-full">
        <TabPanel value={value} index={0}>
          <ProfileInformation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NotificationSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ChangePasswordInformation />
        </TabPanel>
      </div>
    </div>
  )
}

const data = [
  {
    name: "Profile",
    description: " View and update your profile information",
  },
  {
    name: "Notification",
    description: "Notification settings",
  },
  {
    name: "Password",
    description: "View and update your password information",
  },
]
