import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // React Quill styles
import ReactQuill from "react-quill";
import axiosInstance from "../../../../utils/AxiosInstance";
import BlueButton from "../../../../ui/BlueButton";
import _ from 'lodash';

const AddNewItemForm = ({ content }) => {
  const [ initialData, setInitialData ] = useState({
    category: "",
    gender: "",
    animalType: "",
    ageRange: "",
    healthConcerns: "",
    sterilizationStatus: "",
  })

  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    animalType: "",
    ageRange: "",
    healthConcerns: "",
    sterilizationStatus: "",
  });
  
  const [ additionalNotes, setAdditionalNotes ] = useState(content.content)
  const [ allAnimalClasses, setAllAnimalClasses ] = useState([])
  const [ disabled, setDisabled ] = useState(true)

  useEffect(() => {
    setInitialData({
      category: "",
      gender: "",
      animalType: "",
      ageRange: "",
      healthConcerns: "",
      sterilizationStatus: "",
    })
  }, [content])

  useEffect(() => {
    axiosInstance
      .get('/api/v1/animal-classes')
      .then(res => {
        console.log(res)
        setAllAnimalClasses(res.data.data.data)
      })
      .then(err => {
        console.error(err)
      })
  }, [])

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (_.isEqual(initialData, formData) && additionalNotes===content.content) {
      setDisabled(true);
      return;
    }

    console.log(additionalNotes)
    console.log(content.content)
  
    setDisabled(false);
  }, [formData, initialData, additionalNotes, content]);

  const handleSubmit = () => {
    // Validation logic
    // if (!formData.category || !formData.gender || !formData.animalType) {
    //   alert("Please fill all required fields.");
    //   return;
    // }

    // Log the form data
    console.log("Submitted Form Data: ", formData);
  };

  return (
    <div className="p-6 flex flex-col justify-center items-end mx-auto bg-white rounded-lg space-y-6">
      <div className="flex w-full items-center justify-between">
        {/* Category Input */}
        <div className="flex flex-col w-[70%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Category{" "}
          </label>
          <input
            type="text"
            className="mt-1 p-2 border border-[#8891AA] disabled:opacity-100 focus:outline-none rounded-lg"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            disabled
          />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col w-[25%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Gender{" "}
          </label>
          <div className="flex mt-1">
            <button
              disabled
              className={`py-2 px-4 border border-r-[0.5px] disabled:opacity-100 ${
                formData.gender === "Male"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-l-lg"
              }`}
              onClick={() => handleInputChange("gender", "Male")}
            >
              Male
            </button>

            <button
              disabled
              className={`py-2 px-4 border border-l-[0.5px] disabled:opacity-100 ${
                formData.gender === "Female"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-r-lg"
              }`}
              onClick={() => handleInputChange("gender", "Female")}
            >
              Female
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        {/* Animal Type Input */}
        <div className="flex flex-col w-[70%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Animal Type{" "}
          </label>
          <select
            disabled
            className="mt-1 p-2 border border-[#8891AA] disabled:opacity-100 focus:outline-none rounded-lg classic"
            value={formData.animalType}
            onChange={(e) => handleInputChange("animalType", e.target.value)}
          >
            {/* <option value={""}>Animal Type</option>
            {allAnimalClasses?.map((item, index) => (
              <option
                key={index}
                value={item.name}
              >
                {item.name}
              </option>
            ))} */}
          </select>
        </div>

        {/* Age Range Input */}
        <div className="flex flex-col w-[25%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Age Range{" "}
          </label>
          <div className="flex mt-1 items-center rounded-lg border border-[#8891AA] overflow-hidden">
            <input
              disabled
              type="number"
              className=" p-2 w-20 disabled:opacity-100 focus:outline-none"
              min={0}
              value={formData.ageRange}
              onChange={(e) => handleInputChange("ageRange", e.target.value)}
            />
            <span className="w-full h-full p-2 bg-[#F9F9FA] text-[#606B85] border-l border-[#E1E3EA]">
              months
            </span>
          </div>
        </div>
      </div>

      {/* Health Concerns Dropdown */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col w-[55%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Health Concerns{" "}
          </label>
          <select
            disabled
            className="classic mt-1 p-2 disabled:opacity-100 border border-[#8891AA] rounded-lg focus:outline-none"
            value={formData.healthConcerns}
            onChange={(e) =>
              handleInputChange("healthConcerns", e.target.value)
            }
          >
            {/* <option value="">Select</option>
            <option value="None">None</option>
            <option value="Minor Issues">Minor Issues</option>
            <option value="Severe">Severe</option> */}
          </select>
        </div>

        {/* Sterilization Status */}
        <div className="flex flex-col w-[40%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Sterilization Status{" "}
          </label>
          <div className="flex mt-1">
            <button
              disabled
              className={`py-2 px-4 disabled:opacity-100 border border-r-[0.5px] ${
                formData.sterilizationStatus === "Intact"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-l-lg"
              }`}
              onClick={() => handleInputChange("sterilizationStatus", "Intact")}
            >
              Intact
            </button>
            <button
              disabled
              className={`py-2 px-4 disabled:opacity-100 ${
                formData.sterilizationStatus === "Sterilized"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-y text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] border"
              }`}
              onClick={() =>
                handleInputChange("sterilizationStatus", "Sterilized")
              }
            >
              Sterilized
            </button>
            <button
              disabled
              className={`py-2 px-4 disabled:opacity-100 border border-l-[0.5px] ${
                formData.sterilizationStatus === "Unsure"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-r-lg"
              }`}
              onClick={() => handleInputChange("sterilizationStatus", "Unsure")}
            >
              Unsure
            </button>
          </div>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="w-full flex flex-col">
        {/* <label className="font-medium text-[#121C2D] flex items-center gap-2"><div className="w-1 aspect-square rounded-full bg-red-500"></div> Category </label> */}
        <ReactQuill
          className="mt-2 h-[400px] mb-12"
          theme="snow"
          value={additionalNotes}
          onChange={(value) => setAdditionalNotes(value)}
          placeholder="Write additional notes here..."
        />
      </div>

      {/* Submit Button */}
      <BlueButton
        onClickHandler={handleSubmit}
        text={"Save"}
        disabled={disabled}
      />
    </div>
  );
};

export default AddNewItemForm;
