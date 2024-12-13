import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtherInfo from "./OtherInfo";
import axiosInstance from "../../../utils/AxiosInstance";

// const dummy = [
//   {
//     branch: "Branch 40001",
//     branchId: 1100,
//     address: "148, HBCS, Domlur, Bengaluru 560071",
//     type: "Practice",
//     practice: "Clinic",
//     currency: "INR",
//   },
//   {
//     branch: "Branch B",
//     branchId: 1101,
//     address: "148, HBCS, Domlur, Bengaluru 560071",
//     type: "Practice",
//     practice: "Clinic",
//     currency: "INR",
//   },
//   {
//     branch: "Branch C",
//     branchId: 1102,
//     address: "148, HBCS, Domlur, Bengaluru 560071",
//     type: "Practice",
//     practice: "Clinic",
//     currency: "INR",
//   },
// ];

const Card = ({ branch, branchId, address, type, practice, currency }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="capitalize">{branch}</p>
        <p className="capitalize">ID: {branchId}</p>
      </div>
      <div className="w-full flex items-center justify-start gap-2">
        <div className="w-4 bg-[#0B602D] aspect-square capitalize rounded-full"></div>
        <p className="">Active</p>
      </div>
      <div className="bg-[#5856D6] w-full py-5 px-4 text-white font-medium flex flex-col gap-3">
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Address:</p>
          <p className="text-wrap">{address}</p>
        </div>
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Type:</p>
          <p className="">{type}</p>
        </div>
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Practice Type:</p>
          <p className="">{practice}</p>
        </div>
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Currency:</p>
          <p className="">{currency}</p>
        </div>
      </div>
    </div>
  );
};

const BusinessUnitsPage = () => {
  const navigate = useNavigate()

  const [ businessBranchesData, setBusinessBranchesData ] = useState()
  const [ selectedBusiness, setSelectedBusiness ] = useState(0)

  useEffect(() => {
    axiosInstance
      .get("/api/v1/business-branches")
      .then(res => {
        console.log(res)
        setBusinessBranchesData(res.data.data.data)
      })
      .then(err => {
        console.error(err)
      })
  }, [])

  const navigateToCreate = () => {
    navigate("/admin/branch-units/create-business-unit", { state: { businessUnitId: businessBranchesData[selectedBusiness].businessUnitId } });
  };  

  return (
    <div className="w-full min-h-full px-8 py-4">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <Link
            // to={"/admin"}
            className="underline"
          >
            Admin
          </Link>
          <span> / </span>
          <Link to={"/admin/branch-units"} className="underline">
            Branch Units
          </Link>
        </div>
        <button onClick={navigateToCreate}>
          <button className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center">
            Create
          </button>
        </button>
      </div>

      <div className="flex items-start flex-wrap justify-start gap-x-[6.25rem] gap-y-6 mt-6">
        {businessBranchesData?.map((item, index) => (
          <div className="max-w-[calc(33%-4rem)]" onClick={() => setSelectedBusiness(index)} key={index}>
            <Card
              branch={item.name}
              branchId={item.businessUnitId}
              address={<>{item.addressLine1}, {item.addressLine2}, {item.city}, {item.state}, {item.country}</>}
              type={item.type}
              practice={item.practice}
              currency={item.currency}
            />
          </div>
        ))}
      </div>

      {businessBranchesData &&
      <div className="mt-10">
        <OtherInfo 
          branchData={businessBranchesData[selectedBusiness]}
        />
      </div>}
    </div>
  );
};

export default BusinessUnitsPage;