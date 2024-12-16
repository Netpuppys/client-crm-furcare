import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // React Quill styles
import ReactQuill from "react-quill";

const AddNewItemForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    animalType: "",
    ageRange: "",
    healthConcerns: "",
    sterilizationStatus: "",
    additionalNotes: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Validation logic
    if (!formData.category || !formData.gender || !formData.animalType) {
      alert("Please fill all required fields.");
      return;
    }

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
            className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="Anesthesia and Surgery"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
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
              className={`py-2 px-4 border border-r-[0.5px] ${
                formData.gender === "Male"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                  : "border-gray-300 text-[#121C2D] rounded-l-lg"
              }`}
              onClick={() => handleInputChange("gender", "Male")}
            >
              Male
            </button>

            <button
              className={`py-2 px-4 border border-l-[0.5px] ${
                formData.gender === "Female"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                  : "border-gray-300 text-[#121C2D] rounded-r-lg"
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
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="Animal Class - Breed"
            value={formData.animalType}
            onChange={(e) => handleInputChange("animalType", e.target.value)}
          />
        </div>

        {/* Age Range Input */}
        <div className="flex flex-col w-[25%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Age Range{" "}
          </label>
          <div className="flex mt-1 items-center rounded-lg border border-gray-300 overflow-hidden">
            <input
              type="number"
              className=" p-2 w-20 focus:outline-none"
              placeholder="12"
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
            className="classic mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
            value={formData.healthConcerns}
            onChange={(e) =>
              handleInputChange("healthConcerns", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="None">None</option>
            <option value="Minor Issues">Minor Issues</option>
            <option value="Severe">Severe</option>
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
              className={`py-2 px-4 border border-r-[0.5px] ${
                formData.sterilizationStatus === "Intact"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                  : "border-gray-300 text-[#121C2D] rounded-l-lg"
              }`}
              onClick={() => handleInputChange("sterilizationStatus", "Intact")}
            >
              Intact
            </button>
            <button
              className={`py-2 px-4 ${
                formData.sterilizationStatus === "Sterilized"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-y text-[#006DFA]"
                  : "border-gray-300 text-[#121C2D] border"
              }`}
              onClick={() =>
                handleInputChange("sterilizationStatus", "Sterilized")
              }
            >
              Sterilized
            </button>
            <button
              className={`py-2 px-4 border border-l-[0.5px] ${
                formData.sterilizationStatus === "Unsure"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                  : "border-gray-300 text-[#121C2D] rounded-r-lg"
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
          value={formData.additionalNotes}
          onChange={(value) => handleInputChange("additionalNotes", value)}
          placeholder="Write additional notes here..."
        />
      </div>

      {/* Submit Button */}
      <button
        className="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

export default AddNewItemForm;
