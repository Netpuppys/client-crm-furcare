import { useEffect, useState } from "react";
import { useAlertContext } from "../../../../utils/AlertContext";
import { useAppContext } from "../../../../utils/AppContext";
import axiosInstance from "../../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";

const EditStaff = ({ 
    editStaff, 
    fetchStaffData
  }) => {

    const { setAlert } = useAlertContext()
  
    const { selectedBranch } = useAppContext()
  
    const [ formData, setFormData ] = useState({
      name: editStaff.name,
      phone: editStaff.phone,
      email: editStaff.email,
      password: "1234567890",
      roles: editStaff.roles
    });
  
    const [ roles, setRoles] = useState([]) // Initial roles
    const [ inputValue, setInputValue] = useState("")
    const [ rolesList, setRolesList ] = useState([])
    const [ inputFocus, setInputFocus ] = useState(false)
    const [ dropDownList, setDropDownList ] = useState([])
    const [ disabled, setDisabled ] = useState(true)
    const [ active, setActive ] = useState(editStaff.active)
  
    useEffect(() => {
      const filtered = editStaff.roles.map(item => ({ name: item.roleDetails.name }));

      const roleChange = roles.every((value, index) => value === filtered[index])
      
      console.log(roleChange, roles, filtered)

      if (
        (formData.name === "" || formData.name===editStaff.name) &&
        (formData.phone === "" || formData.phone===editStaff.phone) &&
        (formData.email === "" || formData.email===editStaff.email) &&
        active===editStaff.active && !roleChange && roles.length===editStaff.roles.length

      ) {
        setDisabled(true)
        return
      }
  
      setDisabled(false)
    }, [formData, roles, active, editStaff])

    useEffect(() => {
      if (formData.roles.length>0) {
        const filtered = formData.roles.map(item => ({ name: item.roleDetails.name }));

        setRoles(filtered)
      }
    }, [formData])
  
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
  
      // Validation logic
      if (!formData.name || !formData.phone || !formData.email || !rolesArr.length===0) {
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
        businessBranchId: selectedBranch?.id
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
                placeholder="jdoe@oases.com"
                value={formData.email}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z0-9@.]*$/.test(value)) { // Allows letters, numbers, @, and .
                        handleInputChange("email", value);
                    }
                }}
              />
              {/* <div className="p-2 border-r border-[#E1E3EA] bg-[#F9F9FA] w-fit">
                .com
              </div> */}
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
                onBlur={() => setTimeout(() => { setInputFocus(false) }, 150)}
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

        <div className='w-full'>
            <p className='text-sm font-semibold text-[#121C2D] flex items-center justify-start gap-1'>
                <span className='w-[4px] h-[4px] rounded-full bg-[#EB5656]'></span>
                Status
            </p>
            <div className="flex mt-1 h-[2.25rem]">
                <button
                    className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
                        active===true
                        ? "bg-[#F4F9FF] border-[#006DFA] border-r-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-l-lg"
                    }`}
                    onClick={() => setActive(true)}
                >
                    Active
                </button>

                <button
                    className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
                        active===false
                        ? "bg-[#F4F9FF] border-[#006DFA] border-l-gray-300 text-[#006DFA]"
                        : "border-gray-300 text-[#121C2D] rounded-r-lg"
                    }`}
                    onClick={() => setActive(false)}
                >
                    Inactive 
                </button>
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

export default EditStaff;