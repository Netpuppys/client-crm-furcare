import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlueButton from '../../../ui/BlueButton';
import { IoSearchOutline } from "react-icons/io5";

export default function CreateNew() {
  const [clientDetails, setClientDetails] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailAddress: '',
    postalCode: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    discounts: '',
    referredBy: '',
  });

  const [petDetails, setPetDetails] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    age: '',
    weight: '',
    animalType: '',
    color: '',
    sterilizationStatus: 'Intact',
    patientType: '',
  });

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientDetails({ ...clientDetails, [name]: value });
  };

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({ ...petDetails, [name]: value });
  };

  const handlePetGenderChange = (value) => {
    setPetDetails({ ...petDetails, gender: value });
  };

  const handlePetSterilizationChange = (value) => {
    setPetDetails({ ...petDetails, sterilizationStatus: value });
  };

  return (
    <div className="px-[36px] pt-6 h-[calc(100vh-4.75rem)] pb-20 overflow-y-auto">
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] flex items-center text-xs'>
                <p
                    className='underline inline cursor-pointer'
                >
                    Client & Patient
                </p>
                <p className='px-[1px]'>/</p>
                <p className='underline inline cursor-default'>
                    Create Account
                </p>
            </div>
            <div className='flex items-center gap-6'>
                <Link
                  to={"/client-patient/create"}
                    className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent border border-[#CACDD8] text-[#121C2D] text-nowrap bg-transparent rounded-md font-medium leading-[1.25rem] text-sm' 
                >
                    <p className=''>
                      Cancel
                    </p>
                </Link>
                <BlueButton
                    text={"Create"}
                    disabled={true}
                />
            </div>
        </div>

        <div className="w-[1000px]">
            <h1 className="text-2xl font-bold mb-6">Client Details</h1>
            <div className="grid grid-cols-2 gap-4 gap-x-10 mb-6">
                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        First Name
                    </label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="firstname"
                        value={clientDetails.firstname || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Last Name</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="lastname"
                        value={clientDetails.lastname || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Mobile Number</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="mobilenumber"
                        value={clientDetails.mobilenumber || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Email Address</label>
                    <input
                        type="email"
                        placeholder='Field Text'
                        name="emailaddress"
                        value={clientDetails.emailaddress || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Postal Code</label>
                    <div className='w-full flex overflow-hidden border border-[#8891AA] rounded-md'>
                        <div className='px-2 flex text-[#606B85] items-center justify-center bg-[#F9F9FA] border-r border-[#E1E3EA]'>
                            <IoSearchOutline />
                        </div>
                        <input
                            type="tel"
                            placeholder="Field Text"
                            name="postalcode"
                            value={clientDetails.postalcode || ''}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                if (value.length <= 6) {
                                    handleClientChange(e); // Only update state if within 6 digits
                                }
                            }}
                            className="w-full px-2 placeholder:italic text-sm py-2 h-[36px] focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Address</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="address"
                        value={clientDetails.address || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        City</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="city"
                        value={clientDetails.city || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        State</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="state"
                        value={clientDetails.state || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Country</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="country"
                        value={clientDetails.country}
                        disabled
                        className="w-full px-2 border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md bg-[#F4F4F6] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Discounts</label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="discounts"
                        value={clientDetails.discounts || ''}
                        onChange={handleClientChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 border rounded-md h-[36px] focus:outline-none border-[#8891AA]"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-[#121C2D] font-semibold mb-1 ">
                        <div className='w-1 h-1 rounded-full bg-[#EB5656] '></div>
                        Referred By
                    </label>
                    <input
                        type="text"
                        placeholder='Field Text'
                        name="referredBy"
                        value={clientDetails.referredBy}
                        className="w-full px-2 border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
                    />
                </div>

                <div className='flex items-center justify-center'>
                    <button
                        className='text-[#0263E0] text-sm font-semibold'
                    >
                        Add Additional Owner(s)/Caretaker(s)
                    </button>
                </div>
            </div>


            {/* pet details */}
            <h1 className="text-2xl font-bold mb-6">Pet Details</h1>

            <div className="grid grid-cols-2 gap-x-12 gap-4">
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
                    className="w-full px-2 border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
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
                                petDetails.gender==='male'
                                ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                                : "border-gray-300 text-[#121C2D] rounded-l-lg"
                            }`}
                            onClick={() => handlePetGenderChange('male')}
                        >
                            Male
                        </button>

                        <button
                            className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                                petDetails.gender==='female'
                                ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                                : "border-gray-300 text-[#121C2D] rounded-r-lg"
                            }`}
                            onClick={() => handlePetGenderChange('female')}
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
                    onChange={handlePetChange}
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
                        placeholder='Field Text'
                        value={petDetails.age}
                        onChange={handlePetChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 focus:outline-none"
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
                        className="w-full px-2 placeholder:italic text-sm  py-2 focus:outline-none"
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
                <div className='w-full flex overflow-hidden border border-[#8891AA] rounded-md'>
                    <div className='px-2 flex text-[#606B85] items-center justify-center bg-[#F9F9FA] border-r border-[#E1E3EA]'>
                        <IoSearchOutline />
                    </div>
                    <input
                        type="text"
                        name="animalType"
                        placeholder='Species - Breed'
                        value={petDetails.animalType}
                        onChange={handlePetChange}
                        className="w-full px-2 placeholder:italic text-sm  py-2 focus:outline-none"
                    />
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
                    className="w-full px-2 border-[#8891AA] placeholder:italic text-sm  py-2 border rounded-md focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Sterilization Status</label>
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
                    className='w-full px-2 border-[#8891AA] placeholder:italic text-sm classic py-2 border rounded-md focus:outline-none'
                >
                    <option value={''}>Field text</option>
                </select>
            </div>

            <div className='flex items-center pt-4'>
                <button
                    className='text-[#0263E0] text-sm font-semibold'
                >
                    Add Another Pet
                </button>
            </div>

            </div>
        </div>
    </div>
  );
}