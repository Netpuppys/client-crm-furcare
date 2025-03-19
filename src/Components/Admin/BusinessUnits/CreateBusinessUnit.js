import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import axiosInstance from "../../../utils/AxiosInstance";
import statesAndCitiesInIndia from "../../../data/StatesIndia";
import { GoogleMapsLoader } from "../../../utils/GoogleLoaderContext";
import chevronDown from "../../../Assets/icons/chevronDown.png";

const appointmentSlots = [
  {
    id: "675b049dc90ac3a44472a525",
    name: "Morning Slot",
    departmentId: "675b03cdcef11a5735b8c173",
    reasons: ["Check-up", "Follow-up"],
    branchId: "675b049dc90ac3a44472a522",
    active: true,
    createdAt: new Date("2024-12-12T15:43:24.967Z"),
    updatedAt: new Date("2024-12-12T15:43:24.967Z"),
  },
];

const branchTypeValues = [
  "Hospital, Clinic",
  "Boarding Centre",
  "Shelter Home",
  "Mobile Clinic"
]

const practiceType = [
  "Emergency/Critical Animal Care",
  "General practice",
  "Boarding",
  "Specialty",
  "Primary Care",
  "Secondary Care",
  "Veterinary Teaching Facility"
]

// const departments = [
//   {
//     id: "675b03cdcef11a5735b8c173",
//     name: "department A",
//     createdAt: new Date("2024-12-12T15:39:56.279Z"),
//     updatedAt: new Date("2024-12-12T15:39:51.502Z")
//   }
// ];

