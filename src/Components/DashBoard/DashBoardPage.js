import React, { useState } from 'react'
import dashboardBanner from "../../Assets/background/dashboardBanner.png"
import patientStatistics from "../../Assets/delete/PatientStatistics.png"
import { IoListOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import informationIcon from "../../Assets/icons/informationIcon.png"
import DatePicker from "react-datepicker";
import leadsIcon from "../../Assets/icons/leadsIcon.png"
import "react-datepicker/dist/react-datepicker.css";

const cardData = [
  {
    title: "Overall Visits",
    value: "115",
    change: "+12%",
    note: "25 today",
  },
  {
    title: "Total Patients",
    value: "100",
    change: "+12%",
    note: "20 new patients",
  },
  {
    title: "Total Revenue",
    value: <><span className='text-[1rem]'>INR</span>{" "}11,000</>,
    change: "+12%",
    note: "INR 2500 higher",
  },
];

function LeadsTable() {
  const leads = [
    { source: "Referral", id: 1000, name: "Manu Juneja", email: "mjuneja@gmail.com", status: "Contacted" },
    { source: "Meta", id: 1001, name: "Arif Mohammed", email: "rmohd@hotmail.com", status: "Connected" },
    { source: "furcare", id: 1002, name: "Ralph Fiennes", email: "fiennes@mail.com", status: "Contacted" },
    { source: "Event", id: 1003, name: "Rishan Muneer", email: "rmuneer@mail.com", status: "Connected" },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full rounded-lg">
        <thead className="bg-[#F9F9FA] text-[#606B85] text-left">
          <tr>
            <th className="p-3 font-medium">
              <div className="flex items-center gap-1">
                Source <img src={informationIcon} className='h-5' alt="Sort Icon" />
              </div>
            </th>
            <th className="p-3 font-medium">
              <div className="flex items-center gap-1">
                Lead ID <img src={informationIcon} className='h-5' alt="Sort Icon" />
              </div>
            </th>
            <th className="p-3 font-medium">
              <div className="flex items-center gap-1">
                Name <img src={informationIcon} className='h-5' alt="Sort Icon" />
              </div>
            </th>
            <th className="p-3 font-medium">
              <div className="flex items-center gap-1">
                Email <img src={informationIcon} className='h-5' alt="Sort Icon" />
              </div>
            </th>
            <th className="p-3 font-medium">
              <div className="flex items-center gap-1">
                Status <img src={informationIcon} className='h-5' alt="Sort Icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {leads.map((lead, index) => (
            <tr key={index} className="border-t h-[69px]">
              <td className="p-3">{lead.source}</td>
              <td className="p-3">{lead.id}</td>
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">
                <select className="border border-[#8891AA] rounded-md w-[150px] h-[36px] px-2 focus:outline-none relative">
                  <option value="Contacted" selected={lead.status === "Contacted"}>
                    Contacted
                  </option>
                  <option value="Connected" selected={lead.status === "Connected"}>
                    Connected
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CalendarAppointments = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  // Mock data for appointments
  const appointments = [
    { time: "08:00 am", name: "Casper", doctor: "Mahima Juneja", issue: "Broke left" },
    { time: "09:00 am", name: "Casper", doctor: "Mahima Juneja", issue: "Broke left" },
    { time: "10:00 am", name: "Casper", doctor: "Mahima Juneja", issue: "Broke left" },
    { time: "11:00 am", name: "Casper", doctor: "Mahima Juneja", issue: "Broke left" },
    { time: "12:00 am", name: "Casper", doctor: "Mahima Juneja", issue: "Broke left" },
  ];

  return (
    <div className="bg-[#EBF4FF] p-6">
        <div className="flex justify-between items-start mb-4 pr-2">
          <h2 className=" font-medium">Calendar</h2>
          <select
            className='border border-[#CACDD8] w-[86px] h-[36px] rounded-md px-2 focus:outline-none'
          >
            <option value={''}>Week</option>
          </select>
        </div>

        <div className='w-full flex items-center justify-center'>
        {/* Date Picker */}
          <DatePicker
            selected={selectedWeek}
            onChange={(date) => setSelectedWeek(date)}
            inline
            showWeekNumbers
          />
        </div>

        <h3 className="mt-6 text-gray-600 font-semibold">Appointments</h3>
        <ul className="mt-2 space-y-3">
          {appointments.map((appt, index) => (
            <li key={index} className="border-b pb-2">
              <span className="font-semibold">{appt.time}</span>
              <br />
              <p className="text-blue-600 font-medium">
                {appt.name} ({appt.doctor})
              </p>
              <p className="text-gray-500 text-sm">
                Regular Appointment - Injury, <em>{appt.issue}</em>
              </p>
            </li>
          ))}
        </ul>
    </div>
  );
};

const DashBoardPage = () => {
  const [ viewType, setViewType ] = useState('list')

  return (
    <div className='w-full pr-8'>
        <div className='w-full h-[7.6875rem] bg-[#EBF4FF] flex justify-between'>
          <div className='h-full flex flex-col justify-between pl-8 py-3'>
            <p className='text-[#121C2D] text-[1.5rem] font-black'>
              Welcome Dr. Akash Barotia!
            </p>
            <p className='text-[#121C2D] text-[1.1rem] font-bold'>
              Here is a quick glance at business
            </p>
          </div>
          <img
            src={dashboardBanner}
            className=''
            alt=''
          />
        </div>

        <div className='w-full pl-8 py-4 flex gap-6'>
          <div className='w-[75%]'>
            <div className="flex w-full gap-4">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="bg-[#380E78] text-white px-4 py-6 rounded-lg shadow-lg w-[33%]"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{card.title}</span>
                    <span className="text-[0.625rem] font-medium">{card.note}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-start gap-5">
                    <span className="text-3xl font-bold">{card.value}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-semibold">
                      {card.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className='w-full mt-4 h-fit'>
              <img
                src={patientStatistics}
                className='w-[60%] shadow-2xl'
                alt=''
              />
            </div>

            <div className='w-full shadow-2xl bg-white min-h-[20rem] mt-6 p-3'>
                <div className='w-full flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <img src={leadsIcon} className='' alt='' />
                    <p className='font-medium'>
                      Leads (10)
                    </p>
                    <button
                      className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white bg-transparent text-accent-blue border border-accent-blue text-nowrap bg-accent-blue rounded-md font-medium leading-[1.25rem] text-sm'
                    >
                      View All
                    </button>
                  </div>

                  <div className='flex items-center'>
                    <button
                      onClick={() => setViewType("list")}
                      className={`flex w-[20px] h-[20px] aspect-square items-center justify-center ${viewType==='list'? "bg-[#4B5671] text-white" : "text-[#4B5671]"}`}
                    >
                      <IoListOutline />
                    </button>
                    <button
                      onClick={() => setViewType("grid")}
                      className={`flex w-[20px] h-[20px] aspect-square items-center justify-center ${viewType==='grid'? "bg-[#4B5671] text-white" : "text-[#4B5671]"}`}
                    >
                      <CgMenuGridO />
                    </button>
                  </div>
                </div>

                <div className='mt-3'>
                  <LeadsTable />
                </div>
            </div>

          </div>
          <div className='w-[25%]'>
            <CalendarAppointments />
          </div>
        </div>
    </div>
  )
}

export default DashBoardPage