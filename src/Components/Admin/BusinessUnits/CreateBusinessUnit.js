import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateBusinessUnit = () => {
  const [formData, setFormData] = useState({
    unitName: "",
    branchType: "",
    practiceType: "",
    currency: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    selectedOptions: [],
    department: "",
    appointment: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Validation logic
    if (!formData.unitName || !formData.branchType || !formData.practiceType) {
      alert("Please fill all required fields.");
      return;
    }

    // Log the form data
    console.log("Submitted Form Data: ", formData);
  };
  const [options] = useState([
    "Service A",
    "Service B",
    "Service C",
    "Service D",
    "Service E",
    "Service F",
    "Service G",
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

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

  return (
    <div className="w-full h-[calc(100vh-4.75rem)] hideScrollbar overflow-scroll px-8 py-4 pb-10">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <Link
            // to={"/admin"}
            className="underline"
          >
            Admin
          </Link>
          <span> / </span>
          <Link to={"/admin/branch-units"} className="underline">
            Branch Units
          </Link>
          <span> / </span>
          <Link
            to={"/admin/branch-units/create-business-unit"}
            className="underline"
          >
            Create Business Unit
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link to={"/admin/branch-units"}>
            <button className="bg-[#FFFFFF] border border-[#CACDD8] px-3 h-[2.375rem] rounded-md flex text-[#121C2D] font-semibold text-sm items-center justify-center">
              Cancel
            </button>
          </Link>

          <button
            disabled
            onClick={handleSubmit}
            className="bg-[#006DFA] border border-[#006DFA] disabled:border-[#E1E3EA] disabled:bg-[#E1E3EA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start flex-wrap justify-start gap-x-[6.25rem] gap-y-6 mt-6">
        <p className="capitalize text-lg font-semibold">Branch Unit Details</p>
        <div className="flex w-[80%] h-full flex-col justify-start items-end bg-white rounded-lg space-y-6">
          {/* Name and Type Input */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Unit Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Placeholder"
                value={formData.unitName}
                onChange={(e) => handleInputChange("unitName", e.target.value)}
              />
            </div>
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Type
              </label>
              <select
                className="w-full classic mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                value={formData.branchType}
                onChange={(e) =>
                  handleInputChange("branchType", e.target.value)
                }
              >
                <option value="">Placeholder</option>
                <option value="Select Option 1">Select Option 1</option>
                <option value="Select Option 2">Select Option 2</option>
                <option value="Select Option 3">Select Option 3</option>
              </select>
            </div>
          </div>

          {/* Practice Type and Currency Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Practice Type
              </label>
              <select
                className="w-full classic mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                value={formData.practiceType}
                onChange={(e) =>
                  handleInputChange("practiceType", e.target.value)
                }
              >
                <option value="">Placeholder</option>
                <option value="Select Option 1">Select Option 1</option>
                <option value="Select Option 2">Select Option 2</option>
                <option value="Select Option 3">Select Option 3</option>
              </select>
            </div>
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Currency
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="INR"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              />
            </div>
          </div>

          {/* Address Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 1
              </label>
              <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
                <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                  <FaSearch className="text-[#606B85] h-full" />
                </div>
                <input
                  type="search"
                  className="w-full focus:outline-none p-2"
                  placeholder="Placeholder"
                  value={formData.address1}
                  onChange={(e) =>
                    handleInputChange("address1", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 2
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Placeholder"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* City and State Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                City
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Malad"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                State
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Maharashtra"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
          </div>

          {/* Country and Postal Code Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Country
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="India"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Postal Code
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Service (s)
              </label>
              <div className="relative w-full">
                <div
                  ref={toggleRef}
                  className={`classic w-full mt-1 ${
                    selectedOptions.length === 0 ? "p-2" : "p-1 min-h-[42px]"
                  } border border-gray-300 focus:outline-none rounded-lg`}
                  onClick={toggleDropdown}
                >
                  {selectedOptions.length === 0 && (
                    <div>
                      <p>Select</p>
                    </div>
                  )}
                  <div className="flex w-full h-full items-center flex-wrap gap-2">
                    {selectedOptions.map((option) => (
                      <span
                        className="bg-[#F4F9FF] border border-[#CCE4FF] text-[#121C2D] px-2 py-1 rounded-full text-sm flex items-center"
                        key={option}
                      >
                        {option}
                        <button
                          className="ml-2 text-[#606B85]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckboxChange(option);
                          }}
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
                    className="absolute top-full left-0 w-full bg-[#F4F4F6] hideScrollbar border-gray-300 z-10 max-h-52 overflow-y-auto"
                  >
                    <ul className="list-none p-0 m-0">
                      {options.map((option) => (
                        <li className="p-2" key={option}>
                          <label className="flex w-full items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={selectedOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                            />
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Value Currency Input */}
          {selectedOptions.length > 0 && (
            <div className="w-full">
              <p className="capitalize text-lg font-semibold">Base Price</p>
            </div>
          )}
          {selectedOptions.length > 0 && (
            <div className="w-full">
              <div
                className={`flex w-full gap-x-[2.5%] flex-wrap gap-y-6 items-center`}
              >
                {selectedOptions.map((service, index) => (
                  <div key={index} className="w-[220px]">
                    <label className="font-medium text-[#121C2D] flex items-center gap-2">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                      {service}
                    </label>
                    <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
                      <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                        <p className="text-[#606B85] h-full">INR</p>
                      </div>
                      <select
                        className="w-full p-2 classic focus:outline-none"
                        value={formData.selectedOptions.service}
                        onChange={(e) =>
                          handleInputChange(
                            "selectedOptions.service",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Field Text</option>
                        <option value="Select Option 1">Select Option 1</option>
                        <option value="Select Option 2">Select Option 2</option>
                        <option value="Select Option 3">Select Option 3</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Department Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Department(s)
              </label>
              <select
                className="w-full classic mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                value={formData.department}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="Select Option 1">Select Option 1</option>
                <option value="Select Option 2">Select Option 2</option>
                <option value="Select Option 3">Select Option 3</option>
              </select>
            </div>
          </div>
          {/* Appointment Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Appointment Slot(s)
              </label>
              <select
                className="w-full classic mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                value={formData.appointment}
                onChange={(e) =>
                  handleInputChange("appointment", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="Select Option 1">Select Option 1</option>
                <option value="Select Option 2">Select Option 2</option>
                <option value="Select Option 3">Select Option 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBusinessUnit;
