import React, { useState } from "react";
import { Link } from "react-router-dom";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";

const data = [
  {
    name: "Manu Juneja",
    id: "ces14",
    url: "mjuneja@cessna.com",
    roles: "Admin, Doctor, Manager",
    status: "Active",
  },
  {
    name: "Rishad Mohammed",
    id: "ces15",
    url: "rmohd@cessna.com",
    roles: "Doctor",
    status: "Active",
  },
  {
    name: "Farseena Moideen",
    id: "ces16",
    url: "fmoid@cessna.com",
    roles: "Receptionist, Tech Assistant +2",
    status: "Active",
  },
  {
    name: "Rishan Muneer",
    id: "ces17",
    url: "rmuneer@cessna.com",
    roles: "Referral Doctor",
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
                <p className="">Id</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Email</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Roles</p>
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
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.name}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.id}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.url}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.roles}</td>
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

  const [roles, setRoles] = useState(["Admin", "Doctor"]); // Initial roles
  const [inputValue, setInputValue] = useState("");

  // Function to remove a role
  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  // Function to add a new role
  const addRole = () => {
    if (inputValue.trim() && !roles.includes(inputValue)) {
      setRoles([...roles, inputValue]);
      setInputValue(""); // Clear the input field
    }
  };

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
          placeholder="Placeholder"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Email Address
          </label>
          <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
            <input
              type="email"
              className="w-full focus:outline-none p-2"
              placeholder="jdoe@oases"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
              .com
            </div>
          </div>
        </div>
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-2">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Phone Number
          </label>
          <div className="flex mt-1 overflow-hidden border border-gray-300 rounded-lg">
            <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
              +91
            </div>
            <input
              type="tel"
              className="w-full focus:outline-none p-2"
              placeholder="9447010765"
              value={formData.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="font-medium text-[#121C2D] flex items-center gap-2">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div>
          Role(s)
        </label>
        <div className="mt-1 w-full gap-2 flex p-2 border border-gray-300 focus:outline-none rounded-lg">
          {roles.map((role) => (
            <div
              key={role}
              className="flex items-center gap-2 px-3 py-1 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
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
            onKeyDown={(e) => e.key === "Enter" && addRole()}
            className="flex-grow w-full border-none focus:ring-0 focus:outline-none text-sm"
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
function StaffManagementPage() {
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
          <Link to={"/admin/staff-management"} className="underline">
            Staff Management
          </Link>
        </div>
        <button
          onClick={() => setCreateNew(true)}
          className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
        >
          Add
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
            Add Staff
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
export default StaffManagementPage;
