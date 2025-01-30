import React, { useEffect, useRef, useState } from 'react'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import axiosInstance from '../../../utils/AxiosInstance';
import { HiPlusSm } from "react-icons/hi";
import deleteIcon from "../../../Assets/icons/deleteIcon.png"

const DepartmentForm = () => {
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ options, setOptions ] = useState([])
  const [ appointmentSlots, setAppointmentSlots ] = useState([])

  useEffect(() => {
    axiosInstance
        .get("/api/v1/departments")
        .then(res => {
            console.log(res.data.data.data)
            setOptions(res.data.data.data)
        })
        .catch(err => {
            console.error(err)
        })
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.some(obj => obj.service === option.name)) {
      setSelectedOptions(selectedOptions.filter((item) => item.service !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, { service: option.name, basePrice: "" }]);
    }
  };

  const handleDeleteService = (option) => {
    setSelectedOptions(prev => prev.filter((item) => item.service !== option));
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const handleAddAppointmentSlots = () => {
        setAppointmentSlots(prev => [...prev, { name: "", description: "" }]);
    };

    const handleDeleteAppointmentSlot = (index) => {
        setAppointmentSlots(prev => prev.filter((_, i) => i !== index));
    };

  return (
    <div className='w-full h-fit py-4'>
        <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Department(s)
        </label>

        <div className="relative w-full">
            <div
                ref={toggleRef}
                className={`classic w-full mt-1 ${
                    selectedOptions.length===0 ? "p-2" : "p-1 min-h-[42px]"
                } border border-gray-300 focus:outline-none rounded-lg`}
                onClick={toggleDropdown}
            >
                {selectedOptions.length===0 && (<p className="text-sm">Select</p>)}

                <div className="flex w-full h-full items-center flex-wrap gap-1">
                    {selectedOptions?.map((option, index) => (
                    <span
                        className="bg-[#F4F9FF] border capitalize border-[#CCE4FF] text-[#121C2D] px-2 py-1 rounded-full text-sm flex items-center"
                        key={index}
                    >
                        {option.service}

                        <button
                        className="ml-2 text-[#606B85]"
                        onClick={() => handleDeleteService(option.service)}
                        >
                        <IoClose />
                        </button>
                    </span>
                    ))}
                </div>
            </div>

            {isDropdownOpen && (
            <div
                ref={dropdownRef}
                className="absolute z-50 top-full left-0 w-full bg-white hideScrollbar shadow-2xl rounded-md border-gray-300 max-h-[18.5rem] overflow-y-auto"
            >
                <div className='h-[2.8rem] flex items-center justify-start px-3 border-b border-[#E1E3EA]'>
                    <button
                        className='text-sm flex items-center justify-center gap-2'
                    >
                        <span className='text-[#606B85] text-2xl'>+</span>
                        <span className='text=[#121C2D] leading-none'>
                            Create a department
                        </span>
                    </button>
                </div>
                <div className='h-[2.8rem] flex items-center justify-start gap-2 px-3 border-b border-[#E1E3EA]'>
                    <p className='text-[#606B85] text-lg'>
                        <IoSearchOutline />
                    </p>
                    <input
                        type='search'
                        placeholder='Search'
                        className='border-0 w-full h-full focus:outline-none'
                    />
                </div>
                <ul className="list-none p-0 m-0">
                {options?.map((option) => (
                    <li className="px-4 border-b last:border-b-0 border-[#E1E3EA] h-[2.8rem] flex items-center" key={option}>
                        <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                            type="checkbox"
                            className="mr-2 h-4 placeholder:italic text-sm"
                            checked={selectedOptions.some(obj => obj.service === option.name)}
                            onChange={() => handleCheckboxChange(option)}
                            />

                            {option.name}
                        </label>
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>

        {/* Service Value Currency Input */}
        {selectedOptions.length > 0 && (
        <div className='mt-6'>
            <div className='flex items-center gap-3'>
                <p className='text-[#121C2D] font-semibold'>
                    Appointment Slots
                </p>
                <button
                    onClick={handleAddAppointmentSlots}
                    className='w-[2.25rem] h-[2.25rem] aspect-square flex items-center justify-center bg-[#121C2D] text-white rounded-md text-2xl border border-[#394762]'
                >
                    <HiPlusSm />
                </button>
            </div>
        </div>
        )}

        <div className='flex flex-col gap-3'>
            {appointmentSlots.map((slot, index) => (
                <div key={index} className='flex gap-12 items-center'>
                    <div className='flex flex-col w-[35%] gap-1'>
                        <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                            <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                            Name
                        </label>
                        <input
                            type='text'
                            placeholder='Placeholder'
                            className='w-full border focus:outline-none rounded-md p-2 text-sm border-[#8891AA]'
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
                            Description
                        </label>
                        <div className='w-full flex items-center gap-4'>
                        <input
                            type='text'
                            placeholder='Placeholder'
                            className='w-full border focus:outline-none rounded-md p-2 text-sm border-[#8891AA]'
                            value={slot.description}
                            onChange={e =>
                                setAppointmentSlots(prev => 
                                    prev.map((s, i) => i === index ? { ...s, description: e.target.value } : s)
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

export default DepartmentForm