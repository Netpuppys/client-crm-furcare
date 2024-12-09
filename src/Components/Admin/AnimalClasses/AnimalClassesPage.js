import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlertContext } from '../../../utils/AlertContext';

const animalClasses = [
    "Alpacas and Vicunas", "Amphibian", "Avian", "Canine", "Caprine", "Feline"
]

const data = [
    { name: "Canine", breeds: "list", status: "Active" },
    { name: "Feline", breeds: "list", status: "Active" },
];

const TableComponent = ({ addClasses, allAnimalClasses, setAllAnimalClasses, selectedValue, setSelectedValue }) => {

function getUniqueAnimalClasses(options, data) {
    // Extract names from the data array
    const dataNames = data.map(item => item.name);
    
    // Filter out elements in options that are present in dataNames
    return options.filter(animal => !dataNames.includes(animal));
}

  return (
    <div className="w-full p-4">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Breeds</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
            <tr
                className={`${addClasses? "black" : "hidden" } hover:bg-gray-50 hidde text-sm text-gray-700 border-b border-gray-200`}
            >
                <td className="p-2 w-[30%] h-[2.25rem]">
                    <select
                        onChange={e => {
                            console.log("Selected value:", e.target.value);
                            setSelectedValue(e.target.value)
                        }}
                        className='classic max-w-[17rem] w-full h-[2.25rem] rounded-md border border-[#8891AA] focus:outline-none'
                    >
                        <option value={""} className=''>
                            Choose Animal Class
                        </option>
                        {getUniqueAnimalClasses(animalClasses, allAnimalClasses).map((item, index) => (
                            <option
                                value={item}
                                key={index}
                                className=''
                            >
                                {item}
                            </option>
                        ))}
                    </select>
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
                        className="text-blue-600 hover:underline font-medium"
                    >
                        {item.name}
                    </Link>
                </td>
                <td className="p-2 w-[20%]">
                    <Link
                        href="#"
                        className="text-blue-600 hover:underline"
                    >
                        {item.breeds}
                    </Link>
                </td>
                <td className="p-2 flex items-center w-[20%]">
                    <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                    {item.status}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AnimalClassesPage = () => {
    const { setAlert } = useAlertContext()

    const [ addClasses, setAddClasses ] = useState(false)
    const [ allAnimalClasses, setAllAnimalClasses ] = useState(data)
    const [ selectedValue, setSelectedValue ] = useState()

    const handleAddAnimalClasses = () => {
        if (!selectedValue) return; // Prevent adding empty values
        console.log(selectedValue)
        setAllAnimalClasses(prev => {
            const data = {
                name: selectedValue,
                breeds: "list",
                status: "Active"
            };
            return [data, ...prev];
        });
        setSelectedValue(null)
        setAddClasses(false)
        setAlert("Animal Class Added Successfully.")
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
                    disabled={selectedValue? false : true}
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

        <div className='mt-6 w-full'>
            <TableComponent
                addClasses={addClasses}
                allAnimalClasses={allAnimalClasses}
                setAllAnimalClasses={setAllAnimalClasses}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />
        </div>
    </div>
  )
}

export default AnimalClassesPage