import React from 'react'
import { IoSearchOutline } from 'react-icons/io5';

const ClientDetailsForm = ({
    clientDetails,
    handleClientChange,
}) => {
    
  return (
    <div className="grid grid-cols-2 gap-4 gap-x-[50px] mb-6">
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                First Name
            </label>
            <input
                type="text"
                placeholder='Field Text'
                name="firstName"
                value={clientDetails.firstName || ''}
                onChange={handleClientChange}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Last Name</label>
            <input
                type="text"
                placeholder='Field Text'
                name="lastName"
                value={clientDetails.lastName || ''}
                onChange={handleClientChange}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Mobile Number</label>
            <input
                type="tel"
                placeholder='Field Text'
                name="mobile"
                value={clientDetails.mobile || ''}
                onChange={handleClientChange}
                maxLength={10}
                pattern="[0-9]{10}"
                inputMode="numeric"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Email Address</label>
            <input
                type="email"
                placeholder='Field Text'
                name="email"
                value={clientDetails.email || ''}
                onChange={handleClientChange}
                className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Postal Code</label>
            <div className='w-full flex overflow-hidden border border-[#8891AA] rounded-md'>
                <div className='px-2 flex text-[#606B85] items-center justify-center bg-[#F9F9FA] border-r border-[#E1E3EA]'>
                    <IoSearchOutline />
                </div>
                <input
                    type="tel"
                    placeholder="Field Text"
                    name="postalCode"
                    value={clientDetails.postalCode || ''}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                        if (value.length <= 6) {
                            handleClientChange(e); // Only update state if within 6 digits
                        }
                    }}
                    className="w-full px-2 capitalize placeholder:italic text-sm py-2 h-[36px] focus:outline-none"
                />
            </div>
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Address</label>
            <input
                type="text"
                placeholder='Field Text'
                name="address"
                value={clientDetails.address || ''}
                onChange={handleClientChange}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                City</label>
            <input
                type="text"
                placeholder='Field Text'
                name="city"
                value={clientDetails.city || ''}
                onChange={handleClientChange}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                State</label>
            <input
                type="text"
                placeholder='Field Text'
                name="state"
                value={clientDetails.state || ''}
                onChange={handleClientChange}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Country</label>
            <input
                type="text"
                placeholder='Field Text'
                name="country"
                value={clientDetails.country}
                disabled
                className="w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md bg-[#F4F4F6] focus:outline-none"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                Discounts</label>
            <input
                type="text"
                placeholder='Field Text'
                name="discounts"
                value={clientDetails.discounts || ''}
                onChange={handleClientChange}
                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
            />
        </div>

        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                Referred By
            </label>
            <input
                type="text"
                placeholder='Field Text'
                name="referredBy"
                value={clientDetails.referredBy}
                onChange={handleClientChange}
                className="w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
            />
        </div>

        <div className='flex items-center justify-center'>
            <button
                className='text-[#0263E0] text-sm font-semibold'
            >
                Add Additional Owner(s)/Caretaker(s)
            </button>
        </div>
    </div>
  )
}

export default ClientDetailsForm