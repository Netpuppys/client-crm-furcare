import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import informationIcon from "../../../Assets/icons/informationIcon.png";
import ReactQuill from 'react-quill';

const buttons = [
    "Appointment", "Client & Patient", "Order", "Vaccination", "Prescription", "Marketing"
]

const data = [
    {
        name: "Over the counter supplies",
        language: "English, Hindi",
        status: "Active",
    },
    {
        name: "Physical exam equipments",
        language: "English, Hindi",
        status: "Active",
    },
];
  
const AppointmentsTable = () => {
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
                  <p className="">Language</p>
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
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-[#121C2D]">{item.name}</td>
                <td className="px-4 py-2 text-sm">
                  <p className=''>
                    {item.language}
                  </p>
                </td>
  
                <td className="px-4 py-2 text-sm flex items-center">
                  <div
                    className={`w-2 aspect-square rounded-full ${
                      item.status === "Active" ? "bg-[#0B602D]" : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                  >
                    {item.status}
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
  const [ createNew, setCreateNew ] = useState(false)
  const [ activeButton, setActiveButton ] = useState(0)

  return (
    <div className='w-full min-h-full px-8 py-4 relative'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <Link
                    // to={"/admin"}
                    className='underline'
                >
                    Admin
                </Link>
                <span>{" "}/{" "}</span>
                <Link
                    to={"/admin/content-library"}
                    className='underline'
                >
                    Content Library
                </Link>
            </div>
            <div className='flex items-center gap-6'>
                <button
                    onClick={() => setCreateNew(true)}
                    className='bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center' 
                >
                    Create
                </button>
            </div>
        </div>

        <div className='mt-6 w-full'>
            <div className='w-full border-b border-[#CACDD8]'>
                {buttons.map((item, index) => (
                <button
                    onClick={() => setActiveButton(index)}
                    key={index}
                    className={`rounded-t-lg relative ${index===activeButton? "border-t-2 -bottom-[2px] bg-white " : ""} border-[#0263E0] h-10 bg-white overflow-hidden`}
                >
                    <p className={`w-full h-full flex items-center justify-center ${index===activeButton? "border-x" : ""} border-[#CACDD8] px-3`}>
                        {item}
                    </p>
                </button>))}
            </div>
        </div>

        <div className='mt-6 w-full'>
            {activeButton === 0 &&
            <div className='w-full'>
                <AppointmentsTable />
            </div>}
        </div>

        {createNew &&
        <div className='fixed top-0 left-0 w-screen h-screen'>
            <div className='w-full h-full relative flex items-end justify-end'>
                <div onClick={() => setCreateNew(false)} className='w-full h-full absolute top-0 left-0'></div>
                <div className='h-[75vh] shadow-sm relative z-10 w-[45rem] bg-white pr-10'>
                    <ReactQuill
                        className="w-full h-full"
                        theme="snow"
                        // value={formData.additionalNotes}
                        // onChange={(value) => handleInputChange("additionalNotes", value)}
                        placeholder="Write additional notes here..."
                    />
                </div>
            </div>
        </div>}
    </div>
  )
}

export default DocumentTemplatePage;