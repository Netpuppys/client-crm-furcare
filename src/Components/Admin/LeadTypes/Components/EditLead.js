import React, { useState } from 'react'
import BlueButton from '../../../../ui/BlueButton'
import ActiveButtons from '../../../../ui/ActiveButtons'

const EditLead = ({
    selectedLead
}) => {
    const [ active, setActive ] = useState(false)

  return (
    <div className='w-full h-[100%] relative overflow-y-auto px-[2.8rem] pt-[1.6rem]'>
        <div className='flex items-center justify-between gap-[50px]'>
        <div className='w-full'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-medium '>
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Name
            </label>
            <input
                placeholder='placeholder'
                value={selectedLead.name}
                className='w-full mt-1 px-3 h-[2.25rem] text-sm placeholder:italic border border-[#8891AA] rounded-md'
            />
        </div>

            <div className='w-fit'>
                <ActiveButtons
                    active={active}
                    setActive={setActive}
                />
            </div>
        </div>

        <div className='mt-[1.75rem]'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-medium '>
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Source(s)
            </label>
            <input
                placeholder='placeholder'
                value={selectedLead.source}
                className='w-full mt-1 px-3 h-[2.25rem] text-sm placeholder:italic border border-[#8891AA] rounded-md'
            />
        </div>
        <div className='mt-[1.75rem]'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-medium '>
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

export default EditLead