import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlertContext } from '../../../utils/AlertContext';
import axiosInstance from "../../../utils/AxiosInstance"
import EditAnimalClass from './components/EditAnimalClass';

const sampleAnimalClasses = [
    {
        name: "Canine",
        breeds: [
            "Shih Tzu",
            "Labrador Retriever",
            "Golden Retriever",
            "German Shepherd"
        ]
    },
    {
        name: "Feline",
        breeds: [
            "Persian",
            "Siamese",
            "Maine Coon",
            "Bengal"
        ]
    },
    {
        name: "Avian",
        breeds: [
            "Cockatiel",
            "African Grey Parrot",
            "Budgerigar",
            "Canary"
        ]
    },
    {
        name: "Reptile",
        breeds: [
            "Leopard Gecko",
            "Bearded Dragon",
            "Corn Snake",
            "Red-Eared Slider"
        ]
    },
    {
        name: "Equine",
        breeds: [
            "Arabian Horse",
            "Thoroughbred",
            "Shetland Pony",
            "Clydesdale"
        ]
    },
    {
        name: "Rodent",
        breeds: [
            "Hamster",
            "Guinea Pig",
            "Chinchilla",
            "Gerbil"
        ]
    },
    {
        name: "Amphibian",
        breeds: [
            "American Bullfrog",
            "Axolotl",
            "Fire-Bellied Toad",
            "African Clawed Frog"
        ]
    },
    {
        name: "Aquatic",
        breeds: [
            "Betta Fish",
            "Goldfish",
            "Angelfish",
            "Clownfish"
        ]
    },
    {
        name: "Arachnid",
        breeds: [
            "Tarantula",
            "Scorpion",
            "Wolf Spider",
            "Jumping Spider"
        ]
    },
    {
        name: "Exotic",
        breeds: [
            "Sugar Glider",
            "Hedgehog",
            "Capybara",
            "Ferret"
        ]
    }
];

const AnimalClassesPage = () => {
    const { setAlert } = useAlertContext()

    const [ addClasses, setAddClasses ] = useState(false)
    const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
    const [ selectedValue, setSelectedValue ] = useState("")
    const [ editAnimalClass, setEditAnimalClass ] = useState()

    useEffect(() => {
        axiosInstance
            .get("/api/v1/animal-classes")
            .then(res => {
                setAllAnimalClasses(res.data.data.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [addClasses])

    const handleAddAnimalClasses = () => {
        if (!selectedValue) return; // Prevent adding empty values

        const animalClass = sampleAnimalClasses.find((item) => item.name === selectedValue)

        const data = {
            name: selectedValue,
            breeds: animalClass.breeds
        }

        axiosInstance
            .post("/api/v1/animal-classes", data)
            .then(res => {
                console.log(res)
                setSelectedValue("")
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
            {console.log(selectedValue)}
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
                    onClick={() => setAddClasses(prev => !prev)}
                    className='bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center' 
                >
                    <p className=''>
                        {addClasses? "Close" : "Add"}
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
                            <select
                                className='max-w-[17rem] classic w-full px-2 h-[2.25rem] rounded-md border border-[#8891AA] focus:outline-none'
                                value={selectedValue}
                                onChange={e => setSelectedValue(e.target.value)}
                            >
                                <option value={""}>Select</option>
                                {sampleAnimalClasses.map((item, id) => (
                                    <option key={id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    {allAnimalClasses.map((item, index) => (
                    <tr
                        key={index}
                        onClick={() => setEditAnimalClass(item)}
                        className="hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-200"
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
                        <td className="p-2 flex items-center w-[20%]">
                            <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                            Active
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>}

        {editAnimalClass &&
        <EditAnimalClass
            editAnimalClass={editAnimalClass}
            setEditAnimalClass={setEditAnimalClass}
        />}
    </div>
  )
}

export default AnimalClassesPage