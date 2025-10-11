"use client"

import { CustomSwitch } from "@/components/Inputs"
import React from "react"

interface FormData {
  currentPassword: string
  password: string
  confirmPassword: string
}
export default function NotificationSettings() {
  const [loading, setLoading] = React.useState(false)
  const [checked, setChecked] = React.useState(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-[25px] px-8 pt-8">
        <div className="w-full flex flex-col lg-md:flex-row gap-[22px]">
          <p className="font-normal font-arial text-base/[33.6px] text-left text-[#4A4949]">
            Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat
            quis vitae ut velit pharetra amet. Porttitor pellentesque lectus
            cursus amet.
          </p>

          <div className="w-full grid bg-white grid-cols-1 gap-6">
            {notifications?.map((notification, index) => (
              <div key={index} className="w-full flex justify-between gap-2">
                <div className="flex flex-col">
                  <h4 className="font-satoshi font-medium text-[19px] leading-[32.68px] text-left text-[#2E2D2D]">
                    {notification?.title}
                  </h4>
                  <p className="font-satoshi font-normal text-lg leading-[30.96px] text-left text-[#545454]">
                    {notification?.description}
                  </p>
                </div>
                <CustomSwitch
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const notifications = [
  {
    title: "Push Notification",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus pulvinar cras sed posuere duis.Velit euismod quis sed ut quis.",
  },
  {
    title: "Email Notification",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus pulvinar cras sed posuere duis.Velit euismod quis sed ut quis.",
  },
  {
    title: "System Notification",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus pulvinar cras sed posuere duis.Velit euismod quis sed ut quis.",
  },
]
