import React from "react";
import { Link } from "react-router-dom";
import CreateNew from "./CreateNew";

const dummy = [
  {
    branch: "Branch 40001",
    branchId: 1100,
    address: "148, HBCS, Domlur, Bengaluru 560071",
    type: "Practice",
    practice: "Clinic",
    currency: "INR",
  },
  {
    branch: "Branch B",
    branchId: 1101,
    address: "148, HBCS, Domlur, Bengaluru 560071",
    type: "Practice",
    practice: "Clinic",
    currency: "INR",
  },
  {
    branch: "Branch C",
    branchId: 1102,
    address: "148, HBCS, Domlur, Bengaluru 560071",
    type: "Practice",
    practice: "Clinic",
    currency: "INR",
  },
];

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
        <Link to={"/admin/branch-units/create-business-unit"}>
          <button className="bg-[#006DFA] px-3 h-[2.375rem] rounded-md flex text-white font-semibold text-sm items-center justify-center">
            Create
          </button>
        </Link>
      </div>

      <div className="flex items-start flex-wrap justify-start gap-x-[6.25rem] gap-y-6 mt-6">
        {dummy.map((item, index) => (
          <div className="max-w-[calc(33%-4rem)]" key={index}>
            <Card
              branch={item.branch}
              branchId={item.branchId}
              address={item.address}
              type={item.type}
              practice={item.practice}
              currency={item.currency}
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <CreateNew />
      </div>
    </div>
  );
};

export default BusinessUnitsPage;
