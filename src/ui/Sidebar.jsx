import React, { useState } from 'react'
import smallLogo from "../Assets/logo/smallLogo.png"
import sidebarItems from '../data/sidebarItems'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import closeIcon from "../Assets/icons/sidebar/close.png"
import { useNavigate } from 'react-router-dom';

const NestedComponents = ({ subItems }) => {
    const navigate = useNavigate()

    const [ activeItem, setActiveItem ] = useState()

    const isSelected = (name) => {
        return (name === activeItem)? true : false
    }

    const handleClick = (item) => {
        setActiveItem(item.name)

        navigate(item.linkTo)
    }

    return (
        <div className='w-full flex flex-col gap-2 items-start justify-start'>
            {subItems.map((item, id) => (
                <button
                    key={id}
                    onClick={() => handleClick(item)}
                    className={`${isSelected(item.name)? "text-white bg-white bg-opacity-10 backdrop-blur-sm rounded-md" : "text-[#CACDD8]"} pl-6 w-full text-left py-1 text-xs font-semibold leading-[20px]`}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
} 

const SidebarComp = ({ currentPath, sidebarExpanded, setSidebarExpanded }) => {
    const navigate = useNavigate()

    // function findSidebarItemByPath(sidebarItems, pathname) {
    //     // Ensure the input is valid
    //     if (!Array.isArray(sidebarItems)) return null;
      
    //     for (const item of sidebarItems) {
    //       // Check if the item's linkTo matches the pathname
    //       if (item.linkTo === pathname) {
    //         return item;
    //       }
      
    //       // Check subItems only if they exist and are valid
    //       if (item.subItems && Array.isArray(item.subItems)) {
    //         const found = findSidebarItemByPath(item.subItems, pathname);
    //         if (found) {
    //           return found;
    //         }
    //       }
    //     }
      
    //     // Return null if no match is found
    //     return null;
    // }

    const [ selectedOption, setSelectedOption ] = useState()
    const [ modalOpen, setModalOpen ] = useState(false)

    const isSelected = (name) => {
        return (name === selectedOption)? true : false
    }

    const handleClick = (item) => {
        if (isSelected(item.name) && modalOpen) {
            setModalOpen(false)
        }

        if (item.subItems && !modalOpen) {
            setModalOpen(true)
        }

        setSelectedOption(item.name)

        item.linkTo && navigate(item.linkTo)
    }

    // useEffect(() => {
    //     const currentItem = findSidebarItemByPath(sidebarItems, currentPath)

    //     handleClick(currentItem)
    // }, [currentPath])

  return (
    <div className={`${sidebarExpanded? "w-60" : "w-20"}
        fixed top-0 h-screen bg-[#1F304C] border-r-2 border-[#394762]`}>
        <div className='w-full h-full relative'>

            <div className='w-full h-[4.1875rem] border-b-2 border-[#394762] flex items-center justify-start gap-4 px-8'>
                <img
                    src={smallLogo}
                    className='w-6'
                    alt=''
                />
                {sidebarExpanded &&
                <p className='font-semibold text-white'>
                    furcare
                </p>}
            </div>

            <div className='w-full px-6 py-10 flex h-[calc(100%-4.1875rem)] overflow-y-auto flex-col items-start justify-start gap-3'>
                {sidebarItems.map((item, id) => (
                    <div key={id} className='w-full h-fit'>
                        <button 
                            onClick={() => handleClick(item)}
                            className='flex items-center py-2 gap-2'
                        >
                            {item.subItems && sidebarExpanded &&
                            <p className={`${isSelected(item.name)? "text-white" : "text-[#8891AA]"} text-xs`}>
                                {isSelected(item.name)? <FaChevronDown /> : <FaChevronRight />}
                            </p>}

                            <img src={isSelected(item.name)? item.icon : item.darkIcon} className='w-6' alt='' />

                            {sidebarExpanded &&
                            <p className={`${isSelected(item.name)? "text-white" : "text-[#CACDD8] hover:text-white"} font-semibold`}>
                                {item.name}
                            </p>}
                        </button>
                        {isSelected(item.name) && item.subItems && modalOpen && sidebarExpanded &&
                        <NestedComponents 
                            subItems={item.subItems} 
                            currentPath={currentPath}
                        />}
                    </div>
                ))}
            </div>

            <button
                onClick={() => setSidebarExpanded(prev => !prev)}
                className='w-10 absolute bottom-5 right-5 aspect-square flex items-center justify-center border-2 rounded-md border-[#394762]'
            >
                <img
                    src={closeIcon}
                    className={`${sidebarExpanded? "" : "rotate-180"}`}
                    alt=''
                />
            </button>
        </div>
    </div>
  )
}

export default SidebarComp