import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiCheck, FiPlus } from "react-icons/fi";
import { useAppContext } from "../../../../utils/AppContext";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import BlueButton from "../../../../ui/BlueButton";
import ActiveButtons from "../../../../ui/ActiveButtons";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAlertContext } from "../../../../utils/AlertContext";
import { IoClose } from "react-icons/io5";
import PreviewGraph from "./PreviewGraph";

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

const ReportGraph = ({ setShowReport }) => {

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-[#606B85] bg-opacity-50'>
      <div className="max-w-[55.2rem] w-full h-full p-8 max-h-[25rem] bg-white rounded-lg border border-[#E1E3EA] shadow-[0px_4px_16px_0px_rgba(18,_28,_45,_0.20)]">
        <div className='w-full mb-8 flex items-center justify-between'>
            <p className='text-xl font-semibold text-[#121C2D] tracking-[-0.025rem] '>
                Preview Report
            </p>
            <button 
                onClick={() => setShowReport(false)}
                className='w-[1.75rem] aspect-square flex items-center text-3xl text-[#606B85]'>
                <IoClose />
            </button>
        </div>


        <PreviewGraph />
      </div>
    </div>
  )
}

const EditReport = ({ selectedReport, fetchAllReports }) => {
  const { branchDetails } = useAppContext();

  const { setAlert } = useAlertContext()

  const [ showReport, setShowReport ] = useState(false)
  const [ showLabelOptions, setShowLabelOptions] = useState(false);
  const [ selectedLabelOptions, setSelectedLabelOptions] = useState(selectedReport.fields);
  const [ disabled, setDisabled] = useState(true);
  const [ active, setActive] = useState(selectedReport.active);
  const [ formData, setFormData] = useState({
    name: selectedReport.name,
    type: selectedReport.type,
    labelFields: selectedReport.fields,
    frequency: selectedReport.frequency,
    location: "",
    backgroundReport: selectedReport.generateInBackground,
  });

  useEffect(() => {
    console.log(selectedLabelOptions, selectedReport.fields)
    console.log(selectedLabelOptions.every((item, index) => item === selectedReport.fields[index]));

    if ((selectedReport.name.replace(/\s/g, "") ===
        formData.name.replace(/\s/g, "") ||
        formData.name.replace(/\s/g, "") === "") &&
        selectedReport.type === formData.type &&
        selectedLabelOptions.length === selectedReport.fields.length &&
        selectedLabelOptions.every((item, index) => item === selectedReport.fields[index]) &&
        selectedReport.frequency === formData.frequency &&
        formData.location === "" &&
        selectedReport.generateInBackground === formData.backgroundReport &&
        active === selectedReport.active
      ) {
        setDisabled(true);
        return;
      }

    setDisabled(false);
  }, [selectedReport, formData, active, selectedLabelOptions]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Log the form data
    console.log("Submitted Form Data: ", formData);

    const sendData = {
      name: formData.name,
      type: formData.type,
      frequency: formData.frequency,
      generateInBackground: formData.generateInBackground,
      fields: selectedLabelOptions,
      active: active
    }

    console.log(sendData)

    axiosInstance
      .patch(`/api/v1/reports/${selectedReport.id}`, sendData)
      .then(res => {
        console.log(res)
        setAlert("Updated Successfully")
        fetchAllReports()
      })
      .catch(err => {
        console.error(err)
      })
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
      {showReport && <ReportGraph setShowReport={setShowReport} />}

      <div className="flex gap-10 w-full">
        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-2 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Name{" "}
          </label>
          <input
            type="text"
            className="mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md"
            placeholder="Appointment Name"
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
          <label className="font-medium text-[#121C2D] flex items-center gap-2 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Type{" "}
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md classic"
          >
            <option value={""}>Select</option>
            {appointmentTypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
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
              value={formData.labelFields}
              onChange={(e) => handleInputChange("labelFields", e.target.value)}
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
          <label className="font-medium text-[#121C2D] flex items-center gap-2 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Frequency{" "}
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => handleInputChange("frequency", e.target.value)}
            className="mt-1 p-2 border border-[#8891AA] capitalize focus:outline-none rounded-md classic"
          >
            <option value={""}>Select</option>
            {frequencyArray.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-2 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Locations{" "}
          </label>
          <select
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="mt-1 p-2 border capitalize border-[#8891AA] focus:outline-none rounded-md classic"
          >
            <option value={""}>Select</option>
            <option value={"All"}>All</option>
            {branchDetails?.map((item, index) => (
              <option key={index} value={item.name}>
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
            value={formData.backgroundReport}
            onChange={(e) =>
              handleInputChange("backgroundReport", Boolean(e.target.value))
            }
            className="min-w-4 aspect-square cursor-pointer"
          />
          <label htmlFor="checkbox" className="cursor-pointer">
            Enable report in the background
          </label>
        </div>
        <div className="pl-6">
          <p className="text-[#606B85] text-sm ">
            The report will be autogenerated in the background every day
          </p>
        </div>
      </div>

      <ActiveButtons active={active} setActive={setActive} />

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end gap-[20px]">
        <button
          onClick={() => setShowReport(true)}
          className="bg-transparent px-3 border disabled:border-opacity-50 border-[#CACDD8] disabled:text-[#AEB2C1] disabled:bg-transparent h-[2.375rem] rounded-md flex text-[#121C2D] font-semibold text-sm items-center justify-center"
        >
          <p className="">Preview</p>
        </button>

        <BlueButton
          text={"Save"}
          onClickHandler={handleSubmit}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EditReport;
