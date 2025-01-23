import React, { useEffect, useState } from 'react';
import { useAlertContext } from '../../../utils/AlertContext';
import axiosInstance from "../../../utils/AxiosInstance";
import EditAnimalClass from './components/EditAnimalClass';
// import { toast } from 'react-toastify';
import { useAppContext } from '../../../utils/AppContext';
import { useNavigate } from 'react-router-dom';


const AnimalClassesPage = () => {
    const { setAlert } = useAlertContext()

    const navigate = useNavigate()

    const { selectedBranch, setSidebarExpanded } = useAppContext()

    const [ addClasses, setAddClasses ] = useState(false)
    const [ branchAnimalClasses, setBranchAnimalClasses ] = useState([])
    const [ selectedValue, setSelectedValue ] = useState("")
    const [ editAnimalClass, setEditAnimalClass ] = useState()
    const [ filterredSamples, setFilterredSamples ] = useState()
    const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
    const [ loaded, setLoaded ] = useState(false)
    const [ disabled, setDisabled ] = useState()

    const handleAdminClick = () => {
        setSidebarExpanded(false)
        navigate("/admin/branch-units")
    }

    useEffect(() => {
        axiosInstance
            .get("/api/v1/animal-classes")
            .then(res => {
                setAllAnimalClasses(res.data.data.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const refreshList = () => {
        axiosInstance
            .get(`/api/v1/animal-classes?business_branch_id=${selectedBranch.id}`)
            .then(res => {
                const response = res.data.data.data
                setEditAnimalClass(null)
                if (response.length > 0) {
                    setBranchAnimalClasses(response)
                } else {
                    setBranchAnimalClasses([])
                }
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setLoaded(true)
            })
    }

    useEffect(() => {
        if (branchAnimalClasses?.length > 0 && allAnimalClasses?.length > 0) {
            // Convert names in branchAnimalClasses to lowercase and store in a Set
            const existingNames = new Set(branchAnimalClasses.map(item => item.name.toLowerCase()));
    
            // Filter allAnimalClasses by names that are not in existingNames
            const missingNames = allAnimalClasses.filter(
                sampleItem => !existingNames.has(sampleItem.name.toLowerCase())
            );

            if (missingNames.length===0) {
                setDisabled(true)
            }
    
            // Update the state with filtered samples
            setFilterredSamples(missingNames);
        } else {
            setFilterredSamples(allAnimalClasses);
        }
    }, [branchAnimalClasses, allAnimalClasses]);

    useEffect(() => {
        if (!selectedBranch) {
            return
        }

        axiosInstance
            .get(`/api/v1/animal-classes?business_branch_id=${selectedBranch.id}`)
            .then(res => {
                const response = res.data.data.data
                if (response.length > 0) {
                    setBranchAnimalClasses(response)
                } else {
                    setBranchAnimalClasses([])
                }
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setLoaded(true)
            })
    }, [addClasses, selectedBranch])

    const handleAddAnimalClasses = () => {
        if (!selectedValue) return; // Prevent adding empty values

        axiosInstance
            .post(`/api/v1/business-branches/${selectedBranch.id}/animal-classes`, {
                animalClassId: selectedValue
            })
            .then(res => {
                console.log(res)
                setSelectedValue("")
                setAddClasses(false)
                // setAlert("Animal Class Added Successfully.")
                setAlert("Animal Class Added Successfully")
            })
            .catch(err => {
                console.error(err)
                setAlert("Something Went Wrong")
            })
    };

  return (
    <div className='w-full min-h-full px-8 py-4 overflow-y-auto'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <button
                    // to={"/admin/branch-units"}
                    onClick={handleAdminClick}
                    className='underline inline cursor-pointer'
                >
                    Admin
                </button>
                <span>{" "}/{" "}</span>
                <p
                    className='underline inline cursor-default'
                >
                    Animal Classes
                </p>
            </div>
            <div className='flex items-center gap-6'>
                {addClasses &&
                <button
                    onClick={handleAddAnimalClasses}
                    disabled={selectedValue? false : true}
                    className='bg-[#006DFA] px-3 disabled:border border-[#E1E3EA] disabled:bg-transparent disabled:text-[#AEB2C1] h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center' 
                >
                    <p className=''>
                        Save
                    </p>
                </button>}
                <button
                    disabled={disabled}
                    onClick={() => setAddClasses(prev => !prev)}
                    className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-lg font-medium leading-[1.25rem] text-sm' 
                >
                    <p className=''>
                        {addClasses? "Close" : "Add"}
                    </p>
                </button>
            </div>
        </div>

        {branchAnimalClasses &&
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
                            <select
                                className='max-w-[17rem] classic w-full px-2 h-[2.25rem] rounded-md border border-[#8891AA] focus:outline-none'
                                value={selectedValue}
                                onChange={e => setSelectedValue(e.target.value)}
                            >
                                <option value={""}>Select</option>
                                {filterredSamples?.map((item, id) => (
                                    <option key={id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    {branchAnimalClasses?.map((item, index) => (
                    <tr
                        key={index}
                        onClick={() => setEditAnimalClass(item)}
                        className="hover:bg-gray-50 text-sm text-gray-700 last:border-b-0 border-b border-gray-200"
                    >
                        <td className="p-2 w-[30%]">
                            <p className="text-blue-600 hover:underline font-medium capitalize">
                                {item.name}
                            </p>
                        </td>
                        <td className="p-2 w-[20%] relative">
                            <div className="text-blue-600 group relative cursor-pointer underline">
                                list
                            </div>
                        </td>
                        <td className="p-2 flex items-center w-[20%] text-[#121C2D]">
                            <div
                                className={`w-3 aspect-square ${
                                    item.availableAt[0].active? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rotate-45 rounded-sm"
                                }`}
                            ></div>
                            <span
                                className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                                >
                                {item.availableAt[0].active? "Active" : "Inactive"}
                            </span>
                        </td>
                    </tr>))}
                </tbody>
            </table>
            {branchAnimalClasses.length === 0 && loaded &&
            <div className='w-full h-10 flex items-center justify-center'>
                No Animal Classes Found
            </div>}
        </div>}

        {editAnimalClass &&
        <EditAnimalClass
            editAnimalClass={editAnimalClass}
            refreshList={refreshList}
            setEditAnimalClass={setEditAnimalClass}
        />}
    </div>
  )
}

export default AnimalClassesPage