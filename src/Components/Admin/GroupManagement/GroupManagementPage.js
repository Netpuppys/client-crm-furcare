import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import closeIcon from "../../../Assets/icons/alert/close.png";
import GroupManagementTable from "./components/GroupManagementTable";
import CreateNewGroup from "./components/CreateNewGroup";
import EditGroup from "./components/EditGroup";
import { useNavigate } from "react-router-dom";
import BlueButton from "../../../ui/BlueButton";
import { useAppContext } from "../../../utils/AppContext";

function GroupManagementPage() {
    const navigate = useNavigate()

    const { sidebarExpanded } = useAppContext()

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

    const handleAdminClick = () => {
        navigate("/admin/branch-units")
    }

    const handleCreateNew = () => {
        setCreateNew(true)
    }

    return (
    <div className="w-full min-h-full px-[36px] py-4">
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
                    Group Management
                </p>
            </div>
            <BlueButton
                onClickHandler={handleCreateNew}
                text={"Create"}
            />
        </div>

        <div className="w-full mt-6">
            <GroupManagementTable
                groupData={groupData}
                setEditGroup={setEditGroup}
            />
        </div>

        {/* create new group form */}
        {createNew &&
        <div className={`fixed
            ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
            top-0 h-screen right-0 flex z-50`}>

            <div 
                onClick={() => setCreateNew(false)}
                className="w-[calc(100%-45rem)] h-full"
            ></div>

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
        </div>}

        {/* edit group */}
        {editGroup &&
        <div className={`fixed
            ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
            top-0 h-screen right-0 flex z-50`}>

            <div 
                onClick={() => setEditGroup(false)}
                className="w-[calc(100%-45rem)] h-full"
            ></div>

            <div
                className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${
                    editGroup ? "right-0 block" : "right-full hidden z-50"
                } `}
            >
                <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
                    <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                        Edit Group
                    </p>
                    <button onClick={() => setEditGroup(false)} className="">
                        <img src={closeIcon} className="w-7 " alt="" />
                    </button>
                </div>

                <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
                    {editGroup &&
                    <EditGroup
                        editGroup={editGroup}
                        setEditGroup={setEditGroup}
                    />}
                </div>
            </div>
        </div>}
    </div>
    );
}
export default GroupManagementPage;