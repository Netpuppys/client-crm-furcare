import React, { useState } from 'react'
import BlueButton from '../../../ui/BlueButton'
import { useNavigate } from 'react-router-dom'
import LeadsTable from './Components/LeadsTable'
import { useAppContext } from '../../../utils/AppContext'
import closeIcon from "../../../Assets/icons/alert/close.png"
import CreateNewLead from './Components/CreateNewLead'
import EditLead from './Components/EditLead'

const LeadTypesPage = () => {
    const { navigate } = useNavigate()

    const { sidebarExpanded } = useAppContext()

    const [ createNew, setCreateNew ] = useState(false)
    const [ selectedLead, setSelectedLead ] = useState(false)

    const handleAdminClick = () => {
        navigate("/admin/branch-units")
    }

    const handleAddLeadPopUp = () => {
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
                    Lead Types
                </p>
            </div>
            <BlueButton
                text={"Create"}
                onClickHandler={handleAddLeadPopUp}
            />
        </div>

        <div className="w-full mt-6">
            <LeadsTable
                selectedLead={selectedLead}
                setSelectedLead={setSelectedLead}
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

            <div className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] right-0 block `}>
                <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
                    <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                        Create Lead Type
                    </p>
                    <button
                        onClick={() => setCreateNew(false)}
                        className=""
                    >
                        <img src={closeIcon} className="w-7 " alt="" />
                    </button>
                </div>

                <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
                    <CreateNewLead
                    
                    />
                </div>
            </div>
        </div>}

        {selectedLead &&
        <div className={`fixed
            ${sidebarExpanded? "w-[calc(100%-15rem)]" : "w-[calc(100%-5rem)]"}
            top-0 h-screen right-0 flex z-50`}>

            <div 
                onClick={() => setSelectedLead(false)}
                className="w-[calc(100%-45rem)] h-full"
            ></div>

            <div className={`fixed top-0 shadow-2xl h-screen bg-white w-[45rem] right-0 block `}>
                <div className="flex items-center justify-between shadow-sm  bg-white z-20 relative h-[4.75rem] px-8">
                    <p className="text-xl text-[#121C2D] font-semibold tracking-[0.05rem]">
                        Edit Lead Type
                    </p>
                    <button
                        onClick={() => setSelectedLead(false)}
                        className=""
                    >
                        <img src={closeIcon} className="w-7 " alt="" />
                    </button>
                </div>

                <div className="w-full h-[calc(100%-4.75rem)] overflow-y-auto">
                    <EditLead
                        selectedLead={selectedLead}
                    />
                </div>
            </div>
        </div>}
    </div>
  )
}

export default LeadTypesPage