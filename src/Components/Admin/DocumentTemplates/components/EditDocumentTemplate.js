import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // React Quill styles
import ReactQuill from "react-quill";
import axiosInstance from "../../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";


const EditDocumentTemplate = ({ types, openEditModule, fetchData }) => {

  const [formData, setFormData] = useState({
    type: openEditModule?.type,
    name: openEditModule?.name,
    additionalNotes: openEditModule?.body[0].body,
  });

  const [ roles, setRoles] = useState([]); // Initial roles
  const [ inputValue, setInputValue] = useState("");
  const [ inputFocus, setInputFocus ] = useState(false)
  const [ dropDownListStatic, setDropDownListStatic ] = useState(["english", "hindi"])
  const [ disabled, setDisabled ] = useState(true)
  const [ dropDownList, setDropDownList ] = useState(dropDownListStatic)

  useEffect(() => {
    setDropDownListStatic(["english", "hindi"])
  }, [])

  useEffect(() => {
    if (inputValue) {
        const data = dropDownListStatic.filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase()));
        const finalData = data.filter(item => !roles.includes(item))
        setDropDownList(finalData);
    } else {
        setDropDownList([]);
    }
  }, [inputValue, roles, dropDownListStatic])

  useEffect(() => {
    if (openEditModule.body) {
        const newArr = openEditModule.body.map(item => item.language)
        setRoles(newArr)
    }
  }, [openEditModule])

  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  useEffect(() => {
    if (!formData.type || !formData.name || !formData.additionalNotes || roles.length===0) {
        setDisabled(true)
      return;
    }

    if (formData.name === openEditModule.name && formData.type === openEditModule.type && formData.additionalNotes === openEditModule.body[0].body) {
        setDisabled(true)
      return;
    }

    setDisabled(false)
  }, [formData, roles, openEditModule])

  const handleDropDownClick = (value) => {
    setRoles(prev => ([
      ...prev, value
    ]))
    setInputValue("")
  }

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Validation logic
    if (!formData.type || !formData.name || !formData.additionalNotes || roles.length===0) {
        toast.error("Please fill all required fields.");
      return;
    }

    const sendData = {
        type: formData.type,
        name: formData.name,
        body: [
            {
                language: "english",
                body: formData.additionalNotes
            },
            {
                language: "hindi",
                body: "प्रिय {patientName}, आपकी नियुक्ति {appointmentDate} को {appointmentTime} बजे निर्धारित है। कृपया 15 मिनट पहले पहुंचें।"
            }
        ],
    }

    axiosInstance
        .patch(`/api/v1/document-templates/${openEditModule.id}`, sendData)
        .then(res => {
            console.log(res)
            toast.success("Changed Successfully")
            fetchData()
        })
        .catch(err => {
            console.error(err)
            toast.error("Something Went Wrong")
        })
  };

  return (
    <div className="p-6 flex flex-col justify-center items-end mx-auto bg-white rounded-lg space-y-6">
      <div className="flex w-full items-center justify-between gap-12">
        {/* Category Input */}
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Type{" "}
          </label>
            <select
                value={formData.type}
                onChange={e => handleInputChange("type", e.target.value)}
                className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg classic"
            >
                <option value={""}>Select</option>
                {types.map((type, id) => (
                    <option value={type} key={id}>{type}</option>
                ))}
            </select>
        </div>

        {/* name */}
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Name{" "}
          </label>
            <input
                type="text"
                value={formData.name}
                placeholder="Placeholder"
                onChange={e => handleInputChange("name", e.target.value)}
                className="mt-1 p-2 border border-gray-300 placeholder:italic focus:outline-none rounded-lg classic"
            />
        </div>

      </div>

      {/* Health Concerns Dropdown */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            {"Language(s)"}{" "}
          </label>
          <div className="mt-1 w-full relative gap-2 h-fit border border-gray-300 focus:outline-none rounded-lg overflow-hidden">
          <div className={`w-full relative gap-2 flex p-2 ${(inputFocus && dropDownList.length>0)? "border-b" : ""} border-gray-300 focus:outline-none`}>

            {roles?.map((role, index) => (
              <div
                key={index}
                className="flex items-center text-nowrap gap-2 capitalize px-3 py-1 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
              >
                {role}
                <button
                  onClick={() => removeRole(role)}
                  className="text-[#606B85] hover:text-blue-900 focus:outline-none"
                >
                  ✕
                </button>
              </div>
            ))}

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setTimeout(() => { setInputFocus(false) }, 100)}
              className="flex-grow w-full border-none focus:ring-0 focus:outline-none text-sm"
            />
          </div>

          {inputFocus &&
          <div className="w-full h-fit bg-white flex flex-col items-start px-2">
            {dropDownList.map((item, index) => (
              <button key={index} onClick={() => handleDropDownClick(item)} className="py-2 w-full flex items-center justify-start border-b border-gray-300 last:border-b-0">
                <p className="capitalize text-sm">
                  {item}
                </p>
              </button>
            ))}
          </div>}
        </div>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="w-full flex flex-col">
        {/* <label className="font-medium text-[#121C2D] flex items-center gap-2"><div className="w-1 aspect-square rounded-full bg-red-500"></div> Category </label> */}
        <ReactQuill
          className="mt-2 h-[400px] mb-12"
          theme="snow"
          value={formData.additionalNotes}
          onChange={(value) => handleInputChange("additionalNotes", value)}
          placeholder="Placeholder"
        />
      </div>

      {/* Submit Button */}
        <BlueButton 
            text={"Save"}
            onClickHandler={handleSubmit}
            disabled={disabled}
        />
    </div>
  );
};

export default EditDocumentTemplate;
