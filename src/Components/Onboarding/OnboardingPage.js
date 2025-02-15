import React, { useState } from 'react'
import BlueButton from '../../ui/BlueButton';
import StaffForm from './components/StaffForm';
import ServiceForm from './components/ServiceForm';
import BusinessForm from './components/BusinessForm';
import DepartmentForm from './components/DepartmentForm';
import ThirdPartyForm from './components/ThirdPartyForm';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProgressBar = ({ progress=0 }) => {
    return (
        <div className='w-full max-w-[28.125rem]'>
            <div className='w-full flex items-center justify-between'>
                <p className='font-semibold tracking-wide text-sm text-[#121C2D]'>
                    Set up Account
                </p>
                <p className='font-semibold text-sm text-[#121C2D]'>
                    {progress}{" "}%
                </p>
            </div>
            <div className='w-full mt-1 h-2 rounded-full overflow-hidden bg-[#E1E3EA]'>
                <div 
                    style={{ width: `${progress}%`}}
                    className='h-full bg-[#006DFA] rounded-full transition-all'
                ></div>
            </div>
        </div>
    )
}

const OnboardingPage = () => {
    const [ openModalIndex, setOpenModalIndex ] = useState(0);
    const [ progressPercentage, setProgressPercentage ] = useState(0)
    // const [ sendData, setSendData ] = useState({
    //     name: "",
    //     type: "",
    //     businessBranches: [
    //         {
    //             name: "",
    //             type: "",
    //             practice: "",
    //             currency: "",
    //             addressLine1: "",
    //             addressLine2: "",
    //             country: "",
    //             state: "",
    //             city: "",
    //             postalCode: ""
    //         },
    //         {
    //             name: "",
    //             type: "",
    //             practice: "",
    //             currency: "",
    //             addressLine1: "",
    //             addressLine2: "",
    //             country: "",
    //             state: "",
    //             city: "",
    //             postalCode: ""
    //         }
    //     ],
    //     services: [""],
    //     departments: [""],
    //     appointmentSlots: [
    //         {
    //             name: "",
    //             description: "",
    //             departmentId: ""
    //         }
    //     ],
    //     staffs: [
    //         {
    //             name: "",
    //             phone: "",
    //             email: "",
    //             password: ""
    //         }
    //     ],
    //     vendors: [
    //         {
    //             name: ""
    //         }
    //     ],
    //     diagnosticIntegrations: [
    //         {
    //             name: ""
    //         }
    //     ]
    // })

    const handleOpenModal = (index, progress) => {
        if (openModalIndex===index) {
            setOpenModalIndex(false)
            return
        }

        setProgressPercentage(progress)
        setOpenModalIndex(index)
    }

  return (
    <div className='w-full min-h-[calc(100vh-4.75rem)] px-8 py-4 overflow-y-auto'>
        <div className='w-full flex items-center justify-between'>
            <ProgressBar
                progress={progressPercentage}
            />
            <BlueButton
                text={'Submit'}
                disabled={true}
            />
        </div>
        <div className='w-full flex flex-col items-center justify-start gap-[1.25rem] transition-all mt-6'>
            {/* business unit form */}
            <div className={`w-full transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hidden ${openModalIndex===0? "bg-white" : "bg-[#F5F5F5]"}`}>
                <button
                    onClick={() => handleOpenModal(0, 20)}
                    className='h-[3.375rem] px-4 w-full flex items-center justify-between'
                >
                    <p className='text-[#1E1E1E] font-medium'>
                        {openModalIndex===0? "Business Details" : "Business Unit"}
                    </p>
                    <p className='text-[#1E1E1E] transition-all text-lg'>
                        {openModalIndex===0? <FaChevronUp /> : <FaChevronDown />}
                    </p>
                </button>

                <div className={`${openModalIndex===0? "h-fit" : "h-0 overflow-hidden"} w-full transition-all duration-300 px-4`}>
                    <p className='text-[#1E1E1E] '>
                        Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.
                    </p>
                    <div className='w-full h-fit'>
                        <BusinessForm />
                    </div>
                </div>
            </div>

            {/* services form */}
            <div className={`w-full transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hiden ${openModalIndex===1? "bg-white" : "bg-[#F5F5F5]"}`}>
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
                        <ServiceForm />
                    </div>
                </div>
            </div>

            {/* Department form */}
            <div className={`w-full transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hiden ${openModalIndex===2? "bg-white" : "bg-[#F5F5F5]"}`}>
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
                        <DepartmentForm />
                    </div>
                </div>
            </div>

            {/* staff management form */}
            <div className={`w-full transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hidden ${openModalIndex===3? "bg-white" : "bg-[#F5F5F5]"}`}>
                <button
                    onClick={() => handleOpenModal(3, 80)}
                    className='h-[3.375rem] px-4 w-full flex items-center justify-between'
                >
                    <p className='text-[#1E1E1E] font-medium'>
                        Staff Management
                    </p>
                    <p className='text-[#1E1E1E] transition-all text-lg'>
                        {openModalIndex===3? <FaChevronUp /> : <FaChevronDown />}
                    </p>
                </button>

                <div className={`${openModalIndex===3? "h-fit" : "h-0 overflow-hidden"} w-full transition-all duration-300 px-4`}>
                    <p className='text-[#1E1E1E] '>
                        Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.
                    </p>
                    <div className='w-full h-fit'>
                        <StaffForm />
                    </div>
                </div>
            </div>

            {/* third party integrations */}
            <div className={`w-full transition-all duration-200 border border-[#D9D9D9] rounded-lg overflow-hidden ${openModalIndex===4? "bg-white" : "bg-[#F5F5F5]"}`}>
                <button
                    onClick={() => handleOpenModal(4, 100)}
                    className='h-[3.375rem] px-4 w-full flex items-center justify-between'
                >
                    <p className='text-[#1E1E1E] font-medium'>
                        Third-party Integrations
                    </p>
                    <p className='text-[#1E1E1E] transition-all text-lg'>
                        {openModalIndex===4? <FaChevronUp /> : <FaChevronDown />}
                    </p>
                </button>

                <div className={`${openModalIndex===4? "h-fit" : "h-0 overflow-hidden"} w-full transition-all duration-300 px-4`}>
                    <p className='text-[#1E1E1E] '>
                        Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.
                    </p>
                    <div className='w-full h-fit'>
                        <ThirdPartyForm />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OnboardingPage