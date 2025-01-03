import React, { useEffect, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import axiosInstance from "../../../utils/AxiosInstance";
import closeIcon from "../../../Assets/icons/alert/close.png";
import { useAppContext } from "../../../utils/AppContext";
// import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
// import { FiCheck, FiPlus } from "react-icons/fi";

const resourceArray = [ "Resource 1", "Resource 2", "Resource 3", "Resource 4" ]

const GroupManagementTable = ({ groupData }) => {

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
                                <p className="">Description</p>
                                <img src={informationIcon} className="w-5" alt="" />
                            </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-2">
                                <p className="">Resources</p>
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
                {groupData?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b last:border-b-0 border-[#E1E3EA]">
                    <td className="px-4 py-2 text-sm text-[#0263E0] capitalize font-semibold">
                        {item.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-[#121C2D]">
                        {item.description}
                    </td>
                    <td className="px-4 py-2 text-sm">
                        <a href={item.url} className="text-blue-600 underline">
                            List
                        </a>
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
                </tr>))}
                </tbody>
            </table>
        </div>
    );
};

const CreateNewForm = ({ setGroupData }) => {
    const { selectedBranch } = useAppContext()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        resourses: ["676bf1041923dfac96de330b"]
    });
    // const [ showLabelOptions, setShowLabelOptions ] = useState(false)
    // const [ selectedLabelOptions, setSelectedLabelOptions ] = useState([])
    const [ disabled, setDisabled ] = useState(true)

    useEffect(() => {
        if (formData.name === "" || formData.description === "" || !formData.resourses || !formData.resourses.length>0 ) {
            setDisabled(true)
            return
        }

        setDisabled(false)
    }, [formData])

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const refreshList = ()  => {
        axiosInstance
            .get("/api/v1/groups")
            .then(res => {
                const response = res.data.data.data;
                setGroupData(response)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handleSubmit = () => {
        const data = {
            name: formData.name,
            description: formData.description,
            businessBranchId: selectedBranch.id,
            resources: formData.resourses
        }

        axiosInstance
            .post("/api/v1/groups", data)
            .then(res => {
                console.log(res)
                refreshList()
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
    <div className="p-6 flex h-full flex-col justify-start items-start mx-auto bg-white rounded-lg space-y-6">
        <div className="flex gap-10 w-full">
            {/* Name Input */}
            <div className="flex flex-col w-3/5">
                <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Name{" "}
                </label>
                <input
                    type="text"
                    className="mt-1 p-2 placeholder:italic capitalize text-sm border border-gray-300 focus:outline-none rounded-lg"
                    placeholder="Placeholder"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />
            </div>
        </div>

        <div className="flex gap-10 w-full">
            {/* Name Input */}
            <div className="flex flex-col w-full">
                <label className="font-medium text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Resourses{" "}
                </label>

                <select
                    value={formData.frequency}
                    onChange={e => handleInputChange("frequency", e.target.value)}
                    className="mt-1 p-2 capitalize border border-gray-300 focus:outline-none rounded-lg classic"
                >
                    <option value={""}>Select</option>
                    {resourceArray.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="flex flex-col w-full">
            <label className="font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div> 
                Description{" "}
            </label>
            <textarea
                type="text"
                className="mt-1 p-2 text-sm capitalize border placeholder:italic w-full h-20 border-gray-300 focus:outline-none rounded-md"
                placeholder="Field text"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                maxLength={50}
            />
            <p className="text-[#606B85] text-sm mt-2">
                Max 50 chars
            </p>
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

function GroupManagementPage() {
    const [ createNew, setCreateNew] = useState(false);
    const [ groupData, setGroupData ] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/api/v1/groups")
            .then(res => {
                const response = res.data.data.data;
                setGroupData(response)
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
                    Group Management
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
            <GroupManagementTable
                groupData={groupData}
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
                <CreateNewForm 
                    setGroupData={setGroupData}
                />
            </div>
        </div>
    </div>
    );
}
export default GroupManagementPage;