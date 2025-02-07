import React, { useEffect, useState } from 'react'
import BlueButton from '../../../../ui/BlueButton'
import closeIcon from "../../../../Assets/icons/alert/close.png"
import axiosInstance from '../../../../utils/AxiosInstance'
import { useAppContext } from '../../../../utils/AppContext'
import { useAlertContext } from '../../../../utils/AlertContext'

const EditAnimalClass = ({ editAnimalClass, refreshList, setEditAnimalClass }) => {
    const { selectedBranch } = useAppContext()

    const { setAlert } = useAlertContext()

    const [ active, setActive ] = useState(editAnimalClass.availableAt[0].active)
    const [ disabled, setDisabled ] = useState(true)

    useEffect(() => {
        if (active === editAnimalClass.availableAt[0].active) {
            setDisabled(true)
            return
        }

        setDisabled(false)
    }, [active, editAnimalClass])

    const handleUpdateAnimalClass = () => {
        axiosInstance
            .patch(`/api/v1/business-branches/${selectedBranch.id}/animal-classes/${editAnimalClass.id}`, { active: active })
            .then(res => {
                refreshList()
                console.log(res)
                setAlert("Animal Class Successfully Updated")
            })
            .catch(err => {
                console.error(err)
            })
    }

  return (
    <div className='w-[50rem] h-screen shadow-2xl fixed top-0 right-0 bg-white z-40 overflow-hidden'>
        <div className='w-full h-full relative'>
            <div className='w-full h-[4.75rem] flex items-center justify-between px-8'>
                <p className='text-xl font-semibold text-[#121C2D]'>
                    Edit Animal Class
                </p>
                <button
                    onClick={() => setEditAnimalClass(null)}
                    className='h-[1.75rem]'
                >
                    <img src={closeIcon} className='h-full w-fit' alt='' />
                </button>
            </div>

            <div className='w-full h-[calc(100%-4.75rem)] overflow-y-auto no-scrollbar'>
                <div className='w-full mt-10 px-10 flex items-center justify-start gap-[50px]'>
                    <div className=''>
                        <p className='text-sm font-semibold text-[#121C2D]'>
                            <span className='w-[4px] h-[4px] rounded-full bg-[#EB5656]'></span>
                            Name
                        </p>
                        <div className='mt-1 border border-[#8891AA] w-[27rem] h-[2.25rem] rounded-md bg-[#F4F4F6] flex items-center px-3'>
                            <p className='capitalize text-[#121C2D] text-sm font-medium'>
                                {editAnimalClass.name}
                            </p>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm font-semibold text-[#121C2D]'>
                            <span className='w-[4px] h-[4px] rounded-full bg-[#EB5656]'></span>
                            Status
                        </p>
                        <div className="flex mt-1 h-[2.25rem]">
                            <button
                            className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                                active===true
                                ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                                : "border-gray-300 text-[#121C2D] rounded-l-lg"
                            }`}
                            onClick={() => setActive(true)}
                            >
                                Active
                            </button>

                            <button
                            className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                                active===false
                                ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                                : "border-gray-300 text-[#121C2D] rounded-r-lg"
                            }`}
                            onClick={() => setActive(false)}
                            >
                                Inactive 
                            </button>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-14 px-12'>
                    <p className='text-[#3C3C43] font-semibold text-opacity-60 text-[17px] pb-2 border-b border-[#545456] border-opacity-30 w-full mb-5'>
                        Breeds
                    </p>
                    <ul className='list-disc flex ml-4 flex-col gap-4 text-base'>
                        {editAnimalClass.breeds.map((breed, id) => (
                            <li key={id} className='capitalize'>
                                {breed}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='fixed bottom-8 right-6'>
                <BlueButton 
                    text={"Save"}
                    onClickHandler={handleUpdateAnimalClass}
                    disabled={disabled}
                />
            </div>
        </div>
    </div>
  )
}

export default EditAnimalClass