import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import informationIcon from "../../../Assets/icons/informationIcon.png"
import closeIcon from "../../../Assets/icons/alert/close.png"
import AddNewItemForm from "./components/AddNewItemForm";

const data = [
  {
    category: "Anaesthesia & Surgery",
    items: [
      { topic: "Anaesthesia Patient Monitoring", status: "Active" },
      { topic: "Canine Castration", status: "Active" },
      { topic: "Canine Spay", status: "Active" },
      { topic: "Dental Prophy", status: "Active" },
      { topic: "Feline Castration", status: "Active" },
    ],
  },
  {
    category: "Client & Communications",
    items: [
      { topic: "Anaesthesia Risk/Benefit", status: "Active" },
      { topic: "Client Connections Call", status: "Active" },
      { topic: "Follow-up Call", status: "Active" },
      { topic: "No Exam Performed", status: "Active" },
      { topic: "Vaccine Risk/Benefit", status: "Active" },
    ],
  },
  {
    category: "Client Instructions",
    items: [{ topic: "In House Dx", status: "Active" }],
  },
];

const TableComponent = () => {
  const [ openIndex, setOpenIndex ] = useState([])

  const handleOpenSubItems = (index) => {
    if (openIndex.includes(index)) {
      setOpenIndex((prev) => prev.filter((item) => item !== index));
    } else {
      setOpenIndex((prev) => [...prev, index]); // Use spread operator to add the index
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left text-sm font-normal text-[#606B85] px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <p className="">
                  Topic
                </p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="text-left text-sm font-normal text-[#606B85] px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <p className="">
                  Status
                </p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <React.Fragment key={index} className={``}>
              <tr
                onClick={() => handleOpenSubItems(index)}
                className="bg-[#F9F9FA] cursor-pointer"
              >
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-[#121C2D]">
                  <div className="flex gap-5 items-center">
                    <p className="w-5 text-xs text-[#606B85]">
                      {!openIndex.includes(index)? <FaChevronDown /> : <FaChevronUp />}
                    </p>
                    <p className="">
                      {category.category}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <div className="w-full flex gap-3 items-center">
                    <div className="w-3 bg-[#0B602D] aspect-square rounded-full"></div>
                    <p className="text-sm font-normal text-[#121C2D]">Active</p>
                  </div>
                </td>
              </tr>
              {openIndex.includes(index) && 
              category.items.map((item, idx) => (
                <tr key={idx} >
                  <td className="px-4 py-3 border-b text-[#0263E0] text-sm border-gray-200">{item.topic}</td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <div className="w-full flex gap-3 items-center">
                      <div className="w-3 bg-[#0B602D] aspect-square rounded-full"></div>
                      <p className="font-normal text-sm text-[#121C2D]">{item.status}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const ContentLibraryPage = () => {
  const [ createNew, setCreateNew ] = useState(false)

  return (
    <div className='w-full min-h-full px-8 py-4 relative'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <p
                    className='underline inline cursor-default'
                >
                    Admin
                </p>
                <span>{" "}/{" "}</span>
                <p
                    className='underline inline cursor-default'
                >
                    Content Library
                </p>
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
        
        <div className="mt-6">
          <TableComponent />
        </div>

        <div className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] ${createNew? "right-0 block" : "right-full hidden z-50"} `}>
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                Anesthesia Patient Monitoring
              </p>
              <button
                onClick={() => setCreateNew(false)}
                className=""
              >
                <img src={closeIcon} className="w-7 " alt="" />
              </button>
            </div>

            <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
              <AddNewItemForm 

              />
            </div>
        </div>
    </div>
  )
}

export default ContentLibraryPage