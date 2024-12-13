import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GoSearch } from "react-icons/go";
import supportIcon from "../Assets/icons/navbar/support.svg"
import avatarIcon from "../Assets/icons/navbar/avatar.svg"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()

    const [ showProfileOptions, setShowProfileOptions ] = useState(false)

    const username = localStorage.getItem("name")

    const handleLogOut = () => {
        localStorage.clear()
        navigate("/")
    }

  return (
    <div className='w-full px-10 h-[4.75rem] bg-[#F9F9FA] border-b-2 border-[#E1E3EA] flex items-center justify-between'>
        <div className='flex gap-20 items-center'>
            <p className='font-semibold text-[#121C2D] text-xl'>
                Oases Vet
            </p>
            <div className='flex rounded-md border overflow-hidden border-[#E1E3EA] h-[2.25rem]'>
                <button
                    className='h-full aspect-square border-r-[#E1E3EA] bg-[#F9F9FA] flex items-center justify-center'
                >
                    <GoSearch />
                </button>
                <input
                    type='text'
                    className='w-[17rem] focus:outline-none h-full px-3 placeholder:italic placeholder:text-[#606B85] text-sm'
                    placeholder='Search'
                />
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <button className='border h-6 bg-white border-[#E1E3EA] flex items-center rounded-md gap-2 px-3'>
                <p className='text-[#121C2D] text-sm font-semibold text-center'>
                    Branch 40001
                </p>
                <p className='text-xs text-[#606B85]'>
                    <FaChevronDown />
                </p>
            </button>
            <button
                className='w-5 aspect-square'
            >
                <img
                    src={supportIcon}
                    className='w-full h-full'
                    alt=''
                />
            </button>
            <button
                onClick={() => setShowProfileOptions(prev => !prev)}
                className='flex gap-2 items-center relative'
            >
                <div className='w-8 aspect-square rounded-full border border-[#E7DCFA] flex items-center justify-center'>
                    <img src={avatarIcon} className='' alt='' />
                </div>
                <p className='text-xs text-[#606B85]'>
                    {!showProfileOptions? <FaChevronDown /> : <FaChevronUp />}
                </p>

                <div className={`${showProfileOptions? "block" : "hidden"} w-48 z-40 absolute flex flex-col items-start justify-start right-0 top-[calc(100%+1.5rem)] border border-[#E1E3EA] bg-white shadow-2xl rounded-xl px-6 py-4 text-left`}>
                    <p className='py-2 text-[#606B85] text-xs font-medium capitalize'>
                        {username}
                    </p>
                    <button 
                        className='text-sm py-1 text-[#121C2D]'
                    >
                        My Profile
                    </button>
                    <button
                        onClick={handleLogOut}
                        className='text-sm py-1 text-[#121C2D]'
                    >
                        Logout
                    </button>
                </div>
            </button>
        </div>
    </div>
  )
}

export default Navbar