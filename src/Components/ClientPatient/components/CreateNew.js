import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import BlueButton from '../../../ui/BlueButton';
import axiosInstance from "../../../utils/AxiosInstance"
import { useAlertContext } from '../../../utils/AlertContext';
import ClientDetailsForm from './ClientDetailsForm';
import PetDetailsForm from './PetDetailsForm';

const patientType = [ 'regular' ]

const clientSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    mobile: z.string().regex(/^\d{10}$/, 'Mobile number must be 10 digits'),
    email: z.string().email('Invalid email address'),
    postalCode: z.string().length(6, 'Postal code must be 6 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    country: z.string().default('India'),
    discounts: z.string().optional(),
    referredBy: z.string().optional(),
});
  
const petSchema = z.array(z.object({
    name: z.string().min(2, 'Pet name must be at least 2 characters'),
    dob: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['Male', 'Female']),
    age: z.number({ required_error: 'Age must be a number' }),
    weight: z.string().min(1, 'Weight is required'),
    animalType: z.string().min(1, 'Animal Type is required'),
    color: z.string().min(1, 'Color is required'),
    sterilizationStatus: z.enum(['Intact', 'Sterilized']),
    patientType: z.string().min(1, 'Patient type is required'),
}));

export default function CreateNew() {
    const navigate = useNavigate()

    const { setAlert } = useAlertContext()

    // const dropdownRef = useRef(null);
    // const toggleRef = useRef(null);

    const [ clientDetails, setClientDetails ] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        postalCode: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        discounts: '',
        referredBy: '',
    });
    const [ petDetails, setPetDetails ] = useState([{
        name: '',
        dob: '',
        gender: '',
        age: '',
        weight: '',
        breed: '',
        animalType: "",
        animalClassId: "",
        color: '',
        sterilizationStatus: '',
        patientType: '',
    }]);

    const [ formErrors, setFormErrors ] = useState({})
    const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
    // const [ formattedAnimals, setFormattedAnimals ] = useState([])
    // const [ showDropDown, setShowDropDown ] = useState(false)
    const [ disabled, setDisabled ] = useState(true)

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientDetails({ ...clientDetails, [name]: value });
    };

    useEffect(() => { 
        console.log(formErrors)
    }, [formErrors])

    useEffect(() => {
        const validationClient = clientSchema.safeParse(clientDetails);
        const validationPet = petSchema.safeParse(petDetails);
    
        if (!validationClient.success || !validationPet.success) {
            setDisabled(true)
            return;
        }

        setDisabled(false)
    }, [clientDetails, petDetails])

    useEffect(() => {
        axiosInstance
            .get("/api/v1/animal-classes")
            .then(res => {
                const response = res.data.data.data
                const formattedArr = response.flatMap(item =>
                    item.breeds.map(breed => ({ value: `${item.name} - ${breed}`, id: item.id, breed: breed }))
                );
                setAllAnimalClasses(formattedArr)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //       if (
    //         dropdownRef.current &&
    //         !dropdownRef.current.contains(event.target) &&
    //         toggleRef.current &&
    //         !toggleRef.current.contains(event.target)
    //       ) {
    //         setShowDropDown(false);
    //       }
    //     };
    
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //       document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    // const toggleDropdown = () => {
    //     setShowDropDown(true);
    // };

    const handlePetChange = (e, index) => {
        const { name, value } = e.target;
        // setPetDetails({ ...petDetails, [name]: value });
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, [name]: value } : pet
            )
        );
    };

    const handlePetDobChange = (e, index) => {
        const { name, value } = e.target;
        // setPetDetails((prev) => ({ ...prev, [name]: value }));
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, [name]: value } : pet
            )
        );
        
        // Calculate age when the date changes
        if (value) {
            const dobDate = new Date(value);
            const today = new Date();

            let years = today.getFullYear() - dobDate.getFullYear();
            let months = today.getMonth() - dobDate.getMonth();

            // Adjust if birthday hasn't occurred yet this month
            if (today.getDate() < dobDate.getDate()) {
                months--;
            }

            if (months < 0) {
                years--;
                months += 12; // Adjust negative months by adding a full year
            }

            const totalMonths = years * 12 + months;

            // setPetDetails((prev) => ({ ...prev, age: totalMonths }));

            setPetDetails(prevDetails =>
                prevDetails.map((pet, i) =>
                    i === index ? { ...pet, age: totalMonths } : pet
                )
            );
        }
    };

    const handlePetGenderChange = (value, index) => {
        // setPetDetails({ ...petDetails, gender: value });
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, gender: value } : pet
            )
        );
    };

    const handlePetSterilizationChange = (value, index) => {
        // setPetDetails({ ...petDetails, sterilizationStatus: value });
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, sterilizationStatus: value } : pet
            )
        );
    };

    const handleAddAnimalClass = (item, index) => {
        // setPetDetails({ 
        //     ...petDetails, 
        //     animalClassId: item.id, 
        //     breed: item.breed, 
        //     animalType: item.value
        // });
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { 
                    ...pet, 
                    animalClassId: item.id, 
                    breed: item.breed, 
                    animalType: item.value
                } : pet
            )
        );
    };

    const handlePetAdd = () => {
        setPetDetails(prevDetails => [
            ...prevDetails,
            {
                name: '',
                dob: '',
                gender: '',
                age: '',
                weight: '',
                breed: '',
                animalType: "",
                animalClassId: "",
                color: '',
                sterilizationStatus: '',
                patientType: '',
            }
        ]);
    };

    // const handlePetDelete = (index) => {
    //     setPetDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
    // };

    const onSubmit = () => {
        
        const validationClient = clientSchema.safeParse(clientDetails);
        const validationPet = petSchema.safeParse(petDetails);
    
        if (!validationClient.success || !validationPet.success) {
        setFormErrors({
            formattedErrorsClient: validationClient.success ? {} : validationClient.error.flatten().fieldErrors,
            formattedErrorsPet: validationPet.success ? {} : validationPet.error.flatten().fieldErrors,
        });
        return;
        }
    
        setFormErrors({}); // Clear errors on success

        // const dob = new Date(petDetails.dob).toISOString(); 

        const sendData = {
            firstName: clientDetails.firstName,
            lastName: clientDetails.lastName,
            phone: clientDetails.mobile,
            email: clientDetails.email,
            address: clientDetails.address,
            country: clientDetails.country,
            state: clientDetails.state,
            city: clientDetails.city,
            postalCode: clientDetails.postalCode,
            referredBy: clientDetails.referredBy,
            pets: petDetails.map(pet => {
                const dob = new Date(pet.dob).toISOString(); 

                const petObj = {
                    name: pet.name,
                    gender: pet.gender.toLowerCase(),
                    dob: dob,
                    weight: Number(pet.weight),
                    animalClassId: pet.animalClassId,
                    breed: pet.breed.toLowerCase(),
                    color: pet.color.toLowerCase(),
                    sterilizationStatus: pet.sterilizationStatus.toLowerCase(),
                    patientType: pet.patientType.toLowerCase()
                };

                return petObj;
            })
        }

        axiosInstance
            .post('/api/v1/clients', sendData)
            .then(res => {
                console.log(res)
                navigate("/client-patient")
                setAlert(<><p className='font-semibold'>Account Created {res.data.data.clientId}.</p></>)
            })
            .catch(err => {
                console.error(err)
            })
    };

  return (
    <div className="px-[36px] pt-4 h-[calc(100vh-4.75rem)] pb-20 overflow-y-auto">
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] flex items-center text-xs'>
                <Link
                    to={"/client-patient"}
                    className='underline inline cursor-pointer'
                >
                    Client & Patient
                </Link>
                <p className='px-[1px]'>/</p>
                <p className='underline inline cursor-default'>
                    Create Account
                </p>
            </div>
            <div className='flex items-center gap-6'>
                <Link
                  to={"/client-patient"}
                    className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent border border-[#CACDD8] text-[#121C2D] text-nowrap bg-transparent rounded-md font-medium leading-[1.25rem] text-sm' 
                >
                    <p className=''>
                      Cancel
                    </p>
                </Link>

                <BlueButton
                    text={"Create"}
                    onClickHandler={onSubmit}
                    disabled={disabled}
                />
            </div>
        </div>

        <div className="w-[1000px]">
            <h1 className="text-2xl font-bold mb-6">Client Details</h1>
            
            <ClientDetailsForm
                clientDetails={clientDetails}
                handleClientChange={handleClientChange}
            />

            {/* pet details */}
            <h1 className="text-2xl font-bold mb-6">Pet Details</h1>

            {/* <div className="grid grid-cols-2 gap-x-[50px] gap-4">
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
                        onChange={handlePetChange}
                        className="w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
                    />
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Gender
                    </label>
                    <div className="flex gap-4">
                        <div className="flex mt-1 h-[2.25rem]">
                            <button
                                className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                                    petDetails.gender==='Male'
                                    ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                                    : "border-gray-300 text-[#121C2D] rounded-l-lg"
                                }`}
                                onClick={() => handlePetGenderChange('Male')}
                            >
                                Male
                            </button>
                            <button
                                className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                                    petDetails.gender==='Female'
                                    ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                                    : "border-gray-300 text-[#121C2D] rounded-r-lg"
                                }`}
                                onClick={() => handlePetGenderChange('Female')}
                            >
                                Female
                            </button>
                        </div>
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
                        onChange={handlePetDobChange}
                        className="w-full px-2 border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
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
                            onChange={handlePetChange}
                            className="w-full px-2 capitalize placeholder:italic text-sm  py-2 focus:outline-none"
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
                            onChange={handlePetChange}
                            className="w-full px-2 capitalize placeholder:italic text-sm  py-2 focus:outline-none"
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
                            onChange={handlePetChange}
                            onClick={toggleDropdown}
                            className="w-full px-2 capitalize placeholder:italic text-sm rounded-r-md py-2 focus:outline-none"
                        />
                        {showDropDown &&
                        <div 
                            ref={dropdownRef}
                            className='w-full h-fit max-h-40 rounded-b-sm-lg overflow-y-auto absolute flex flex-col items-start z-50 shadow-2xl bg-white top-[calc(100%+1px)] left-0'
                        >
                            {formattedAnimals.map((item, id) => (
                                <button
                                    key={id}
                                    onClick={() => handleDropDownClick(item)}
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
                        onChange={handlePetChange}
                        className="w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
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
                                : "border-gray-300 text-[#121C2D] rounded-l-lg"
                            }`}
                            onClick={() => handlePetSterilizationChange('Intact')}
                        >
                            Intact
                        </button>
                        <button
                            className={`h-full flex items-center justify-center px-4 border ${
                                petDetails.sterilizationStatus==='Sterilized'
                                ? "bg-[#F4F9FF] border-[#006DFA] border-x-gray-300 text-[#006DFA]"
                                : "border-gray-300 text-[#121C2D]"
                            }`}
                            onClick={() => handlePetSterilizationChange('Sterilized')}
                        >
                            Sterilized
                        </button>
                        <button
                            className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                                petDetails.sterilizationStatus==='Unsure'
                                ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                                : "border-gray-300 text-[#121C2D] rounded-r-lg"
                            }`}
                            onClick={() => handlePetSterilizationChange('Unsure')}
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
                        onChange={handlePetChange}
                        name='patientType'
                        className='w-full px-2 capitalize border-[#8891AA] placeholder:italic text-sm classic py-2 border rounded-md focus:outline-none'
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
                    <button
                        className='text-[#0263E0] text-sm font-semibold'
                    >
                        Add Another Pet
                    </button>
                </div>
            </div> */}

            {petDetails.map((pet, index) => (
            <PetDetailsForm
                index={index}
                petDetails={pet}
                handlePetChange={handlePetChange}
                handlePetDobChange={handlePetDobChange}
                handlePetGenderChange={handlePetGenderChange}
                // toggleRef={toggleRef}
                // toggleDropdown={toggleDropdown}
                // showDropDown={showDropDown}
                // dropdownRef={dropdownRef}
                // formattedAnimals={formattedAnimals}
                handlePetAdd={handlePetAdd}
                allAnimalClasses={allAnimalClasses}
                handleAddAnimalClass={handleAddAnimalClass}
                handlePetSterilizationChange={handlePetSterilizationChange}
                patientType={patientType}
            />))}
        </div>
    </div>
  );
}