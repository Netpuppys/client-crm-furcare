import { useEffect, useState } from "react";
import { GoogleMapsLoader } from "../../../utils/GoogleLoaderContext";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../../utils/AxiosInstance";

export default function BusinessForm() {
    
    const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
    const [ formData, setFormData ] = useState({
        businessUnitType: "",
        businessUnitName: "",
        numberOfBranchUnits: 1,
        branchType: "",
        practiceType: "",
        currency: "INR",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
        animalClasses: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

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

  return (
    <div className="w-full py-4">
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex gap-12">
                {/* Business Unit Type */}
                <div className="flex w-[calc(40%-3rem)] flex-col gap-1">
                    <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                        <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                        Business Unit Type
                    </label>
                    <select
                        name="businessUnitType"
                        className="border rounded-md p-2 focus:outline-none text-sm border-[#8891AA] classic"
                        onChange={handleChange}
                        value={formData.businessUnitType}
                    >
                        <option value="">Select</option>
                        <option value="Type1">Clinic</option>
                        <option value="Type2">Hospital</option>
                    </select>
                </div>

                {/* Business Unit Name */}
                <div className="flex w-[calc(40%-3rem)] gap-1 flex-col">
                    <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                        <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                        Business Unit Name
                    </label>
                    <input
                        name="businessUnitName"
                        type="text"
                        placeholder="Business Unit Name"
                        className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA]"
                        value={formData.businessUnitName}
                        onChange={handleChange}
                    />
                </div>

                {/* Number of Branch Units */}
                <div className="flex w-[20%] gap-1 flex-col">
                    <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                        <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                        Number of Branch Units
                    </label>
                    <select
                        name="numberOfBranchUnits"
                        className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic"
                        onChange={handleChange}
                        value={formData.numberOfBranchUnits}
                    >
                        {[1,2,3,4].map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full h-[1px] border-t -mt-2 -mb-1 border-black border-dashed border-opacity-30"></div>

            {Array.from({ length: Number(formData.numberOfBranchUnits) }, (_, index) => (
                <div key={index} className="w-full flex flex-col gap-6">
                    <div className="flex gap-12" >
                        {/* Branch Type */}
                        <div className="flex w-[calc(40%-3rem)] flex-col gap-1">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Branch Type
                            </label>
                            <select 
                                name="branchType" 
                                className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic" 
                                onChange={handleChange} 
                                value={formData.branchType}
                            >
                                <option value="">Select</option>
                                <option value="Main">Main</option>
                                <option value="Sub">Sub</option>
                            </select>
                        </div>

                        {/* Practice Type */}
                        <div className="flex w-[calc(40%-3rem)] flex-col gap-1">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Practice Type
                            </label>
                            <select 
                                name="practiceType" 
                                className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic" 
                                onChange={handleChange} 
                                value={formData.practiceType}
                            >
                                <option value="">Select</option>
                                <option value="General">General</option>
                                <option value="Specialized">Specialized</option>
                            </select>
                        </div>

                        {/* Currency */}
                        <div className="flex w-[20%] gap-1 flex-col">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Currency
                            </label>
                            <input 
                                name="currency" 
                                type="text" 
                                disabled
                                className="border rounded-md focus:outline-none p-2 text-sm disabled:bg-[#F4F4F6] border-[#8891AA]" 
                                value={formData.currency} 
                            />
                        </div>
                    </div>

                    <div className="flex gap-12">
                        {/* Address Line 1 */}
                        <div className="flex w-[calc(40%-3rem)] flex-col gap-1 col-span-2">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Address line 1
                            </label>
                            <GoogleMapsLoader>
                                <div className="flex relative border rounded-md focus:outline-none text-sm border-[#8891AA]">
                                    <div className="p-2 border-r border-[#E1E3EA] rounded-l-lg bg-[#F9F9FA] w-fit">
                                        <FaSearch className="text-[#606B85] h-full" />
                                    </div>
                                    <input
                                        type="search"
                                        className="w-full capitalize rounded-r-lg focus:outline-none p-2"
                                        placeholder="Address line 1"
                                        value={formData.address1}
                                        onChange={handleChange}
                                    />
                                {/* {suggestions.length > 0 && (
                                    <ul className="absolute top-full mt-2 z-50 bg-white border border-gray-300 rounded-lg shadow-md w-full">
                                    {suggestions.map((suggestion) => (
                                        <li
                                        key={suggestion.place_id}
                                        className="px-4 py-2 text-sm cursor-pointer border-b last:border-b-0 border-[#E1E3EA] hover:bg-gray-100"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                        {suggestion.description}
                                        </li>
                                    ))}
                                    </ul>
                                )} */}
                                </div>
                            </GoogleMapsLoader>
                        </div>

                        {/* Address Line 2 */}
                        <div className="flex w-[calc(40%-3rem)] flex-col gap-1 col-span-2">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Address line 2
                            </label>
                            <input 
                                name="addressLine2" 
                                type="text" 
                                className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] italic" 
                                placeholder="Building A-101" 
                                value={formData.addressLine2} 
                                onChange={handleChange} 
                            />
                        </div>

                        {/* City */}
                        <div className="flex w-[20%] gap-1 flex-col">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                City
                            </label>
                            <select 
                                name="city" 
                                className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic" 
                                onChange={handleChange} 
                                value={formData.city}
                            >
                                <option value="">Select</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Delhi">Delhi</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-12">
                        {/* State */}
                        <div className="flex w-[calc(40%-3rem)] flex-col gap-1">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                State
                            </label>
                            <select 
                                name="state" 
                                className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic" 
                                onChange={handleChange} 
                                value={formData.state}
                            >
                                <option value="">Select</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Delhi">Delhi</option>
                            </select>
                        </div>

                        <div className="w-[calc(40%-3rem)] flex gap-12">
                        {/* Country */}
                        <div className="flex w-[calc(60%-1.5rem)] gap-1 flex-col">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Country
                            </label>
                            <input 
                                name="country" 
                                disabled
                                type="text" 
                                className="border rounded-md focus:outline-none p-2 text-sm disabled:bg-[#F4F4F6] border-[#8891AA]" 
                                value={formData.country} 
                            />
                        </div>

                        {/* Postal Code */}
                        <div className="flex w-[calc(40%-1.5rem)] gap-1 flex-col">
                            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                                <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                                Postal Code
                            </label>
                            <input 
                                name="postalCode"
                                type="number"
                                placeholder="Postal Code"
                                className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA]" 
                                value={formData.postalCode} 
                                onChange={handleChange} 
                                // readOnly 
                            />
                        </div>
                        </div>
                    </div>
                    {Number(formData.numberOfBranchUnits)!==1 && <div className="w-full h-[1px] border-t -mt-2 -mb-1 border-black border-dashed border-opacity-30"></div>}
                </div>
            ))}

            {/* Animal Classes */}
            <div className="flex w-[calc(40%-3rem)] flex-col gap-1 col-span-2">
                <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                    <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                    Animal Classes
                </label>
                <select 
                    name="animalClasses" 
                    className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic" 
                    onChange={handleChange} 
                    value={formData.animalClasses}
                >
                    <option value="">Select</option>
                    <option value="Mammals">Mammals</option>
                    <option value="Birds">Birds</option>
                    {allAnimalClasses.map((item, index) => (
                        <option
                            value={item.name}
                            key={index}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  );
}