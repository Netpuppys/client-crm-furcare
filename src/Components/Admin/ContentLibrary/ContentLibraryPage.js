import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import informationIcon from "../../../Assets/icons/informationIcon.png"
import closeIcon from "../../../Assets/icons/alert/close.png"
import AddNewItemForm from "./components/AddNewItemForm";
import BlueButton from "../../../ui/BlueButton"
import { useNavigate } from "react-router-dom";
// import { contentLibraryData } from "./components/data";
import { useAppContext } from "../../../utils/AppContext";
import axiosInstance from "../../../utils/AxiosInstance";

const TableComponent = ({ 
  loaded,
  handleCreateNew,
  contentLibraryData,
  extractFirstH2
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
      handleCreateNew(item)
      // console.log(item)
  }

  return (
    <div className="overflow-x-auto pb-20">
      <table className="min-w-full">
        <thead>
          <tr className="bg-[#F9F9FA]">
            <th className="text-left text-sm font-semibold text-[#606B85] px-4 py-3 border-b border-[#E1E3EA]">
              <div className="flex items-center gap-1">
                <p>Topic</p>
                <img src={informationIcon} className="w-5" alt="info" />
              </div>
            </th>
            {/* <th className="text-left text-sm font-normal text-[#606B85] px-4 py-3 border-b border-[#E1E3EA]">
              <div className="flex items-center gap-1">
                <p>Status</p>
                <img src={informationIcon} className="w-5" alt="" />
              </div>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {Object.entries(contentLibraryData).map(([categoryKey, categoryData], index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleOpenSubItems(index)}
                className="bg-[#F9F9FA] cursor-pointer"
              >
                <td className="px-4 py-3 border-b border-[#E1E3EA] text-sm text-[#121C2D]">
                  <div className="flex gap-4 items-center">
                    <p className="w-4 text-xs text-[#606B85]">
                      {!openIndex.includes(index) ? <FaChevronDown /> : <FaChevronUp />}
                    </p>
                    <p>{categoryKey.replace(/_/g, " ")}</p>
                  </div>
                </td>
                {/* <td className="px-4 py-3 border-b border-[#E1E3EA]">
                  <div className="w-full flex items-center">
                    <div
                      className={`w-3 aspect-square bg-[#0B602D] rounded-full `}
                    ></div>
                    <span
                      className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                    >
                      Active
                    </span>
                  </div>
                </td> */}
              </tr>
              {openIndex.includes(index) &&
                contentLibraryData[categoryKey].content.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 border-b text-[#0263E0] text-sm overflow-hidden font-semibold border-[#E1E3EA]">
                      <button
                        onClick={() => handleClick(item)}
                        // disabled={!item.click}
                      >
                        {item.title!==""? item.title :  extractFirstH2(item.body)}
                      </button>
                    </td>
                    {/* <td className="px-4 py-3 border-b border-[#E1E3EA]">
                      <div className="w-full flex  items-center">
                        <div
                            className={`w-3 aspect-square ${
                                item.active ? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rounded-sm rotate-45"
                            }`}
                        ></div>
                        <span
                            className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
                        >
                            {item.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td> */}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {JSON.stringify(contentLibraryData) === JSON.stringify({}) && loaded &&
        <div className={`border-b last:border-b-0 border-[#E1E3EA] flex items-center justify-center text-sm h-10`}>
            <p className="">
                No Content Found Under Selected Branch
            </p>
        </div>}
    </div>
  );
};


const ContentLibraryPage = () => {
  const navigate = useNavigate()

  const { 
    sidebarExpanded, 
    selectedBranch
  } = useAppContext()

  const [ createNew, setCreateNew ] = useState(false)
  const [ content, setContent ] = useState()
  const [ loaded, setLoaded ] = useState(false)
  const [ contentLibraryData, setContentLibraryData ] = useState([])

  const handleCreateNew = (item) => {
    setContent(item)
    setCreateNew(true)
  }

  useEffect(() => {
    setLoaded(false)

    axiosInstance
      .get(`/api/v1/content-library?businessBranchId=${selectedBranch.id}`)
      .then(res => {
        const response = res.data.data
        setContentLibraryData(response)
        // console.log(response)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [selectedBranch])

  const fetchContent = () => {
    setLoaded(false)

    axiosInstance
      .get(`/api/v1/content-library?businessBranchId=${selectedBranch.id}`)
      .then(res => {
        const response = res.data.data
        setContentLibraryData(response)
        setCreateNew(false)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
  }

  function extractFirstH2(htmlString) {
    const match = htmlString.match(/<h2>(.*?)<\/h2>/i);
    return match ? match[1].replace(/&amp;/g, '&').replace(/:/g, '') : null;
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
        loaded={loaded}
        extractFirstH2={extractFirstH2}
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
                {content && extractFirstH2(content.body)}
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
                fetchContent={fetchContent}
              />
            </div>
        </div>
      </div>}
    </div>
  )
}

export default ContentLibraryPage