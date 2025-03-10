import React, { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import deleteIcon from "../../../Assets/icons/deleteIcon.png"

const PetDetailsForm = ({
    index,
    petDetails,
    patientType,
    handlePetAdd,
    disableAddPet,
    handlePetChange,
    handleDeletePet,
    allAnimalClasses,
    handlePetDobChange,
    handleAddAnimalClass,
    handlePetGenderChange,
    handlePetSterilizationChange,
}) => {

    const toggleRef = useRef(null);
    const dropdownRef = useRef(null);

    const [ showDropDown, setShowDropDown ] = useState(false)
    const [ formattedAnimals, setFormattedAnimals ] = useState([])

    useEffect(() => {
        setFormattedAnimals(allAnimalClasses)
    }, [allAnimalClasses]);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            toggleRef.current &&
            !toggleRef.current.contains(event.target)
          ) {
            setShowDropDown(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (petDetails.animalType !== "") {
            const filterred = allAnimalClasses.filter((item) => 
                item.value.toLowerCase().includes(petDetails.animalType.toLowerCase()
            ))

            setFormattedAnimals(filterred)
            return
        }

        setFormattedAnimals(allAnimalClasses)
    }, [petDetails.animalType, allAnimalClasses])

    const toggleDropdown = () => {
        setShowDropDown(true);
    };

    const handleDropDownClick = (item, index) => {
        handleAddAnimalClass(item, index)
        setShowDropDown(false)
    };

  return (
    <div className="grid relative border-b last:border-b-0 border-b-[#606B85] border-opacity-20 pb-6 last:pb-0 pt-4 first:pt-0 grid-cols-2 gap-x-[50px] gap-4">
        {index!==0 &&
        <button 
            onClick={() => handleDeletePet(index)}
            className='absolute top-[40px] h-[2.25rem] flex items-center justify-center left-[-1.7rem]'
        >
            <img src={deleteIcon} className='h-4 object-contain' alt='' />
        </button>}
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Name
            </label>
            <input
                type="text"
                placeholder='Field Text'
                name="name"
                value={petDetails.name}
                onChange={e => handlePetChange(e, index)}
                className="w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm h-[2.25rem] border rounded-md focus:outline-none"
            />
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold">
                <div className='w-1 h-1 rounded-full bg-[#EB5656]'></div>
                Gender
            </label>
            <div className="flex mt-1 h-[2.25rem]">
                <button
                    className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                        petDetails.gender==='Male'
                        ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-l-md"
                    }`}
                    onClick={() => handlePetGenderChange('Male', index)}
                >
                    Male
                </button>
                <button
                    className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                        petDetails.gender==='Female'
                        ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-r-md"
                    }`}
                    onClick={() => handlePetGenderChange('Female', index)}
                >
                    Female
                </button>
            </div>
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                DOB
            </label>
            <input
                type="date"
                name="dob"
                placeholder='--/--/----'
                value={petDetails.dob}
                onChange={e => handlePetDobChange(e, index)}
                className="w-full px-2 h-[2.25rem] border-[#8891AA] placeholder:italic text-sm border rounded-md focus:outline-none"
            />
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Age
            </label>
            <div className='w-full flex overflow-hidden border border-[#8891AA] rounded-md'>
                <input
                    type="number"
                    name="age"
                    disabled
                    placeholder='Field Text'
                    value={petDetails.age}
                    onChange={e => handlePetChange(e, index)}
                    className="w-full px-2 capitalize placeholder:italic text-sm  h-[2.25rem] focus:outline-none"
                />
                <div className='px-2 flex text-[#606B85] items-center justify-center bg-[#F9F9FA] border-l border-[#E1E3EA]'>
                    months
                </div>
            </div>
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Weight
            </label>
            <div className='w-full flex overflow-hidden border border-[#8891AA] rounded-md'>
                <input
                    type="number"
                    name="weight"
                    placeholder='Weight'
                    value={petDetails.weight}
                    onChange={e => handlePetChange(e, index)}
                    className="w-full px-2 capitalize placeholder:italic text-sm  h-[2.25rem] focus:outline-none"
                />
                <div className='px-2 flex text-[#606B85] items-center justify-center bg-[#F9F9FA] border-l border-[#E1E3EA]'>
                    kg
                </div>
            </div>
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Animal Type
            </label>
            <div ref={toggleRef} className='w-full flex overflow- border border-[#8891AA] rounded-md relative'>
                <div className='px-2 flex text-[#606B85] items-center justify-center rounded-l-md bg-[#F9F9FA] border-r border-[#E1E3EA]'>
                    <IoSearchOutline />
                </div>
                <input
                    type="search"
                    name="animalType"
                    placeholder='Species - Breed'
                    value={petDetails.animalType}
                    onChange={e => handlePetChange(e, index)}
                    onClick={toggleDropdown}
                    className="w-full px-2 capitalize placeholder:italic text-sm rounded-r-md h-[2.25rem] focus:outline-none"
                />
                {showDropDown &&
                <div 
                    ref={dropdownRef}
                    className='w-full h-fit max-h-40 rounded-b-sm-lg overflow-y-auto absolute flex flex-col items-start z-50 shadow-2xl bg-white top-[calc(100%+1px)] left-0'
                >
                    {formattedAnimals.map((item, id) => (
                        <button
                            key={id}
                            onClick={() => handleDropDownClick(item, index)}
                            className='min-h-10 border-b w-full flex items-center justify-start px-4'
                        >
                            {item.value}
                        </button>
                    ))}
                </div>}
            </div>
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Color
            </label>
            <input
                type="text"
                name="color"
                placeholder='Field Text'
                value={petDetails.color}
                onChange={e => handlePetChange(e, index)}
                className="w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm  h-[2.25rem] border rounded-md focus:outline-none"
            />
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                Sterilization Status
            </label>
            <div className="flex mt-1 h-[2.25rem]">
                <button
                    className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                        petDetails.sterilizationStatus==='Intact'
                        ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-l-md"
                    }`}
                    onClick={() => handlePetSterilizationChange('Intact', index)}
                >
                    Intact
                </button>
                <button
                    className={`h-full flex items-center justify-center px-4 border ${
                        petDetails.sterilizationStatus==='Sterilized'
                        ? "bg-[#F4F9FF] border-[#006DFA] border-x-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D]"
                    }`}
                    onClick={() => handlePetSterilizationChange('Sterilized', index)}
                >
                    Sterilized
                </button>
                <button
                    className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                        petDetails.sterilizationStatus==='Unsure'
                        ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-r-md"
                    }`}
                    onClick={() => handlePetSterilizationChange('Unsure', index)}
                >
                    Unsure
                </button>
            </div>
        </div>
        <div>
            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                Patient Type
            </label>
            <select
                value={petDetails.patientType}
                onChange={e => handlePetChange(e, index)}
                name='patientType'
                className='w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm classic h-[2.25rem] border rounded-md focus:outline-none'
            >
                <option value={''}>Field text</option>
                {patientType.map((item, index) => (
                    <option
                        key={index}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>

        <div className='flex items-center pt-4'>
            {index===0 &&
            <button
                onClick={handlePetAdd}
                disabled={disableAddPet}
                className='text-[#0263E0] disabled:text-[#98989b] text-sm font-semibold'
            >
                Add Another Pet
            </button>}
        </div>
    </div>
  )
}

export default PetDetailsForm