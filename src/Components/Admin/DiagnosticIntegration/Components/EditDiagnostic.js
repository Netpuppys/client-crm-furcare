import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlueButton from "../../../../ui/BlueButton";
import statesAndCitiesInIndia from "../../../../data/StatesIndia";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAppContext } from "../../../../utils/AppContext";
import { useAlertContext } from "../../../../utils/AlertContext";
import { GoogleMapsLoader } from "../../../../utils/GoogleLoaderContext";
import { toast } from "react-toastify";
import ActiveButtons from "../../../../ui/ActiveButtons";

const EditDiagnostic = ({ editDiagnostic, fetchDiagnosticsDetails }) => {
  const { setAlert } = useAlertContext();
  const { selectedBranch } = useAppContext();

  const autocompleteServiceRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(editDiagnostic.active);
  const [formData, setFormData] = useState({
    name: editDiagnostic.name,
    address1: editDiagnostic.addressLine1,
    address2: editDiagnostic.addressLine2,
    city: editDiagnostic.city,
    state: editDiagnostic.state,
    country: editDiagnostic.country,
    postalCode: editDiagnostic.postalCode,
  });

  useEffect(() => {
    if (
      (formData.name?.replace(/\s/g, "") === "" ||
        formData.name?.replace(/\s/g, "") ===
          editDiagnostic.name.replace(/\s/g, "")) &&
      (formData.address1 === "" ||
        formData.address1 === editDiagnostic.addressLine1) &&
      (formData.address2 === "" ||
        formData.address2 === editDiagnostic.addressLine2) &&
      (formData.city === "" || formData.city === editDiagnostic.city) &&
      (formData.state === "" || formData.state === editDiagnostic.state) &&
      (formData.country === "" ||
        formData.country === editDiagnostic.country) &&
      (Number(formData.postalCode) === "" ||
        Number(formData.postalCode) === Number(editDiagnostic.postalCode)) &&
      active === editDiagnostic.active
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData, editDiagnostic, active]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const businessInfo = {
      name: formData.name,
      addressLine1: formData.address1,
      addressLine2: formData.address2,
      city: formData.city,
      active: active,
      state: formData.state,
      country: formData.country,
      postalCode: formData.postalCode,
      url: "https://www.johnselectronics.com",
      businessBranchId: selectedBranch.id,
    };

    axiosInstance
      .patch(
        `/api/v1/diagnostic-integrations/${editDiagnostic.id}`,
        businessInfo
      )
      .then((res) => {
        console.log(res);
        setAlert("Updated Successfully");
        fetchDiagnosticsDetails();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
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
  const placesServiceRef = useRef(null);
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

            console.log(addressComponents);
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
    <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-md space-y-6">
      {/* Name Input */}
      <div className="flex flex-col w-full">
        <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div> Name{" "}
        </label>
        <input
          type="text"
          className="mt-1 p-2 border capitalize border-[#8891AA] focus:outline-none rounded-md"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z0-9\s]*$/.test(value)) {
              handleInputChange("name", value);
            }
          }}
        />
      </div>

      {/* Address Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
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
                <ul className="absolute top-full mt-2 z-50 bg-white border border-[#8891AA] rounded-md shadow-md w-full">
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
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Address line 2
          </label>
          <input
            type="text"
            className="w-full capitalize mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md"
            placeholder="Address line 2"
            value={formData.address2}
            onChange={(e) => handleInputChange("address2", e.target.value)}
          />
        </div>
      </div>

      {/* City and State Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            City
          </label>
          <input
            type="text"
            className="w-full capitalize mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md"
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
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            State
          </label>
          <select
            className="w-full capitalize mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md classic"
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

      {/* Country and Postal Code Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Country
          </label>
          <input
            type="text"
            disabled
            className="w-full capitalize mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6] disabled:opacity-70"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          />
        </div>

        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Postal Code
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md"
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

      <ActiveButtons active={active} setActive={setActive} />

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
