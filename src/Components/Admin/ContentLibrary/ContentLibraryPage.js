import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import informationIcon from "../../../Assets/icons/informationIcon.png"
import closeIcon from "../../../Assets/icons/alert/close.png"
import AddNewItemForm from "./components/AddNewItemForm";
import BlueButton from "../../../ui/BlueButton"
import { useNavigate } from "react-router-dom";
import { contentLibraryData } from "./components/data";
import { useAppContext } from "../../../utils/AppContext";
// import axiosInstance from "../../../utils/AxiosInstance";

const TableComponent = ({ 
  handleCreateNew,
  contentLibraryData
}) => {

  const [ openIndex, setOpenIndex ] = useState([])

  const handleOpenSubItems = (index) => {
    if (openIndex.includes(index)) {
      setOpenIndex((prev) => prev.filter((item) => item !== index));
    } else {
      setOpenIndex((prev) => [...prev, index]); // Use spread operator to add the index
    }
  };

  const handleClick = (item) => {
    if (item.click) {
      handleCreateNew(item)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left text-sm font-normal text-[#606B85] px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <p className="">
                  Topic
                </p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
            <th className="text-left text-sm font-normal text-[#606B85] px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <p className="">
                  Status
                </p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {contentLibraryData.map((category, index) => (
            <React.Fragment key={index} className={``}>
              <tr
                onClick={() => handleOpenSubItems(index)}
                className="bg-[#F9F9FA] cursor-pointer"
              >
                <td className="px-4 py-3 border-b border-gray-200 text-sm text-[#121C2D]">
                  <div className="flex gap-4 items-center">
                    <p className="w-4 text-xs text-[#606B85]">
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
                  <td className="px-4 py-3 border-b text-[#0263E0] text-sm font-semibold border-gray-200">
                    <button onClick={() => handleClick(item)} disabled={!item.click? true : false} className="">
                      {item.topic}
                    </button>
                  </td>
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
  const navigate = useNavigate()

  const { 
    sidebarExpanded, 
    // selectedBranch
  } = useAppContext()

  const [ createNew, setCreateNew ] = useState(false)
  const [ content, setContent ] = useState()

  // const [ contentLibraryData, setContentLibraryData ] = useState([])

  const handleCreateNew = (item) => {
    setContent(item)
    setCreateNew(true)
  }

  // useEffect(() => {
  //   axiosInstance
  //     .get(`/api/v1/content-library?businessBranchId=${selectedBranch.id}`)
  //     .then(res => {
  //       const response = res.data.data
  //       setContentLibraryData(response)
  //       console.log(response)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }, [])

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
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
                Content Library
            </p>
        </div>
        <div className='flex items-center gap-6'>
            <BlueButton
              text={"Create"}
              onClickHandler={handleCreateNew}
              disabled={true}
            />
        </div>
    </div>
        
    <div className="mt-6">
      <TableComponent 
        handleCreateNew={handleCreateNew}
        contentLibraryData={contentLibraryData}
      />
    </div>

    {createNew &&
    <div className={`fixed
      ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
      top-0 h-screen right-0 flex z-50`}>

      <div
        className="w-[calc(100%-45rem)] h-full"
      ></div>

        <div className={`fixed top-0 shadow-2xl overflow-y-auto h-full bg-white w-[45rem] right-0`}>
            <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
              <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                {content && content.topic}
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
                content={content && content}
              />
            </div>
        </div>
      </div>}
    </div>
  )
}

export default ContentLibraryPage