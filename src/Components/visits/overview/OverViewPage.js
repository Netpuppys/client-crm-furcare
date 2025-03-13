import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import VisitsTable from "./components/VisitsTable";

const visitTypes = ["regular", "virtual"];

const buttons = [
  "All Visits",
  "Inpatient Visits",
  "Outpatient Visits",
  "Pinned Visits",
];

const OverViewPage = () => {
  const [visitType, setVisitType] = useState(visitTypes[0]);
  const [activeButton, setActiveButton] = useState(buttons[0]);

  return (
    <div className="w-full h-[calc(100vh-4.75rem)] px-[36px] py-4 overflow-y-auto relative">
      <div className="flex items-start justify-start text-[#0263E0] text-xs">
        <p className="underline inline cursor-default">Visits</p>
        <span className="px-[1px]">/</span>
        <p className="underline inline cursor-default">Overview</p>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <div className="flex mt-1 h-[2.25rem]">
          <button
            className={`h-full flex items-center justify-center capitalize font-medium px-4 border border-r-[0.5px] ${
              visitType === visitTypes[0]
                ? "bg-[#F4F9FF] border-[#006DFA] rounded-l-md text-[#006DFA]"
                : "border-[#8891AA] text-[#121C2D]"
            }`}
            onClick={() => setVisitType(visitTypes[0])}
          >
            {visitTypes[0]}
          </button>

          <button
            className={`h-full flex items-center justify-center capitalize font-medium px-4 border border-l-[0.5px] ${
              visitType === visitTypes[1]
                ? "bg-[#F4F9FF] border-[#006DFA] rounded-r-md text-[#006DFA]"
                : "border-[#8891AA] text-[#121C2D]"
            }`}
            onClick={() => setVisitType(visitTypes[1])}
          >
            {visitTypes[1]}
          </button>
        </div>

        <div className="flex items-center gap-5">
          <p className="text-[#0099FF] font-semibold">Friday, 15 Aug, 2024</p>
          <button className="w-[2.25rem] h-[2.25rem] text-lg aspect-square flex items-center justify-center border border-[#CACDD8] text-[#121C2D] rounded-md">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      <div className="w-full border-b border-[#CACDD8] mt-6 max-w-[44.5rem]">
        {buttons.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveButton(item)}
            className={`rounded-t-lg relative ${
              item === activeButton
                ? "border-t-2 -bottom-[2px] text-[#0263E0] bg-white "
                : ""
            } border-[#0263E0] h-10 bg-white overflow-hidden`}
          >
            <p
              className={`w-full h-full flex items-center justify-center ${
                item === activeButton ? "border-x" : ""
              } border-[#CACDD8] capitalize px-4`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <VisitsTable />
      </div>
    </div>
  );
};

export default OverViewPage;
