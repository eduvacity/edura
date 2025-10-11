"use client"

import {
  CircledUpload,
  FemaleProfileAvatar,
  LocationIcon,
  PersonIcon,
} from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import EditProfileInformation from "./edit"

export default function ProfileInformation() {
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0]
    console.log("Selected file:", file)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full pb-6 border-b border-solid border-[#DDDDDD]">
        <p className="font-normal font-arial text-[22px] text-left text-[#000000] tracking-[-0.001em] px-4">
          Profile
        </p>
      </div>
      <div className="w-full flex flex-col gap-[25px] px-4 pt-4">
        <div className="w-full h-[190px] py-[30px] px-[31px] relative">
          <div
            className="w-full absolute inset-0 bg-cover bg-no-repeat opacity-20 z-[1]"
            style={{
              backgroundImage: `url(/images/profile-bg-pattern.png)`,
            }}
          ></div>
          <div className="w-full absolute inset-0 h-full bg-[#3FA46E] bg-[linear-gradient(0deg,_#3FA46E,_#3FA46E),linear-gradient(0deg,rgba(0,_0,_0,_0.2),rgba(0,_0,_0,_0.2))] flex gap-[10px] rounded-[19px] items-center px-8 ">
            <div className="w-full lg-md:w-[443px] flex items-center gap-[19px]">
              <div className="w-[136px] relative z-10">
                <div className="w-[128px] h-[128px] rounded-full border border-solid border-black overflow-hidden bg-[#DBDBDB]">
                  <FemaleProfileAvatar />
                </div>
                <div className="absolute -bottom-4 -right-3">
                  <input
                    accept="image/*"
                    type="file"
                    id="upload-avatar"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="upload-avatar">
                    <IconButton component="span" disableRipple>
                      <CircledUpload />
                    </IconButton>
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-satoshi font-[900] text-[26px] text-left text-white">
                  {`${profile?.firstName} ${profile?.lastName}`}
                </h3>
                <p className="font-arial font-normal text-base text-white">
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="w-full flex flex-col gap-[22px]">
          <div className="w-fit h-[28px] flex gap-[11px] items-center px-4">
            <PersonIcon />
            <p className="font-bold font-arial text-[18px]/[24.3px] text-left text-[#0A323F]">
              Personal Information
            </p>
          </div>
          <div className="w-full py-[38px] px-[40px] rounded-[19px] bg-[#F7F7F7]">
            <div className="w-full flex flex-col gap-[42px]">
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-left text-[#676767]">
                    First name
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#4A4949]">
                    {profile?.firstName}
                  </p>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-right text-[#676767]">
                    Last name
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-right text-[#4A4949]">
                    {profile?.lastName}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-left text-[#676767]">
                    Phone Number
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#4A4949]">
                    {profile?.phone}
                  </p>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-right text-[#676767]">
                    Gender
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-right text-[#4A4949] capitalize">
                    {profile?.gender}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-left text-[#676767]">
                    Date of birth
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#4A4949]">
                    {profile?.dob}
                  </p>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-right text-[#676767]">
                    Admission Number
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-right text-[#4A4949]">
                    {profile?.admissionNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RESIDENCIAL INFORMATION */}
        <div className="w-full flex flex-col gap-[22px]">
          <div className="w-fit h-[28px] flex gap-[11px] items-center px-4">
            <LocationIcon />
            <p className="font-bold font-arial text-[18px]/[24.3px] text-left text-[#0A323F]">
              Resident & Location
            </p>
          </div>
          <div className="w-full py-[38px] px-[40px] rounded-[19px] bg-[#F7F7F7]">
            <div className="w-full flex flex-col gap-[42px]">
              <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-left text-[#676767]">
                    Country
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#4A4949]">
                    {profile?.country}
                  </p>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-right text-[#676767]">
                    State
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-right text-[#4A4949]">
                    {profile?.state}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-normal font-arial text-base/[18.38px] text-left text-[#676767]">
                    Address
                  </h3>
                  <p className="font-medium font-satoshi text-[23px]/[31.02px] text-left text-[#4A4949]">
                    {profile?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-end">
          <EditProfileInformation profile={profile} />
        </div>
      </div>
    </div>
  )
}

interface ProfileInformationProps {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  gender?: string
  dob: string
  admissionNumber?: string
  country?: string
  state?: string
  address?: string
}

const profile: ProfileInformationProps = {
  firstName: "Charmberlain",
  lastName: "Olayinka",
  email: "charlesolayinka@gmail.com",
  phone: "+2348142445807",
  gender: "female",
  dob: "Sept 17, 2024",
  admissionNumber: "45222109",
  country: "Nigeria",
  state: "Niger",
  address: "No 16 Gbagbalape aso c Nyanya, ABUJA, Nigria",
}
