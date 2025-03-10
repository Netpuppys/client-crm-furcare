import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceForm from '../../Onboarding/components/ServiceForm'
import DepartmentForm from '../../Onboarding/components/DepartmentForm'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const buttonsArray = [
    {
        name: "Business Settings",
        serverName: "Business Settings"
    },
    {
        name: "Notifications",
        serverName: "Notifications"
    },
    {
        name: "Billing",
        serverName: "Billing"
    },
    {
        name: "Security",
        serverName: "Security"
    },
]

const SettingsPage = () => {
    const navigate = useNavigate()

    const [ activeButton, setActiveButton ] = useState(buttonsArray[0].serverName)
    const [ openModalIndex, setOpenModalIndex ] = useState(0);
    const [ sendData, setSendData ] = useState({
        services: [],
        departments: [],
        appointmentSlots: [
            // {
            //     name: "",
            //     description: "", //optional
            //     departmentId: ""
            // }
        ],
    })

    const handleAdminClick = () => {
        navigate("/admin/branch-units")
    }

    const handleOpenModal = (index, progress) => {
        if (openModalIndex===index) {
            setOpenModalIndex(false)
            return
        }

        setOpenModalIndex(index)
    }

  return (
    <div className='w-full min-h-full px-[36px] py-4 '>
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
        </div>

        <div className='mt-8 w-full'>
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

        <div className={`w-full mt-8 transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hiden ${openModalIndex===1? "bg-white" : "bg-[#F5F5F5]"}`}>
            <button
                onClick={() => handleOpenModal(1, 40)}
                className='h-[3.375rem] px-4 w-full flex items-center justify-between'
            >
                <p className='text-[#1E1E1E] font-medium'>
                    Services
                </p>
                <p className='text-[#1E1E1E] transition-all text-lg'>
                    {openModalIndex===1? <FaChevronUp /> : <FaChevronDown />}
                </p>
            </button>

            <div className={`${openModalIndex===1? "h-fit" : "h-0 overflow-hidden"} w-full transition-all duration-300 px-4`}>
                <p className='text-[#1E1E1E] '>
                    Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.
                </p>
                <div className='w-full h-fit'>
                    <ServiceForm
                        sendData={sendData}
                        setSendData={setSendData}
                    />
                </div>
            </div>
        </div>

        {/* Department form */}
        <div className={`w-full mt-4 transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hiden ${openModalIndex===2? "bg-white" : "bg-[#F5F5F5]"}`}>
            <button
                onClick={() => handleOpenModal(2, 60)}
                className='h-[3.375rem] px-4 w-full flex items-center justify-between'
            >
                <p className='text-[#1E1E1E] font-medium'>
                    Departments
                </p>
                <p className='text-[#1E1E1E] transition-all text-lg'>
                    {openModalIndex===2? <FaChevronUp /> : <FaChevronDown />}
                </p>
            </button>

            <div className={`${openModalIndex===2? "h-fit" : "h-0 overflow-hidden"} w-full transition-all duration-300 px-4`}>
                <p className='text-[#1E1E1E] '>
                    Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.
                </p>
                <div className='w-full h-fit'>
                    <DepartmentForm
                        sendData={sendData}
                        setSendData={setSendData}
                    />
                </div>
            </div>
        </div>

    </div>
  )
}

export default SettingsPage