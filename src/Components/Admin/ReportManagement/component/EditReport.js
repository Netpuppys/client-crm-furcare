import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiCheck, FiPlus } from "react-icons/fi";
import { useAppContext } from "../../../../utils/AppContext";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import BlueButton from "../../../../ui/BlueButton";
import ActiveButtons from "../../../../ui/ActiveButtons";

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

const EditReport = ({ selectedReport }) => {
  const { branchDetails } = useAppContext();

  const [showLabelOptions, setShowLabelOptions] = useState(false);
  const [selectedLabelOptions, setSelectedLabelOptions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(selectedReport.active);
  const [formData, setFormData] = useState({
    name: selectedReport.name,
    type: selectedReport.type,
    labelFields: selectedReport.fields,
    frequency: selectedReport.frequency,
    location: "",
    backgroundReport: selectedReport.generateInBackground,
  });

  useEffect(() => {
    console.log(selectedReport);
    console.log(formData);

    if (
      (selectedReport.name.replace(/\s/g, "") ===
        formData.name.replace(/\s/g, "") ||
        formData.name.replace(/\s/g, "") === "") &&
      selectedReport.type === formData.type &&
      // selectedReport.fields === formData.labelFields &&
      selectedReport.frequency === formData.frequency &&
      formData.location === "" &&
      selectedReport.generateInBackground === formData.backgroundReport &&
      active === selectedReport.active
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [selectedReport, formData, active]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Log the form data
    console.log("Submitted Form Data: ", formData);
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
          <label className="font-medium text-[#121C2D] flex items-center gap-2 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Name{" "}
          </label>
          <input
            type="text"
            className="mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md"
            placeholder="Appointment Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
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

      {/* <div className=''>
            <p className='text-sm font-semibold text-[#121C2D] flex items-center justify-start gap-1'>
                <span className='w-[4px] h-[4px] rounded-full bg-[#EB5656]'></span>
                Status
            </p>
            <div className="flex mt-1 h-[2.25rem]">
                <button
                    className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                        active===true
                        ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                        : "border-[#8891AA] text-[#121C2D] rounded-l-lg"
                    }`}
                    onClick={() => setActive(true)}
                >
                    Active
                </button>

                <button
                    className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                        active===false
                        ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                        : "border-[#8891AA] text-[#121C2D] rounded-r-lg"
                    }`}
                    onClick={() => setActive(false)}
                >
                    Inactive 
                </button>
            </div>
        </div> */}

      <ActiveButtons active={active} setActive={setActive} />

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

export default EditReport;
