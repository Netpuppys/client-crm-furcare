import React, { useState } from 'react'
import BlueButton from '../../../../ui/BlueButton'
import chevronDown from "../../../../Assets/icons/chevronDown.png";

const CreateNewLead = () => {
  const [ showDropdown, setShowDropdown ] = useState(false)

  return (
    <div className='w-full h-[100%] relative overflow-y-auto px-[2.8rem] pt-[1.6rem]'>
        <div className='w-full'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-medium '>
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Name
            </label>
            <input
                placeholder='placeholder'
                className='w-full mt-1 px-3 h-[2.25rem] focus:outline-none text-sm placeholder:italic border border-[#8891AA] rounded-md'
            />
        </div>
        <div className='mt-[1.75rem] w-full'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-medium'>
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Source(s)
            </label>
            <div className={`mt-1 w-[calc(100%+2px)] h-[calc(2.25rem+2px)] border relative rounded-md border-[#8891AA] bg-white`}>
            <div
              className={`w-full h-full relative gap-1 flex items-center justify-between`}
            >
              <div className="px-2 flex items-center justify-start gap-1 h-full py-1">
                <p className={`text-sm font-medium text-[#121C2D]`}>
                  Select
                </p>
              </div>

              <div className='h-full aspect-square flex items-center justify-center'>
                <button
                    onClick={() => setShowDropdown(prev => !prev)}
                    className='flex items-center justify-center w-5 h-5 aspect-square'
                >
                    <img
                        src={chevronDown}
                        className={`w-full h-full object-contain transition-all ${showDropdown? "rotate-180" : ""}`}
                        alt='chevron down'
                    />
                </button>
              </div>
            </div>

            {/* {showDropdown && (
              <div className="w-[calc(100%+2px)] h-fit absolute top-[calc(100%+1px)] left-[-1px] shadow-2xl rounded-md bg-white flex flex-col items-start justify-start px-2">
                {dropDownList.map((item, index) => (
                  <button
                    key={index}
                    className="h-10 w-full flex items-center justify-start border-b border-[#8891AA] last:border-b-0"
                  >
                    <p className="capitalize text-sm">{item.name}</p>
                  </button>
                ))}
                {dropDownList.length === 0 && selectedResources.length===0 && (
                  <div className="h-10 w-full flex items-center justify-center border-b border-[#8891AA] last:border-b-0">
                    <p className="capitalize text-sm font-medium">
                      No Active Staff Found
                    </p>
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>
        <div className='mt-[1.75rem]'>
            <label className='flex items-center gap-2 text-[#121C2D] text-sm font-medium '>
                Description
            </label>
            <textarea
                placeholder='Field Text'
                className='w-full min-h-[4.75rem] focus:outline-none pt-1 mt-1 px-3 h-[2.25rem] text-sm placeholder:italic border border-[#8891AA] rounded-md'
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