import React, { useEffect, useState } from "react";
import BlueButton from "../../../../ui/BlueButton";
import deleteIcon from "../../../../Assets/icons/deleteIcon.png";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAppContext } from "../../../../utils/AppContext";
import { toast } from "react-toastify";
import { useAlertContext } from "../../../../utils/AlertContext";

const EditSupplyForm = ({ editSupply, fetchSuppliesData }) => {
  const { setAlert } = useAlertContext();
  const { selectedBranch } = useAppContext();

  const [vendorList, setVendorList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(editSupply.active);
  const [removeItem, setRemoveItem] = useState([]);
  const [formData, setFormData] = useState({
    name: editSupply.name,
    item: [{ name: "", vendor: {} }],
  });

  useEffect(() => {
    if (editSupply.items.length > 0) {
      setFormData((prev) => ({
        ...prev,
        item: editSupply.items.map((item) => ({
          name: item.name,
          vendor: item.vendor,
          id: item.id,
        })),
      }));
    }
  }, [editSupply]);

  useEffect(() => {
    // Check if main name field is empty
    if (formData.name.trim() === "") {
      setDisabled(true);
      return;
    }

    // Check if any item name is empty or vendor is empty
    if (formData.item.length > 0) {
      for (let item of formData.item) {
        if (
          item.name.trim() === "" ||
          JSON.stringify(item.vendor) === JSON.stringify({})
        ) {
          setDisabled(true);
          return;
        }
      }
    }

    // Check if form has no changes
    if (active === editSupply.active && formData.name === editSupply.name) {
      if (formData.item.length === editSupply.items.length) {
        let allItemsSame = formData.item.every(
          (item, index) =>
            item.name === editSupply.items[index]?.name &&
            JSON.stringify(item.vendor) ===
              JSON.stringify(editSupply.items[index]?.vendor)
        );

        if (allItemsSame) {
          setDisabled(true);
          return;
        }
      }
    }

    setDisabled(false);
  }, [formData, editSupply, active]);

  // fetch vendor list
  useEffect(() => {
    if (!selectedBranch.id) {
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

  const handleDelete = (index, item) => {
    console.log(item);
    if (item?.id) {
      setRemoveItem((prev) => [...prev, item.id]);
    }

    setFormData((prev) => ({
      ...prev,
      item: prev.item.filter((_, i) => i !== index),
    }));
  };

  async function removeItems() {
    for (const item of removeItem) {
      try {
        const res = await axiosInstance.delete(
          `/api/v1/supplies/${editSupply.id}/items/${item}`
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSubmit = () => {
    let addResources = [];

    const sendResources = formData.item.map((item) => ({
      name: item.name,
      vendorId: item.vendor.id,
    }));

    const initialResourcesId = editSupply.items.map((item) => ({
      name: item.name,
      vendorId: item.vendor.id,
    }));

    // Find resources to add (present in sendResources but not in initialResourcesId)
    addResources = sendResources.filter(
      (item) =>
        !initialResourcesId.some(
          (res) => JSON.stringify(item) === JSON.stringify(res)
        )
    );

    if (addResources.length > 0) {
      const sendNewResources = {
        items: addResources,
      };

      axiosInstance
        .post(`/api/v1/supplies/${editSupply.id}/items`, sendNewResources)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (removeItem.length > 0) {
      removeItems();
    }

    const sendData = {
      name: formData.name,
      active: active,
    };

    axiosInstance
      .patch(`/api/v1/supplies/${editSupply.id}`, sendData)
      .then((res) => {
        console.log(res);
        setAlert("Updated Successfully");
        fetchSuppliesData();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-md space-y-6">
      <div className="w-full flex justify-between gap-6 pr-10">
        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Name{" "}
          </label>
          <input
            type="text"
            className="mt-1 h-[2.25rem] px-2 capitalize border border-[#8891AA] focus:outline-none rounded-md"
            placeholder="Placeholder"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Status
          </label>
          <div className="flex mt-1 h-[2.25rem]">
            <button
              className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                active === true
                  ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-l-md"
              }`}
              onClick={() => setActive(true)}
            >
              Active
            </button>

            <button
              className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                active === false
                  ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
                  : "border-[#8891AA] text-[#121C2D] rounded-r-md"
              }`}
              onClick={() => setActive(false)}
            >
              Inactive
            </button>
          </div>
        </div>
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
            <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
              <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
              Item
            </label>
            <input
              type="text"
              disabled={field.id ? true : false}
              className="w-full mt-1 h-[2.25rem] px-2 capitalize border border-[#8891AA] focus:outline-none rounded-md"
              placeholder="Placeholder"
              value={field.name}
              onChange={(e) => handleFieldChange(index, "name", e.target.value)}
            />
          </div>
          <div className="w-full">
            <div className="w-[98%] items-center flex justify-between">
              <label className="w-fit font-medium text-[#121C2D] flex items-center gap-1 text-sm">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Vendor
              </label>
            </div>
            <select
              value={JSON.stringify(field.vendor) || ""}
              disabled={field.id ? true : false}
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
            onClick={() => handleDelete(index, field)}
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

export default EditSupplyForm;
