import React, { useEffect, useRef, useState } from 'react'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import axiosInstance from '../../../utils/AxiosInstance';

const ServiceForm = () => {
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ options, setOptions ] = useState([])
  
  const formData = {
    unitName: "",
    branchType: "",
    practiceType: "",
    currency: "INR",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    department: "",
    appointment: "",
  }

  useEffect(() => {
    axiosInstance
        .get("/api/v1/services")
        .then(res => {
            console.log(res.data.data.data)
            setOptions(res.data.data.data)
        })
        .catch(err => {
            console.error(err)
        })
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.some(obj => obj.service === option.name)) {
      setSelectedOptions(selectedOptions.filter((item) => item.service !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, { service: option.name, basePrice: "" }]);
    }
  };

  const handleDeleteService = (option) => {
    setSelectedOptions(prev => prev.filter((item) => item.service !== option));
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServicePrice = (value, index) => {
    setSelectedOptions(prev => {
      const arr = [...prev]
      arr[index].basePrice = value

      return arr
    })
  }

  return (
    <div className='w-full h-fit py-4'>
        <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Service(s)
        </label>

        <div className="relative w-full">
            <div
                ref={toggleRef}
                className={`classic w-full mt-1 ${
                    selectedOptions.length===0 ? "p-2" : "p-1 min-h-[42px]"
                } border border-gray-300 focus:outline-none rounded-lg`}
                onClick={toggleDropdown}
            >
                {selectedOptions.length===0 && (<p className="text-sm">Select</p>)}

                <div className="flex w-full h-full items-center flex-wrap gap-1">
                    {selectedOptions?.map((option, index) => (
                    <span
                        className="bg-[#F4F9FF] border capitalize border-[#CCE4FF] text-[#121C2D] px-2 py-1 rounded-full text-sm flex items-center"
                        key={index}
                    >
                        {option.service}
                        <button
                        className="ml-2 text-[#606B85]"
                        onClick={() => handleDeleteService(option.service)}
                        >
                        <IoClose />
                        </button>
                    </span>
                    ))}
                </div>
            </div>

            {isDropdownOpen && (
            <div
                ref={dropdownRef}
                className="absolute z-50 top-full left-0 w-full bg-white hideScrollbar shadow-2xl rounded-md border-gray-300 max-h-[18.5rem] overflow-y-auto"
            >
                <div className='h-[2.8rem] flex items-center justify-start px-3 border-b border-[#E1E3EA]'>
                    <button
                        className='text-sm flex items-center justify-center gap-2'
                    >
                        <span className='text-[#606B85] text-2xl'>+</span>
                        <span className='text=[#121C2D] leading-none'>
                            Create a service
                        </span>
                    </button>
                </div>
                <div className='h-[2.8rem] flex items-center justify-start gap-2 px-3 border-b border-[#E1E3EA]'>
                    <p className='text-[#606B85] text-lg'>
                        <IoSearchOutline />
                    </p>
                    <input
                        type='search'
                        placeholder='Search'
                        className='border-0 w-full h-full focus:outline-none'
                    />
                </div>
                <ul className="list-none p-0 m-0">
                {options?.map((option) => (
                    <li className="px-4 border-b last:border-b-0 border-[#E1E3EA] h-[2.8rem] flex items-center" key={option}>
                        <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                            type="checkbox"
                            className="mr-2 h-4 placeholder:italic text-sm"
                            checked={selectedOptions.some(obj => obj.service === option.name)}
                            onChange={() => handleCheckboxChange(option)}
                            />

                            {option.name}
                        </label>
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>

        {/* Service Value Currency Input */}
        {selectedOptions.length > 0 && (
          <div className="w-full mt-6">
            <p className='font-semibold text-[#121C2D]'>
                Base Price
            </p>

            <div
              className={`flex w-full gap-x-10 flex-wrap gap-y-6 items-center mt-6`}
            >
              {selectedOptions.map((service, index) => (
                <div key={index} className="w-[220px] ">
                  <label className="font-medium text-[#121C2D] capitalize text-sm flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                    {service.service}
                  </label>
                  <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
                    <input
                      className="w-full p-2 placeholder:italic text-sm classic focus:outline-none"
                      value={selectedOptions[index].basePrice}
                      onChange={e => {
                        const value = e.target.value;
                        // Allow only numbers and a single decimal point
                        const formattedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                        // Limit to 2 decimal places
                        const twoDecimalValue = formattedValue.match(/^\d+(\.\d{0,2})?/)?.[0] || '';
                        handleServicePrice(twoDecimalValue, index);
                      }}
                      type="text"
                    />
                    <div className="p-2 border-l border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                      <p className="text-[#606B85] text-sm h-full">{formData.currency? formData.currency : "INR"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>)}
    </div>
  )
}

export default ServiceForm