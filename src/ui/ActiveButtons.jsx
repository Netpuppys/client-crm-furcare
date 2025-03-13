import React from "react";

const ActiveButtons = ({ active, setActive }) => {
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-[#121C2D] flex items-center justify-start gap-1">
        <span className="w-[4px] h-[4px] rounded-full bg-[#EB5656]"></span>
        Status
      </p>
      <div className="flex mt-1 h-[2.25rem]">
        <button
          className={`h-full flex items-center justify-center px-4 border border-r-[0.5px] ${
            active === true
              ? "bg-[#F4F9FF] border-[#006DFA] border-r-[#8891AA] text-[#006DFA]"
              : "border-[#8891AA] text-[#121C2D] rounded-l-md"
          }`}
          onClick={() => setActive(true)}
        >
          Active
        </button>

        <button
          className={`h-full flex items-center justify-center px-4 border border-l-[0.5px] ${
            active === false
              ? "bg-[#F4F9FF] border-[#006DFA] border-l-[#8891AA] text-[#006DFA]"
              : "border-[#8891AA] text-[#121C2D] rounded-r-md"
          }`}
          onClick={() => setActive(false)}
        >
          Inactive
        </button>
      </div>
    </div>
  );
};

export default ActiveButtons;
