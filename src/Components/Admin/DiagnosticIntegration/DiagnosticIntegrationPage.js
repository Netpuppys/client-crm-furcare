import React, { useState } from "react";
import { Link } from "react-router-dom";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import { FaSearch } from "react-icons/fa";

const data = [
  {
    name: "Unique Biodiagnostics Vet Path Lab Lab",
    location: "Parel, Mumbai",
    postalCode: "400012",
    url: "#",
    status: "Active",
  },
  {
    name: "Super Vet's Clinic & Diagnostics",
    location: "Chembur East, Mumbai",
    postalCode: "400071",
    url: "#",
    status: "Active",
  },
  {
    name: "Animal Profile Veterinary Clinic & Diagn..",
    location: "Baner, Pune",
    postalCode: "411045",
    url: "#",
    status: "Active",
  },
  {
    name: "Exotic Pet Clinic",
    location: "Takarkhada, Silvassa",
    postalCode: "396230",
    url: "#",
    status: "Inactive",
  },
];

const DiagnosticTable = () => {
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
                <p className="">Location</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Postal Code</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              URL
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
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.name}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">
                {item.location}
              </td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">
                {item.postalCode}
              </td>
              <td className="px-4 py-2 text-sm">
                <a href={item.url} className="text-blue-600 underline">
                  link
                </a>
              </td>
              <td className="px-4 py-2 text-sm flex items-center">
                <div
                  className={`w-2 aspect-square rounded-full ${
                    item.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                >
                  {item.status}
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
    <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-lg space-y-6">
      {/* Name Input */}
      <div className="flex flex-col w-full">
        <label className="font-medium text-[#121C2D] flex items-center gap-2">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div> Name{" "}
        </label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
          placeholder="Anesthesia and Surgery"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      {/* Address Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Address line 1
          </label>
          <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
            <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
              <FaSearch className="text-[#606B85] h-full" />
            </div>
            <input
              type="search"
              className="w-full focus:outline-none p-2"
              placeholder="M.G Road B-106 Sector"
              value={formData.address1}
              onChange={(e) => handleInputChange("address1", e.target.value)}
            />
          </div>
        </div>
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Address line 2
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="Building A-101 "
            value={formData.address2}
            onChange={(e) => handleInputChange("address2", e.target.value)}
          />
        </div>
      </div>

      {/* City and State Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            City
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="Malad"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            State
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="Maharashtra"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
        </div>
      </div>

      {/* Country and Postal Code Selection */}
      <div className="flex w-full items-center justify-between">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Country
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="India"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          />
        </div>
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Postal Code
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="400001"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end ">
        <button
          className="py-2 px-4 bottom-0 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const DiagnosticIntegrationPage = () => {
  const [createNew, setCreateNew] = useState(false);

  return (
    <div className="w-full min-h-full px-8 py-4">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <Link
            // to={"/admin"}
            className="underline"
          >
            Admin
          </Link>
          <span> / </span>
          <Link to={"/admin/diagnostic-integrations"} className="underline">
            Diagnostic Integration
          </Link>
        </div>
        <button
          onClick={() => setCreateNew(true)}
          className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
        >
          Create
        </button>
      </div>

      <div className="w-full mt-6">
        <DiagnosticTable />
      </div>

      <div
        className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
          createNew ? "right-0 block" : "right-full hidden z-50"
        } `}
      >
        <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
          <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
            Create Diagnostic Integration
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
};

export default DiagnosticIntegrationPage;
