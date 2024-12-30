import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import axiosInstance from "../../../utils/AxiosInstance";
import { toast } from "react-toastify";

const appointmentSlots = [
  {
    id: "675b049dc90ac3a44472a525",
    name: "Morning Slot",
    departmentId: "675b03cdcef11a5735b8c173",
    reasons: [
      "Check-up",
      "Follow-up"
    ],
    branchId: "675b049dc90ac3a44472a522",
    active: true,
    createdAt: new Date("2024-12-12T15:43:24.967Z"),
    updatedAt: new Date("2024-12-12T15:43:24.967Z")
  }
];

const departments = [
  {
    id: "675b03cdcef11a5735b8c173",
    name: "department A",
    createdAt: new Date("2024-12-12T15:39:56.279Z"),
    updatedAt: new Date("2024-12-12T15:39:51.502Z")
  }
];

const EditBusinessUnit = () => {
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const location = useLocation();
  const businessUnitData = location.state?.businessUnitData;

  const { setAlert } = useAlertContext()

  const [ selectedOptions, setSelectedOptions ] = useState(businessUnitData.services.map((item) => ({ service: item.serviceDetails.name , basePrice: item.basePrice })));
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ disabled, setDisabled ] = useState(false)
  const [ options, setOptions ] = useState([])
  const [ formData, setFormData ] = useState({
    active: businessUnitData.active,
    unitName: businessUnitData.name,
    branchType: businessUnitData.type,
    practiceType: businessUnitData.practice,
    currency: businessUnitData.currency,
    address1: businessUnitData.addressLine1,
    address2: businessUnitData.addressLine2,
    city: businessUnitData.city,
    state: businessUnitData.state,
    country: businessUnitData.country,
    postalCode: businessUnitData.postalCode,
    department: businessUnitData.departments[0].departmentDetails.id,
    appointment: "675b049dc90ac3a44472a525",
  });

  useEffect(() => {
    axiosInstance
      .get("/api/v1/services")
      .then(res => {
        setOptions(res.data.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    const requiredFields = ["unitName", "branchType", "practiceType", "currency", "address1", "city", "state", "country", "postalCode", "department", "appointment"];
    const checkFromdata = requiredFields.every((field) => formData[field].trim() !== "")

    if (checkFromdata) {
      setDisabled(false)
    } else {
      setDisabled(true);
    }
  }, [formData, selectedOptions]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.some(obj => obj.service === option)) {
      setSelectedOptions(selectedOptions.filter((item) => item.service !== option));
    } else {
      setSelectedOptions([...selectedOptions, { service: option, basePrice: "" }]);
    }
  };

  const handleDeleteService = (option) => {
    setSelectedOptions(prev => prev.filter((item) => item.service !== option));
  }

  const handleServicePrice = (value, index) => {
    setSelectedOptions(prev => {
      const arr = [...prev]
      arr[index].basePrice = value

      return arr
    })
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

  const handleSubmit = () => {
    // const appointment = appointmentSlots.find(item => item.id === formData.appointment)

    // const services = selectedOptions.map((item) => ({
    //   serviceId: "675b03becef11a5735b8c16f",
    //   basePrice: Number(item.basePrice),
    // }))

    const sendData = {
      name: formData.unitName,
      type: formData.branchType,
      practice: formData.practiceType,
      active: formData.active
      // services: services,
      // departments: [
      //   {
      //     departmentId: formData.department,
      //   },
      // ],
      // appointmentSlots: [
      //   {
      //     name: appointment.name,
      //     departmentId: formData.department,
      //     reasons: appointment.reasons,
      //   },
      // ],
    };
    
    axiosInstance.patch(`/api/v1/business-branches/${businessUnitData.id}`, sendData)
      .then(response => {
        console.log("Success:", response.data);
        setAlert("Branch unit updated successfully")
        navigate("/admin/branch-units")
        toast.success("Branch unit updated successfully")
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full h-[calc(100vh-4.75rem)] hideScrollbar overflow-scroll px-8 py-4 pb-10">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <p
            className="underline inline cursor-default"
          >
            Admin
          </p>
          <span> / </span>
          <Link to={"/admin/branch-units"} className="underline">
            Business Units
          </Link>
          <span> / </span>
          <p
            className="underline inline cursor-default"
          >
            Edit Business Unit
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link to={"/admin/branch-units"}>
            <button className="bg-[#FFFFFF] border border-[#CACDD8] px-3 h-[2.375rem] rounded-md flex text-[#121C2D] font-semibold text-sm items-center justify-center">
              Cancel
            </button>
          </Link>

          <button
            disabled={disabled}
            onClick={handleSubmit}
            className="bg-[#006DFA] border border-[#006DFA] disabled:border-[#E1E3EA] disabled:bg-[#E1E3EA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
          >
            Save
          </button>
        </div>
      </div>

      {/* main form */}
      <div className="flex flex-col items-start flex-wrap justify-start gap-x-[6.25rem] gap-y-6 mt-6">
        <p className="capitalize text-lg font-semibold">Branch Unit Details</p>
        <div className="flex w-[80%] h-full flex-col justify-start items-end bg-white rounded-lg space-y-6">
          <div className="flex w-full items-center justify-between gap-10">
            <div className="w-[9rem]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Status
              </label>
              <div className="flex mt-1 h-[2.25rem]">
                <button
                  className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                    formData.active
                      ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                      : "border-gray-300 text-[#121C2D] rounded-l-lg"
                  }`}
                  onClick={() => handleInputChange("active", true)}
                >
                    Active
                </button>

                <button
                  className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                    !formData.active
                      ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                      : "border-gray-300 text-[#121C2D] rounded-r-lg"
                  }`}
                  onClick={() => handleInputChange("active", false)}
                >
                    Inactive 
                </button>
              </div>
            </div>
            {/* Name Input */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Unit Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border capitalize placeholder:italic text-sm border-gray-300 focus:outline-none rounded-lg"
                placeholder="Placeholder"
                value={formData.unitName}
                onChange={(e) => handleInputChange("unitName", e.target.value)}
              />
            </div>

            {/* type input */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Type
              </label>
              <select
                className="w-full classic mt-1 capitalize placeholder:italic text-sm p-2 border border-gray-300 rounded-lg focus:outline-none"
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

          {/* Practice Type Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Practice Type
              </label>
              <select
                className="w-full classic mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 rounded-lg focus:outline-none"
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
            {/* currency selection */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Currency
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 placeholder:italic uppercase text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
                disabled
                placeholder="INR"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              />
            </div>
          </div>

          {/* Address Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 1
              </label>
              <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
                <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                  <FaSearch className="text-[#606B85] h-full" />
                </div>
                <input
                  type="search"
                  className="w-full placeholder:italic text-sm capitalize focus:outline-none p-2 disabled:bg-[#F4F4F6]"
                  placeholder="Placeholder"
                  disabled
                  value={formData.address1}
                  onChange={(e) =>
                    handleInputChange("address1", e.target.value)
                  }
                />
              </div>
            </div>
            {/* Address Selection 2 */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 2
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
                placeholder="Placeholder"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* City and State Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                City
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
                placeholder="Malad"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
            {/* state selection */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                State
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
                placeholder="Maharashtra"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
          </div>

          {/* Country Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Country
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
                placeholder="India"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
            {/* postal code selection */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Postal Code
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
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
                  {selectedOptions.length===0 && (
                  <div>
                    <p className="text-sm">Select</p>
                  </div>)}

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
                    className="absolute top-full left-0 w-full bg-[#F4F4F6] hideScrollbar border-gray-300 z-10 max-h-52 overflow-y-auto"
                  >
                    <ul className="list-none p-0 m-0">
                      {options.map((option) => (
                        <li className="p-2" key={option}>
                          <label className="flex w-full items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="mr-2 placeholder:italic  text-sm"
                              checked={selectedOptions.some(obj => obj.service === option)}
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
            <div className="w-full mb-6">
              <p className="capitalize text-lg font-semibold">Base Price</p>
            </div>

            <div
              className={`flex w-full gap-x-10 flex-wrap gap-y-6 items-center`}
            >
              {selectedOptions.map((service, index) => (
                <div key={index} className="w-[220px]">
                  <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                    {service.service}
                  </label>
                  <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
                    <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                      <p className="text-[#606B85] text-sm h-full">{formData.currency? formData.currency : "INR"}</p>
                    </div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>)}

          {/* Department Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Department(s)
              </label>
              <select
                className="w-full classic mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 rounded-lg focus:outline-none"
                value={formData.department}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
              >
                <option value="">Select</option>
                {departments.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Appointment Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Appointment Slot(s)
              </label>
              <select
                className="w-full classic mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 rounded-lg focus:outline-none"
                value={formData.appointment}
                onChange={(e) =>
                  handleInputChange("appointment", e.target.value)
                }
              >
                <option value="">Select</option>
                {appointmentSlots.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessUnit;