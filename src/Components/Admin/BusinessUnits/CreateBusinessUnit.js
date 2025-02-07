import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import axiosInstance from "../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import statesInIndia from "../../../data/StatesIndia";
import { GoogleMapsLoader } from "../../../utils/GoogleLoaderContext";

// const options = [
//   "Service A",
//   "Service B",
//   "Service C", 
//   "Service D",
//   "Service E",
// ]

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

const CreateBusinessUnit = () => {
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const location = useLocation();
  const businessUnitId = location.state?.businessUnitId;

  const autocompleteServiceRef = useRef(null);

  const { setAlert } = useAlertContext()
  
  const [ suggestions, setSuggestions ] = useState([]);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ disabled, setDisabled ] = useState(false)
  const [ options, setOptions ] = useState([])
  const [ formData, setFormData ] = useState({
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
  });

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
    if (selectedOptions.some(obj => obj.service === option.name)) {
      setSelectedOptions(selectedOptions.filter((item) => item.service !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, { service: option.name, basePrice: "" }]);
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

  function validateSendData(sendData) {
    const errors = [];
  
    // Validate name
    if (!sendData.name || typeof sendData.name !== "string") {
      toast.error("Unit name is required.");
    }
  
    // Validate type
    if (!sendData.type || typeof sendData.type !== "string") {
      toast.error("Branch type is required.");
    }
  
    // Validate practice
    if (!sendData.practice || typeof sendData.practice !== "string") {
      toast.error("Practice type is required.");
    }
  
    // Validate currency
    if (!sendData.currency || typeof sendData.currency !== "string") {
      toast.error("Currency is required.");
    }
  
    // Validate addressLine1
    if (!sendData.addressLine1 || typeof sendData.addressLine1 !== "string" || sendData.addressLine1.length < 10) {
      toast.error("Address Line 1 is required, and at least 10 characters long.");
    }
  
    // Validate addressLine2 (optional)
    if (sendData.addressLine2 && typeof sendData.addressLine2 !== "string") {
      toast.error("Address Line 2 if provided.");
    }
  
    // Validate country
    if (!sendData.country || typeof sendData.country !== "string") {
      toast.error("Country is required.");
    }
  
    // Validate state
    if (!sendData.state || typeof sendData.state !== "string") {
      toast.error("State is required.");
    }
  
    // Validate city
    if (!sendData.city || typeof sendData.city !== "string") {
      toast.error("City is required.");
    }
  
    // Validate postalCode
    if (!sendData.postalCode || typeof Number(sendData.postalCode) !== "number" || sendData.postalCode.toString().length < 4) {
      toast.error("Postal Code is required, must be a number, and at least 4 digits long.");
    }
  
    // Validate services
    if (!Array.isArray(sendData.services) || sendData.services.length === 0) {
      toast.error("At least one service is required.");
    } else {
      sendData.services.forEach((service, index) => {
        if (typeof service.basePrice !== "number") {
          toast.error(`Base Price must be a number.`);
        }
      });
    }
  
    // Validate departments
    if (!Array.isArray(sendData.departments) || sendData.departments.length === 0) {
      toast.error("At least one department is required.");
    } 
  
    // Validate appointmentSlots
    if (!Array.isArray(sendData.appointmentSlots) || sendData.appointmentSlots.length === 0) {
      toast.error("At least one appointment slot is required.");
    }
  
    return errors;
  }

  const handleSubmit = () => {
    const appointment = appointmentSlots.find(item => item.id === formData.appointment)

    const services = selectedOptions.map((item) => ({
      serviceId: "675b03becef11a5735b8c16f", // string
      basePrice: Number(item.basePrice), // number
    }))

    const sendData = {
      name: formData.unitName, // string
      type: formData.branchType, // string
      practice: formData.practiceType, // string
      currency: formData.currency, // string
      addressLine1: formData.address1, // string min length 10 letters
      addressLine2: formData.address2, // optional string
      country: formData.country, // string
      state: formData.state, // string
      city: formData.city, // string
      postalCode: formData.postalCode, // number / integer min length 4
      businessUnitId: businessUnitId, // number
      services: services, 
      departments: [
        {
          departmentId: formData.department, // string
        },
      ],
      appointmentSlots: [
        {
          name: appointment.name, // string
          departmentId: formData.department, // string
          reasons: appointment.reasons, // string
        },
      ],
    };

    validateSendData(sendData)
    
    axiosInstance.post("/api/v1/business-branches", sendData)
      .then(response => {
        console.log("Success:", response.data);
        setAlert("Created Successfully")
        navigate("/admin/branch-units")
        setAlert("Created Successfully")
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const handleAddressInputChange = (e) => {
    handleInputChange("address1", e.target.value);
  
    // Fetch autocomplete predictions
    if (!autocompleteServiceRef.current && window.google) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }
  
    if (autocompleteServiceRef.current && e.target.value) {
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: e.target.value,
          componentRestrictions: { country: "in" }, // Restrict to India
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions || []);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };  

  const handleSuggestionClick = (place) => {
    handleInputChange("address1", place.description);
    setSuggestions([]);
    console.log(place); // Pass the selected address back to the parent component
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
            Create Business Unit
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
          {/* Status Change */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            {/* branch name change */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Unit Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 capitalize border placeholder:italic text-sm border-gray-300 focus:outline-none rounded-lg"
                placeholder="Placeholder"
                value={formData.unitName}
                onChange={(e) => handleInputChange("unitName", e.target.value)}
              />
            </div>

            {/* type input */}
            <div className="w-1/2">
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
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
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
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Currency
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 uppercase placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6]"
                disabled
                placeholder="INR"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              />
            </div>
          </div>

          {/* Address Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 1
              </label>
              <GoogleMapsLoader>
                <div className="flex mt-1  border border-gray-300 rounded-lg relative">
                  <div className="p-2 border-r border-[#E1E3EA] rounded-l-lg bg-[#F9F9FA] w-fit">
                    <FaSearch className="text-[#606B85] h-full" />
                  </div>
                  <input
                    type="search"
                    className="w-full capitalize rounded-r-lg focus:outline-none p-2"
                    placeholder="Address line 1"
                    value={formData.address1}
                    onChange={handleAddressInputChange}
                  />
                  {suggestions.length > 0 && (
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
                  )}
                </div>
              </GoogleMapsLoader>
            </div>
            {/* Address Selection 2 */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 2
              </label>
              <input
                type="text"
                className="w-full capitalize mt-1 p-2 placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Placeholder"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* City and State Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                City
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg"
                placeholder="City"
                value={formData.city}
                onChange={(e) => {
                  // Remove numbers from the input value
                  const filteredValue = e.target.value.replace(/[0-9]/g, "");
                  handleInputChange("city", filteredValue);
                }} 
              />
            </div>
            {/* state selection */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                State
              </label>
              {/* <input
                type="text"
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Maharashtra"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              /> */}
              <select
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg classic"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              >
                <option value={""}>State</option>
                {statesInIndia.map((item, index) => (
                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Country Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Country
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6] disabled:opacity-70"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
            {/* postal code selection */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Postal Code
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Postal Code"
                value={formData.postalCode}
                // onChange={(e) =>
                //   handleInputChange("postalCode", e.target.value)
                // }
                onChange={e => {
                  const value = e.target.value;
                  // Allow only numbers and a single decimal point
                  const formattedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                  // Limit to 2 decimal places
                  handleInputChange("postalCode", formattedValue);
                }}
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[calc(50%-25px)]">
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
                      {options?.map((option) => (
                        <li className="p-2" key={option}>
                          <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                              type="checkbox"
                              className="mr-2 placeholder:italic text-sm"
                              checked={selectedOptions.some(obj => obj.service === option.name)}
                              onChange={() => handleCheckboxChange(option)}
                            />
                            <span className="capitalize">
                            {option.name}
                            </span>
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
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[calc(50%-25px)]">
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
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[calc(50%-25px)]">
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

export default CreateBusinessUnit;