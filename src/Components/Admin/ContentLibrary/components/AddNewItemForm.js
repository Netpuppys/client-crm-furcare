import React, { useEffect, useState } from "react";
import _ from "lodash";
import BlueButton from "../../../../ui/BlueButton";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAlertContext } from "../../../../utils/AlertContext";
import Syncfusion from "../../../../ui/Syncfusion";

const AddNewItemForm = ({ content, fetchContent }) => {
  const { setAlert } = useAlertContext();

  const [initialData, setInitialData] = useState({
    category: "",
    gender: "",
    animalType: "",
    ageRange: "",
    healthConcerns: "",
    sterilizationStatus: "",
  });

  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    animalType: "",
    ageRange: "",
    healthConcerns: "",
    sterilizationStatus: "",
  });

  const [additionalNotes, setAdditionalNotes] = useState(content.body);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setInitialData({
      category: "",
      gender: "",
      animalType: "",
      ageRange: "",
      healthConcerns: "",
      sterilizationStatus: "",
    });
  }, [content]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleChange = (value) => {
    setAdditionalNotes(value);
  };

  useEffect(() => {
    if (_.isEqual(initialData, formData) && additionalNotes === content.body) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData, initialData, additionalNotes, content]);

  const handleSubmit = () => {
    const sendData = {
      body: additionalNotes,
    };

    // Log the form data
    axiosInstance
      .patch(`/api/v1/content-library/${content.id}`, sendData)
      .then((res) => {
        // console.log(res)
        setAlert("Updated Successfully");
        fetchContent();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="p-6 flex flex-col justify-center items-end mx-auto bg-white rounded-md space-y-6">
      <div className="flex w-full items-center justify-between">
        {/* Category Input */}
        <div className="flex flex-col w-[70%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Category{" "}
          </label>
          <input
            type="text"
            className="mt-1 h-[2.25rem] px-2 border border-[#8891AA] disabled:bg-[#F4F4F6] disabled:opacity-100 focus:outline-none rounded-md"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            disabled
          />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col w-[25%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Gender{" "}
          </label>
          <div className="flex mt-1">
            <button
              disabled
              className={`h-[2.25rem] px-4 text-sm border disabled:bg-[#F4F4F6] border-r-[0.5px] disabled:opacity-100 ${
                formData.gender === "Male"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-l-md"
              }`}
              onClick={() => handleInputChange("gender", "Male")}
            >
              Male
            </button>

            <button
              disabled
              className={`h-[2.25rem] px-4 text-sm border disabled:bg-[#F4F4F6] border-l-[0.5px] disabled:opacity-100 ${
                formData.gender === "Female"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-r-md"
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
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Animal Type{" "}
          </label>
          <select
            disabled
            className="mt-1 px-2 h-[2.25rem] disabled:bg-[#F4F4F6] border border-[#8891AA] disabled:opacity-100 focus:outline-none rounded-md classic"
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
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Age Range{" "}
          </label>
          <div className="flex mt-1 h-[2.25rem] items-center rounded-md border border-[#8891AA] overflow-hidden">
            <input
              disabled
              type="number"
              className="p-2 w-20 h-full disabled:bg-[#F4F4F6] disabled:opacity-100 focus:outline-none"
              min={0}
              value={formData.ageRange}
              onChange={(e) => handleInputChange("ageRange", e.target.value)}
            />
            <div className="bg-[#F9F9FA] h-full flex items-center justify-center w-full border-l border-[#E1E3EA]">
              <span className="font-semibold text-sm text-[#606B85]">
                months
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Concerns Dropdown */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col w-[55%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Health Concerns{" "}
          </label>
          <select
            disabled
            className="classic mt-1 h-[2.25rem] px-2 disabled:bg-[#F4F4F6] disabled:opacity-100 border border-[#8891AA] rounded-md focus:outline-none"
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
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Sterilization Status{" "}
          </label>
          <div className="flex mt-1">
            <button
              disabled
              className={`h-[2.25rem] px-4 text-sm disabled:bg-[#F4F4F6] disabled:opacity-100 border border-r-[0.5px] ${
                formData.sterilizationStatus === "Intact"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-l-md"
              }`}
              onClick={() => handleInputChange("sterilizationStatus", "Intact")}
            >
              Intact
            </button>
            <button
              disabled
              className={`h-[2.25rem] px-4 text-sm disabled:bg-[#F4F4F6] disabled:opacity-100 ${
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
              className={`h-[2.25rem] px-4 text-sm disabled:bg-[#F4F4F6] disabled:opacity-100 border border-l-[0.5px] ${
                formData.sterilizationStatus === "Unsure"
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-r-md"
              }`}
              onClick={() => handleInputChange("sterilizationStatus", "Unsure")}
            >
              Unsure
            </button>
          </div>
        </div>
      </div>
      {/* Rich Text Editor */}
      <div className="w-full">
        <Syncfusion value={additionalNotes} onChangeFunction={handleChange} />
      </div>

      {/* Submit Button */}
      <div className="w-fit h-fit absolute bottom-8 right-6">
        <BlueButton
          onClickHandler={handleSubmit}
          text={"Save"}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AddNewItemForm;
