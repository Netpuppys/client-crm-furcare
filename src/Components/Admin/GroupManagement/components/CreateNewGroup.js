import { useEffect, useState } from "react";
import { useAppContext } from "../../../../utils/AppContext";
import axiosInstance from "../../../../utils/AxiosInstance";

const resourceArray = [ "Resource 1", "Resource 2", "Resource 3", "Resource 4" ]

const CreateNewGroup = ({ setGroupData }) => {
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



export default CreateNewGroup