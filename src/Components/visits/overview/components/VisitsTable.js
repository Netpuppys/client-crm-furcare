import React from 'react'
import informationIcon from '../../../../Assets/icons/informationIcon.png'

// const data = [
//     {
//       pet: "Casper",
//       owner: "Jasleen Kaur",
//       room: "",
//       status: "Check In - In Progress",
//       availability: "Not available",
//       image: "",
//     },
//     {
//       pet: "Mikasa",
//       owner: "Roja Patil",
//       room: "",
//       status: "Check In - In Progress",
//       availability: "Not available",
//       image: "",
//     },
//     {
//       pet: "Sherni",
//       owner: "Akash Bhatt",
//       room: "Exam Room A",
//       status: "Visit - In Progress",
//       availability: "Not available",
//       image: "",
//     },
//     {
//       pet: "Bruno",
//       owner: "Jasleen Kaur",
//       room: "Exam Room B",
//       status: "Visit - Completed",
//       availability: "Available",
//       image: "",
//     },
//     {
//       pet: "Ralph",
//       owner: "Amina Begum",
//       room: "Exam Room C",
//       status: "Visit - Completed",
//       availability: "Available",
//       image: "",
//     },
//     {
//       pet: "Broski",
//       owner: "Gaurav Paul",
//       room: "Surgery Room A",
//       status: "Visit - Completed",
//       availability: "Available",
//       image: "",
//     }
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
        <tbody>
        </tbody>
    </table>
  )
}

export default VisitsTable