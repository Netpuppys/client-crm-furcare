import React, { useEffect, useState } from "react";
import informationIcon from "../../../Assets/icons/informationIcon.png";
import axiosInstance from "../../../utils/AxiosInstance";
import closeIcon from "../../../Assets/icons/alert/close.png";
import LabelFieldsList from "./component/LabelFieldsList";
import EditReport from "./component/EditReport";
import CreateNewReport from "./component/CreateNewReport";
import { useNavigate } from "react-router-dom";
import BlueButton from "../../../ui/BlueButton";
import { useAppContext } from "../../../utils/AppContext";

const ReportTable = ({ 
  reportData,
  setEditGroup
}) => {

  const [ showLabelsList, setShowLabelsList ] = useState()
  const [ selectedGroup, setSelectedGroup ] = useState()

  const handleListClick = (data, index) => {
      setShowLabelsList(index)
      setSelectedGroup(data)
  }

  const handleEdit = (item) => {
    setEditGroup(item)
    setSelectedGroup(null)
    setShowLabelsList(null)
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
                <p className="">Type</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Label Fields</p>
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Frequency</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
              <div className="flex items-center gap-1">
                <p className="">Location</p>
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
          {reportData && reportData.length>0 && reportData?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b last:border-b-0 border-[#E1E3EA]">
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-sm hover:underline text-[#0263E0] capitalize"
                  >
                    {item.name}
                  </button>
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D] capitalize">
                    {item.type}
                </td>
                <td className="px-4 py-2 text-sm relative">
                  <button
                    onClick={() => handleListClick(item.fields, index)}
                    className="text-blue-600 underline"
                  >
                    List
                  </button>
                  {showLabelsList===index &&
                  <div className="absolute top-[calc(100%+0.3rem)] z-50 left-1">
                    <LabelFieldsList
                        selectedGroup={selectedGroup}
                        selectedGroupData={item}
                        setShowLabelsList={setShowLabelsList}
                        setSelectedGroup={setSelectedGroup}
                        setEditGroup={setEditGroup}
                    />
                  </div>}
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D]">
                    <p className="">
                        Every Day
                    </p>
                </td>
                <td className="px-4 py-2 text-sm text-[#121C2D]">
                    <p className="">
                        All
                    </p>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function ReportManagementPage() {
  const navigate = useNavigate()

  const { sidebarExpanded } = useAppContext()

  const [ createNew, setCreateNew] = useState(false);
  const [ reportData, setReportData ] = useState([]);
  const [ editGroup, setEditGroup ] = useState()

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
  }

  useEffect(() => {
    axiosInstance
        .get("/api/v1/reports")
        .then(res => {
            const response = res.data.data.data
            setReportData(response)
        })
        .catch(err => {
            console.error(err)
        })
  }, [])

  const fetchAllReports = () => {
    axiosInstance
      .get("/api/v1/reports")
      .then(res => {
          const response = res.data.data.data
          setReportData(response)
      })
      .catch(err => {
          console.error(err)
      })
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
            Report Management
          </p>
        </div>
          <BlueButton
            onClickHandler={handleCreateNew}
            text={"Create"}
          />
      </div>

      <div className="w-full mt-6">
        <ReportTable
            reportData={reportData}
            setEditGroup={setEditGroup}
        />
      </div>

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
              Create Report
            </p>
            <button onClick={() => setCreateNew(false)} className="">
              <img src={closeIcon} className="w-7 " alt="" />
            </button>
          </div>

          <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
            <CreateNewReport 
              fetchAllReports={fetchAllReports}
            />
          </div>
        </div>
      </div>}

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
              Edit Report
            </p>
            <button onClick={() => setEditGroup(false)} className="">
              <img src={closeIcon} className="w-7 " alt="" />
            </button>
          </div>

          <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
            <EditReport 
              selectedReport={editGroup}
            />
          </div>
        </div>
      </div>}
    </div>
  );
}
export default ReportManagementPage;