import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import axiosInstance from "../../../utils/AxiosInstance";
import { useAppContext } from "../../../utils/AppContext";
import HandleEditServices from "./components/HandleEditServices";
import { toast } from "react-toastify";
import HandleEditDepartments from "./components/HandleEditDepartments";

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

const EditBusinessUnit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceBoxRef = useRef(null);
  const departmentRef = useRef(null);

  const businessUnitData = location.state?.businessUnitData;

  const { setAlert } = useAlertContext();

  const { setSelectedBranch } = useAppContext()

  // services
  const [ changedService, setChangedService ] = useState([])
  const [ options, setOptions] = useState([]);
  const [ activeServices, setActiveServices ] = useState([])
  const [ inActiveServices, setInactiveServices ] = useState([])
  const [ selectedOptions, setSelectedOptions] = useState(
    businessUnitData.services.map((item) => {
      return {
      service: item.serviceDetails.name,
      basePrice: item.basePrice,
      serviceId: item.serviceId,
      active: item.active,
      type: "server"
    }})
  );
  // departments
  const [ departments, setDepartments ] = useState([])
  const [ activeDepartments, setActiveDepartments ] = useState([])
  const [ inactiveDepartments, setInactiveDepartments ] = useState([])
  const [ selectedDepartments, setSelectedDepartments ] = useState(businessUnitData.departments.length> 0?
    businessUnitData.departments.map(item => (
      { 
        name: item?.departmentDetails.name, 
        id: item?.departmentDetails.id,
        active: item.active,
        type: "server"
      }
    )) : [])
  // appointment slots
  const [ appointmentSlots, setAppointmentSlots ] = useState([])
  const [ activeSlots, setActiveSlots ] = useState([])
  const [ inactiveSlots, setInactiveSlots ] = useState([])
  const [ selectedAppointments, setSelectedAppointments ] = useState(businessUnitData.appointmentSlots.length> 0?
    businessUnitData.appointmentSlots.map(item => (
      { 
        name: item?.name, 
        id: item?.id,
        departmentId: item.departmentId,
        active: item.active,
        type: "server"
      }
    )) : [])
  // others
  const [ disabled, setDisabled] = useState(false);
  const [ showDropdown, setShowDropdown ] = useState(false)
  const [ showDropdownDept, setShowDropdownDept ] = useState(false)
  
  const [ formData, setFormData] = useState({
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
    department: "",
    appointment: "675b049dc90ac3a44472a525",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (serviceBoxRef.current && !serviceBoxRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (departmentRef.current && !departmentRef.current.contains(event.target)) {
        setShowDropdownDept(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/services`)
      .then((res) => {
        setOptions(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axiosInstance
      .get(`/api/v1/departments`)
      .then((res) => {
        setDepartments(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

      axiosInstance
      .get("/api/v1/appointment")
      .then((res) => {
        const response = res.data.data
        setAppointmentSlots(response);
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

    const valueChanged =
      formData.active === businessUnitData.active &&
      formData.unitName === businessUnitData.name &&
      formData.branchType === businessUnitData.type &&
      formData.practiceType === businessUnitData.practice &&
      formData.currency === businessUnitData.currency &&
      formData.address1 === businessUnitData.addressLine1 &&
      formData.address2 === businessUnitData.addressLine2 &&
      formData.city === businessUnitData.city &&
      formData.state === businessUnitData.state &&
      formData.country === businessUnitData.country &&
      formData.postalCode === businessUnitData.postalCode &&
      formData.appointment === "675b049dc90ac3a44472a525";


    if (checkFromdata && !valueChanged) {
      setDisabled(false);
    } else if (changedService.length>0 || inActiveServices.length>0 || activeServices.length>0 || selectedOptions.length !== businessUnitData.services.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData, selectedOptions, businessUnitData, changedService, activeServices, inActiveServices]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleServicePrice = (value, index, serviceId, serviceType) => {
    setSelectedOptions((prev) => {
      const arr = [...prev];
      arr[index].basePrice = value;

      return arr;
    });

    if (serviceType === "server") {
      setChangedService(prev => {
        const arr = [...prev];
        const selected = arr.find(item => item.serviceId === serviceId)

        if (!selected) {
          arr.push({
            basePrice: value,
            serviceId: serviceId
          })

          return arr;
        } else {
          selected.basePrice = value
        }

        return arr;
      })
    }
  };

  // const handleCheckboxDepartmentChange = (option) => {
  //   if (selectedDepartments.some(obj => obj.id === option.id)) {
  //     setSelectedDepartments(selectedDepartments.filter((item) => item.id !== option.id));

  //     setSelectedAppointments(selectedAppointments.filter(item => item.departmentId !== option.id))
  //   } else {
  //     setSelectedDepartments([...selectedDepartments, { name: option.name, id: option.id }]);

  //     const filterredSlots = appointmentSlots.filter(item => item.departmentId === option.id)
  //     setSelectedAppointments(prev => ([...prev, ...filterredSlots]))
  //   }
  // };

  // useEffect(() => {
  //   setSelectedAppointments(selectedDepartments.map(_ => ({
  //     name: appointmentSlots[0].name
  //   })))
  // }, [selectedDepartments])

  // const handleDeleteDepartment = (option) => {
  //   setSelectedDepartments(prev => prev.filter((item) => item.id !== option.id));
  //   setSelectedAppointments(selectedAppointments.filter(item => item.departmentId !== option.id))
  // }

  const handleSubmit = async () => {

    if (changedService.length>0) {
      try {
        const promises = changedService.map((service) => {
    
          return axiosInstance.patch(
            `/api/v1/business-branches/${businessUnitData.id}/services/${service.serviceId}`,
            { basePrice: service.basePrice }
          );
        });
    
        const responses = await Promise.all(promises);
        console.log("All updates successful:", responses);
    
        sessionStorage.removeItem("selectedBranch")
        setSelectedBranch(null)
      } catch (error) {
        console.error("Error updating branch units:", error);
      }
    }

    if (inActiveServices.length>0) {
      try {
        const promises = inActiveServices.map((service) => {
    
          return axiosInstance.patch(
            `/api/v1/business-branches/${businessUnitData.id}/services/${service.serviceId}`,
            { active: false }
          );
        });
    
        const responses = await Promise.all(promises);
        console.log("All updates successful:", responses);
    
        sessionStorage.removeItem("selectedBranch")
        setSelectedBranch(null)
      } catch (error) {
        console.error("Error updating branch units:", error);
      }
    }

    if (activeServices.length>0) {
      try {
        const promises = activeServices.map((service) => {
    
          return axiosInstance.patch(
            `/api/v1/business-branches/${businessUnitData.id}/services/${service.serviceId}`,
            { active: true }
          );
        });
    
        const responses = await Promise.all(promises);
        console.log("All updates successful:", responses);
    
        sessionStorage.removeItem("selectedBranch")
        setSelectedBranch(null)
      } catch (error) {
        console.error("Error updating branch units:", error);
      }
    }

    const addedServices = selectedOptions.filter(obj => 
      !businessUnitData.services.some(item => obj.serviceId === item.serviceId)
    );

    if (addedServices.length>0) {
      const sendNewServices = addedServices.map(item => ({
        serviceId: item.serviceId,
        basePrice: item.basePrice
      }))

      axiosInstance
        .post(`/api/v1/business-branches/${businessUnitData.id}/services`, { services: sendNewServices})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          toast.error('Adding new services failed')
        })
    }

    const sendData = {
      name: formData.unitName,
      type: formData.branchType,
      practice: formData.practiceType,
      active: formData.active,
    };

    axiosInstance
      .patch(`/api/v1/business-branches/${businessUnitData.id}`, sendData)
      .then((response) => {
        console.log("Success:", response.data);
        setAlert("Branch unit updated successfully");
        navigate("/admin/branch-units", { state: { branchEdited: true }})
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <p className="underline inline cursor-default">Edit Business Unit</p>
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
        <div className="flex w-[80%] h-full flex-col justify-start items-end bg-white rounded-md space-y-6">
          <div className="flex w-full items-center justify-between gap-10">
            <div className="w-[9rem]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Status
              </label>
              <div className="flex mt-1 h-[2.25rem]">
                <button
                  className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                    formData.active
                      ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                      : "border-[#8891AA] text-[#121C2D] rounded-l-md"
                  }`}
                  onClick={() => handleInputChange("active", true)}
                >
                  Active
                </button>

                <button
                  className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                    !formData.active
                      ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                      : "border-[#8891AA] text-[#121C2D] rounded-r-md"
                  }`}
                  onClick={() => handleInputChange("active", false)}
                >
                  Inactive
                </button>
              </div>
            </div>
            {/* Name Input */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Branch Unit Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border capitalize placeholder:italic text-sm border-[#8891AA] focus:outline-none rounded-md"
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
            <div className="w-[47.5%]">
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
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
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
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Currency
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 placeholder:italic uppercase text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
                disabled
                readOnly
                placeholder="INR"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              />
            </div>
          </div>

          {/* Address Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 1
              </label>
              <div className="flex mt-1 overflow-hidden border border-[#8891AA] rounded-md">
                <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                  <FaSearch className="text-[#606B85] h-full" />
                </div>
                <input
                  type="search"
                  className="w-full placeholder:italic text-sm capitalize focus:outline-none p-2 disabled:bg-[#F4F4F6]"
                  placeholder="Placeholder"
                  disabled
                  readOnly
                  value={formData.address1}
                  onChange={(e) =>
                    handleInputChange("address1", e.target.value)
                  }
                />
              </div>
            </div>
            {/* Address Selection 2 */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Address line 2
              </label>
              <input
                type="text"
                disabled
                readOnly
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
                placeholder="Placeholder"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>
          </div>

          {/* City and State Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                City
              </label>
              <input
                type="text"
                disabled
                readOnly
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
                placeholder="Malad"
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
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                State
              </label>
              <input
                type="text"
                disabled
                readOnly
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
                placeholder="Maharashtra"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
          </div>

          {/* Country Selection */}
          <div className="flex w-full items-center justify-between">
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Country
              </label>
              <input
                type="text"
                disabled
                readOnly
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
                placeholder="India"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
            {/* postal code selection */}
            <div className="w-[47.5%]">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Postal Code
              </label>
              <input
                type="text"
                disabled
                readOnly
                className="w-full mt-1 p-2 placeholder:italic capitalize text-sm border border-[#8891AA] focus:outline-none rounded-md disabled:bg-[#F4F4F6]"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={e => {
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
          <HandleEditServices 
            options={options}
            serviceBoxRef={serviceBoxRef}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            activeServices={activeServices}
            setActiveServices={setActiveServices}
            inActiveServices={inActiveServices}
            setInactiveServices={setInactiveServices}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />

          {/* Service Value Currency Input */}
          {(selectedOptions.length!==0 && !selectedOptions.every(item => item.active === false)) && (
            <div className="w-full">
              <div className="w-full mb-6">
                <p className="capitalize text-lg font-semibold">Base Price</p>
              </div>
              <div
                className={`flex w-full gap-x-10 flex-wrap gap-y-6 items-center`}
              >
                {selectedOptions.map((service, index) => (
                  <div key={index} className={`w-[220px] ${service.active? "" : "hidden"}`}>
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
                        // disabled={true}
                        className="w-full p-2 placeholder:italic text-sm disabled:opacity-30 disabled:cursor-not-allowed classic focus:outline-none"
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
                          handleServicePrice(Number(twoDecimalValue), index, service.serviceId, service.type);
                        }}
                        type="text"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <HandleEditDepartments
            departmentRef={departmentRef}
            selectedDepartments={selectedDepartments}
            setSelectedDepartments={setSelectedDepartments}
            setShowDropdownDept={setShowDropdownDept}
            showDropdownDept={showDropdownDept}
            departments={departments}
            selectedAppointments={selectedAppointments}
            setSelectedAppointments={setSelectedAppointments}
            activeDepartments={activeDepartments}
            setActiveDepartments={setActiveDepartments}
            inactiveDepartments={inactiveDepartments}
            setInactiveDepartments={setInactiveDepartments}
            activeSlots={activeSlots}
            setActiveSlots={setActiveSlots}
            inactiveSlots={inactiveSlots}
            setInactiveSlots={setInactiveSlots}
          />
        </div>
      </div>
    </div>
  );
};

export default EditBusinessUnit;
