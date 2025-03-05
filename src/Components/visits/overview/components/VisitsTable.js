import React from 'react'
import informationIcon from '../../../../Assets/icons/informationIcon.png'

const statusSvg = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0017 3.5C6.4109 3.5 3.5 6.4109 3.5 10.0017C3.5 13.5924 6.4109 16.5033 10.0017 16.5033C13.5924 16.5033 16.5033 13.5924 16.5033 10.0017C16.5033 6.4109 13.5924 3.5 10.0017 3.5ZM10.0015 5.5C7.5154 5.50007 5.5 7.51551 5.5 10.0017C5.5 12.4879 7.51547 14.5033 10.0017 14.5033C11.4239 14.5033 12.692 13.8438 13.517 12.814L10.5645 10.452C10.2087 10.1674 10.0015 9.73639 10.0015 9.28071V5.5Z" fill="#030B5D"/>
</svg>

const data = [
    {
      pet: "Casper",
      doctor: "Jasleen Kaur",
      room: "",
      status: "In Progress",
      visitType: "Check In",
      availability: "Not available",
      image: "",
    },
    {
      pet: "Mikasa",
      doctor: "Roja Patil",
      room: "",
      status: "In Progress",
      visitType: "Check In",
      availability: "Not available",
      image: "",
    },
    {
      pet: "Sherni",
      doctor: "Akash Bhatt",
      room: "Exam Room A",
      status: "In Progress",
      visitType: "Visit",
      availability: "Not available",
      image: "",
    },
    {
      pet: "Bruno",
      doctor: "Jasleen Kaur",
      room: "Exam Room B",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Ralph",
      doctor: "Amina Begum",
      room: "Exam Room C",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Broski",
      doctor: "Gaurav Paul",
      room: "Exam Room A",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Bruno",
      doctor: "Jasleen Kaur",
      room: "Exam Room B",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Ralph",
      doctor: "Amina Begum",
      room: "Exam Room C",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Broski",
      doctor: "Gaurav Paul",
      room: "Exam Room A",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Bruno",
      doctor: "Jasleen Kaur",
      room: "Exam Room B",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Ralph",
      doctor: "Amina Begum",
      room: "Exam Room C",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Broski",
      doctor: "Gaurav Paul",
      room: "Exam Room A",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Bruno",
      doctor: "Jasleen Kaur",
      room: "Exam Room B",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Ralph",
      doctor: "Amina Begum",
      room: "Exam Room C",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Broski",
      doctor: "Gaurav Paul",
      room: "Exam Room A",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Bruno",
      doctor: "Jasleen Kaur",
      room: "Exam Room B",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Ralph",
      doctor: "Amina Begum",
      room: "Exam Room C",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Broski",
      doctor: "Gaurav Paul",
      room: "Exam Room A",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Bruno",
      doctor: "Jasleen Kaur",
      room: "Exam Room B",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Ralph",
      doctor: "Amina Begum",
      room: "Exam Room C",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
    {
      pet: "Broski",
      doctor: "Gaurav Paul",
      room: "Exam Room A",
      status: "Completed",
      visitType: "Visit",
      availability: "Available",
      image: "",
    },
]

const VisitsTable = () => {

    function getInitials(name) {
        const words = name.trim().split(/\s+/); // Split by spaces and remove extra spaces
        const firstInitial = words[0][0].toUpperCase(); // First letter of first word
        const lastInitial = words[words.length - 1][0].toUpperCase(); // First letter of last word
        return firstInitial + lastInitial;
    }

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
            {data.map((item, index) => (
                <tr
                    key={index}
                    className={`border-b border-[#E1E3EA] ${item.status==="Completed"? "bg-[#F9F9FA]" : ""}`}
                >
                    <td className=''>
                        <div className='flex items-center justify-start gap-2 p-4'>
                            <div className='w-8 h-8 aspect-square rounded-full border border-[#E1E3EA] bg-[#dedfe0] overflow-hidden'>
                            </div>

                            <p className='text-[#121C2D] text-sm capitalize'>
                                {item.pet}
                            </p>
                        </div>
                    </td>
                    <td className=''>
                        <div className='flex items-center justify-start gap-2 p-4'>

                            <div className='w-8 h-8 aspect-square border border-[#E7DCFA] flex items-center justify-center'>
                                <div className='min-w-[2.2rem] h-[2.2rem] aspect-square rounded-full border border-[#E7DCFA] bg-[#FAF7FD] overflow-hidden flex items-center justify-center'>
                                    <p className='text-[#6D2ED1] text-sm font-semibold'>
                                        {getInitials(item.doctor)}
                                    </p>
                                </div>
                            </div>

                            <p className='text-[#121C2D] text-sm capitalize'>
                                {item.doctor}
                            </p>
                        </div>
                    </td>

                    <td className='px-4'>
                        <select
                            value={item.room}
                            className='classic w-full border border-[#8891AA] rounded-md h-[2.25rem] focus:outline-none px-2 text-sm text-[#121C2D] font-medium'
                        >
                            <option value="">Select</option>
                            <option value="Exam Room A">Exam Room A</option>
                            <option value="Exam Room B">Exam Room B</option>
                            <option value="Exam Room C">Exam Room C</option>
                        </select>
                    </td>

                    <td className='pl-4'>
                        <div className='flex items-center gap-1 text-[#121C2D] text-sm'>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                {item.status==="Completed"? <div className='w-4 h-4 aspect-square rounded-full bg-[#0B602D]'></div> : statusSvg}
                            </div>
                            <span className=''>
                                {item.visitType}
                            </span>
                            <span className=''>-</span>
                            <span className={`${item.status==="Completed"? "text-[#121C2D]" : "text-[#E36A19]"}`}>
                                {item.status}
                            </span>
                        </div>
                    </td>

                    <td className='px-4'>
                        <p className={`${item.availability==="Available"? "text-[#0263E0] font-semibold" : "text-[#121C2D]"} text-sm`}>
                            {item.availability}
                        </p>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default VisitsTable