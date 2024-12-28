import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import CreateNewRole from "./components/CreateNewRole";

const RolesAndPermissionsPage = () => {
  const [ rolesList, setRolesList ] = useState([]);
  const [ addNewModal, setAddNewModal ] = useState(false);
  const [ loaded, setLoaded ] = useState(false)

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

  return (
    <div className="w-full min-h-full px-8 py-4">
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

      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <p className="underline inline cursor-default">Admin</p>
          <span> / </span>
          <p className="underline inline cursor-default">
            Roles and Permissions
          </p>
        </div>
        <button
          onClick={() => setAddNewModal(true)}
          className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
        >
          Add
        </button>
      </div>

      <div className="mt-6 w-full p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Access Level</th>
              <th className="p-2">Staff</th>
              <th className="p-2">Permissions</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rolesList?.map((item, index) => (
              <tr
                key={index}
                // onClick={() => setEditAnimalClass(item)}
                className="hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-200"
              >
                <td className="p-2 w-[20%]">
                  <p className="text-[#121C2D] hover:underline capitalize">
                    {item.name}
                  </p>
                </td>
                <td className="p-2 w-[20%] relative">
                  <p className="text-[#121C2D] hover:underline capitalize">
                    {item.permissions[0].resource}
                  </p>
                </td>
                <td className="p-2 w-[20%] relative">
                  <p className="text-[#121C2D] hover:underline capitalize">
                    Yes
                  </p>
                </td>
                <td className="p-2 w-[20%] relative">
                  <div className="text-[#0263E0] group relative cursor-pointer underline">
                    list
                  </div>
                </td>
                <td className="p-2 flex items-center w-[20%] gap-1">
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
