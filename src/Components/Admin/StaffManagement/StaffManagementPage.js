import React, { useEffect, useRef, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import axiosInstance from "../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../ui/BlueButton";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utils/AlertContext";
import { useAppContext } from "../../../utils/AppContext";
import EditStaff from "./component/EditStaff";
import { z } from "zod";
import chevronDown from "../../../Assets/icons/chevronDown.png"

const DiagnosticTable = ({ loaded, staffData, setEditStaff }) => {
  return (
    <div className="overflow-x-auto">
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
                <p className="">Id</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Email</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Roles</p>
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
          {staffData?.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50"
              onClick={() => setEditStaff(item)}
            >
              <td className="px-4 py-2 text-sm capitalize text-[#121C2D]">{item.name}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.id}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.email}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">
                {item?.roles?.map((role, id) => (
                  <span key={id} className="">
                    {role.roleDetails.name}
                    {item.roles.length > id + 1 ? ", " : ""}
                  </span>
                ))}
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
                  className={`inline-block px-2 py-1 text-[#121C2D] capitalize text-sm`}
                >
                  {item.active ? "active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {staffData.length === 0 && loaded && (
        <div className="w-full h-10 text-sm flex items-center justify-center">
          No Staff Members Found
        </div>
      )}
    </div>
  );
};

const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email format"),
});

const CreateNewForm = ({ fetchStaffData }) => {
  const { setAlert } = useAlertContext();

  const dropdownRef = useRef()

  const { selectedBranch } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "1234567890",
    roles: [],
  });

  const [roles, setRoles] = useState([]); // Initial roles
  const [inputValue, setInputValue] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [ showDropdown, setShowDropdown ] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.email === "" ||
      roles.length === 0
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
  }, [formData, roles]);

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/roles?businessUnitId=${selectedBranch.businessUnitId}`)
      .then((res) => {
        const response = res.data.data.data;
        setRolesList(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedBranch]);

  // Function to remove a role
  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const rolesArr = roles.map(({ id }) => id);
    setLoader(true);

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
      password: formData.password,
      roles: rolesArr,
      businessUnitId: selectedBranch?.businessUnitId,
      businessBranchId: selectedBranch?.id,
    };

    axiosInstance
      .post(`/api/v1/staff`, sendData)
      .then((res) => {
        console.log(res);
        setAlert("Staff member added successfully");
        fetchStaffData();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    // if (inputValue) {
    //   const data = rolesList.filter((item) =>
    //     item.name.toLowerCase().startsWith(inputValue.toLowerCase())
    //   );
    //   const finalData = data.filter((item) => !roles.includes(item.name));
    //   setDropDownList(finalData);
    // } else {
    //   setDropDownList(
    //     rolesList.filter((item) => roles.every((role) => role.id !== item?.id))
    //   );
    // }
    setDropDownList(rolesList);
  }, [roles, rolesList, inputValue]);

  const handleDropDownClick = (value) => {
    if (roles.some(item => item.id === value.id)) {
      setRoles(roles.filter(item => item.id !== value.id))
    } else {
      setRoles((prev) => [...prev, value]);
      setInputValue("");
    }
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
              className="w-full focus:outline-none h-[2.25rem] px-2"
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
          <div className="flex mt-1 overflow-hidden border border-[#8891AA] rounded-md">
            <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
              +91
            </div>
            <input
              type="tel"
              className="w-full focus:outline-none h-[2.25rem] px-2"
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
        <div ref={dropdownRef} className="w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
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
            <div className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#F4F4F6] hideScrollbar border-[#8891AA] z-50 overflow-y-auto">
              {dropDownList?.map((option, index) => (
                <div 
                  // onClick={() => handleDropDownClick(option)} 
                  className="p-2 block w-full"
                  key={index}
                >
                  <label className="flex w-full items-center cursor-pointer capitalize">
                    <input
                      readOnly
                      type="checkbox"
                      className="mr-2 placeholder:italic text-sm"
                      checked={roles.some(
                        (obj) => obj.id === option.id
                      )}
                      onChange={() => handleDropDownClick(option)}
                    />
                    <span className="capitalize">{option.name}</span>
                  </label>
                </div>
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

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end ">
        <BlueButton
          onClickHandler={handleSubmit}
          text={"Save"}
          disabled={disabled || loader}
        />
      </div>
    </div>
  );
};

function StaffManagementPage() {
  const navigate = useNavigate();

  const { sidebarExpanded, selectedBranch } = useAppContext();

  const [createNew, setCreateNew] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editStaff, setEditStaff] = useState(false);

  const handleAdminClick = () => {
    navigate("/admin/branch-units");
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/staff?businessBranchId=${selectedBranch.id}`)
      .then((res) => {
        const response = res.data.data.data;
        console.log(response);
        setStaffData(response);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedBranch]);

  const fetchStaffData = () => {
    axiosInstance
      .get(`/api/v1/staff?businessBranchId=${selectedBranch.id}`)
      .then((res) => {
        const response = res.data.data.data;
        console.log(response);
        setStaffData(response);
        setEditStaff(false);
        setCreateNew(false);
      })
      .catch((err) => {
        console.error(err);
      });
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
          <p className="underline inline cursor-default">Staff Management</p>
        </div>
        <BlueButton onClickHandler={handleCreateNew} text={"Add"} />
      </div>

      <div className="w-full mt-6">
        <DiagnosticTable
          staffData={staffData}
          loaded={loaded}
          setEditStaff={setEditStaff}
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
              <CreateNewForm fetchStaffData={fetchStaffData} />
            </div>
          </div>
        </div>
      )}

      {editStaff && (
        <div
          className={`fixed
        ${sidebarExpanded ? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
        top-0 h-screen right-0 flex z-50`}
        >
          <div className="w-[calc(100%-45rem)] h-full"></div>

          <div
            className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
              editStaff ? "right-0 block" : "right-full hidden z-50"
            } `}
          >
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Edit Staff
              </p>
              <button onClick={() => setEditStaff(false)} className="">
                <img src={closeIcon} className="w-7 " alt="" />
              </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <EditStaff
                fetchStaffData={fetchStaffData}
                editStaff={editStaff}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default StaffManagementPage;
