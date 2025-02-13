import React from 'react'
import informationIcon from '../../../../Assets/icons/informationIcon.png'

// const clients = [
//     { petName: "Bruno", doctorName: "Roja patil", location: "", status: "visit - Completed", summary: "" },
//     { petName: "Casper", doctorName: "Jasleen Kaur", location: "", status: "visit - Completed", summary: "Available" },
// ]

const VisitsTable = () => {
  return (
    <table className="w-full border-collapse">
        <thead className="bg-[#F9F9FA] text-[#606B85] text-left text-sm font-semibold">
            <tr>
                <th className="px-4 py-3"> 
                    <div className="flex items-center gap-2 ">
                        Patient
                        <img src={informationIcon} className="h-5" alt="" />
                    </div>
                </th>
                <th className="px-4 py-3"> 
                    <div className="flex items-center gap-2 ">
                        Doctor
                        <img src={informationIcon} className="h-5" alt="" />
                    </div>
                </th>
                <th className="px-4 py-3"> 
                    <div className="flex items-center gap-2 ">
                        Location
                        <img src={informationIcon} className="h-5" alt="" />
                    </div>
                </th>
                <th className="px-4 py-3"> 
                    <div className="flex items-center gap-2 ">
                        Visit Status
                        <img src={informationIcon} className="h-5" alt="" />
                    </div>
                </th>
                <th className="px-4 py-3"> 
                    <div className="flex items-center gap-2 ">
                        Visit Summary
                        <img src={informationIcon} className="h-5" alt="" />
                    </div>
                </th>
            </tr>
        </thead>

    </table>
  )
}

export default VisitsTable