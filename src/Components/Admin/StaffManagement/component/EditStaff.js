import { useEffect, useState } from "react";
import { useAlertContext } from "../../../../utils/AlertContext";
import { useAppContext } from "../../../../utils/AppContext";
import axiosInstance from "../../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";
import { z } from "zod";
import ActiveButtons from "../../../../ui/ActiveButtons";
import chevronDown from "../../../../Assets/icons/chevronDown.png"

const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email format"),
});

const EditStaff = ({ editStaff, fetchStaffData }) => {
  const { setAlert } = useAlertContext();

  const { selectedBranch } = useAppContext();

  const [formData, setFormData] = useState({
    name: editStaff.name,
    phone: editStaff.phone,
    email: editStaff.email,
    password: "1234567890",
    roles: editStaff.roles,
  });

  const [roles, setRoles] = useState([]); // Initial roles
  const [inputValue, setInputValue] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(editStaff.active);
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const filtered = editStaff.roles.map((item) => ({
      name: item.roleDetails.name,
    }));

    const roleChange = roles.every((value, index) => value === filtered[index]);

    if (
      (formData.name === "" || formData.name === editStaff.name) &&
      (formData.phone === "" || formData.phone === editStaff.phone) &&
      (formData.email === "" || formData.email === editStaff.email) &&
      active === editStaff.active &&
      !roleChange &&
      roles.length === editStaff.roles.length
    ) {
      setDisabled(true);
      return;
    }

    const result = staffSchema.safeParse(formData);

    if (!result.success) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData, roles, active, editStaff]);

  useEffect(() => {
    if (formData.roles.length > 0) {
      const filtered = formData.roles.map((item) => ({
        name: item.roleDetails.name,
      }));

      setRoles(filtered);
    }
  }, [formData]);

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/roles`)
      .then((res) => {
        const response = res.data.data.data;
        setRolesList(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Function to remove a role
  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const rolesArr = roles.map(({ id }) => id);

    // Validation logic
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !rolesArr.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const sendData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      businessUnitId: selectedBranch?.businessUnitId,
      businessBranchId: selectedBranch?.id,
      active: active,
    };

    axiosInstance
      .patch(`/api/v1/staff/${editStaff.id}`, sendData)
      .then((res) => {
        console.log(res);
        setAlert("Staff member updated successfully");
        fetchStaffData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (inputValue) {
      const data = rolesList.filter((item) =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      const finalData = data.filter((item) => !roles.includes(item.name));
      setDropDownList(finalData);
    } else {
      setDropDownList([]);
    }
  }, [roles, rolesList, inputValue]);

  const handleDropDownClick = (value) => {
    setRoles((prev) => [...prev, value]);
    setInputValue("");
  };

  return (
    <div className="p-6 flex h-full flex-col justify-start items-end mx-auto bg-white rounded-md space-y-6">
      {/* Name Input */}
      <div className="flex flex-col w-full">
        <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div> Name{" "}
        </label>
        <input
          type="text"
          className="mt-1 px-2 h-[2.25rem] border border-[#8891AA] focus:outline-none rounded-md"
          placeholder="Placeholder"
          value={formData.name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleInputChange("name", value);
            }
          }}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Email Address
          </label>
          <div className="flex mt-1 overflow-hidden border border-[#8891AA] rounded-md">
            <input
              type="email"
              className="w-full focus:outline-none px-2 h-[2.25rem]"
              placeholder="jdoe@oases.com"
              value={formData.email}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9@.]*$/.test(value)) {
                  // Allows letters, numbers, @, and .
                  handleInputChange("email", value);
                }
              }}
            />
          </div>
        </div>
        <div className="w-[47.5%]">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Phone Number
          </label>
          <div className="flex mt-1 h-[2.25rem] overflow-hidden border border-[#8891AA] rounded-md">
            <div className="px-2 h-[2.25rem] border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit flex items-center justify-end">
              +91
            </div>
            <input
              type="tel"
              className="w-full focus:outline-none h-full px-2"
              placeholder="9447010765"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (value.length <= 10) {
                  handleInputChange("phone", value); // Update state only if length is <= 10
                }
              }}
              pattern="\d{10}"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div>
          Role(s)
        </label>
        <div className="w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
          <div
            className={`w-full h-full flex items-center justify-between`}
          >
          <div className='px-3 flex overflow-x-auto items-center justify-start gap-1 h-full py-1'>
            {roles.length===0 &&
            <p className="text-sm text-[#121C2D] font-medium">
              Select
            </p>}

            {roles?.map((role, index) => (
              <div
                key={index}
                className="flex h-full text-sm items-center text-nowrap gap-2 px-3 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full capitalize"
              >
                {role.name}
                <button
                  onClick={() => removeRole(role)}
                  className="text-[#606B85] hover:text-blue-900 focus:outline-none"
                >
                  ✕
                </button>
              </div>
            ))}
            </div>
            <div className='h-full aspect-square flex items-center justify-center'>
                <button
                    disabled
                    onClick={() => setShowDropdown(prev => !prev)}
                    className='flex items-center justify-center w-5 h-5 aspect-square'
                >
                    <img
                        src={chevronDown}
                        className='w-full h-full object-contain'
                        alt='chevron down'
                    />
                </button>
            </div>
          </div>

          {showDropdown && (
            <div className="w-[calc(100%+2px)] h-fit absolute top-[calc(100%+1px)] left-[-1px] shadow-2xl rounded-md bg-white z-50 flex flex-col items-start justify-start px-2">
              {dropDownList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleDropDownClick(item)}
                  className="h-10 w-full flex items-center justify-start border-b border-[#8891AA] last:border-b-0"
                >
                  <p className="capitalize text-sm">{item.name}</p>
                </button>
              ))}
              {dropDownList.length === 0 && roles.length===0 && (
                <div className="border-t w-full last:border-b-0 border-[#E1E3EA] flex items-center justify-center text-sm h-10">
                  Roles Not Found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ActiveButtons active={active} setActive={setActive} />

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end ">
        <BlueButton
          onClickHandler={handleSubmit}
          text={"Save"}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EditStaff;
