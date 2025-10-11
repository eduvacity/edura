import { FemaleProfileAvatar, PersonIcon } from "@/components/SVGs/portal"
import { IconButton } from "@mui/material"
import { FaAngleRight } from "react-icons/fa6"

export default function ProfileInformation() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-[25px] px-8">
        {/* PERSONAL INFORMATION */}
        <div className="w-full flex flex-col lg-md:flex-row gap-[22px]">
          <div className="w-full flex flex-col gap-[25px] px-4 py-4 bg-white border border-solid border-[#D7D7D7] rounded-[10px]">
            <div className="w-full h-[190px] py-[30px] px-[31px] relative">
              <div
                className="w-full absolute inset-0 bg-cover bg-no-repeat opacity-20 z-[1]"
                style={{
                  backgroundImage: `url(/images/profile-bg-pattern.png)`,
                }}
              ></div>
              <div className="w-full absolute inset-0 h-full bg-[#3FA46E] bg-[linear-gradient(0deg,_#3FA46E,_#3FA46E),linear-gradient(0deg,rgba(0,_0,_0,_0.2),rgba(0,_0,_0,_0.2))] flex gap-[10px] rounded-[19px] items-center px-8">
                <div className="w-full lg-md:w-[443px] flex items-center gap-[19px]">
                  <div className="w-[136px] relative z-10">
                    <div className="w-[128px] h-[128px] rounded-full border border-solid border-black overflow-hidden bg-[#DBDBDB]">
                      <FemaleProfileAvatar />
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
                        Date of Birth
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
                        {profile?.adminNo}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex">
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
          </div>
          <div className="w-full max-w-[544px] flex flex-col gap-[25px] px-4 py-4 bg-white border border-solid border-[#D7D7D7] rounded-[10px]">
            <p className="font-semibold font-arial text-[26px]/[60px] text-left text-black tracking-[0.1%]">
              Performance
            </p>
            <div className="w-full flex flex-col gap-[52px]">
              <div className="w-full flex flex-col gap-[10px]">
                <div className="w-full h-[99px] flex justify-between border border-solid border-[#DDDDDD] bg-white rounded-[10px] px-6 py-">
                  <div className="w-full flex flex-col gap-[15px]">
                    <h4 className="font-medium font-satoshi text-[15px]/[21.6px] text-black tracking-normal">
                      Week 1
                    </h4>
                    <p className="font-medium font-satoshi text-[#7E7E7E] text-[15px]/[21.6px]">
                      12 hours of learing
                    </p>
                  </div>
                  <IconButton>
                    <FaAngleRight />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
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
  adminNo?: string
  id?: string
  address: string
}

const profile: ProfileInformationProps = {
  id: "wr4uyu786q266544",
  firstName: "Charmberlain",
  lastName: "Olayinka",
  email: "charlesolayinka@gmail.com",
  phone: "+2348142445807",
  gender: "female",
  dob: "Sept 17, 2024",
  adminNo: "Project Manager",
  address: "No 16 Gbagbalape aso c Nyanya, ABUJA, Nigria",
}

const Performance = [
  {
    id: 1,
    week: "1",
    duration: "12",
  },
  {
    id: 2,
    week: "2",
    duration: "12",
  },
  {
    id: 3,
    week: "3",
    duration: "12",
  },
  {
    id: 4,
    week: "4",
    duration: "12",
  },
]
