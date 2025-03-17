import React, { useEffect, useState } from 'react'
import chevronDown from "../Assets/icons/chevronDown.png"
import { IoClose } from 'react-icons/io5';

const MultiSelectBox = ({
    name,
    dropDownList,
}) => {
    const [ values, setValues ] = useState([]);
    const [ showDropdown, setShowDropdown ] = useState(false)
    const [ filterredList, setFilterredList ] = useState(dropDownList)

    const handleValueChange = (item) => {
        setValues((prev) => [...prev, item]);
    }

    const removeValue = (value) => {
        setValues(values.filter(item => item !== value))
    }

    useEffect(() => {
        if (values.length>0) {
            setFilterredList(dropDownList.filter(item => !values.includes(item)))
        } else {
            setFilterredList(dropDownList)
        }
    }, [dropDownList, values])

  return (
    <div className='w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md'>
        <div className='w-full h-full flex items-center justify-between'>
            <div className='px-3 flex items-center justify-start gap-1 h-full py-1'>
                {values.length===0 && name}

                {values.length>0 && 
                    values.map((item, index) => (
                        <div
                            key={index}
                            className="flex h-full items-center text-nowrap gap-2 px-2 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
                        >
                            <p className='text-[0.75rem] capitalize'>
                                {item}
                            </p>
                            <button
                                onClick={() => removeValue(item)}
                                className="text-[#606B85] text-lg"
                            >
                                <IoClose />
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className='h-full aspect-square flex items-center justify-center'>
                <button
                    onClick={() => setShowDropdown(prev => !prev)}
                    className='flex items-center justify-center w-5 h-5 aspect-square'
                >
                    <img
                        src={chevronDown}
                        className='w-full h-full object-contain'
                        alt='chevron down'
                    />
                </button>
            </div>
        </div>
        {showDropdown &&
        <div className="w-[calc(100%+2px)] h-fit absolute top-[calc(100%+1px)] left-[-1px] shadow-2xl rounded-md bg-white z-50 flex flex-col items-start justify-start px-2">
            {filterredList.map((item, index) => (
            <button
                key={index}
                onClick={() => handleValueChange(item)}
                className="h-10 w-full flex items-center justify-start border-b border-[#8891AA] last:border-b-0"
            >
                <p className="capitalize text-sm">
                    {item}
                </p>
            </button>))}
            {dropDownList.length === 0 && (
            <div className="h-10 w-full flex items-center justify-center border-b border-[#8891AA] last:border-b-0">
                <p className="capitalize text-sm font-medium">
                    No {name} Found
                </p>
            </div>)}
        </div>}
    </div>
  )
}

export default MultiSelectBox