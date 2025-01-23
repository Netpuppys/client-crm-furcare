import React, { useEffect, useState } from 'react'
import BlueButton from '../../../../ui/BlueButton'
import closeIcon from "../../../../Assets/icons/alert/close.png";
import { useAppContext } from '../../../../utils/AppContext';
import axiosInstance from '../../../../utils/AxiosInstance';
import { useAlertContext } from '../../../../utils/AlertContext';

const accessLevelOptions = [ "businessUnit", "businessBranch" ]

const permissions = [
    {
        name: "Animal Class",
        value: {
            action: "read",
            resource: "animalClass",
        }
    },
    {
        name: "Animal Class",
        value: {
            action: "delete",
            resource: "animalClass",
        }
    },
    {
        name: "Diagnostic Integrations",
        value: {
            action: "read",
            resource: "diagnosticIntegration",
        }
    },
    {
        name: "Diagnostic Integrations",
        value: {
            action: "delete",
            resource: "diagnosticIntegration",
        }
    },
    {
        name: "Document",
        value: {
            action: "read",
            resource: "document",
        }
    },
    {
        name: "Document",
        value: {
            action: "delete",
            resource: "document",
        }
    },
];


const EditNewRoles = ({ setEditRole, selectedRole, setSelectedRole, fetchRolesList }) => {
    const { selectedBranch } = useAppContext()

    const  { setAlert } = useAlertContext()

    const [ newRoleData, setNewRoleData ] = useState({
        name: selectedRole?.name,
        permissions: selectedRole?.permissions,
        accessLevel: selectedRole?.accessLevel,
        staff: selectedRole?.isStaff
    })
    const [ disabled, setDisabled ] = useState(true)
    
    useEffect(() => {
        const initialData = {
            name: selectedRole?.name,
            permissions: selectedRole?.permissions,
            accessLevel: selectedRole?.accessLevel,
            staff: selectedRole?.isStaff
        }

        const isChanged = JSON.stringify(initialData) !== JSON.stringify(newRoleData)? true : false

        if (isChanged) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    }, [selectedRole, newRoleData])

    const handleClose = () => {
        setNewRoleData({
            name: "",
            permissions: [],
            accessLevel: "",
            staff: ""
          })
        setEditRole(false)
        setSelectedRole(null)
    }
    
    const handleInputChange = (e, name) => {
        const value = e.target.value;
    
        setNewRoleData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit = () => {

        const updatedPermissions = newRoleData.permissions?.map(({ name, ...rest }) => rest);

        const data = {
            name: newRoleData.name,
            permissions: updatedPermissions,
            businessUnitId: selectedBranch.id,
            // branchAccess: ["675c29f27a9c7db85dcec6b5"],
            isStaff: Boolean(newRoleData.staff),
            accessLevel: newRoleData.accessLevel
        }

        axiosInstance
            .post(`/api/v1/roles`, data)
            .then(res => {
                console.log(res)
                setAlert("Role Added Successfully")
                fetchRolesList()
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handlePermissionsChange = (value) => {
        setNewRoleData((prev) => {
            const isSelected = prev.permissions.some(
                (item) => JSON.stringify(item) === JSON.stringify(value)
            );
    
            const updatedPermissions = isSelected
                ? prev.permissions.filter(
                      (item) => JSON.stringify(item) !== JSON.stringify(value)
                  )
                : [...prev.permissions, value];
    
            return {
                ...prev,
                permissions: updatedPermissions,
            };
        });
    };

    return (
        <div className="w-full h-full relative">
            <div className="w-full h-[4.75rem] flex items-center justify-between px-8">
                <p className="text-xl font-semibold text-[#121C2D]">
                    Edit Roles & Permissions
                </p>
                <button
                    onClick={handleClose}
                    className="h-[1.75rem]"
                >
                    <img src={closeIcon} className="h-full w-fit" alt="" />
                </button>
            </div>

            <div className='w-full overflow-y-auto h-[calc(100vh-4.75rem)] pb-20'>
                <div className="w-full mt-10 px-10 flex items-center justify-start gap-16">
                    <div className="w-full">
                        <label className="text-sm font-semibold text-[#121C2D] flex items-center gap-1">
                            <div className="w-[4px] h-[4px] rounded-full bg-[#EB5656]"></div>
                            Role
                        </label>
                        <input
                            type="text"
                            placeholder="Role Name"
                            disabled
                            className="mt-1 focus:outline-none disabled:cursor-not-allowed border border-[#8891AA] placeholder:text-[#8891AA] w-full h-[2.25rem] rounded-md bg-[#F4F4F6] flex items-center px-3 capitalize text-[#121C2D] text-sm font-medium"
                            value={newRoleData.name}
                            onChange={e => handleInputChange(e, "name")}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center gap-10 px-10">
                    <div className="w-1/2 mt-10 flex items-center justify-start">
                        <div className="w-full">
                            <label className="text-sm font-semibold text-[#121C2D] flex items-center gap-1">
                                <div className="w-[4px] h-[4px] rounded-full bg-[#EB5656]"></div>
                                Access Level
                            </label>
                            <select 
                                value={newRoleData.accessLevel}
                                onChange={e => handleInputChange(e, "accessLevel")}
                                className="mt-1 classic focus:outline-none border border-[#8891AA] placeholder:text-[#8891AA] w-full h-[2.25rem] rounded-md flex items-center px-3 capitalize text-[#121C2D] text-sm font-medium"
                            >
                                <option value={""}>Select Option</option>
                                {accessLevelOptions.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-1/2 mt-10 flex items-center justify-start">
                        <div className="w-full">
                            <label className="text-sm font-semibold text-[#121C2D] flex items-center gap-1">
                                <div className="w-[4px] h-[4px] rounded-full bg-[#EB5656]"></div>
                                Staff
                            </label>
                            <select 
                                value={newRoleData.staff}
                                disabled
                                onChange={e => handleInputChange(e, "staff")}
                                className="mt-1 classic focus:outline-none border disabled:cursor-not-allowed disabled:opacity-100 border-[#8891AA] placeholder:text-[#8891AA] w-full h-[2.25rem] rounded-md bg-[#F4F4F6] flex items-center px-3 capitalize text-[#121C2D] text-sm font-medium"
                            >
                                <option value={""}>Select Option</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-14 px-12">
                    <p className="text-[#3C3C43] font-semibold text-opacity-60 text-[17px] pb-2 border-b border-[#54545657] w-full mb-5">
                        Permissions
                    </p>
                </div>

                <div className="px-10 flex flex-col gap-4 items-start">
                    {permissions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {/* <div className='w-[1.75rem] h-[1.125rem] rounded-full bg-[#006DFA] p-[0.125rem] flex items-center justify-end'>
                                <div className='h-full aspect-square rounded-full bg-white '></div>
                            </div> */}
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={newRoleData.permissions.some(
                                    (perm) => JSON.stringify(perm) === JSON.stringify(item.value)
                                )}
                                onChange={() => handlePermissionsChange(item.value)} 
                            />
                            <span className="slider round"></span>
                        </label>
                        <div className='flex gap-2 items-center'>
                            <div className='bg-[#F4F4F6] text-xs capitalize text-[#8891AA] rounded-lg border border-[#8891AA] py-[0.125rem] w-[4rem] flex items-center justify-center'>
                                {item.value.action}
                            </div>
                            <p className="text-[#121C2D] text-sm font-medium ">
                                {item.name}
                            </p>
                        </div>
                    </div>))}
                </div>
            </div>

            <div className="absolute bottom-8 right-6">
                <BlueButton 
                    text={"Save"} 
                    onClickHandler={handleSubmit}
                    disabled={disabled} 
                />
            </div>
        </div>
    )
}

export default EditNewRoles;