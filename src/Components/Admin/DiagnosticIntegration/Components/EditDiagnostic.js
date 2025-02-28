import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import BlueButton from "../../../../ui/BlueButton";
import statesInIndia from "../../../../data/StatesIndia";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAppContext } from "../../../../utils/AppContext";
import { useAlertContext } from "../../../../utils/AlertContext";
import { GoogleMapsLoader } from "../../../../utils/GoogleLoaderContext";

const EditDiagnostic = ({
    editDiagnostic,
    fetchDiagnosticsDetails,
  }) => {
    
    const { setAlert } = useAlertContext()
    const { selectedBranch } = useAppContext()
  
    const autocompleteServiceRef = useRef(null);
  
    const [ suggestions, setSuggestions ] = useState([]);
    const [ disabled, setDisabled ] = useState(true)
    const [ formData, setFormData ] = useState({
      name: editDiagnostic.name,
      address1: editDiagnostic.addressLine1,
      address2: editDiagnostic.addressLine2,
      city: editDiagnostic.city,
      state: editDiagnostic.state,
      country: editDiagnostic.country,
      postalCode: editDiagnostic.postalCode
    });
  
    // useEffect(() => {
    //   setFormData({
    //     name: editDiagnostic.name,
    //     address1: editDiagnostic.addressLine1,
    //     address2: editDiagnostic.addressLine2,
    //     city: editDiagnostic.city,
    //     state: editDiagnostic.state,
    //     country: editDiagnostic.country,
    //     postalCode: editDiagnostic.postalCode
    //   })
    // }, [editDiagnostic])

    useEffect(() => {
        // console.log(formData, editDiagnostic)

        // console.log(formData.name.replace(/\s/g, "") === editDiagnostic.name.replace(/\s/g, ""))
        // console.log(formData.name.replace(/\s/g, "") === editDiagnostic.name.replace(/\s/g, ""))
        // console.log(formData.address2.replace(/\s/g, "") === editDiagnostic.addressLine2.replace(/\s/g, ""))
        // console.log(formData.city.replace(/\s/g, "") === editDiagnostic.city.replace(/\s/g, ""))
        // console.log(formData.state.replace(/\s/g, "") === editDiagnostic.state.replace(/\s/g, ""))
        // console.log(formData.country.replace(/\s/g, "") === editDiagnostic.country.replace(/\s/g, ""))
        // console.log(Number(formData.postalCode) === Number(editDiagnostic.postalCode))

        if (
            (formData.name?.replace(/\s/g, "") === "" || formData.name?.replace(/\s/g, "") === editDiagnostic.name.replace(/\s/g, "")) &&
            (formData.address1?.replace(/\s/g, "") === ""  || formData.address1?.replace(/\s/g, "") === editDiagnostic.addressLine1.replace(/\s/g, "")) &&
            (formData.address2?.replace(/\s/g, "") === "" || formData.address2?.replace(/\s/g, "") === editDiagnostic.addressLine2.replace(/\s/g, "")) &&
            (formData.city?.replace(/\s/g, "") === "" || formData.city?.replace(/\s/g, "") === editDiagnostic.city?.replace(/\s/g, "")) &&
            (formData.state?.replace(/\s/g, "") === "" || formData.state?.replace(/\s/g, "") === editDiagnostic.state?.replace(/\s/g, "")) &&
            (formData.country?.replace(/\s/g, "") === "" || formData.country?.replace(/\s/g, "") === editDiagnostic.country?.replace(/\s/g, "")) &&
            (Number(formData.postalCode) === "" || Number(formData.postalCode) === Number(editDiagnostic.postalCode))
        ) {
            setDisabled(true)
            return
        }

        setDisabled(false)
    }, [formData, editDiagnostic])
  
    const handleInputChange = (key, value) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };
  
    const handleSubmit = () => {

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
        .patch(`/api/v1/diagnostic-integrations/${editDiagnostic.id}`, businessInfo)
        .then(res => {
          console.log(res)
          setAlert("Updated Successfully")
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
            <BlueButton
                disabled={disabled}
                text={"Save"}
                onClickHandler={handleSubmit}
            />
        </div>
      </div>
    );
};

export default EditDiagnostic;