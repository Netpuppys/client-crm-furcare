import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import BlueButton from '../../../ui/BlueButton';
import axiosInstance from "../../../utils/AxiosInstance"
import { useAlertContext } from '../../../utils/AlertContext';
import ClientDetailsForm from './ClientDetailsForm';
import PetDetailsForm from './PetDetailsForm';
import { IoClose } from "react-icons/io5";

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

    const [ showPopUp, setShowPopUp ] = useState(false)
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

    const handlePetChange = (e, index) => {
        const { name, value } = e.target;

        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, [name]: value } : pet
            )
        );
    };

    const handlePetDobChange = (e, index) => {
        const { name, value } = e.target;

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

            setPetDetails(prevDetails =>
                prevDetails.map((pet, i) =>
                    i === index ? { ...pet, age: totalMonths } : pet
                )
            );
        }
    };

    const handleDeletePet = (index) => {
        setPetDetails(prev => prev.filter((_, i) => i !== index) )
    }

    const handlePetGenderChange = (value, index) => {
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, gender: value } : pet
            )
        );
    };

    const handlePetSterilizationChange = (value, index) => {
        setPetDetails(prevDetails =>
            prevDetails.map((pet, i) =>
                i === index ? { ...pet, sterilizationStatus: value } : pet
            )
        );
    };

    const handleAddAnimalClass = (item, index) => {
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
    <div className="px-[36px] pt-4 h-[calc(100vh-4.75rem)] pb-20 overflow-y-auto relative">
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
                setShowPopUp={setShowPopUp}
                clientDetails={clientDetails}
                handleClientChange={handleClientChange}
            />

            {/* pet details */}
            <h1 className="text-2xl font-bold mb-6">Pet Details</h1>

            {petDetails.map((pet, index) => (
                <PetDetailsForm
                    index={index}
                    petDetails={pet}
                    patientType={patientType}
                    handlePetAdd={handlePetAdd}
                    handlePetChange={handlePetChange}
                    handleDeletePet={handleDeletePet}
                    allAnimalClasses={allAnimalClasses}
                    handlePetDobChange={handlePetDobChange}
                    handleAddAnimalClass={handleAddAnimalClass}
                    handlePetGenderChange={handlePetGenderChange}
                    handlePetSterilizationChange={handlePetSterilizationChange}
                />
            ))}
        </div>

        {showPopUp &&
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-[#606B85] bg-opacity-50'>
            <div className='w-[35rem] p-8 bg-white rounded-[0.5rem] shadow-[0px_4px_16px_0px_rgba(18,_28,_45,_0.20)]'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-xl font-semibold text-[#121C2D] tracking-[-0.025rem] '>
                        Additional Owner(s)/Caretaker(s)
                    </p>
                    <button 
                        onClick={() => setShowPopUp(false)}
                        className='w-[1.75rem] aspect-square flex items-center text-3xl text-[#606B85]'>
                        <IoClose />
                    </button>
                </div>

                <div className='mt-8'>
                    <div className='w-full flex gap-5'>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="firstName"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="lastName"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                    </div>
                    <div className='w-full mt-8 flex gap-5'>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="mobile"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                                Email Address
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="lastName"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-black bg-opacity-30 mt-8 rounded-full'></div>
                <div className='mt-8'>
                    <div className='w-full flex gap-5'>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="firstName"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="lastName"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                    </div>
                    <div className='w-full mt-8 flex gap-5'>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="mobile"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                        <div className='w-full'>
                            <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                                Email Address
                            </label>
                            <input
                                type="text"
                                placeholder='Field Text'
                                name="lastName"
                                // value={clientDetails.firstName || ''}
                                // onChange={handleClientChange}
                                className="w-full px-2 capitalize placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full flex mt-8 justify-end'>
                    <BlueButton
                        disabled={true}
                        text={"Save"}
                    />
                </div>
            </div>
        </div>}
    </div>
  );
}