const CreateBusinessUnit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const placesServiceRef = useRef(null);

  const businessUnitId = location.state?.businessUnitId;

  const autocompleteServiceRef = useRef(null);

  const { setAlert } = useAlertContext();

  const [suggestions, setSuggestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [options, setOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownDept, setShowDropdownDept] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    axiosInstance
      .get("/api/v1/services")
      .then((res) => {
        setOptions(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axiosInstance
      .get("/api/v1/departments")
      .then((res) => {
        setDepartments(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const requiredFields = [
      "unitName",
      "branchType",
      "practiceType",
      "currency",
      "address1",
      "city",
      "state",
      "country",
      "postalCode",
    ];
    const checkFromdata = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    const checkService = selectedOptions.every(
      (item) => typeof Number(item.basePrice) === "number" && item.basePrice > 0
    );

    if (
      checkFromdata &&
      selectedOptions.length > 0 &&
      checkService &&
      selectedDepartments.length > 0 &&
      selectedAppointments.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData, selectedOptions, selectedDepartments, selectedAppointments]);

  // service change
  const handleCheckboxChange = (option) => {
    if (selectedOptions.some((obj) => obj.service === option.name)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item.service !== option.name)
      );
    } else {
      setSelectedOptions([
        ...selectedOptions,
        { service: option.name, basePrice: "" },
      ]);
    }
  };

  const handleDeleteService = (option) => {
    setSelectedOptions((prev) =>
      prev.filter((item) => item.service !== option)
    );
  };

  // department change
  const handleCheckboxDepartmentChange = (option) => {
    if (selectedDepartments.some((obj) => obj.id === option.id)) {
      setSelectedDepartments(
        selectedDepartments.filter((item) => item.id !== option.id)
      );
    } else {
      setSelectedDepartments([
        ...selectedDepartments,
        { name: option.name, id: option.id },
      ]);
    }
  };

  useEffect(() => {
    setSelectedAppointments(
      selectedDepartments.map((_) => ({
        name: appointmentSlots[0].name,
      }))
    );
  }, [selectedDepartments]);

  const handleDeleteDepartment = (option) => {
    setSelectedDepartments((prev) =>
      prev.filter((item) => item.id !== option.id)
    );
  };

  const handleServicePrice = (value, index) => {
    setSelectedOptions((prev) => {
      const arr = [...prev];
      arr[index].basePrice = value;

      return arr;
    });
  };

  const handleSubmit = () => {
    // const appointment = appointmentSlots.find(item => item.id === formData.appointment)

    const services = selectedOptions.map((item) => ({
      serviceId: "675b03becef11a5735b8c16f", // string
      basePrice: Number(item.basePrice), // number
    }));

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
      departments: selectedDepartments.map((item) => ({
        departmentId: item.id,
      })),
      appointmentSlots: [
        {
          name: "Morning Slot", // string
          departmentId: "675b03cdcef11a5735b8c173", // string
          reasons: ["Check-up", "Follow-up"], // string
        },
      ],
    };

    // validateSendData(sendData)

    axiosInstance
      .post("/api/v1/business-branches", sendData)
      .then((response) => {
        console.log("Success:", response.data);
        setAlert("Created Successfully");
        navigate("/admin/branch-units");
        setAlert("Created Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddressInputChange = (e) => {
    handleInputChange("address1", e.target.value);

    // Fetch autocomplete predictions
    if (!autocompleteServiceRef.current && window.google) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
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
    // handleInputChange("address1", place.description);
    setSuggestions([]);

    // Initialize Places Service if needed
    if (!placesServiceRef.current && window.google) {
      const dummyDiv = document.createElement("div");
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        dummyDiv
      );
    }

    // Get place details
    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails(
        { placeId: place.place_id },
        (placeDetails, status) => {
          console.log("Place Details:", placeDetails);
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const addressComponents = placeDetails.address_components || [];
            let addressLine1 = "";
            let addressLine2 = "";
            let city = "";
            let state = "";
            let postalCode = "";

            console.log(addressComponents)
            addressComponents.forEach((component) => {
              const types = component.types;
              if (
                // types.includes("plus_code") ||
                types.includes("subpremise") ||
                types.includes("premise") ||
                types.includes("street_number") ||
                types.includes("route")
              ) {
                addressLine1 += component.long_name + " ";
              } else if (
                types.includes("sublocality") ||
                types.includes("neighborhood")
              ) {
                addressLine2 += component.long_name + " ";
              } else if (types.includes("locality")) {
                city = component.long_name;
              } else if (
                types.includes("administrative_area_level_2") &&
                !city
              ) {
                city = component.long_name;
              } else if (types.includes("administrative_area_level_1")) {
                state = component.long_name;
              } else if (types.includes("postal_code")) {
                postalCode = component.long_name;
              }
            });

            // Update form data
            setFormData((prev) => ({
              ...prev,
              address1: addressLine1.trim(),
              address2: addressLine2.trim(),
              city: city,
              state: state,
              postalCode: postalCode,
            }));
          }
        }
      );
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4.75rem)] hideScrollbar overflow-scroll px-8 py-4 pb-10">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <p className="underline inline cursor-default">Admin</p>
          <span> / </span>
          <Link to={"/admin/branch-units"} className="underline">
            Business Units
          </Link>
          <span> / </span>
          <p className="underline inline cursor-default">
            Create Business Unit
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          {/* <Link to={"/admin/branch-units"}> */}
          <button
            onClick={() => navigate("/admin/branch-units")}
            className="bg-[#FFFFFF] border border-[#CACDD8] px-3 h-[2.375rem] rounded-md flex text-[#121C2D] font-semibold text-sm items-center justify-center"
          >
            Cancel
          </button>
          {/* </Link> */}

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
        <div className="flex w-[80%] h-full flex-col justify-start items-end bg-white rounded-md space-y-6">
          {/* Status Change */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            {/* branch name change */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Unit Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 capitalize border placeholder:italic text-sm border-[#8891AA] focus:outline-none rounded-md"
                placeholder="Placeholder"
                value={formData.unitName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                    handleInputChange("unitName", value);
                  }
                }}
              />
            </div>

            {/* type input */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Type
              </label>
              <select
                className="w-full classic mt-1 capitalize placeholder:italic text-sm p-2 border border-[#8891AA] rounded-md focus:outline-none"
                value={formData.branchType}
                onChange={(e) =>
                  handleInputChange("branchType", e.target.value)
                }
              >
                <option value="">Placeholder</option>
                {branchTypeValues.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Practice Type Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Practice Type
              </label>
              <select
                className="w-full classic mt-1 p-2 capitalize placeholder:italic text-sm border border-[#8891AA] rounded-md focus:outline-none"
                value={formData.practiceType}
                onChange={(e) =>
                  handleInputChange("practiceType", e.target.value)
                }
              >
                <option value="">Placeholder</option>
                {practiceType.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            {/* currency selection */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Currency
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 uppercase placeholder:italic text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
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
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 1
              </label>
              <GoogleMapsLoader>
                <div className="flex mt-1  border border-[#8891AA] rounded-md relative">
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
                    <ul className="absolute top-full list-none mt-2 z-50 bg-white border border-[#8891AA] rounded-md shadow-md w-full">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.place_id}
                          className="px-4 py-2 text-sm list-none cursor-pointer border-b last:border-b-0 border-[#E1E3EA] hover:bg-gray-100"
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
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 2
              </label>
              <input
                type="text"
                className="w-full capitalize mt-1 p-2 placeholder:italic text-sm border border-[#8891AA] focus:outline-none rounded-md"
                placeholder="Placeholder"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* City and State Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                City
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-[#8891AA] focus:outline-none rounded-md"
                placeholder="City"
                value={formData.city}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    handleInputChange("city", value);
                  }
                }}
              />
            </div>
            {/* state selection */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                State
              </label>
              <select
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-[#8891AA] focus:outline-none rounded-md classic"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              >
                <option value={""}>State</option>
                {statesAndCitiesInIndia.map((item, index) => (
                  <option key={index} value={item.state}>
                    {item.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Country Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Country
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6] disabled:opacity-70"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
            {/* postal code selection */}
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Postal Code
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 capitalize placeholder:italic text-sm border border-[#8891AA] focus:outline-none rounded-md"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers and a single decimal point
                  const formattedValue = value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1");

                  if (
                    /^\d*$/.test(formattedValue) &&
                    formattedValue.length <= 6
                  ) {
                    handleInputChange("postalCode", formattedValue);
                  }
                }}
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[calc(50%-25px)]">
              <label className="font-medium mb-1 text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Service(s)
              </label>
              <div className="w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
                <div
                  className={`w-full flex items-center justify-between gap-1 h-full`}
                >
                  {selectedOptions.length === 0 && (
                    <div className="px-2">
                      <p className="text-sm text-[#121C2D] font-medium">
                        Select
                      </p>
                    </div>
                  )}

                  <div className="flex px-3 py-1 w-full h-full items-center flex-wrap gap-1">
                    {selectedOptions?.map((option, index) => (
                      <span
                        className="bg-[#F4F9FF] border capitalize border-[#CCE4FF] text-[#121C2D] px-2 h-full rounded-full text-sm flex items-center"
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

                  <div className="h-full aspect-square flex items-center justify-center">
                    <button
                      onClick={() => setShowDropdown((prev) => !prev)}
                      className="flex items-center justify-center w-5 h-5 aspect-square"
                    >
                      <img
                        src={chevronDown}
                        className={`w-full h-full object-contain transition-all ${
                          showDropdown ? "rotate-180" : ""
                        }`}
                        alt="chevron down"
                      />
                    </button>
                  </div>
                </div>

                {showDropdown && (
                  <div
                    // ref={dropdownRef}
                    className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#F4F4F6] hideScrollbar border-[#8891AA] z-50 max-h-52 overflow-y-auto"
                  >
                    <ul className="list-none p-0 m-0">
                      {options?.map((option, index) => (
                        <li className="p-2" key={index}>
                          <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                              type="checkbox"
                              className="mr-2 placeholder:italic text-sm"
                              checked={selectedOptions.some(
                                (obj) => obj.service === option.name
                              )}
                              onChange={() => handleCheckboxChange(option)}
                            />
                            <span className="capitalize">{option.name}</span>
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
                    <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                      <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                      {service.service}
                    </label>
                    <div className="flex mt-1 overflow-hidden border border-[#8891AA] rounded-md">
                      <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                        <p className="text-[#606B85] text-sm h-full">
                          {formData.currency ? formData.currency : "INR"}
                        </p>
                      </div>
                      <input
                        className="w-full p-2 placeholder:italic text-sm classic focus:outline-none"
                        value={selectedOptions[index].basePrice}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow only numbers and a single decimal point
                          const formattedValue = value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*?)\..*/g, "$1");
                          // Limit to 2 decimal places
                          const twoDecimalValue =
                            formattedValue.match(/^\d+(\.\d{0,2})?/)?.[0] || "";
                          handleServicePrice(twoDecimalValue, index);
                        }}
                        type="text"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Department Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[calc(50%-25px)]">
              <label className="font-medium mb-1 text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Department(s)
              </label>

              <div className="w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
                <div
                  className={`w-full h-full relative gap-1 flex items-center justify-between`}
                >
                  {selectedDepartments.length === 0 && (
                    <div className="px-2">
                      <p className="text-sm text-[#121C2D] font-medium">
                        Select
                      </p>
                    </div>
                  )}

                  <div className="flex w-full h-full items-center py-1 px-3 flex-wrap gap-1">
                    {selectedDepartments?.map((option, index) => (
                      <span
                        className="bg-[#F4F9FF] border capitalize border-[#CCE4FF] text-[#121C2D] px-2 h-full rounded-full text-sm flex items-center"
                        key={index}
                      >
                        {option.name}
                        <button
                          className="ml-2 text-[#606B85]"
                          onClick={() => handleDeleteDepartment(option)}
                        >
                          <IoClose />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="h-full aspect-square flex items-center justify-center">
                    <button
                      onClick={() => setShowDropdownDept((prev) => !prev)}
                      className="flex items-center justify-center w-5 h-5 aspect-square"
                    >
                      <img
                        src={chevronDown}
                        className={`w-full h-full object-contain transition-all ${
                          showDropdownDept ? "rotate-180" : ""
                        }`}
                        alt="chevron down"
                      />
                    </button>
                  </div>
                </div>

                {showDropdownDept && (
                  <div className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#F4F4F6] hideScrollbar border-[#8891AA] z-50 max-h-52 overflow-y-auto">
                    <ul className="list-none p-0 m-0">
                      {departments?.map((option, index) => (
                        <li className="p-2" key={index}>
                          <label className="flex w-full items-center cursor-pointer capitalize">
                            <input
                              type="checkbox"
                              className="mr-2 placeholder:italic text-sm"
                              checked={selectedDepartments.some(
                                (obj) => obj.id === option.id
                              )}
                              onChange={() =>
                                handleCheckboxDepartmentChange(option)
                              }
                            />
                            <span className="capitalize">{option.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Appointment Selection */}
          <div className="flex w-full items-center justify-between gap-[50px]">
            <div className="w-[calc(50%-25px)]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Appointment Slot(s)
              </label>

              <div className="mt-1 w-full h-[2.25rem] border border-[#CACDD8] bg-[#F4F4F6] relative rounded-md">
                <div
                  className={`w-full h-full relative gap-1 flex items-center justify-between`}
                >
                  {selectedAppointments.length === 0 && (
                    <div className="px-2">
                      <p className="text-sm text-[#AEB2C1] font-medium">
                        Select
                      </p>
                    </div>
                  )}

                  <div className="flex w-full h-full items-center flex-wrap px-3 py-1 gap-1">
                    {selectedAppointments?.map((option, index) => (
                      <span
                        className="bg-[#E1E3EA] border capitalize text-[#121C2D] px-2 h-full rounded-full text-sm flex items-center"
                        key={index}
                      >
                        {option.name}
                        <button
                          className="ml-2 text-[#606B85]"
                          onClick={() => handleDeleteDepartment(option)}
                        >
                          <IoClose />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="h-full aspect-square flex items-center justify-center">
                    <button
                      disabled
                      className="flex items-center justify-center w-5 h-5 aspect-square"
                    >
                      <img
                        src={chevronDown}
                        className={`w-full h-full object-contain transition-all`}
                        alt="chevron down"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBusinessUnit;
