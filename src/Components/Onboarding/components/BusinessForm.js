import { useEffect, useRef, useState } from "react";
import { GoogleMapsLoader } from "../../../utils/GoogleLoaderContext";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../../utils/AxiosInstance";
import statesAndCitiesInIndia from "../../../data/StatesIndia";

export default function BusinessForm({ sendData, setSendData }) {
  const placesServiceRef = useRef(null);

  const autocompleteServiceRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [noOfBranches, setNoOfbranches] = useState(1);
  const [allAnimalClasses, setAllAnimalClasses] = useState([]);
  const [selectedAnimalClass, setSelectedAnimalClass] = useState();

  useEffect(() => {
    axiosInstance
      .get("/api/v1/animal-classes")
      .then((res) => {
        setAllAnimalClasses(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAddressInputChange = (index, value ) => {
    updateBusinessBranch(index, "addressLine1", value);

    // Fetch autocomplete predictions
    if (!autocompleteServiceRef.current && window.google) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (autocompleteServiceRef.current && value) {
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: value,
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

  const handleAddBranches = (e) => {
    setNoOfbranches(Number(e.target.value));

    setSendData((prev) => {
      let arr = Array.from({ length: Number(e.target.value) }, (_, i) => ({
        name: `Branch ${i + 1}`,
        type: "",
        practice: "",
        currency: "INR",
        addressLine1: "",
        addressLine2: "",
        country: "India",
        state: "",
        city: "",
        postalCode: "",
      }));

      return { ...prev, businessBranches: arr };
    });
  };

  const handleChange = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };

  const handleAnimalClass = (item) => {
    const animal = JSON.parse(item);

    setSelectedAnimalClass(item);

    setSendData({ ...sendData, animalClasses: [animal.id] });
  };

  const updateBusinessBranch = (index, field, value) => {
    setSendData((prevData) => {
      const updatedBranches = prevData.businessBranches.map((branch, i) =>
        i === index ? { ...branch, [field]: value } : branch
      );

      return { ...prevData, businessBranches: updatedBranches };
    });
  };

  // const handleSuggestionClick = (place, index) => {
  //   updateBusinessBranch(index, "address1", place.description);
  //   setSuggestions([]);
  // };

  const handleSuggestionClick = (place, index) => {
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

            updateBusinessBranch(index, "addressLine1", addressLine1.trim())
            updateBusinessBranch(index, "address2", addressLine2.trim())
            updateBusinessBranch(index, "city", city)
            updateBusinessBranch(index, "state", state)
            updateBusinessBranch(index, "postalCode", postalCode)
          }
        }
      );
    }
  };

  return (
    <div className="w-full py-4 overflow-visible">
      <form className="w-full flex flex-col gap-6">
        <div className="flex gap-12">
          {/* Business Unit Type */}
          <div className="flex w-[calc(40%-3rem)] flex-col gap-1">
            <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
              <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
              Business Unit Type
            </label>
            <select
              name="type"
              className="border rounded-md p-2 focus:outline-none text-sm border-[#8891AA] classic"
              onChange={handleChange}
              value={sendData.type}
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
              name="name"
              type="text"
              placeholder="Business Unit Name"
              className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA]"
              value={sendData.name}
              onChange={handleChange}
              minLength={3}
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
              onChange={handleAddBranches}
              value={noOfBranches}
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full h-[1px] border-t -mt-2 -mb-1 border-black border-dashed border-opacity-30"></div>

        {sendData.businessBranches.map((branch, index) => (
          <div key={index} className="w-full flex flex-col gap-6">
            <div className="flex gap-12">
              {/* Branch Type */}
              <div className="flex w-[calc(40%-3rem)] flex-col gap-1">
                <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                  <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                  Branch Type
                </label>
                <select
                  name="branchType"
                  className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic"
                  onChange={(e) =>
                    updateBusinessBranch(index, "type", e.target.value)
                  }
                  value={branch.type}
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
                  onChange={(e) =>
                    updateBusinessBranch(index, "practice", e.target.value)
                  }
                  value={branch.practice}
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
                  value={branch.currency}
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
                      value={branch.addressLine1}
                      onChange={(e) =>
                        handleAddressInputChange(
                          index,
                          e.target.value
                        )
                      }
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute list-none top-full mt-2 z-50 bg-white border border-[#8891AA] rounded-md shadow-md w-full">
                        {suggestions.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            className="px-4 py-2 list-none text-sm cursor-pointer border-b last:border-b-0 border-[#E1E3EA] hover:bg-gray-100"
                            onClick={() =>
                              handleSuggestionClick(suggestion, index)
                            }
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}
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
                  className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] placeholder:italic"
                  placeholder="Building A-101"
                  value={branch.addressLine2}
                  onChange={(e) =>
                    updateBusinessBranch(index, "addressLine2", e.target.value)
                  }
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
                  disabled={branch.state ? false : true}
                  className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA] classic"
                  onChange={(e) =>
                    updateBusinessBranch(index, "city", e.target.value)
                  }
                  value={branch.city}
                >
                  <option value="">Select</option>
                  {statesAndCitiesInIndia
                    .find((item) => item.state === branch.state)
                    ?.cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
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
                  onChange={(e) =>
                    updateBusinessBranch(index, "state", e.target.value)
                  }
                  value={branch.state}
                >
                  <option value="">Select</option>
                  {statesAndCitiesInIndia.map((item, index) => (
                    <option key={index} value={item.state}>
                      {item.state}
                    </option>
                  ))}
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
                    value={branch.country}
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
                    type="text"
                    placeholder="Postal Code"
                    className="border rounded-md focus:outline-none p-2 text-sm border-[#8891AA]"
                    value={branch.postalCode}
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
                        updateBusinessBranch(
                          index,
                          "postalCode",
                          formattedValue
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {sendData.businessBranches.length > 1 && (
              <div className="w-full h-[1px] border-t -mt-2 -mb-1 border-black border-dashed border-opacity-30"></div>
            )}
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
            onChange={(e) => handleAnimalClass(e.target.value)}
            value={selectedAnimalClass}
          >
            <option value={JSON.stringify({})}>Select</option>
            {allAnimalClasses.map((item, index) => (
              <option value={JSON.stringify(item)} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
