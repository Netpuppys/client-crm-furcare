import React, { useEffect, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import axiosInstance from "../../../utils/AxiosInstance";
import closeIcon from "../../../Assets/icons/alert/close.png";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FiCheck, FiPlus } from "react-icons/fi";
import { useAppContext } from "../../../utils/AppContext";

const appointmentTypes = [ "Appointments", "Finance", "Inventory", "Client & Patient" ]
const labelFields = [ "Scheduled Appointments", "Cancelled Appointments", "Walk-In Appointments", "Appointment Slots", "Doctors" ]
const frequencyArray = [ "Every Day", "Every Week", "Every Month" ]

const ReportTable = ({ reportData }) => {
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
                <p className="">Type</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Label Fields</p>
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Frequency</p>
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
                <p className="">Status</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E1E3EA]">
          {reportData?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b last:border-b-0 border-[#E1E3EA]">
                <td className="px-4 py-2 text-sm text-[#0263E0] capitalize font-semibold">
                    {item.name}
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D]">
                    {item.businessBranchId}
                </td>
                <td className="px-4 py-2 text-sm">
                    <a href={item.url} className="text-blue-600 underline">
                        List
                    </a>
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D]">
                    <p className="">
                        Every Day
                    </p>
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D]">
                    <p className="">
                        All
                    </p>
                </td>
                <td className="px-4 py-2 text-sm flex items-center">
                    <div
                        className={`w-3 aspect-square ${
                            item.active ? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rounded-md rotate-45"
                        }`}
                    ></div>
                    <span
                        className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                    >
                        {item.active ? "Active" : "Inactive"}
                    </span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CreateNewForm = () => {
    const { branchDetails } = useAppContext()

    const [ formData, setFormData] = useState({
        name: "",
        type: "",
        labelFields: "",
        frequency: "",
        location: "",
        backgroundReport: false,
    });
    const [ showLabelOptions, setShowLabelOptions ] = useState(false)
    const [ selectedLabelOptions, setSelectedLabelOptions ] = useState([])
    const [ disabled, setDisabled ] = useState(true)

    useEffect(() => {
        if (formData.name === "" || formData.type === "" || formData.frequency === "" || formData.location === "" ) {
            setDisabled(true)
            return
        }

        setDisabled(false)
    }, [formData])

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        // Log the form data
        console.log("Submitted Form Data: ", formData);
    };

    const handleAddLabels = (value) => {
        if (selectedLabelOptions.includes(value)) {
            setSelectedLabelOptions(prev => {
                const arr = [...prev];
                const newArr = arr.filter(item => item !== value)

                return newArr
            })
        } else {
            setSelectedLabelOptions(prev => {
                const arr = [...prev];
                arr.push(value)

                return arr
            })
        }
    }

  return (
    <div className="p-6 flex h-full flex-col justify-start items-start mx-auto bg-white rounded-lg space-y-6">
        <div className="flex gap-10 w-full">
            {/* Name Input */}
            <div className="flex flex-col w-full">
                <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div> 
                    Name{" "}
                </label>
                <input
                    type="text"
                    className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
                    placeholder="Appointment Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />
            </div>
            <div className="flex flex-col w-full">
                <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div> 
                    Type{" "}
                </label>
                <select
                    value={formData.type}
                    onChange={e => handleInputChange("type", e.target.value)}
                    className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg classic"
                >
                    <option value={""}>Select</option>
                    {appointmentTypes.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
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
                <div className="flex h-10 mt-1 overflow-hidden border border-gray-300 rounded-lg">
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
                    onClick={() => setShowLabelOptions(prev => !prev)} 
                    className="flex items-center justify-start gap-1 text-[#0263E0]"
                >
                    <p className="text-sm font-medium">
                        Show available label fields
                    </p>
                    <span className="text-xl">
                        {showLabelOptions? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />}
                    </span>
                </button>
                <div className={`mt-2 ${showLabelOptions? "flex" : "hidden"} flex-col items-start justify-start gap-1`}>
                    {labelFields.map((item, index) => (
                        <button onClick={() => handleAddLabels(item)} key={index} className="flex items-center gap-2 cursor-pointer">
                            <span className={`text-xl ${selectedLabelOptions.includes(item)? "text-[#009951]" : "text-[#606B85]"}`}>
                                {selectedLabelOptions.includes(item)? <FiCheck /> : <FiPlus />}
                            </span>
                            <p className="text-[#121C2D] text-sm ">
                                {item}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex gap-10 w-full">
            {/* Name Input */}
            <div className="flex flex-col w-full">
                <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div> 
                    Frequency{" "}
                </label>
                <select
                    value={formData.frequency}
                    onChange={e => handleInputChange("frequency", e.target.value)}
                    className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg classic"
                >
                    <option value={""}>Select</option>
                    {frequencyArray.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col w-full">
                <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div> 
                    Locations{" "}
                </label>
                <select
                    value={formData.location}
                    onChange={e => handleInputChange("location", e.target.value)}
                    className="mt-1 p-2 border capitalize border-gray-300 focus:outline-none rounded-lg classic"
                >
                    <option value={""}>Select</option>
                    <option value={"All"}>All</option>
                    {branchDetails?.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
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
                    onChange={e => handleInputChange("backgroundReport", Boolean(e.target.value))}
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

        {/* Submit Button */}
        <div className="h-full w-full items-end flex justify-end ">
            <button
                disabled={disabled}
                className="py-2 px-4 disabled:bg-[#E1E3EA] bottom-0 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    </div>
  );
};

function ReportManagementPage() {
    const [ createNew, setCreateNew] = useState(false);
    const [ reportData, setReportData ] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/api/v1/reports")
            .then(res => {
                const response = res.data.data.data
                setReportData(response)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

  return (
    <div className="w-full min-h-full px-8 py-4">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <p
            className="underline inline cursor-default"
          >
            Admin
          </p>
          <span> / </span>
          <p className="underline inline cursor-default">
            Report Management
          </p>
        </div>
        <button
          onClick={() => setCreateNew(true)}
          className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
        >
          Create
        </button>
      </div>

      <div className="w-full mt-6">
        <ReportTable 
            reportData={reportData}
        />
      </div>

      <div
        className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
          createNew ? "right-0 block" : "right-full hidden z-50"
        } `}
      >
        <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
          <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
            Create Report
          </p>
          <button onClick={() => setCreateNew(false)} className="">
            <img src={closeIcon} className="w-7 " alt="" />
          </button>
        </div>

        <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
          <CreateNewForm />
        </div>
      </div>
    </div>
  );
}
export default ReportManagementPage;