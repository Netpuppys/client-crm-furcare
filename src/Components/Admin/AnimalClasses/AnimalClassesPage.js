import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlertContext } from '../../../utils/AlertContext';
import axiosInstance from "../../../utils/AxiosInstance"

const AnimalClassesPage = () => {
    const { setAlert } = useAlertContext()

    const [ addClasses, setAddClasses ] = useState(false)
    const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
    const [ selectedValue, setSelectedValue ] = useState({})

    useEffect(() => {
        axiosInstance
            .get("/api/v1/animal-classes")
            .then(res => {
                console.log(res.data.data.data)
                setAllAnimalClasses(res.data.data.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [addClasses])

    const handleAddAnimalClasses = () => {
        if (!selectedValue) return; // Prevent adding empty values

        const breeds = selectedValue.breeds.split(",")

        const data = {
            name: selectedValue.name,
            breeds: breeds
        }

        axiosInstance
            .post("/api/v1/animal-classes", data)
            .then(res => {
                console.log(res)
                setSelectedValue({})
                setAddClasses(false)
                setAlert("Animal Class Added Successfully.")
            })
            .catch(err => {
                console.error(err)
                setAlert("Something Went Wrong")
            })
    };

  return (
    <div className='w-full min-h-full px-8 py-4'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <Link
                    to={"#"}
                    className='underline'
                >
                    Admin
                </Link>
                <span>{" "}/{" "}</span>
                <Link
                    to={"/admin/animal-classes"}
                    className='underline'
                >
                    Animal Classes
                </Link>
            </div>
            <div className='flex items-center gap-6'>
                {addClasses &&
                <button
                    onClick={handleAddAnimalClasses}
                    disabled={selectedValue.name && selectedValue.breeds? false : true}
                    className='bg-[#006DFA] px-3 disabled:border border-[#E1E3EA] disabled:bg-transparent disabled:text-[#AEB2C1] h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center' 
                >
                    <p className=''>
                        Save
                    </p>
                </button>}
                <button
                    onClick={() => setAddClasses(true)}
                    className='bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center' 
                >
                    <p className=''>
                        Add
                    </p>
                </button>
            </div>
        </div>

        {allAnimalClasses && allAnimalClasses.length > 0 &&
        <div className='mt-6 w-full p-4'>
            <table className="w-full">
                <thead>
                <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                    <th className="p-2">Name</th>
                    <th className="p-2">Breeds</th>
                    <th className="p-2">Status</th>
                </tr>
                </thead>
                <tbody>
                    <tr className={`${addClasses? "black" : "hidden" } hover:bg-gray-50 hidde text-sm text-gray-700 border-b border-gray-200`}>
                        <td className="p-2 w-[30%] h-[2.25rem]">
                            <input
                                type='text'
                                placeholder='Animal Class'
                                className='max-w-[17rem] w-full px-2 h-[2.25rem] rounded-md border border-[#8891AA] focus:outline-none'
                                value={selectedValue?.name}
                                onChange={e => {
                                    setSelectedValue(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }}
                            />
                        </td>
                        <td className='p-2 w-[30%] h-[2.25rem]'>
                            <input
                                text='text'
                                placeholder='For example: Breed 1, Breed 2'
                                className='max-w-[17rem] w-full px-2 h-[2.25rem] rounded-md border border-[#8891AA] focus:outline-none'
                                value={selectedValue?.breeds}
                                onChange={e => setSelectedValue(prev => ({
                                    ...prev,
                                    breeds: e.target.value
                                }))}
                            />
                        </td>
                    </tr>
                {allAnimalClasses.map((item, index) => (
                    <tr
                    key={index}
                    className="hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-200"
                    >
                        <td className="p-2 w-[30%]">
                            <Link
                                href="#"
                                className="text-blue-600 hover:underline font-medium capitalize"
                            >
                                {item.name}
                            </Link>
                        </td>
                        <td className="p-2 w-[20%] relative">
                            <div
                                className="text-blue-600 group relative cursor-pointer underline"
                            >
                                list
                                <div className={`hidden group-hover:flex flex-col items-start justify-start gap-1 absolute top-full left-0 bg-white z-10 shadow-lg p-3 rounded-md mt-2 `}>
                                {item.breeds.map((item, index) => (
                                    <p key={index} className='text-blue-600 capitalize'>
                                        {item}
                                    </p>
                                ))}
                            </div>
                            </div>
                        </td>
                        <td className="p-2 flex items-center w-[20%]">
                            <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                            Active
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>}
    </div>
  )
}

export default AnimalClassesPage