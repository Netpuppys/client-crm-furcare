import React, { useState } from "react";

const buttons = [
  "Hospital Details",
  "Services",
  "Departments",
  "Appointment Slots",
];

const AddressForm = ({ branchData }) => {

  return (
    <div className="w-full flex flex-wrap items-start justify-start gap-4 p-4 mx-auto bg-white rounded-md">
      {/* Business Unit Type */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="businessUnitType"
          className="text-gray-700 font-medium mb-1 flex items-center gap-1"
        >
          <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Business Unit Name 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.name}
        </div>
      </div>

      {/* Business type */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="businessUnitType"
          className="text-gray-700 font-medium mb-1 flex items-center gap-1"
        >
          <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Business Type 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.type}
        </div>
      </div>

      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="practiceType"
          className="text-gray-700 font-medium mb-1 flex items-center gap-1"
        >
          <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Practice Type 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.practice}
        </div>
      </div>

      {/* currency */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="businessUnitType"
          className="text-gray-700 font-medium mb-1 flex items-center gap-1"
        >
          <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Currency 
        </label>
        <div className="border uppercase border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.currency}
        </div>
      </div>

      {/* Address Line 1 */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="addressLine1"
          className="text-gray-700 font-medium mb-1 flex items-center gap-1"
        >
          <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Address Line 1 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.addressLine1}
        </div>
      </div>

      {/* Address Line 2 */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="addressLine2"
          className="text-gray-700 font-medium mb-1 flex items-center gap-1"
        >
          <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Address Line 2
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.addressLine2}
        </div>
      </div>

      {/* City */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="city" className="text-gray-700 font-medium mb-1 flex items-center gap-1">
        <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          City 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.city}
        </div>
      </div>

      {/* State */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="state" className="text-gray-700 font-medium mb-1 flex items-center gap-1">
        <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          State 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.state}
        </div>
      </div>

      {/* Country */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="country" className="text-gray-700 font-medium mb-1 flex items-center gap-1">
        <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Country 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.country}
        </div>
      </div>

      {/* Postal Code */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="postalCode" className="text-gray-700 font-medium mb-1 flex items-center gap-1">
        <div className="bg-[#EB5656] w-1 h-1 aspect-square rounded-full"></div>
          Postal Code 
        </label>
        <div className="border border-gray-300 capitalize bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.postalCode}
        </div>
      </div>
    </div>
  );
};

const ServiceTable = ({ branchData }) => {
  const services = branchData.services

  return (
    <div className="overflow-x-auto max-w-[50rem] mt-6">
      <table className="table-auto border-collapse w-full text-left bg-white shadow-md rounded-md">
        <thead className="bg-[#F9F9FA]">
          <tr>
            <th className="px-6 py-3 text-gray-600 font-medium">Name</th>
            <th className="px-6 py-3 text-gray-600 font-medium">Base Price</th>
            <th className="px-6 py-3 text-gray-600 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="px-6 capitalize text-sm py-4">{service.serviceDetails.name}</td>
              <td className="px-6 py-4 text-sm">{service.basePrice}</td>
              <td className="px-6 py-4 text-sm">
                <div className={`text-[#121C2D] flex items-center gap-2`}>
                  <span
                    className={`h-3 w-3 ${
                      !service.active? "bg-[#C72323] rotate-45 rounded-sm" : "bg-[#0B602D] rounded-full"
                    }`}
                  ></span>
                  {service.active? "Active" : "inactive"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SpecialtiesTable = ({ branchData }) => {
  const departments = branchData.departments;

  return (
    <div className="overflow-x-auto max-w-[50rem] mt-6">
      <table className="table-auto border-collapse w-full text-left bg-white shadow-md rounded-md">
        <thead className="bg-[#F9F9FA]">
          <tr>
            <th className="px-6 py-3 text-gray-600 font-medium">Name</th>
            <th className="px-6 py-3 text-gray-600 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((specialty, index) => (
            <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="px-6 py-4 text-sm capitalize">{specialty.departmentDetails.name}</td>
              <td className="px-6 py-4 text-sm">
                <div className={`text-[#121C2D] flex items-center gap-2`}>
                  <span
                    className={`h-3 w-3 ${
                      !specialty.active? "bg-[#C72323] rotate-45 rounded-sm" : "bg-[#0B602D] rounded-full"
                    }`}
                  ></span>
                  {specialty.active? "Active" : "Inactive"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Appointments = ({ branchData }) => {
  const appointments = branchData.appointmentSlots

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse border-gray-200 text-left">
        <thead>
          <tr className="bg-[#F9F9FA]">
            <th className="px-6 py-3 border-b border-gray-300 text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-sm font-semibold text-gray-700">
              Department
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-sm font-semibold text-gray-700">
              Reasons
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm capitalize text-gray-900">
                {item.department.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900 flex items-center justify-start gap-1">
                {item.reasons?.map((reason, id) => <span key={id} className="">{reason}{item.reasons.length-1===id? "" : ","}</span>)}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                <div className={`text-[#121C2D] flex items-center gap-2`}>
                  <span
                    className={`h-3 w-3 ${
                      !item?.active ? "bg-[#C72323] rotate-45 rounded-sm" : "bg-[#0B602D] rounded-full"
                    }`}
                  ></span>
                  {item.active? "Active" : "Inactive"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OtherInfo = ({ branchData }) => {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <div className="w-full h-full">
      <div className="w-full border-b border-[#CACDD8]">
        {buttons.map((item, index) => (
          <button
            onClick={() => setActiveButton(index)}
            key={index}
            className={`rounded-t-lg relative ${
              index === activeButton ? "border-t-2 -bottom-[2px] bg-white " : ""
            } border-[#0263E0] h-10 bg-white overflow-hidden`}
          >
            <p
              className={`w-full h-full flex items-center text-[#606B85] justify-center ${
                index === activeButton ? "border-x" : ""
              } border-[#CACDD8] px-3`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>

      <div className="w-full">
        {activeButton === 0 && <AddressForm branchData={branchData} />}

        {activeButton === 1 && <ServiceTable branchData={branchData} />}

        {activeButton === 2 && <SpecialtiesTable branchData={branchData} />}

        {activeButton === 3 && <Appointments branchData={branchData} />}
      </div>
    </div>
  );
};

export default OtherInfo;
