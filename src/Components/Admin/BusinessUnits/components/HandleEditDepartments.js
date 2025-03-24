import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import chevronDown from "../../../../Assets/icons/chevronDown.png"

const HandleEditDepartments = ({
    departmentRef,
    selectedDepartments,
    setSelectedDepartments,
    // handleDeleteDepartment,
    setShowDropdownDept,
    showDropdownDept,
    departments,
    selectedAppointments,
    setSelectedAppointments,
    // handleCheckboxDepartmentChange,
    activeDepartments,
    setActiveDepartments,
    inactiveDepartments,
    setInactiveDepartments,
    activeSlots,
    setActiveSlots,
    inactiveSlots,
    setInactiveSlots
}) => {
    
    useEffect(() => {
        console.log("departments")
        console.log(selectedDepartments)
        console.log("acitve")
        console.log(activeDepartments)
        console.log("inactive")
        console.log(inactiveDepartments)
        console.log("slots")
        console.log(selectedAppointments)
        console.log("active slot")
        console.log(activeSlots)
        console.log("inactive slot")
        console.log(inactiveSlots)
    }, [selectedAppointments, selectedDepartments, inactiveDepartments, inactiveSlots, activeSlots, activeDepartments])

    // Handles selection/deselection of departments
    const handleCheckboxDepartmentChange = (option) => {
        // If the department is active and comes from the server, deactivate it
        if (selectedDepartments.some((obj) => obj.id === option.id && obj.active === true && obj.type === "server")) {
            if (activeDepartments.some((obj) => obj.id === option.id)) {
                // Remove from active departments
                setActiveDepartments(activeDepartments.filter(item => item.id !== option.id))
                setActiveSlots(activeSlots.filter(item => item.id !== option.id))
                // Update selected department as inactive
                setSelectedDepartments(prev =>
                    prev.map(item => 
                        item.id === option.id ? { ...item, active: false, type: "client" } : item
                    )
                );
                setSelectedAppointments(prev =>
                    prev.map(item => 
                        item.id === option.id ? { ...item, active: false, type: "client" } : item
                    )
                );
            } else {
                // Move to inactive departments
                setInactiveDepartments(prev => [...prev, { id: option.id, name: option.name }])
                setSelectedDepartments(prev => 
                    prev.map(item => 
                        item.id === option.id ? { ...item, active: false, type: "client" } : item
                    )
                );
                setInactiveSlots(prev => [...prev, { id: option.id, name: option.name }])
                setSelectedAppointments(prev => 
                    prev.map(item => 
                        item.id === option.id ? { ...item, active: false, type: "client" } : item
                    )
                );
            }
        } 
        // If department is inactive but from the server, activate it
        else if (selectedDepartments.some((obj) => obj.id === option.id && obj.active === false && obj.type === "server")) {
            setActiveDepartments(prev => [...prev, { id: option.id, name: option.name }])
            setSelectedDepartments(prev =>
                prev.map(item =>
                    item.id === option.id ? { ...item, active: true, type: "client" } : item
                )
            );
            setActiveSlots(prev => [...prev, { id: option.id, name: option.name }])
            setSelectedAppointments(prev =>
                prev.map(item =>
                    item.id === option.id ? { ...item, active: true, type: "client" } : item
                )
            );
        } 
        // If department is inactive and client-added, remove from inactive state and activate it
        else if (selectedDepartments.some((obj) => obj.id === option.id && obj.active === false && obj.type === "client")) {
            setInactiveDepartments(inactiveDepartments.filter(item => item.id !== option.id))
            setSelectedDepartments(prev =>
                prev.map(item =>
                    item.id === option.id ? { ...item, active: true, type: "server" } : item
                )
            );
            setInactiveSlots(inactiveSlots.filter(item => item.id !== option.id))
            setSelectedAppointments(prev =>
                prev.map(item =>
                    item.id === option.id ? { ...item, active: true, type: "server" } : item
                )
            );
        } 
        // If department is client-added and active, toggle its state
        else if (selectedDepartments.some((obj) => obj.id === option.id && obj.type === "client")) {
            if (activeDepartments.some((obj) => obj.id === option.id)) {
                setActiveDepartments(activeDepartments.filter(item => item.id !== option.id))
                setSelectedDepartments(prev =>
                    prev.map(item =>
                        item.id === option.id ? { ...item, active: false, type: "server" } : item
                    )
                );
                setActiveSlots(activeSlots.filter(item => item.id !== option.id))
                setSelectedAppointments(prev =>
                    prev.map(item =>
                        item.id === option.id ? { ...item, active: false, type: "server" } : item
                    )
                );
            } else {
                // Remove department if unchecked
                setSelectedDepartments(
                    selectedDepartments.filter((item) => item.id !== option.id)
                );
                setSelectedAppointments(
                    selectedAppointments.filter((item) => item.id !== option.id)
                );
            }
        } 
        // If department is newly added, set default values
        else {
            setSelectedDepartments([
                ...selectedDepartments,
                { name: option.name, active: true, id: option.id, type: "client" },
            ]);
            setSelectedAppointments([
                ...selectedAppointments,
                { name: option.name, active: true, id: option.id, type: "client", departmentId: option.id },
            ]);
        }
    };
    
    // Handles deletion of a department
    const handleDeleteDepartment = (option) => {
        if (selectedDepartments.some((obj) => obj.id === option.id && obj.type === "client")) {
            if (activeDepartments.some((obj) => obj.id === option.id)) {
                setActiveDepartments(activeDepartments.filter(item => item.id !== option.id))
                setSelectedDepartments(prev =>
                    prev.map(item =>
                        item.id === option.id ? { ...item, active: false, type: "server" } : item
                    )
                );
            } else {
                // Remove department from selection
                setSelectedDepartments(
                    selectedDepartments.filter((item) => item.id !== option.id)
                );
            }
        } 
        // If department is from the server and active, move to inactive list
        else if (selectedDepartments.some((obj) => obj.id === option.id && obj.type === "server" && obj.active === true)) {
            setInactiveDepartments(prev => [...prev, { id: option.id, name: option.service }])
            setSelectedDepartments(prev => 
                prev.map(item => 
                    item.id === option.id ? { ...item, active: false, type: "client" } : item
                )
            );
        }
    };

  return (
    <div className='w-full flex-col justify-start items-end bg-white rounded-md space-y-6'>
        {/* Department Selection */}
        <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[47.5%]">
            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Department(s)
            </label>
            <div ref={departmentRef} className="w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
                <div className={`w-full h-full relative gap-1 flex items-center justify-between`}>
                {selectedDepartments.length===0 && (
                <div className="px-2">
                    <p className="text-sm text-[#121C2D] font-medium">Select</p>
                </div>)}
                <div className="flex w-full overflow-x-auto hideScrollbar h-full px-3 items-center py-1 flex-wrap gap-1">
                    {selectedDepartments?.map((option, index) => (
                    <span
                        className={`flex border capitalize text-[#121C2D] px-2 h-full rounded-full text-sm items-center
                            ${option.active? "bg-[#F4F9FF] border-[#CCE4FF]" : "bg-[#C72323] bg-opacity-15 border-opacity-50 border-[#C72323]"}
                        `}
                        key={index}
                    >
                        {option.name}

                        {option.active &&
                        <button
                        className="ml-2 text-[#606B85]"
                        onClick={() => handleDeleteDepartment(option)}
                        >
                        <IoClose />
                        </button>}
                    </span>
                    ))}
                </div>

                <div className='h-full aspect-square flex items-center justify-center'>
                    <button
                        onClick={() => setShowDropdownDept(prev => !prev)}
                        className='flex items-center justify-center w-5 h-5 aspect-square'
                    >
                        <img
                            src={chevronDown}
                            className={`w-full h-full object-contain transition-all ${showDropdownDept? "rotate-180" : ""}`}
                            alt='chevron down'
                        />
                    </button>
                </div>
                </div>

                {showDropdownDept && (
                <div
                    className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#F4F4F6] hideScrollbar border-[#8891AA] z-50 max-h-52 overflow-y-auto"
                >
                    <ul className="list-none p-0 m-0">
                    {departments?.map((option, index) => (
                        <li className="p-2" key={index}>
                        <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                            type="checkbox"
                            className="mr-2 placeholder:italic text-sm"
                            checked={selectedDepartments.some(obj => obj.id === option.id && obj.active === true)}
                            onChange={() => handleCheckboxDepartmentChange(option)}
                            />
                            <span className="capitalize">
                            {option.name}
                            </span>
                        </label>
                        </li>
                    ))}
                    </ul>
                </div>
                )}
            </div>
            </div>
        </div>

        {/* Appointment Selection */}
        <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Appointment Slot(s)
            </label>
            <div className="mt-1 w-full h-[2.25rem] border border-[#CACDD8] bg-[#F4F4F6] relative rounded-md">
                <div
                className={`w-full h-full relative gap-1 flex items-center justify-between`}
                >
                {selectedAppointments.length===0 && (
                <div className="px-2">
                    <p className="text-sm text-[#AEB2C1] font-medium">Select</p>
                </div>)}

                <div className="flex px-3 overflow-x-auto hideScrollbar w-full h-full items-center flex-wrap py-1 gap-1">
                    {selectedAppointments?.map((option, index) => (
                    <span
                        // className="bg-[#E1E3EA] border capitalize text-[#121C2D] px-2 h-full rounded-full text-sm flex items-center"
                        className={`flex border capitalize text-[#121C2D] px-2 h-full rounded-full text-sm items-center
                            ${option.active? "bg-[#E1E3EA] border-[#CCE4FF]" : "bg-[#C72323] bg-opacity-15 border-opacity-50 border-[#C72323]"}
                        `}
                        key={index}
                    >
                        {option.name}
                        <button
                        className="ml-2 text-[#606B85]"
                        onClick={() => handleDeleteDepartment(option)}
                        >
                        <IoClose />
                        </button>
                    </span>
                    ))}
                </div>

                <div className='h-full aspect-square flex items-center justify-center'>
                    <button
                    disabled
                    className='flex items-center justify-center w-5 h-5 aspect-square'
                    >
                    <img
                        src={chevronDown}
                        className={`w-full h-full object-contain transition-all`}
                        alt='chevron down'
                    />
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default HandleEditDepartments