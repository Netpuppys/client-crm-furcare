import React from 'react'
import dashboardBanner from "../../Assets/background/dashboardBanner.png"
import patientStatistics from "../../Assets/delete/PatientStatistics.png"

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

const DashBoardPage = () => {
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

        <div className='w-full pl-8 py-4 flex'>
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
          </div>
          <div className='w-[25%]'></div>
        </div>
    </div>
  )
}

export default DashBoardPage