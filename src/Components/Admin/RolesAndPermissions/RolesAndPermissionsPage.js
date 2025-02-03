import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import CreateNewRole from "./components/CreateNewRole";
import EditNewRoles from "./components/EditNewRoles";
import { useNavigate } from "react-router-dom";
import BlueButton from "../../../ui/BlueButton";
import informationIcon from "../../../Assets/icons/informationIcon.png";

const RolesAndPermissionsPage = () => {
  const navigate = useNavigate()
  
  const [ rolesList, setRolesList ] = useState([]);
  const [ addNewModal, setAddNewModal ] = useState(false);
  const [ loaded, setLoaded ] = useState(false)
  const [ editRole, setEditRole ] = useState()
  const [ selectedRole, setSelectedRole ] = useState()

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
  }

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/roles`)
      .then((res) => {
        const response = res.data.data.data;
        console.log(response);
        setRolesList(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoaded(true)
      })
  }, []);

  const fetchRolesList = () => {
    axiosInstance
      .get(`/api/v1/roles`)
      .then((res) => {
        const response = res.data.data.data;
        console.log(response);
        setRolesList(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const handleCreateNew = () => {
    setAddNewModal(true)
  }

  return (
    <div className="w-full min-h-full px-[36px] py-4">
        <div
            className={`${
            addNewModal ? "block" : "hidden"
            } w-[50rem] fixed right-0 top-0 h-screen bg-white z-50 shadow-xl`}
        >
            <CreateNewRole
                addNewModal={addNewModal}
                setAddNewModal={setAddNewModal}
                fetchRolesList={fetchRolesList}
            />
        </div>

        {editRole && 
        <div
            className={`${
            editRole ? "block" : "hidden"
            } w-[50rem] fixed right-0 top-0 h-screen bg-white z-50 shadow-xl`}
        >
            <EditNewRoles
                setEditRole={setEditRole}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                fetchRolesList={fetchRolesList}
            />
        </div>}

      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <button
            onClick={handleAdminClick}
            className="underline inline"
          >
            Admin
          </button>
          <span> / </span>
          <p className="underline inline cursor-default">
            Roles and Permissions
          </p>
        </div>
        <BlueButton
            onClickHandler={handleCreateNew}
            text={"Add"}
        />
      </div>

      <div className="mt-6 w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
              {/* <th className="p-2">Name</th>
              <th className="p-2">Access Level</th>
              <th className="p-2">Staff</th>
              <th className="p-2">Permissions</th>
              <th className="p-2">Status</th> */}
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                <div className="flex items-center gap-2">
                  <p className="">Name</p>
                  <img src={informationIcon} className="w-5" alt="" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                <div className="flex items-center gap-2">
                  <p className="">Access Level</p>
                  <img src={informationIcon} className="w-5" alt="" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                <div className="flex items-center gap-2">
                  <p className="">Staff</p>
                  <img src={informationIcon} className="w-5" alt="" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                <div className="flex items-center gap-2">
                  <p className="">Permissions</p>
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
          <tbody>
            {rolesList?.map((item, index) => (
              <tr
                key={index}
                onClick={() => { setEditRole(true); setSelectedRole(item) }}
                className="hover:bg-gray-50 text-sm text-gray-700 last:border-b-0 border-b border-gray-200"
              >
                <td className="px-4 py-3 w-[20%]">
                  <p className="text-[#121C2D] hover:underline capitalize">
                    {item.name}
                  </p>
                </td>
                <td className="px-4 py-3 w-[20%] relative">
                  <p className="text-[#121C2D] hover:underline capitalize">
                    {item.accessLevel}
                  </p>
                </td>
                <td className="px-4 py-3 w-[20%] relative">
                  <p className="text-[#121C2D] hover:underline capitalize">
                    {item.isStaff? "Yes" : "No"}
                  </p>
                </td>
                <td className="px-4 py-3 w-[20%] relative">
                  <div className="text-[#0263E0] group relative cursor-pointer underline">
                    List
                  </div>
                </td>
                <td className="px-4 py-3 flex items-center w-[20%] gap-1">
                <div
                  className={`min-w-3 aspect-square ${
                    item.active? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rotate-45 rounded-sm"
                  }`}
                ></div>
                  <span className="">
                    {item.active? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rolesList.length === 0 && loaded && (
          <div className="w-full h-10 flex items-center justify-center">
            Roles Not Found
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesAndPermissionsPage;
