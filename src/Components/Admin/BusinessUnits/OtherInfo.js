import React, { useState } from "react";

const buttons = [
  "Hospital Details",
  "Services",
  "Departments",
  "Appointent Slots",
];

const AddressForm = ({ branchData }) => {

  return (
    <div className="w-full flex flex-wrap items-start justify-start gap-4 p-4 mx-auto bg-white rounded-md">
      {/* Business Unit Type */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="businessUnitType"
          className="text-gray-700 font-medium mb-1"
        >
          Business Unit Type<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.name}
        </div>
      </div>

      {/* Practice Type */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="practiceType"
          className="text-gray-700 font-medium mb-1"
        >
          Practice Type<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.practice}
        </div>
      </div>

      {/* Address Line 1 */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="addressLine1"
          className="text-gray-700 font-medium mb-1"
        >
          Address Line 1<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.addressLine1}
        </div>
      </div>

      {/* Address Line 2 */}
      <div className="w-[45%] flex flex-col">
        <label
          htmlFor="addressLine2"
          className="text-gray-700 font-medium mb-1"
        >
          Address Line 2
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.addressLine2}
        </div>
      </div>

      {/* City */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="city" className="text-gray-700 font-medium mb-1">
          City<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.city}
        </div>
      </div>

      {/* State */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="state" className="text-gray-700 font-medium mb-1">
          State<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.state}
        </div>
      </div>

      {/* Country */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="country" className="text-gray-700 font-medium mb-1">
          Country<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.country}
        </div>
      </div>

      {/* Postal Code */}
      <div className="w-[45%] flex flex-col">
        <label htmlFor="postalCode" className="text-gray-700 font-medium mb-1">
          Postal Code<span className="text-red-500"> *</span>
        </label>
        <div className="border border-gray-300 bg-[#EFEFEF4D] rounded-md h-[2.625rem] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {branchData?.postalCode}
        </div>
      </div>
    </div>
  );
};

const ServiceTable = ({ branchData }) => {
  const services = [
    // { name: "Emergency", price: "INR 100", status: "Active" },
    // { name: "Grooming", price: "INR 100", status: "Active" },
    // { name: "Vaccination", price: "INR 100", status: "Active" },
    // { name: "Lab Services", price: "INR 100", status: "Inactive" },
    // { name: "Surgery", price: "INR 100", status: "Inactive" },
    // { name: "Wellness Exams", price: "INR 100", status: "Active" },
  ];

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "text-green-500 flex items-center gap-2"
      : "text-red-500 flex items-center gap-2";
  };

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
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{service.name}</td>
              <td className="px-6 py-4">{service.price}</td>
              <td className="px-6 py-4">
                <div className={getStatusStyle(service.status)}>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      service.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {service.status}
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
  const specialties = [
    // { name: "Anaesthesiology", status: "Active" },
    // { name: "Behavior", status: "Active" },
    // { name: "Blood Bank", status: "Active" },
    // { name: "Boarding", status: "Inactive" },
    // { name: "Critical Care", status: "Inactive" },
    // { name: "General Practice", status: "Active" },
    // { name: "Cardiology", status: "Active" },
    // { name: "Clinical Pathology", status: "Active" },
    // { name: "Clinical Studies", status: "Active" },
    // { name: "Crematorium", status: "Active" },
    // { name: "Dentistry", status: "Active" },
    // { name: "Dermatology", status: "Active" },
    // { name: "Diagnostic Imaging", status: "Active" },
    // { name: "Emergency", status: "Active" },
  ];

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "text-green-500 flex items-center gap-2"
      : "text-red-500 flex items-center gap-2";
  };

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
          {specialties.map((specialty, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{specialty.name}</td>
              <td className="px-6 py-4">
                <div className={getStatusStyle(specialty.status)}>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      specialty.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {specialty.status}
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
  const data = [
    // {
    //   name: "General Practice",
    //   department: "General Practice",
    //   reasons: "Allergies",
    //   status: "Active",
    // },
    // {
    //   name: "Placeholder",
    //   department: "Placeholder",
    //   reasons: "Placeholder",
    //   status: "Active",
    // },
    // {
    //   name: "Placeholder",
    //   department: "Placeholder",
    //   reasons: "Placeholder",
    //   status: "Active",
    // },
  ];

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
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b last:border-none border-gray-200 text-sm text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                {item.department}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                {item.reasons}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {item.status}
                </span>
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
              className={`w-full h-full flex items-center justify-center ${
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
