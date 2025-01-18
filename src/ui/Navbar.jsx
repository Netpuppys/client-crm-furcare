import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GoSearch } from "react-icons/go";
import supportIcon from "../Assets/icons/navbar/support.svg"
import avatarIcon from "../Assets/icons/navbar/avatar.svg"
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../utils/AppContext';

const Navbar = () => {
    const navigate = useNavigate()

    const { selectedBranch } = useAppContext()

    const [ showProfileOptions, setShowProfileOptions ] = useState(false)
    const [ openChangeBranchModal, setOpenChangeBranchModal ] = useState(false)

    const username = localStorage.getItem("name")

    const handleLogOut = () => {
        localStorage.clear()
        navigate("/")
    }

    const handleBranchModalOpen = () => {
        setShowProfileOptions(false)
        setOpenChangeBranchModal(prev => !prev)
    }

    const handleProfileModalOpen = () => {
        setOpenChangeBranchModal(false)
        setShowProfileOptions(prev => !prev)
    }

  return (
    <div className='w-full px-10 h-[4.75rem] bg-[#F9F9FA] border-b-2 border-[#E1E3EA] flex items-center justify-between'>

        {(showProfileOptions || openChangeBranchModal) &&
        <div onClick={() => { setOpenChangeBranchModal(false); setShowProfileOptions(false) }} className='w-screen bg-transparent h-screen z-10 fixed top-0 left-0'>
        </div>}

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
            <div className='w-fit h-fit relative'>
                <button
                    onClick={handleBranchModalOpen}
                    className={`border relative h-7 cursor-pointer bg-white focus:outline-none border-[#E1E3EA] flex items-center rounded-md gap-2 px-3 ${openChangeBranchModal? "z-50" : ""}`}
                >
                    <p className='text-[#121C2D] capitalize text-sm font-semibold text-center'>
                        {selectedBranch?.name}
                    </p>
                    <p className='text-xs text-[#606B85]'>
                        {!openChangeBranchModal? <FaChevronDown /> : <FaChevronUp />}
                    </p>
                </button>

                <div className={`${openChangeBranchModal? "flex" : "hidden"} flex-col gap-1 absolute top-10 right-0 shadow-xl w-48 py-2 rounded-lg bg-white z-50 border border-[#E1E3EA] `}>
                    {selectedBranch &&
                        <div
                            className={`border-l-2 border-[#006DFA] text-[#006DFA] bg-[#F4F9FF] hover:bg-[#F4F9FF] h-[2.25rem] flex items-center justify-start px-4 text-sm capitalize`}
                        >
                            {selectedBranch?.name}
                        </div>
                    }
                    <button
                            onClick={() => { navigate("/admin/branch-units"); setOpenChangeBranchModal(false) }}
                            className={`
                             hover:bg-[#F4F9FF] h-[2.25rem] flex items-center justify-start px-4 text-sm capitalize`}
                        >
                            Change Branch
                        </button>
                </div>
            </div>

            <button className='w-5 aspect-square'>
                <img
                    src={supportIcon}
                    className='w-full h-full'
                    alt=''
                />
            </button>

            <div className='w-fit h-fit relative'>
                <button
                    onClick={handleProfileModalOpen}
                    className='flex gap-2 items-center relative'
                >
                    <div className='w-8 aspect-square rounded-full border border-[#E7DCFA] flex items-center justify-center'>
                        <img src={avatarIcon} className='' alt='' />
                    </div>

                    <p className='text-xs text-[#606B85]'>
                        {!showProfileOptions? <FaChevronDown /> : <FaChevronUp />}
                    </p>
                </button>
                <div className={`${showProfileOptions? "block" : "hidden"} w-48 z-40 absolute flex flex-col items-start justify-start right-0 top-[calc(100%+1.5rem)] border border-[#E1E3EA] bg-white shadow-2xl rounded-xl px-6 py-4 text-left`}>
                    <p className='py-2 text-[#606B85] text-xs font-medium capitalize'>
                        Dr. {username}
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
            </div>
        </div>
    </div>
  )
}

export default Navbar