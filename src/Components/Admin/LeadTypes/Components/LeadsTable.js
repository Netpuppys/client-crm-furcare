import React from 'react'
import informationIcon from '../../../../Assets/icons/informationIcon.png'

const dummyData = [
    {
        id: 0,
        name: 'Refferal',
        source: "N/A",
        active: true
    },
    {
        id: 1,
        name: 'Social Media',
        source: "Facebook, Instagram, Twitter, LinkedIn",
        active: true
    },
    {
        id: 2,
        name: 'Furcare',
        source: "Web, App",
        active: true
    },
    {
        id: 3,
        name: 'Event',
        source: "N/A",
        active: false
    },
]

const LeadsTable = ({
    selectedLead,
    setSelectedLead
}) => {

  return (
    <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F9F9FA] border-b border-[#E1E3EA]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                <div className="flex items-center gap-1">
                  <p className="">Lead Type</p>
                  <img src={informationIcon} className="w-5" alt="" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#606B85]">
                <div className="flex items-center gap-1">
                  <p className="">Sources</p>
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
            {dummyData.map((item, index) => (
            <tr 
                key={index} 
                onClick={() => setSelectedLead(item)} 
                className={`cursor-pointer ${selectedLead && selectedLead.id === item.id? "bg-gray-50" : "hover:bg-gray-50"}`}
            >
                <td className="px-4 py-2 capitalize text-sm text-[#121C2D]">{item.name}</td>
                <td className="px-4 py-2 text-sm">
                  <p className='capitalize'>
                    {item.source}
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
  )
}

export default LeadsTable