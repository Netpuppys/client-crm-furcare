import React, { useEffect, useState } from 'react'
import { z } from "zod";
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

// Zod Schema for Validation
const OnboardingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Type is required"),
    businessBranches: z.array(
      z.object({
        name: z.string().min(1, "Branch name is required"),
        type: z.string().min(1, "Branch type is required"),
        practice: z.string().min(1, "Practice is required"),
        currency: z.string().min(1, "Currency is required"),
        addressLine1: z.string().min(1, "Address Line 1 is required"),
        country: z.string().min(1, "Country is required"),
        state: z.string().min(1, "State is required"),
        city: z.string().min(1, "City is required"),
        postalCode: z.string().min(1, "Postal Code is required"),
      })
    ),
    services: z.array(z.string().min(1)).min(1, "At least one service is required"),
    departments: z.array(z.string().min(1)).min(1, "At least one department is required"),
    staffs: z.array(
      z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
      }).optional()
    ),
    vendors: z.array(z.object({ name: z.string().optional() })),
    diagnosticIntegrations: z.array(z.object({ name: z.string().optional() })),
    appointmentSlots: z.array(z.object({
        // name: z.string().min(1, "Name is required"),
        departmentId: z.string().min(1, "id is required")
    })).min(1, "At least one slot is required")
});
  

const OnboardingPage = () => {
    const [ openModalIndex, setOpenModalIndex ] = useState(0);
    const [ progressPercentage, setProgressPercentage ] = useState(0)
    const [ disabled, setDisabled ] = useState(true)
    const [ sendData, setSendData ] = useState({
        name: "",
        type: "",
        businessBranches: [
            {
                name: "Branch 1",
                type: "",
                practice: "",
                currency: "INR",
                addressLine1: "",
                addressLine2: "",
                country: "India",
                state: "",
                city: "",
                postalCode: ""
            },
        ],
        services: [],
        departments: [],
        appointmentSlots: [
            // {
            //     name: "",
            //     description: "", //optional
            //     departmentId: ""
            // }
        ],
        staffs: [
            {
                name: "", // optional
                phone: "",// optional
                email: "",// optional
                password: ""// optional
            }
        ],
        vendors: [
            // {
            //     name: ""// optional
            // }
        ],
        diagnosticIntegrations: [
            // {
            //     name: ""// optional
            // }
        ]
    })

    const calculateProgress = (data) => {
        let totalFields = 0;
        let filledFields = 0;
    
        // Required fields
        const requiredFields = ["name", "type"];
        totalFields += requiredFields.length;
        requiredFields.forEach(field => {
            if (data[field].trim() !== "") filledFields++;
        });
    
        // Business Branches
        data.businessBranches.forEach(branch => {
            const branchFields = ["type", "practice", "addressLine1", "state", "city", "postalCode"];
            totalFields += branchFields.length;
            branchFields.forEach(field => {
                if (branch[field].trim() !== "") filledFields++;
            });
        });
    
        // Services & Departments (Array fields)
        if (data.services.length > 0) filledFields++;
        totalFields++;
        
        if (data.departments.length > 0) filledFields++;
        totalFields++

        // Appointment Slots
        totalFields++;
        if (data.appointmentSlots.length > 0) {
            data.appointmentSlots.forEach(slot => {
                const slotFields = ["name", "departmentId"];
                totalFields += slotFields.length;
                slotFields.forEach(field => {
                    if (slot[field].trim() !== "") filledFields++;
                });
            });
            filledFields++;
        }
    
        // Calculate percentage
        return Math.round((filledFields / totalFields) * 100);
    };
    
    useEffect(() => {
        setProgressPercentage(calculateProgress(sendData));
    }, [sendData]);
    

    useEffect(() => {
        const result = OnboardingSchema.safeParse(sendData);
        // console.log(result)
        // {console.log(sendData)}
        setDisabled(!result.success);
    }, [sendData]);

    const handleOpenModal = (index, progress) => {
        if (openModalIndex===index) {
            setOpenModalIndex(false)
            return
        }

        // setProgressPercentage(progress)
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
                disabled={disabled}
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
                        <BusinessForm 
                            sendData={sendData}
                            setSendData={setSendData}
                        />
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
                        <ServiceForm
                            sendData={sendData}
                            setSendData={setSendData}
                        />
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
                        <DepartmentForm
                            sendData={sendData}
                            setSendData={setSendData}
                        />
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
                        <StaffForm
                            sendData={sendData}
                            setSendData={setSendData}
                        />
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
                        <ThirdPartyForm
                            sendData={sendData}
                            setSendData={setSendData}
                        />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OnboardingPage