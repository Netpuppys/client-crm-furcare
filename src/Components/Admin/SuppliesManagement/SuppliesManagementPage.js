import React, { useEffect, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import BlueButton from "../../../ui/BlueButton";
import deleteIcon from "../../../Assets/icons/deleteIcon.png";
import axiosInstance from "../../../utils/AxiosInstance";
import { useAppContext } from "../../../utils/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import EditSupplyForm from "./components/EditSupplyForm";
import VendorList from "./components/VendorList";

const SuppliesTable = ({ loaded, suppliesData, setEditSupply }) => {
  const [showLabelsList, setShowLabelsList] = useState();
  const [selectedGroup, setSelectedGroup] = useState();

  const handleListClick = (data, index) => {
    setShowLabelsList(index);
    setSelectedGroup(data);
  };

  return (
    <div className="">
      <table className="min-w-full">
        <thead className="bg-[#F9F9FA] border-b border-[#E1E3EA]">
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
          {suppliesData.length > 0 &&
            suppliesData?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-[#121C2D] capitalize">
                  <button
                    onClick={() => setEditSupply(item)}
                    className="text-sm text-[#0263E0] capitalize"
                  >
                    {item.name}
                  </button>
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D] text-nowrap flex items-center">
                  {item.items.map((obj, id) => (
                    <p key={id} className="capitalize">
                      {obj.name}
                      {item.items.length > 1 && id + 1 !== item.items.length
                        ? ", "
                        : ""}
                    </p>
                  ))}
                </td>
                <td className="px-4 py-2 text-sm relative">
                  <button
                    onClick={() => handleListClick(item, index)}
                    className="text-blue-600 cursor-pointer underline"
                  >
                    List
                  </button>

                  {showLabelsList === index && (
                    <div className="absolute top-[calc(100%+0.3rem)] z-50 left-1">
                      <VendorList
                        selectedGroup={selectedGroup.items}
                        selectedGroupData={item}
                        setShowLabelsList={setShowLabelsList}
                        setSelectedGroup={setSelectedGroup}
                        setEditGroup={setEditSupply}
                      />
                    </div>
                  )}
                </td>

                <td className="px-4 py-2 text-sm flex items-center">
                  <div
                    className={`w-3 aspect-square ${
                      item.active
                        ? "bg-[#0B602D] rounded-full"
                        : "bg-[#C72323] rotate-45 rounded-sm"
                    }`}
                  ></div>
                  <span
                    className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {suppliesData.length === 0 && loaded && (
        <div className="w-full h-10 text-sm flex items-center justify-center">
          Supplies not found
        </div>
      )}
    </div>
  );
};

const CreateNewForm = ({ fetchSuppliesData }) => {
  const { setAlert } = useAlertContext();
  const { selectedBranch } = useAppContext();

  const [vendorList, setVendorList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    item: [{ name: "", vendor: {} }],
  });

  useEffect(() => {
    if (formData.name.replace(/\s/g, "") === "") {
      setDisabled(true);
      return;
    }

    if (formData.item.length > 0) {
      formData.item.forEach((item, index) => {
        if (item.name.replace(/\s/g, "") === "") {
          setDisabled(true);
          return;
        }

        setDisabled(false);

        if (JSON.stringify(item.vendor) === JSON.stringify({})) {
          setDisabled(true);
          return;
        }

        setDisabled(false);
      });

      return;
    }

    setDisabled(false);
  }, [formData]);

  // fetch vendor list
  useEffect(() => {
    if (!selectedBranch?.id) {
      return;
    }

    axiosInstance
      .get(`/api/v1/vendors?businessUnitId=${selectedBranch.businessUnitId}`)
      .then((res) => {
        const response = res.data.data.data;
        setVendorList(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedBranch]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      item: [...prev.item, { name: "", vendor: {} }],
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
      item: prev.item.filter((_, i) => i !== index),
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
      items: formData.item.map((item) => ({
        name: item.name,
        vendorId: item.vendor.id,
      })),
    };

    axiosInstance
      .post(`/api/v1/supplies`, sendData)
      .then((res) => {
        console.log(res);
        setAlert("Created Successfully");
        fetchSuppliesData();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-md space-y-6">
      {/* Name Input */}
      <div className="flex flex-col w-full">
        {console.log(formData)}
        <label className="font-medium text-[#121C2D] flex items-center gap-2">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div> Name{" "}
        </label>
        <input
          type="text"
          className="mt-1 h-[2.25rem] px-2 capitalize border border-[#8891AA] focus:outline-none rounded-md"
          placeholder="Placeholder"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div className="w-full flex items-center justify-start">
        <BlueButton text={"Add Item"} onClickHandler={addField} />
      </div>
      {formData.item.map((field, index) => (
        <div
          key={index}
          className="flex w-full h-20 items-end justify-between gap-6"
        >
          <div className="w-full">
            <label className="font-medium text-[#121C2D] flex items-center gap-2">
              <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
              Item
            </label>
            <input
              type="text"
              className="w-full mt-1 h-[2.25rem] px-2 capitalize border border-[#8891AA] focus:outline-none rounded-md"
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
            <select
              value={JSON.stringify(field.vendor) || ""}
              onChange={(e) =>
                handleVendorFieldChange(index, "vendor", e.target.value)
              }
              className="w-full classic mt-1 h-[2.25rem] px-2 capitalize border border-[#8891AA] focus:outline-none rounded-md"
            >
              <option value={JSON.stringify({})}>Select Vendor</option>
              {vendorList.map((vendor, vendorId) => (
                <option key={vendorId} value={JSON.stringify(vendor)}>
                  {vendor.name}
                </option>
              ))}
            </select>
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
        <BlueButton
          text={"Save"}
          disabled={disabled}
          onClickHandler={handleSubmit}
        />
      </div>
    </div>
  );
};

function SuppliesManagementPage() {
  const navigate = useNavigate();

  const { sidebarExpanded, selectedBranch } = useAppContext();

  const [createNew, setCreateNew] = useState(false);
  const [suppliesData, setSuppliesData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editSupply, setEditSupply] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/supplies?businessBranchId=${selectedBranch.id}`)
      .then((res) => {
        const response = res.data.data.data;
        setSuppliesData(response);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedBranch]);

  const fetchSuppliesData = () => {
    setLoaded(false);

    axiosInstance
      .get(`/api/v1/supplies?businessBranchId=${selectedBranch.id}`)
      .then((res) => {
        const response = res.data.data.data;
        setSuppliesData(response);
        setLoaded(true);
        setEditSupply(false);
        setCreateNew(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  const handleAdminClick = () => {
    navigate("/admin/branch-units");
  };

  const handleCreateNew = () => {
    setCreateNew(true);
  };

  return (
    <div className="w-full min-h-full px-[36px] py-4">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <button onClick={handleAdminClick} className="underline inline">
            Admin
          </button>
          <span> / </span>
          <p className="underline inline cursor-default">Supplies Management</p>
        </div>
        <BlueButton onClickHandler={handleCreateNew} text={"Create"} />
      </div>

      <div className="w-full mt-6">
        <SuppliesTable
          loaded={loaded}
          suppliesData={suppliesData}
          setEditSupply={setEditSupply}
        />
      </div>

      {createNew && (
        <div
          className={`fixed
        ${sidebarExpanded ? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
        top-0 h-screen right-0 flex z-50`}
        >
          <div className="w-[calc(100%-45rem)] h-full"></div>

          <div
            className={`fixed top-0 shadow-2xl overflow-y-auto h-full bg-white w-[45rem] right-0`}
          >
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Create Supply
              </p>
              <button onClick={() => setCreateNew(false)} className="">
                <img src={closeIcon} className="w-7" alt="" />
              </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <CreateNewForm fetchSuppliesData={fetchSuppliesData} />
            </div>
          </div>
        </div>
      )}

      {editSupply && (
        <div
          className={`fixed
        ${sidebarExpanded ? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
        top-0 h-screen right-0 flex z-50`}
        >
          <div className="w-[calc(100%-45rem)] h-full"></div>

          <div
            className={`fixed top-0 shadow-2xl overflow-y-auto h-full bg-white w-[45rem] right-0`}
          >
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Edit Supply
              </p>
              <button onClick={() => setEditSupply(false)} className="">
                <img src={closeIcon} className="w-7 " alt="" />
              </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <EditSupplyForm
                editSupply={editSupply}
                fetchSuppliesData={fetchSuppliesData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SuppliesManagementPage;
