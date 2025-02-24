import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlueButton from '../../../ui/BlueButton'

const buttonsArray = [
    {
        name: "Home",
        serverName: "Home"
    },
    {
        name: "Appointment Configurations",
        serverName: "Appointment Configurations"
    },
    {
        name: "Pricing",
        serverName: "Pricing"
    },
    {
        name: "Payment",
        serverName: "Payment"
    },
    {
        name: "Security",
        serverName: "Security"
    },
]

const SettingsPage = () => {
    const navigate = useNavigate()

    const [ activeButton, setActiveButton ] = useState(buttonsArray[0].serverName)

    const handleAdminClick = () => {
        navigate("/admin/branch-units")
    }

  return (
    <div className='w-full min-h-full px-[36px] py-4 overflow-y-auto'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <button
                    onClick={handleAdminClick}
                    className='underline inline cursor-pointer'
                >
                    Admin
                </button>
                <span>{" "}/{" "}</span>
                <p
                    className='underline inline cursor-default'
                >
                    Settings
                </p>
            </div>
            <div className='flex items-center gap-5'>
                <BlueButton
                    text={'Create'}
                />
            </div>
        </div>

        <div className='mt-4 w-full'>
            <div className='w-full border-b border-[#CACDD8]'>
                {buttonsArray.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setActiveButton(item.serverName)}
                    className={`rounded-t-lg relative ${item.serverName===activeButton? "border-t-2 -bottom-[2px] bg-white " : ""} border-[#0263E0] h-10 bg-white overflow-hidden`}
                >
                    <p className={`w-full h-full flex items-center font-medium justify-center ${item.serverName===activeButton? "border-x text-[#0263E0]" : "text-[#606B85]"} border-[#CACDD8] px-4`}>
                        {item.name}
                    </p>
                </button>))}
            </div>
        </div>

    </div>
  )
}

export default SettingsPage