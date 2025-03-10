import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAppContext } from "../../../../utils/AppContext";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";
import { useAlertContext } from "../../../../utils/AlertContext";
import "react-quill/dist/quill.snow.css"; // React Quill styles

const CreateNewDocumentTemplate = ({
  types,
  fetchData,
  selectedType,
}) => {
  const dropDownList = [ "english", "hindi" ]

  const { setAlert } = useAlertContext()
  const { selectedBranch } = useAppContext()

  const [ formData, setFormData ] = useState({
    name: "",
    type: selectedType,
    additionalNotes: "",
  });

  const [ languages, setLanguages ] = useState(["english"]); // Initial languages
  const [ documents, setDocuments ] = useState([{
    language: "english",
    body: ""
  }])
  const [ inputValue, setInputValue ] = useState("");
  const [ inputFocus, setInputFocus ] = useState(false)
  const [ disabled, setDisabled ] = useState(true)

  const removeLanguage = (langToRemove) => {
    setLanguages(languages.filter((lang) => lang !== langToRemove));

    setDocuments(prev => prev.filter(item => item.language !== langToRemove))
  };

  useEffect(() => {
    if (formData.type==="" || formData.name==="" || documents[0].body==="" || languages.length===0) {
        setDisabled(true)
      return;
    }

    setDisabled(false)
  }, [formData, languages, documents])



  const handleDropDownClick = (value) => {
    setLanguages(prev => ([
      ...prev, value
    ]))
    setDocuments(prev => ([
      ...prev,
      {
        language: value,
        body: ""
      }
    ]))
    setInputValue("")
  }

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {

    const sendData = {
      type: formData.type,
      name: formData.name,
      body: documents,
      // [
      //     {
      //         language: "english",
      //         body: documents[0].body
      //     },
      //     {
      //         language: "hindi",
      //         body: "प्रिय {patientName}, आपकी नियुक्ति {appointmentDate} को {appointmentTime} बजे निर्धारित है। कृपया 15 मिनट पहले पहुंचें।"
      //     }
      // ],
      businessBranchId: selectedBranch.id
    }

    axiosInstance
      .post("/api/v1/document-templates", sendData)
      .then(res => {
          console.log(res)
          setAlert("Added Successfully")
          fetchData()
      })
      .catch(err => {
          console.error(err)
          toast.error("Something Went Wrong")
      })
  };

  const handleQuillChange = (value) => {
    setDocuments(prev => {
      return prev.map((doc, index) => 
        index === 0 ? { ...doc, body: value } : doc
      );
    });
  };

  return (
    <div className="p-6 flex flex-col justify-start items-end mx-auto bg-white rounded-lg space-y-6 h-full relative">
      <div className="flex w-full items-center justify-between gap-[50px]">
        {/* Category Input */}
        <div className="flex flex-col w-1/2">{console.log(documents)}
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
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
                    <option 
                      key={id}
                      value={type.serverName} 
                    >
                      {type.name}
                    </option>
                ))}
            </select>
        </div>

        {/* name */}
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Name{" "}
          </label>
            <input
              type="text"
              value={formData.name}
              placeholder="Placeholder"
              onChange={e => handleInputChange("name", e.target.value)}
              className="mt-1 p-2 border capitalize border-gray-300 placeholder:italic focus:outline-none rounded-lg classic"
            />
        </div>

      </div>

      {/* languages */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            {"Language(s)"}{" "}
          </label>
            <div className="mt-1 w-full relative gap-2 h-fit border border-gray-300 focus:outline-none rounded-lg overflow-hidden">
            <div className={`w-full relative gap-2 flex p-2 ${(inputFocus && dropDownList.length>0)? "border-b" : ""} border-gray-300 focus:outline-none`}>

              {languages?.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center capitalize text-nowrap gap-2 px-3 py-1 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
                >
                  {lang}
                  <button
                    onClick={() => removeLanguage(lang)}
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
                onBlur={() => setTimeout(() => { setInputFocus(false) }, 250)}
                className="flex-grow w-full border-none focus:ring-0 focus:outline-none text-sm"
              />
            </div>

            {inputFocus && dropDownList.length>0 &&
            <div className="w-full h-fit bg-white flex flex-col items-start px-2">
              {dropDownList.filter(lang => !languages.includes(lang)).map((item, index) => (
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
        {/* <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm"><div className="w-1 aspect-square rounded-full bg-red-500"></div> Category </label> */}
        <ReactQuill
          theme="snow"
          placeholder="Placeholder"
          className="mt-2 h-[400px] mb-12"
          value={documents[0].body}
          onChange={(value) => handleQuillChange(value)}
        />
      </div>

      {/* Submit Button */}
      <div className="w-fit h-fit absolute bottom-8 right-6">
        <BlueButton 
          text={"Save"}
          onClickHandler={handleSubmit}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CreateNewDocumentTemplate;
