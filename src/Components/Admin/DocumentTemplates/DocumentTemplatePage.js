import React, { useEffect, useState } from 'react'
import informationIcon from "../../../Assets/icons/informationIcon.png";
import CreateNewDocumentTemplate from './components/CreateNewDocumentTemplate';
import closeIcon from "../../../Assets/icons/alert/close.png"
import axiosInstance from '../../../utils/AxiosInstance';
import { useAppContext } from '../../../utils/AppContext';
import EditDocumentTemplate from './components/EditDocumentTemplate';
import { useNavigate } from 'react-router-dom';
import BlueButton from '../../../ui/BlueButton';

const types = [
  {
    name: "Appointment",
    serverName: "Appointment"
  },
  {
    name: "Client & Patient",
    serverName: "Client_And_Patient"
  },
  {
    name: "Order",
    serverName: "Order"
  },
  {
    name: "Vaccination",
    serverName: "Vaccination"
  },
  {
    name: "Prescription",
    serverName: "Prescription"
  },
  {
    name: "Marketing",
    serverName: "Marketing"
  }
];
  
const AppointmentsTable = ({ tableData, openEditModule, setOpenEditModule }) => {
    return (
      <div className="overflow-x-auto">
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
                  <p className="">Language</p>
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
            {tableData.map((item, index) => (
              <tr key={index} onClick={() => setOpenEditModule(item)} className={`cursor-pointer ${openEditModule && openEditModule.id === item.id? "bg-gray-50" : "hover:bg-gray-50"}`}>
                <td className="px-4 py-2 capitalize text-sm text-[#121C2D]">{item.name}</td>
                <td className="px-4 py-2 text-sm">
                  <p className='capitalize'>
                    {item.body.map((language, id) => (
                      <span key={id}>{language.language}{item.body.length===id+1? "" : ", "}</span>
                    ))}
                  </p>
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
                    {item.active? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

const DocumentTemplatePage = () => {
  const navigate = useNavigate()

  const { selectedBranch, sidebarExpanded } = useAppContext()

  const [ createNew, setCreateNew ] = useState(false)
  const [ activeButton, setActiveButton ] = useState(types[0].serverName)
  const [ tableData, setTableData ] = useState([])
  const [ openEditModule, setOpenEditModule ] = useState(null)

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
  }

  const fetchData = () => {
    setTableData([])

    axiosInstance
      .get(`/api/v1/document-templates?businessBranchId=${selectedBranch}&type=${activeButton}`)
      .then(res => {
        console.log(res)
        setTableData(res.data.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    setTableData([])

    axiosInstance
      .get(`/api/v1/document-templates?businessBranchId=${selectedBranch}&type=${activeButton}`)
      .then(res => {
        console.log(res)
        setTableData(res.data.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [selectedBranch, activeButton])

  const handleCreateNew = () => {
    setCreateNew(true)
  }
 
  return (
    <div className='w-full min-h-full px-[36px] py-4 relative'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <button 
                  onClick={handleAdminClick}
                  className='underline inline'
                >
                    Admin
                </button>
                <span>{" "}/{" "}</span>
                <p
                    className='underline inline cursor-default'
                >
                    Document Templates
                </p>
            </div>
            <div className='flex items-center gap-6'>
                <BlueButton
                  onClickHandler={handleCreateNew}
                  text={"Create"}
                />
            </div>
        </div>

        <div className='mt-6 w-full'>
            <div className='w-full border-b border-[#CACDD8]'>
                {types.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setActiveButton(item.serverName)}
                    className={`rounded-t-lg relative ${item.serverName===activeButton? "border-t-2 -bottom-[2px] bg-white " : ""} border-[#0263E0] h-10 bg-white overflow-hidden`}
                >
                    <p className={`w-full h-full flex items-center justify-center ${item.serverName===activeButton? "border-x" : ""} border-[#CACDD8] px-3`}>
                        {item.name}
                    </p>
                </button>))}
            </div>
        </div>

        <div className='mt-6 w-full'>
            {/* {activeButton === 0 && */}
            <div className='w-full'>
                <AppointmentsTable 
                  tableData={tableData}
                  openEditModule={openEditModule}
                  setOpenEditModule={setOpenEditModule}
                />
            </div>
        </div>

        {createNew &&
        <div className={`fixed
          ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
          top-0 h-screen right-0 flex z-50`}>

          <div 
            onClick={() => setCreateNew(false)}
            className="w-[calc(100%-45rem)] h-full"
          ></div>

          <div className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] right-0 block `}>
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Add Document Template
              </p>
              <button
                onClick={() => setCreateNew(false)}
                className=""
              >
                <img src={closeIcon} className="w-7 " alt="" />
              </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <CreateNewDocumentTemplate 
                types={types}
                fetchData={fetchData}
              />
            </div>
          </div>
        </div>}

        {openEditModule &&
        <div className={`fixed
          ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
          top-0 h-screen right-0 flex z-50`}>

          <div 
            onClick={() => setOpenEditModule(false)}
            className="w-[calc(100%-45rem)] h-full"
          ></div>

          <div className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] right-0 block`}>
              <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
                <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                  Edit Document Template
                </p>
                <button
                  onClick={() => setOpenEditModule(false)}
                  className=""
                >
                  <img src={closeIcon} className="w-7 " alt="" />
                </button>
              </div>

              <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
                <EditDocumentTemplate 
                  types={types}
                  openEditModule={openEditModule}
                  fetchData={fetchData}
                />
              </div>
          </div>
        </div>}
    </div>
  )
}

export default DocumentTemplatePage;