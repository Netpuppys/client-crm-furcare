import React, { useEffect, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import BlueButton from "../../../ui/BlueButton";
import deleteIcon from "../../../Assets/icons/deleteIcon.png"
import axiosInstance from "../../../utils/AxiosInstance";
import { useAppContext } from "../../../utils/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";

const SuppliesTable = ({ suppliesData }) => {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#F9F9FA]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Name</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Items</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Vendors</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Status</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E1E3EA]">
          {suppliesData?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-[#121C2D] capitalize">
                {item.name}
              </td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">
                {item.items.map((obj, id) => (
                  <p key={id} className="capitalize">
                    {obj.name}{item.items.length>1? ", " : ""}
                  </p>
                ))}
              </td>
              <td className="px-4 py-2 text-sm">
                <a href={item.url} className="text-blue-600 underline">
                  List
                </a>
              </td>

              <td className="px-4 py-2 text-sm flex items-center">
                <div
                  className={`w-3 aspect-square ${
                    item.active? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rotate-45 rounded-sm"
                  }`}
                ></div>
                <span
                  className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                >
                  {item.active? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CreateNewForm = ({ fetchSuppliesData }) => {
  const { setAlert } = useAlertContext()

  const { selectedBranch } = useAppContext()

  const [ vendorList, setVendorList ] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    item: [
      { name: "", vendor: {} }
    ]
  });

  useEffect(() => {
    if (!selectedBranch?.id) {
      return
    }

    axiosInstance
      .get(`/api/v1/vendors?businessUnitId=${selectedBranch.id}`)
      .then(res => {
        const response = res.data.data.data;
        setVendorList(response)
      })
      .catch(err => {
        console.error(err)
      })
  }, [selectedBranch])

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      item: [...prev.item, { name: "", vendor: "" }]
    }));
  };

  const handleFieldChange = (index, key, value) => {
    setFormData((prev) => {
      const updatedItems = [...prev.item];
      updatedItems[index][key] = value;
      return { ...prev, item: updatedItems };
    });
  };

  const handleVendorFieldChange = (index, key, value) => {
    setFormData((prev) => {
      const updatedItems = [...prev.item];
      updatedItems[index][key] = JSON.parse(value);
      return { ...prev, item: updatedItems };
    });
  };

  const handleDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      item: prev.item.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Validation logic
    if (!formData.name) {
      alert("Name is required.");
      return;
    }

    // Validate each item in the item array
    const itemErrors = formData.item.map((item) => {
      const errors = {};
      if (!item.name) {
        errors.name = "Item name is required.";
      }
      if (!item.vendor?.id) {
        errors.vendor = "Vendor is required.";
      }
      return errors;
    });

    // Check if any item has errors
    const hasErrors = itemErrors.some((error) => Object.keys(error).length > 0);

    if (hasErrors) {
      // Alert the user or handle validation errors
      toast.error("Please fill all required fields for each item.");
      return;
    }

    const sendData = {
      name: formData.name,
      businessBranchId: selectedBranch.id,
      items: formData.item.map((item) => (
        {
          name: item.name,
          vendorId: item.vendor.id
        }
      ))
    }

    axiosInstance
      .post(`/api/v1/supplies`, sendData)
      .then(res => {
        console.log(res)
        setAlert("Created Successfully")
        fetchSuppliesData()
      })
      .catch(err => {
        console.error(err)
        toast.error("Something went wrong")
      })
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
          className="mt-1 p-2 capitalize border border-gray-300 focus:outline-none rounded-lg"
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
      {formData.item.map((field, index) => (
        <div key={index} className="flex w-full h-20 items-end justify-between gap-6">
          <div className="w-full">
            <label className="font-medium text-[#121C2D] flex items-center gap-2">
              <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
              Item
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 capitalize border border-gray-300 focus:outline-none rounded-lg"
              placeholder="Placeholder"
              value={field.name}
              onChange={(e) => handleFieldChange(index, "name", e.target.value)}
            />
          </div>
          <div className="w-full">
            <div className="w-[98%] items-center flex justify-between">
              <label className="w-fit font-medium text-[#121C2D] flex items-center gap-2">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Vendor
              </label>
            </div>
            {/* <input
              type="search"
              className="w-full mt-1 p-2 capitalize border border-gray-300 focus:outline-none rounded-lg"
              placeholder="Placeholder"
              value={field.vendor.name}
              onChange={(e) => handleFieldChange(index, "vendor", e.target.value)}
            /> */}
            <select
              value={JSON.stringify(field.vendor) || ""}
              onChange={(e) => handleVendorFieldChange(index, "vendor", e.target.value)}
              className="w-full classic mt-1 p-2 capitalize border border-gray-300 focus:outline-none rounded-lg"
            >
              <option value={JSON.stringify({})}>Select Vendor</option>
              {vendorList.map((vendor, vendorId) => (
                <option
                  key={vendorId}
                  value={JSON.stringify(vendor)}
                >
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          {/* {index!==0 && */}
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
  const navigate = useNavigate()

  const { sidebarExpanded } = useAppContext()

  const [ createNew, setCreateNew ] = useState(false);
  const [ suppliesData, setSuppliesData ] = useState([]);

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
  }

  const fetchSuppliesData = () => {
    axiosInstance
      .get("/api/v1/supplies")
      .then(res => {
        const response = res.data.data.data
        setSuppliesData(response)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    axiosInstance
      .get("/api/v1/supplies")
      .then(res => {
        const response = res.data.data.data
        setSuppliesData(response)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleCreateNew = () => {
    setCreateNew(true)
  }

  return (
    <div className="w-full min-h-full px-[36px] py-4">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <button
            onClick={handleAdminClick}
            className='underline inline'
          >
            Admin
          </button>
          <span> / </span>
          <p
            className='underline inline cursor-default'>
            Supplies Management
          </p>
        </div>
        <BlueButton
          onClickHandler={handleCreateNew}
          text={"Create"}
        />
      </div>

      <div className="w-full mt-6">
        <SuppliesTable 
          suppliesData={suppliesData}
        />
      </div>

      {createNew &&
      <div className={`fixed
        ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
        top-0 h-screen right-0 flex z-50`}>

        <div 
          onClick={() => setCreateNew(false)}
          className="w-[calc(100%-45rem)] h-full"
        ></div>

        <div className={`fixed top-0 shadow-2xl overflow-y-auto h-full bg-white w-[45rem] right-0`}>
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Create Supply
              </p>
              <button
                onClick={() => setCreateNew(false)}
                className=""
              >
                <img src={closeIcon} className="w-7 " alt="" />
              </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <CreateNewForm 
                fetchSuppliesData={fetchSuppliesData}
              />
            </div>
        </div>
      </div>}
    </div>
  );
}
export default SuppliesManagementPage;