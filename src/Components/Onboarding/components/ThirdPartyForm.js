import React, { useState } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import deleteIcon from "../../../Assets/icons/deleteIcon.png"

const ThirdPartyForm = () => {
    const [ appointmentSlots, setAppointmentSlots ] = useState([])

    const handleAddVendors = () => {
        setAppointmentSlots(prev => [...prev, { name: "Vendor", businessName: "" }]);
    };

    const handleAddDiagnostics = () => {
        setAppointmentSlots(prev => [...prev, { name: "Diagnostic Center", businessName: "" }]);
    };

    const handleDeleteAppointmentSlot = (index) => {
        setAppointmentSlots(prev => prev.filter((_, i) => i !== index));
    };

  return (
    <div className='w-full h-fit py-4'>
        <div className='w-full flex items-center justify-start gap-12'>
            <div className='flex items-center gap-3'>
                <p className='text-[#121C2D] font-semibold'>
                    Vendors
                </p>
                <button
                    onClick={handleAddVendors}
                    className='w-[2.25rem] h-[2.25rem] aspect-square flex items-center justify-center bg-[#121C2D] text-white rounded-md text-2xl border border-[#394762]'
                >
                    <HiPlusSm />
                </button>
            </div>
            <div className='flex items-center gap-3'>
                <p className='text-[#121C2D] font-semibold'>
                    Diagnotic Center
                </p>
                <button
                    onClick={handleAddDiagnostics}
                    className='w-[2.25rem] h-[2.25rem] aspect-square flex items-center justify-center bg-[#121C2D] text-white rounded-md text-2xl border border-[#394762]'
                >
                    <HiPlusSm />
                </button>
            </div>
        </div>

        <div className='flex flex-col mt-6 gap-3'>
            {appointmentSlots.map((slot, index) => (
                <div key={index} className='flex gap-12 items-center'>
                    <div className='flex flex-col w-[35%] gap-1'>
                        <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                            <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                            Name
                        </label>
                        <input
                            type='text'
                            disabled
                            placeholder='Placeholder'
                            className='w-full border disabled:bg-[#F4F4F6] text-[#AEB2C1] focus:outline-none rounded-md p-2 text-sm border-[#CACDD8]'
                            value={slot.name}
                            onChange={e =>
                                setAppointmentSlots(prev => 
                                    prev.map((s, i) => i === index ? { ...s, name: e.target.value } : s)
                                )
                            }
                        />
                    </div>
                    <div className='flex flex-col w-[65%] gap-1'>
                        <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                            <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                            Business Name
                        </label>
                        <div className='w-full flex items-center gap-4'>
                        <input
                            type='text'
                            placeholder='Placeholder'
                            className='w-full border placeholder:italic focus:outline-none rounded-md p-2 text-sm border-[#8891AA]'
                            value={slot.businessName}
                            onChange={e =>
                                setAppointmentSlots(prev => 
                                    prev.map((s, i) => i === index ? { ...s, businessName: e.target.value } : s)
                                )
                            }
                        />
                            <button 
                                onClick={() => handleDeleteAppointmentSlot(index)}
                                className='w-fit h-fit flex items-center justify-center'
                            >
                                <img
                                    src={deleteIcon}
                                    className='h-[1.25rem]'
                                    alt=''
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ThirdPartyForm