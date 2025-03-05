import { useState } from "react";
import ResourceList from "./ResourceList";
import informationIcon from "../../../../Assets/icons/informationIcon.png";

const GroupManagementTable = ({ 
    loaded,
    groupData,
    setEditGroup,
}) => {

    const [ showResourceList, setShowResourceList ] = useState()
    const [ selectedResources, setSelectedResources ] = useState()

    const handleListClick = (data, index) => {
        setShowResourceList(index)
        setSelectedResources(data)
    }

    const handleEdit = (item) => {
        setEditGroup(item)
        setSelectedResources(null)
        setShowResourceList(null)
    }
    
    return (
        <div className="">
            <table className="min-w-full">
                <thead className="bg-[#F9F9FA]">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-1">
                                <p className="">Name</p>
                                <img src={informationIcon} className="w-5" alt="" />
                            </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-1">
                                <p className="">Description</p>
                                <img src={informationIcon} className="w-5" alt="" />
                            </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                            <div className="flex items-center gap-1">
                                <p className="">Resources</p>
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
                {groupData?.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 border-b last:border-b-0 border-[#E1E3EA] `}>
                    <td className="px-4 py-2 text-sm cursor-pointer hover:underline text-[#0263E0]">
                        <button
                            onClick={() => handleEdit(item)}
                            className="capitalize hover:underline text-sm text-[#0263E0]"
                        >
                            {item.name}
                        </button>
                    </td>
                    <td className="px-4 py-2 text-sm text-[#121C2D]">
                        {item.description===""? "--" : item.description}
                    </td>
                    <td className="px-4 py-2 text-sm relative">
                        <button
                            onClick={() => handleListClick(item.resources, index)}
                            className="text-[#0263E0] underline"
                        >
                            list
                        </button>
                        {showResourceList===index && 
                        <div className="absolute top-[calc(100%+0.3rem)] z-50 left-1">
                            <ResourceList
                                selectedResources={selectedResources}
                                selectedGroupData={item}
                                setShowResourceList={setShowResourceList}
                                setSelectedResources={setSelectedResources}
                                setEditGroup={setEditGroup}
                                handleEdit={handleEdit}
                            />
                        </div>}
                    </td>
                    <td className="px-4 py-2 text-sm flex items-center">
                        <div
                            className={`w-3 aspect-square ${
                                item.active ? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rounded-md rotate-45"
                            }`}
                        ></div>
                        <span
                            className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                        >
                            {item.active ? "Active" : "Inactive"}
                        </span>
                    </td>
                </tr>))}
                </tbody>
            </table>
            {groupData.length === 0 && loaded &&
            <div className={`border-b last:border-b-0 border-[#E1E3EA] flex items-center justify-center text-sm h-10`}>
                    <p className="">
                        No Groups Found
                    </p>
            </div>}
        </div>
    );
};

export default GroupManagementTable;