import React from 'react'
import BlueButton from '../../../../ui/BlueButton'

const CreateNewLead = () => {
  return (
    <div className='w-full h-[100%] relative overflow-y-auto px-[2.8rem] pt-[1.6rem]'>
        <div className=''>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-semibold '>
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Name
            </label>
            <input
                placeholder='placeholder'
                className='w-[27.5rem] mt-1 px-3 h-[2.25rem] text-sm placeholder:italic border border-[#8891AA] rounded-md'
            />
        </div>
        <div className='mt-[1.75rem]'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-semibold '>
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Source(s)
            </label>
            <input
                placeholder='placeholder'
                className='w-[27.5rem] mt-1 px-3 h-[2.25rem] text-sm placeholder:italic border border-[#8891AA] rounded-md'
            />
        </div>
        <div className='mt-[1.75rem]'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-semibold '>
                Description
            </label>
            <textarea
                placeholder='Field Text'
                className='w-full min-h-[4.75rem] pt-1 mt-1 px-3 h-[2.25rem] text-sm placeholder:italic border border-[#8891AA] rounded-md'
            />
            <p className='text-[#606B85] text-sm'>
                Max 50 chars
            </p>
        </div>

        <div className='absolute bottom-8 right-8'>
            <BlueButton
                text={'Save'}
                disabled={true}
            />
        </div>
    </div>
  )
}

export default CreateNewLead