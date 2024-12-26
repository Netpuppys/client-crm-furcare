import React, { useState } from "react";
import { Link } from "react-router-dom";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import BlueButton from "../../../ui/BlueButton";
import deleteIcon from "../../../Assets/icons/deleteIcon.png"

const data = [
  {
    name: "Over the counter supplies",
    items: "Diets, Dental care items, Grooming Supplies",
    url: "#",
    status: "Active",
  },
  {
    name: "Physical exam equipments",
    items: "Stethoscope, Thermometer, Wood’s lamp +5",
    url: "#",
    status: "Active",
  },
  {
    name: "Treat & toy baskets",
    items: "Pet food, Treats, Toys",
    url: "#",
    status: "Active",
  },
  {
    name: "Medical record keeping",
    items: "Tablet, Desktop, Laptop",
    url: "#",
    status: "Inactive",
  },
  {
    name: "Surgery equipments",
    items: "Lights, Surgery table, Anaesthesia equipment +5",
    url: "#",
    status: "Active",
  },
  {
    name: "Drug & Supplies",
    items: "Basic drugs, Patient cages, Microscope +3",
    url: "#",
    status: "Inactive",
  },
];

const SuppliesTable = () => {
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
                <p className="">Items</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-2">
                <p className="">Vendors</p>
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
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.items}</td>
              <td className="px-4 py-2 text-sm">
                <a href={item.url} className="text-blue-600 underline">
                  List
                </a>
              </td>

              <td className="px-4 py-2 text-sm flex items-center">
                <div
                  className={`w-2 aspect-square rounded-full ${
                    item.status === "Active" ? "bg-[#0B602D]" : "bg-[#C72323]"
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

  const [fields, setFields] = useState([
    { item: "", vendor: "" }, // Initial pair of item and vendor
  ]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addField = () => {
    setFields([...fields, { item: "", vendor: "" }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
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

  const handleDelete = (id) => {
    setFields(prev => prev.filter((_, index) => index !== id))
  }
 
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
      <div className="w-full flex items-center justify-start">
        <BlueButton
          text={"Add Item"}
          onClickHandler={addField}
        />
      </div>
      {fields.map((field, index) => (
        <div key={index} className="flex w-full h-20 items-end justify-between gap-6">
          <div className="w-full">
            <label className="font-medium text-[#121C2D] flex items-center gap-2">
              <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
              Items
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
              placeholder="Placeholder"
              value={field.item}
              onChange={(e) => handleFieldChange(index, "item", e.target.value)}
            />
          </div>
          <div className="w-full">
            <div className="w-[98%] items-center flex justify-between">
              <label className="w-fit font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Vendor
              </label>
            </div>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 focus:outline-none rounded-lg"
              placeholder="Placeholder"
              value={field.vendor}
              onChange={(e) =>
                handleFieldChange(index, "vendor", e.target.value)
              }
            />
          </div>
          <button
            onClick={() => handleDelete(index)}
            className="h-[2.625rem] min-w-4 flex items-center justify-center"
          >
            <img src={deleteIcon} className="w-full " alt="" />
          </button>
        </div>
      ))}

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
function SuppliesManagementPage() {
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
          <Link to={"/admin/supplies-management"} className="underline">
            Supplies Management
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
        <SuppliesTable />
      </div>

      <div
        className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
          createNew ? "right-0 block" : "right-full hidden z-50"
        } `}
      >
        <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
          <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
            Create Supply
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
export default SuppliesManagementPage;
