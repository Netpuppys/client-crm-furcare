import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import closeIcon from "../../../Assets/icons/alert/close.png";
import GroupManagementTable from "./components/GroupManagementTable";
import CreateNewGroup from "./components/CreateNewGroup";
import EditGroup from "./components/EditGroup";

function GroupManagementPage() {
    const [ createNew, setCreateNew ] = useState(false);
    const [ editGroup, setEditGroup ] = useState()
    const [ groupData, setGroupData ] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/api/v1/groups")
            .then(res => {
                const response = res.data.data.data;
                setGroupData(response)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
    <div className="w-full min-h-full px-8 py-4">
        <div className="flex items-start justify-between">
            <div className="text-[#0263E0] text-xs">
                <p
                    className="underline inline cursor-default"
                >
                    Admin
                </p>
                <span> / </span>
                <p className="underline inline cursor-default">
                    Group Management
                </p>
            </div>
            <button
                onClick={() => setCreateNew(true)}
                className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center"
            >
                Create
            </button>
        </div>

        <div className="w-full mt-6">
            <GroupManagementTable
                groupData={groupData}
                setEditGroup={setEditGroup}
            />
        </div>

        {/* create new group */}
        <div
            className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
                createNew ? "right-0 block" : "right-full hidden z-50"
            } `}
        >
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
                <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                    Create Group
                </p>
                <button onClick={() => setCreateNew(false)} className="">
                    <img src={closeIcon} className="w-7 " alt="" />
                </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
                <CreateNewGroup
                    setGroupData={setGroupData}
                />
            </div>
        </div>

        {/* edit group */}
        <div
            className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
                editGroup ? "right-0 block" : "right-full hidden z-50"
            } `}
        >
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
                <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                    Create Group
                </p>
                <button onClick={() => setEditGroup(false)} className="">
                    <img src={closeIcon} className="w-7 " alt="" />
                </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
                <EditGroup
                    editGroup={editGroup}
                    setEditGroup={setEditGroup}
                />
            </div>
        </div>
    </div>
    );
}
export default GroupManagementPage;