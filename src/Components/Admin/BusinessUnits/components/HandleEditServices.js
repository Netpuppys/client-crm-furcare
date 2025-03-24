import React from 'react'
import { IoClose } from 'react-icons/io5';
import chevronDown from "../../../../Assets/icons/chevronDown.png"

const HandleEditServices = ({
    options,
    serviceBoxRef,
    selectedOptions,
    setSelectedOptions,
    activeServices,
    setActiveServices,
    inActiveServices,
    setInactiveServices,
    showDropdown,
    setShowDropdown
}) => {

    const handleCheckboxChange = (option) => {
        // add to inactive state
        if (selectedOptions.some((obj) => obj.serviceId === option.id && obj.active===true && obj.type === "server")) {

            if (activeServices.some((obj) => obj.serviceId === option.id)) {
                setActiveServices(activeServices.filter(item => item.serviceId !== option.id))
                setSelectedOptions(prev => 
                    prev.map(item => 
                        item.serviceId === option.id ? { ...item, active: false, type: "client" } : item
                    )
                );
                return
            } else {
                setInactiveServices(prev => ([...prev, { serviceId: option.id, name: option.name }]))
                setSelectedOptions(prev => 
                    prev.map(item => 
                        item.serviceId === option.id ? { ...item, active: false, type: "client" } : item
                    )
                );
            }

        } else if (selectedOptions.some((obj) => obj.serviceId === option.id && obj.active===false && obj.type === "server")) {
            setActiveServices(prev => ([...prev, { serviceId: option.id, name: option.name }]))
            setSelectedOptions(prev =>
                prev.map(item =>
                    item.serviceId === option.id ? { ...item, active: true, type: "client" } : item
                )
            );
        } else if (selectedOptions.some((obj) => obj.serviceId === option.id && obj.active===false && obj.type === "client")) {
            setInactiveServices(inActiveServices.filter(item => item.serviceId !== option.id))
            setSelectedOptions(prev =>
                prev.map(item =>
                    item.serviceId === option.id ? { ...item, active: true, type: "server" } : item
                )
            );
        }
        else if (selectedOptions.some((obj) => obj.serviceId === option.id && obj.type === "client")) {
            if (activeServices.some((obj) => obj.serviceId === option.id)) {
                setActiveServices(activeServices.filter(item => item.serviceId !== option.id))
                setSelectedOptions(prev =>
                    prev.map(item =>
                        item.serviceId === option.id ? { ...item, active: false, type: "server" } : item
                    )
                );
            } else {
                setSelectedOptions(
                    selectedOptions.filter((item) => item.serviceId !== option.id)
                );
            }
        } else {
            // add new service
            setSelectedOptions([
                ...selectedOptions,
                { service: option.name, basePrice: 0, active: true, serviceId: option.id, type: "client" },
            ]);
        }
    };
    
    const handleDeleteService = (option) => {
        if (selectedOptions.some((obj) => obj.serviceId === option.serviceId && obj.type === "client")) {
            if (activeServices.some((obj) => obj.serviceId === option.serviceId)) {
                setActiveServices(activeServices.filter(item => item.serviceId !== option.serviceId))
                setSelectedOptions(prev =>
                    prev.map(item =>
                        item.serviceId === option.serviceId ? { ...item, active: false, type: "server" } : item
                    )
                );
            } else {
                setSelectedOptions(
                    selectedOptions.filter((item) => item.serviceId !== option.serviceId)
                );
            }

        } else if (selectedOptions.some((obj) => obj.serviceId === option.serviceId && obj.type === "server" && obj.active === true)) {
            setInactiveServices(prev => ([...prev, { serviceId: option.serviceId, name: option.service }]))
            setSelectedOptions(prev => 
                prev.map(item => 
                    item.serviceId === option.serviceId ? { ...item, active: false, type: "client" } : item
                )
            );
        }
    };

  return (
    <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Service(s)
            </label>
            <div ref={serviceBoxRef} className="w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
                <div className={`w-full flex items-center justify-between gap-1 h-full`}>
                {/* || selectedOptions.every(item => item.active === false))  */}
                    {selectedOptions.length===0 && (
                    <div className="px-2">
                        <p className="text-sm text-[#121C2D] font-medium">Select</p>
                    </div>)}

                    <div className="flex px-3 py-1 overflow-x-auto hideScrollbar w-full h-full items-center flex-wrap gap-1">
                    {selectedOptions?.map((option, index) => (
                    <span
                        className={`flex border capitalize text-[#121C2D] px-2 h-full rounded-full text-sm items-center
                            ${option.active? "bg-[#F4F9FF] border-[#CCE4FF]" : "bg-[#C72323] bg-opacity-15 border-opacity-50 border-[#C72323]"}
                        `}
                        key={index}
                    >
                        {option.service}

                        {option.active && <button
                            className="ml-2 text-[#606B85]"
                            onClick={() => handleDeleteService(option)}
                        >
                            <IoClose />
                        </button>}
                    </span>))}
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

                {showDropdown && (
                <div
                    className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#F4F4F6] hideScrollbar border-[#8891AA] z-50 max-h-52 overflow-y-auto"
                >
                    <ul className="list-none p-0 m-0">
                        {options?.map((option, index) => (
                        <li className="p-2" key={index}>
                            <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                                type="checkbox"
                                className="mr-2 placeholder:italic text-sm"
                                checked={selectedOptions.some(obj => obj.serviceId === option.id && obj.active === true)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <span className="capitalize">
                            {option.name}
                            </span>
                            </label>
                        </li>
                        ))}
                    </ul>
                </div>)}
            </div>
        </div>
    </div>
  )
}

export default HandleEditServices