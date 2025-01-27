import React, { useEffect, useRef, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useAppContext } from "../../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import statesInIndia from "../../../data/StatesIndia";
import BlueButton from "../../../ui/BlueButton";
import { GoogleMapsLoader } from "../../../utils/GoogleLoaderContext";

const DiagnosticTable = ({ diagnosticIntegrationsData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#F9F9FA]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Name</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Location</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Postal Code</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              URL
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Status</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E1E3EA]">
          {diagnosticIntegrationsData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-[#121C2D] capitalize">{item.name}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D] capitalize">
                {item.city}{", "}{item.state}
              </td>
              <td className="px-4 py-2 text-sm text-[#121C2D] capitalize">
                {item.postalCode}
              </td>
              <td className="px-4 py-2 text-sm">
                <a target="blank" href={item.url} className="text-blue-600 underline">
                  link
                </a>
              </td>
              <td className="px-4 py-2 text-sm flex items-center capitalize">
                <div
                  className={`w-3 aspect-square ${
                    item.active? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rotate-45 rounded-sm"
                  }`}
                ></div>
                <span
                  className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                >
                  {item.active? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CreateNewForm = ({ fetchDiagnosticsDetails }) => {
  const { setAlert } = useAlertContext()

  const { selectedBranch } = useAppContext()

  const autocompleteServiceRef = useRef(null);

  const [ suggestions, setSuggestions ] = useState([]);
  const [ disabled, setDisabled ] = useState(true)
  const [ formData, setFormData ] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "India",
    postalCode: ""
  });

  useEffect(() => {
    setFormData({
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "India",
      postalCode: ""
    })
  }, [])

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const requiredFields = ["name", "address1", "city", "state", "country", "postalCode"];
    const missingFields = requiredFields.filter((field) => !formData[field]?.trim());

    if (missingFields.length > 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [formData])

  const handleSubmit = () => {
    // Validation logic
    const requiredFields = ["name", "address1", "city", "state", "country", "postalCode"];
    const missingFields = requiredFields.filter((field) => !formData[field]?.trim());

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    // Log the form data
    console.log("Submitted Form Data: ", formData);

    const businessInfo = {
      name: formData.name,
      addressLine1: formData.address1,
      addressLine2: formData.address2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      postalCode: formData.postalCode,
      url: "https://www.johnselectronics.com",
      businessBranchId: selectedBranch.id
    };

    axiosInstance
      .post(`/api/v1/diagnostic-integrations`, businessInfo)
      .then(res => {
        console.log(res)
        setAlert("Submitted Successfully")
        fetchDiagnosticsDetails()
      })
      .catch(err => {
        console.error(err)
      })
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
    <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-lg space-y-6">
      {/* Name Input */}
      <div className="flex flex-col w-full">
        <label className="font-medium text-[#121C2D] flex items-center gap-2">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div> Name{" "}
        </label>
        <input
          type="text"
          className="mt-1 p-2 border capitalize border-gray-300 focus:outline-none rounded-lg"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      {/* Address Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
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

        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Address line 2
          </label>
          <input
            type="text"
            className="w-full capitalize mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="Address line 2"
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
            className="w-full capitalize mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="City"
            value={formData.city}
            onChange={(e) => {
              // Remove numbers from the input value
              const filteredValue = e.target.value.replace(/[0-9]/g, "");
              handleInputChange("city", filteredValue);
            }}          
          />
        </div>
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            State
          </label>
          {/* <input
            type="text"
            className="w-full capitalize mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="State"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          /> */}
          <select
            className="w-full capitalize mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg classic"
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

      {/* Country and Postal Code Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Country
          </label>
          <input
            type="text"
            disabled
            className="w-full capitalize mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg disabled:bg-[#F4F4F6] disabled:opacity-70"
            placeholder="Country"
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
             onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers and limit the length to 6
              if (/^\d*$/.test(value) && value.length <= 6) {
                handleInputChange("postalCode", value);
              }
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end ">
        <button
          disabled={disabled}
          className="py-2 px-4 disabled:bg-gray-400 bottom-0 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const DiagnosticIntegrationPage = () => {
  const [ createNew, setCreateNew] = useState(false);
  const [ diagnosticIntegrationsData, setDiagnosticIntegrationsData ] = useState([])

  const navigate = useNavigate()

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
}

  useEffect(() => {
    axiosInstance
      .get("/api/v1/diagnostic-integrations")
      .then(res => {
        const response = res.data.data.data
        console.log(response)
        setDiagnosticIntegrationsData(response)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const fetchDiagnosticsDetails = () => {
    axiosInstance
      .get("/api/v1/diagnostic-integrations")
      .then(res => {
        const response = res.data.data.data
        console.log(response)
        setDiagnosticIntegrationsData(response)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleCreateNew = () => {
    setCreateNew(true)
  }

  return (
    <div className="w-full min-h-full px-8 py-4">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <button
            onClick={handleAdminClick}
            className="underline inline"
          >
            Admin
          </button>
          <span> / </span>
          <p
            className="underline inline cursor-default"
          >
            Diagnostic Integration
          </p>
        </div>
        <BlueButton
          onClickHandler={handleCreateNew}
          text={"Create"}
        />
      </div>

      <div className="w-full mt-6">
        <DiagnosticTable 
          diagnosticIntegrationsData={diagnosticIntegrationsData}
        />
      </div>

      <div
        className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
          createNew ? "right-0 block" : "right-full hidden z-50"
        } `}
      >
        <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
          <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
            Create Diagnostic Integration
          </p>
          <button onClick={() => setCreateNew(false)} className="">
            <img src={closeIcon} className="w-7 " alt="" />
          </button>
        </div>

        <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
          {createNew &&
          <CreateNewForm
            fetchDiagnosticsDetails={fetchDiagnosticsDetails}
          />}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticIntegrationPage;
