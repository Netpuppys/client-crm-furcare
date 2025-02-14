import { useEffect, useState } from "react";
import { useAppContext } from "../../../../utils/AppContext";
import axiosInstance from "../../../../utils/AxiosInstance";
import errorIcon from "../../../../Assets/icons/errorIcon.svg";
import BlueButton from "../../../../ui/BlueButton";
import { IoClose } from "react-icons/io5";
import { useAlertContext } from "../../../../utils/AlertContext";

const EditGroup = ({ 
    editGroup,
    groupData,
    setGroupData,
    setEditGroup,
}) => {
    
    const { setAlert } = useAlertContext()
    const { selectedBranch } = useAppContext()

    const [ selectedResources, setSelectedResources ] = useState([])
    const [ resources, setResources ] = useState([])
    const [ initialResources, setInitialResources ] = useState([])
    const [ dropDownList, setDropDownList ] = useState([])
    const [ inputValue, setInputValue ] = useState("");
    const [ inputFocus, setInputFocus ] = useState(false)
    const [ disabled, setDisabled ] = useState(true)
    const [ showError, setShowError ] = useState(false)
    const [ active, setActive ] = useState(editGroup.active)
    const [ formData, setFormData ] = useState({
        name: editGroup.name,
        description: editGroup.description,
    });

    useEffect(() => {
        const filtered = resources.filter(item => 
            editGroup.resources.some(resource => resource.staffId === item.id)
        );

        setSelectedResources(filtered)
        setInitialResources(filtered)
    }, [editGroup, resources]);

    // show error if name is already present
    useEffect(() => {
        if (formData.name.replace(/\s/g, "") !==editGroup.name.replace(/\s/g, "") && groupData.some(item => item.name.toLowerCase().replace(/\s/g, "") === formData.name.toLowerCase().replace(/\s/g, ""))) {
            setShowError(true)
            return
        }

        setShowError(false)
    }, [formData, groupData, editGroup])

    // fetch all the staff
    useEffect(() => {
        axiosInstance
            .get('/api/v1/staff')
            .then(res => {
                const response = res.data.data.data;

                setResources(response)
                setDropDownList(response)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    // filter out selected staff members from dropdown
    useEffect(() => {
        if (selectedResources.length>0) {
            const filtered = resources.filter(item => 
                selectedResources.every(staff => staff.id !== item.id)
            );            

            setDropDownList(filtered)
            return
        }
    }, [selectedResources, resources])

    // filter out staff memebers according to input value
    useEffect(() => {
        if (inputValue !== "") {
            const filterred = resources.filter((item) => 
                item.name.toLowerCase().includes(inputValue.toLowerCase())
            )

            setDropDownList(filterred)
            return
        }

        setDropDownList(resources)
    }, [inputValue, resources])

    // drop down click function
    const handleDropDownClick = (value) => {
        setSelectedResources(prev => ([
          ...prev, value
        ]))

        setInputValue("")
    }

    // remove staff member from selected resources
    const removeRole = (roleToRemove) => {
        setSelectedResources(selectedResources.filter((role) => role !== roleToRemove));
    };
    
    // check the inputs for enabling or disabling the button
    useEffect(() => {
        if (formData.name.replace(/\s/g, "") === "" || 
            formData.description.replace(/\s/g, "") === "" || 
            !selectedResources.length>0 || 
            groupData.some(item => item.name.toLowerCase().replace(/\s/g, "") === formData.name.toLowerCase().replace(/\s/g, ""))
        ) {
            setDisabled(true)
            return
        }

        setDisabled(false)
    }, [formData, selectedResources, groupData, initialResources])

    useEffect(() => {
        if (formData.name.replace(/\s/g, "") === editGroup.name.replace(/\s/g, "") &&
            formData.description.replace(/\s/g, "") === editGroup.description.replace(/\s/g, "") &&
            JSON.stringify(selectedResources) === JSON.stringify(initialResources) &&
            active===editGroup.active
        ) {
            setDisabled(true)
            return
        }

        setDisabled(false)
    }, [formData, selectedResources, initialResources, active, editGroup])

    // function to handle input values in form data
    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // function fetch table data when a new group is created
    const refreshList = ()  => {
        axiosInstance
            .get("/api/v1/groups")
            .then(res => {
                const response = res.data.data.data;
                setGroupData(response)
                setEditGroup(false)
            })
            .catch(err => {
                console.error(err)
            })
    }

    // handle submit function
    const handleSubmit = () => {
        // const sendResources = selectedResources.map(resource => resource.id)

        const data = {
            name: formData.name,
            description: formData.description,
            businessBranchId: selectedBranch.id,
            // resources: sendResources,
            active: active
        }

        axiosInstance
            .patch(`/api/v1/groups/${editGroup.id}`, data)
            .then(res => {
                console.log(res)
                setAlert('Group Updated Successfully')
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
                <label className="font-semibold text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Name{" "}
                </label>
                <input
                    type="text"
                    className={`mt-1 p-2 placeholder:italic capitalize text-sm border ${showError? "border-[#C72323]" : "border-[#8891AA]"} focus:outline-none rounded-lg`}
                    placeholder="Placeholder"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />

                {showError && 
                <div className="flex items-center justify-start gap-1 mt-2">
                    <img src={errorIcon} className="" alt="" />
                    <p className="text-sm text-[#C72323]">
                        The group name is already in use.
                    </p>
                </div>}
            </div>
        </div>

        <div className="flex gap-10 w-full">
            {/* Name Input */}
            <div className="flex flex-col w-full">
                <label className="font-semibold text-[#121C2D] flex items-center gap-2">
                    <div className="w-1 aspect-square rounded-full bg-red-500"></div>
                    Resourses{" "}
                </label>

                <div className="mt-1 w-full relative gap-2 h-fit border border-[#8891AA] focus:outline-none rounded-lg overflow-hidden">
                    <div className={`w-full relative gap-2 flex p-2 ${(inputFocus && dropDownList.length>0)? "border-b" : ""} border-gray-300 focus:outline-none`}>

                        {selectedResources?.map((staff, index) => (
                            <div
                                key={index}
                                className="flex items-center text-nowrap gap-2 px-3 py-1 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
                            >
                                {staff.name}
                                <button
                                    onClick={() => removeRole(staff)}
                                    className="text-[#606B85] text-lg"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        ))}

                        <input
                            type="text"
                            value={inputValue}
                            placeholder={selectedResources.length===0? "Resources" : ""}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setTimeout(() => { setInputFocus(false) }, 100)}
                            className="flex-grow w-full placeholder:italic border-none focus:ring-0 capitalize focus:outline-none text-sm"
                        />
                    </div>

                    {inputFocus &&
                    <div className="w-full h-fit bg-white flex flex-col items-start px-2">
                    {dropDownList.map((item, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleDropDownClick(item)} 
                            className="py-2 w-full flex items-center justify-start border-b border-gray-300 last:border-b-0"
                        >
                            <p className="capitalize text-sm">
                                {item.name}
                            </p>
                        </button>
                    ))}
                    </div>}
                </div>

            </div>
        </div>

        <div className="flex flex-col w-full">
            <label className="font-semibold text-[#121C2D] flex items-center gap-2">
                Description{" "}
            </label>
            <textarea
                type="text"
                className="mt-1 p-2 text-sm capitalize border placeholder:italic w-full h-20 border-[#8891AA] focus:outline-none rounded-md"
                placeholder="Field text"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                maxLength={50}
            />
            <p className="text-[#606B85] text-sm mt-2">
                Max 50 chars
            </p>
        </div>

        <div className=''>
            <p className='text-sm font-semibold text-[#121C2D] flex items-center justify-start gap-1'>
                <span className='w-[4px] h-[4px] rounded-full bg-[#EB5656]'></span>
                Status
            </p>
            <div className="flex mt-1 h-[2.25rem]">
                <button
                    className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                        active===true
                        ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-l-lg"
                    }`}
                    onClick={() => setActive(true)}
                >
                    Active
                </button>

                <button
                    className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                        active===false
                        ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-r-lg"
                    }`}
                    onClick={() => setActive(false)}
                >
                    Inactive 
                </button>
            </div>
        </div>

        {/* Submit Button */}
        <div className="h-full w-full items-end flex justify-end ">
            <BlueButton
                disabled={disabled}
                onClickHandler={handleSubmit}
                text={'Save'}
            />
        </div>
    </div>
    );
};



export default EditGroup