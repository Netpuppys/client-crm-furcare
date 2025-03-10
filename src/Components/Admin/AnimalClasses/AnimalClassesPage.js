import React, { useEffect, useState } from 'react';
import { useAlertContext } from '../../../utils/AlertContext';
import axiosInstance from "../../../utils/AxiosInstance";
import EditAnimalClass from './components/EditAnimalClass';
import informationIcon from "../../../Assets/icons/informationIcon.png";
import { useAppContext } from '../../../utils/AppContext';
import { useNavigate } from 'react-router-dom';

const AnimalClassesPage = () => {
    const navigate = useNavigate()

    const { setAlert } = useAlertContext()
    const { selectedBranch, sidebarExpanded } = useAppContext()

    const [ disabled, setDisabled ] = useState()
    const [ loaded, setLoaded ] = useState(false)
    const [ addClasses, setAddClasses ] = useState(false)
    const [ selectedValue, setSelectedValue ] = useState("")
    const [ editAnimalClass, setEditAnimalClass ] = useState()
    const [ filterredSamples, setFilterredSamples ] = useState()
    const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
    const [ branchAnimalClasses, setBranchAnimalClasses ] = useState([])

    const handleAdminClick = () => {
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
    <div className='w-full min-h-full px-[36px] py-4 overflow-y-auto'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <button
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
            <div className='flex items-center gap-5'>
                {addClasses &&
                <button
                    onClick={handleAddAnimalClasses}
                    disabled={selectedValue? false : true}
                    className='bg-transparent px-3 border disabled:border-opacity-50 border-[#CACDD8] disabled:text-[#AEB2C1] disabled:bg-transparent h-[2.375rem] rounded-md flex text-[#121C2D] font-semibold text-sm items-center justify-center' 
                >
                    <p className=''>
                        Save
                    </p>
                </button>}
                <button
                    disabled={disabled}
                    onClick={() => setAddClasses(prev => !prev)}
                    className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-md font-semibold leading-[1.25rem] text-sm' 
                >
                    <p className=''>
                        {addClasses? "Close" : "Add"}
                    </p>
                </button>
            </div>
        </div>

        {branchAnimalClasses &&
        <div className='mt-6 w-full'>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        <th className="px-2 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-2">
                                <p className="">Name</p>
                                <img src={informationIcon} className="w-5" alt="" />
                            </div>
                        </th>
                        <th className="px-2 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-2">
                                <p className="">Breeds</p>
                                <img src={informationIcon} className="w-5" alt="" />
                            </div>
                        </th>
                        <th className="px-2 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-2">
                                <p className="">Status</p>
                                <img src={informationIcon} className="w-5" alt="" />
                            </div>
                        </th>
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
                        className="hover:bg-gray-50 text-sm text-gray-700 last:border-b-0 border-b border-gray-200"
                    >
                        <td className="p-2 w-[30%]">
                            <button
                                onClick={() => setEditAnimalClass(item)} 
                                className="text-blue-600 cursor-pointer font-medium capitalize"
                            >
                                {item.name}
                            </button>
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
        <div className={`fixed
          ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
          top-0 h-screen right-0 flex z-50`}>

            <div
                className="w-[calc(100%-45rem)] h-full"
            ></div>

            <EditAnimalClass
                editAnimalClass={editAnimalClass}
                refreshList={refreshList}
                setEditAnimalClass={setEditAnimalClass}
            />
      </div>}
    </div>
  )
}

export default AnimalClassesPage