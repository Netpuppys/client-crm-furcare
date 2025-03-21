import { useEffect, useState } from "react";
import { useAppContext } from "../../../../utils/AppContext";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { FiCheck, FiPlus } from "react-icons/fi";
import axiosInstance from "../../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useAlertContext } from "../../../../utils/AlertContext";
import BlueButton from "../../../../ui/BlueButton";

const labelFields = [
  "Scheduled Appointments",
  "Cancelled Appointments",
  "Walk-In Appointments",
  "Appointment Slots",
  "Doctors",
];

const frequencyArray = ["day", "week", "month"];

const appointmentTypes = [
  "appointments",
  "admin",
  "client_and_patient",
  "inventory",
  "communication",
  "visits",
  "leads",
];

const CreateNewReport = ({ fetchAllReports }) => {

  const { setAlert } = useAlertContext();
  const { branchDetails, selectedBranch } = useAppContext();

  const [ showLabelOptions, setShowLabelOptions ] = useState(false);
  const [ selectedLabelOptions, setSelectedLabelOptions ] = useState([]);
  const [ disabled, setDisabled ] = useState(true);
  const [ formData, setFormData ] = useState({
    name: "",
    type: "",
    labelFields: "",
    frequency: "",
    location: selectedBranch.name,
    generateInBackground: false,
    businessBranchId: "",
    businessUnitId: ""
  });

  useEffect(() => {
    if (
      formData.name === "" ||
      formData.type === "" ||
      formData.frequency === "" ||
      formData.location === ""
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLocationChange = (item) => {
    const value = JSON.parse(item)

    if (value.type === "business") {
      setFormData((prev) => ({ ...prev, businessUnitId: value.id, businessBranchId: "" }));
    } else if (value.type === "branch") {
      setFormData((prev) => ({ ...prev, businessBranchId: value.id, businessUnitId: "" }));
    }

    setFormData((prev) => ({ ...prev, location: item }));
  };

  const handleSubmit = () => {
    const sendData = {
      name: formData.name,
      type: formData.type,
      frequency: formData.frequency,
      generateInBackground: formData.generateInBackground,
      fields: selectedLabelOptions,
      ...(formData.businessBranchId !== "" && { businessBranchId: formData.businessBranchId }),
      ...(formData.businessUnitId !== "" && { businessUnitId: formData.businessUnitId }),
    };

    axiosInstance
      .post(`/api/v1/reports`, sendData)
      .then((res) => {
        console.log(res);
        setAlert("Report created Successfully");
        fetchAllReports();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  const handleAddLabels = (value) => {
    if (selectedLabelOptions.includes(value)) {
      setSelectedLabelOptions((prev) => {
        const arr = [...prev];
        const newArr = arr.filter((item) => item !== value);

        return newArr;
      });
    } else {
      setSelectedLabelOptions((prev) => {
        const arr = [...prev];
        arr.push(value);

        return arr;
      });
    }
  };

  return (
    <div className="p-6 flex h-full flex-col justify-start items-start mx-auto bg-white rounded-md space-y-6">
      <div className="flex gap-10 w-full">
        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Name{" "}
          </label>
          <input
            type="text"
            className="mt-1 p-2 capitalize border border-[#8891AA] focus:outline-none rounded-md"
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
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Type{" "}
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="mt-1 p-2 capitalize border border-[#8891AA] focus:outline-none rounded-md classic"
          >
            <option value={""}>Select</option>
            {appointmentTypes.map((item, index) => (
              <option key={index} value={item}>
                {item?.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full">
          <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Label Fields
          </label>
          <div className="flex h-10 mt-1 overflow-hidden border border-[#8891AA] rounded-md">
            <div className="h-full aspect-square border-r flex items-center justify-center border-[#E1E3EA] bg-[#F9F9FA] text-[#606B85]">
              <FaSearch className="h-full" />
            </div>
            <input
              type="search"
              className="w-full capitalize placeholder:italic text-sm focus:outline-none h-full p-2"
              placeholder="Search"
              value={formData.fields}
              onChange={(e) => handleInputChange("fields", e.target.value)}
            />
          </div>
        </div>

        <div className="w-full mt-2">
          <button
            onClick={() => setShowLabelOptions((prev) => !prev)}
            className="flex items-center justify-start gap-1 text-[#0263E0]"
          >
            <p className="text-sm font-medium">Show available label fields</p>
            <span className="text-xl">
              {showLabelOptions ? (
                <IoIosArrowRoundUp />
              ) : (
                <IoIosArrowRoundDown />
              )}
            </span>
          </button>
          <div
            className={`mt-2 ${
              showLabelOptions ? "flex" : "hidden"
            } flex-col items-start justify-start gap-1`}
          >
            {labelFields.map((item, index) => (
              <button
                onClick={() => handleAddLabels(item)}
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span
                  className={`text-xl ${
                    selectedLabelOptions.includes(item)
                      ? "text-[#009951]"
                      : "text-[#606B85]"
                  }`}
                >
                  {selectedLabelOptions.includes(item) ? (
                    <FiCheck />
                  ) : (
                    <FiPlus />
                  )}
                </span>
                <p className="text-[#121C2D] text-sm ">{item}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-10 w-full">
        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Frequency{" "}
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => handleInputChange("frequency", e.target.value)}
            className="mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md classic capitalize"
          >
            <option value={""}>Select</option>
            {frequencyArray.map((item, index) => (
              <option key={index} className="capitalize" value={item}>
                Every {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Locations{" "}
          </label>
          <select
            value={formData.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="mt-1 p-2 border capitalize border-[#8891AA] focus:outline-none rounded-md classic"
          >
            <option value={""}>Select</option>
            <option value={JSON.stringify({ id: selectedBranch.businessUnitId, type: 'business'})}>All</option>
            {branchDetails?.map((item, index) => (
              <option key={index} value={JSON.stringify({ id: item.id, type: 'branch'})}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="">
        <div className="flex gap-2 cursor-pointer">
          <input
            id="checkbox"
            type="checkbox"
            checked={formData.generateInBackground}
            onChange={(e) => handleInputChange("generateInBackground", Boolean(e.target.checked))}
            className="min-w-4 aspect-square cursor-pointer"
          />
          <label htmlFor="checkbox" className="cursor-pointer">
            Enable report in the background
          </label>
        </div>
        <div className="pl-6">
          <p className="text-[#606B85] text-sm">
            The report will be autogenerated in the background every day
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end ">
        <BlueButton
          text={"Save"}
          onClickHandler={handleSubmit}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CreateNewReport;