import React, { useEffect, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import closeIcon from "../../../Assets/icons/alert/close.png";
import axiosInstance from "../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../ui/BlueButton";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../utils/AppContext";
import { useAlertContext } from "../../../utils/AlertContext";

const DiagnosticTable = ({ staffData }) => {

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
          {staffData?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.name}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.id}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">{item.email}</td>
              <td className="px-4 py-2 text-sm text-[#121C2D]">
                {item?.roles?.map((role, id) => (
                  <span key={id} className="">
                    {role.roleDetails.name}{item.roles.length>id+1? ", " : ""}
                  </span>
                ))}
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
                  Inactive
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CreateNewForm = ({ fetchStaffData }) => {
  const { setAlert } = useAlertContext()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "1234567890",
    roles: []
  });

  const [ roles, setRoles] = useState([]); // Initial roles
  const [ inputValue, setInputValue] = useState("");
  const [ rolesList, setRolesList ] = useState([])
  const [ inputFocus, setInputFocus ] = useState(false)
  const [ dropDownList, setDropDownList ] = useState([])
  const [ disabled, setDisabled ] = useState(true)

  useEffect(() => {
    if (formData.name === "" || formData.phone === "" || formData.email === "" || roles.length===0 ) {
      setDisabled(true)
      return
    }

    setDisabled(false)
  }, [formData, roles])

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
  }, [])

  // Function to remove a role
  const removeRole = (roleToRemove) => {
    setRoles(roles.filter((role) => role !== roleToRemove));
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {

    const rolesArr = roles.map(({id}) => id)
    console.log(rolesArr)
    console.log("Submitted Form Data: ", formData);


    // Validation logic
    if (!formData.name || !formData.phone || !formData.email || !rolesArr.length===0) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Log the form data
    console.log("Submitted Form Data: ", formData);

    const sendData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      roles: rolesArr
    }

    axiosInstance
      .post(`/api/v1/staff`, sendData)
      .then(res => {
        console.log(res)
        setAlert("Staff member added successfully")
        fetchStaffData()
      })
      .catch(err => {
        console.error(err)
      })
  };

  useEffect(() => {
    if (inputValue) {
      const data = rolesList.filter(item => item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
      const finalData = data.filter(item => !roles.includes(item.name))
      setDropDownList(finalData);
    } else {
      setDropDownList([]);
    }
  }, [roles, rolesList, inputValue]);

  const handleDropDownClick = (value) => {
    setRoles(prev => ([
      ...prev, value
    ]))
    setInputValue("")
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
      <div className="w-full flex flex-col gap-2">
        <label className="font-medium text-[#121C2D] flex items-center gap-2">
          <div className="w-1 aspect-square rounded-full bg-red-500"></div>
          Role(s)
        </label>
        <div className="mt-1 w-full relative gap-2 h-fit border border-gray-300 focus:outline-none rounded-lg overflow-hidden">
          <div className={`w-full relative gap-2 flex p-2 ${(inputFocus && dropDownList.length>0)? "border-b" : ""} border-gray-300 focus:outline-none`}>
            {roles?.map((role, index) => (
              <div
                key={index}
                className="flex items-center text-nowrap gap-2 px-3 py-1 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
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
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setTimeout(() => { setInputFocus(false) }, 100)}
              className="flex-grow w-full border-none focus:ring-0 focus:outline-none text-sm"
            />
          </div>

          {inputFocus &&
          <div className="w-full h-fit bg-white flex flex-col items-start px-2">
            {dropDownList.map((item, index) => (
              <button key={index} onClick={() => handleDropDownClick(item)} className="py-2 w-full flex items-center justify-start border-b border-gray-300 last:border-b-0">
                <p className="capitalize text-sm">
                  {item.name}
                </p>
              </button>
            ))}
          </div>}
        </div>
      </div>
      

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

function StaffManagementPage() {
  const navigate = useNavigate()

  const { setSidebarExpanded } = useAppContext()

  const [ createNew, setCreateNew] = useState(false);
  const [ staffData, setStaffData ] = useState([])

  const handleAdminClick = () => {
    setSidebarExpanded(false)
    navigate("/admin/branch-units")
}

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/staff`)
      .then(res => {
        const response = res.data.data.data
        console.log(response)
        setStaffData(response)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const fetchStaffData = () => {
    axiosInstance
      .get(`/api/v1/staff`)
      .then(res => {
        const response = res.data.data.data
        console.log(response)
        setStaffData(response)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleCreateNew = () => {
    setCreateNew(true)
  }

  return (
    <div className="w-full min-h-full px-8 py-4">
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
            Staff Management
          </p>
        </div>
        <BlueButton
          onClickHandler={handleCreateNew}
          text={"Add"}
        />
      </div>

      <div className="w-full mt-6">
        <DiagnosticTable 
          staffData={staffData}
        />
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
          <CreateNewForm 
            fetchStaffData={fetchStaffData}
          />
        </div>
      </div>
    </div>
  );
}
export default StaffManagementPage;
