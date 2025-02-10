import React from "react";
import { useAlertContext } from "../utils/AlertContext";
import alertIcon from "../Assets/icons/alert/Icon.png";
import closeIcon from "../Assets/icons/alert/close.png";
import { useAppContext } from "../utils/AppContext";

const Alert = () => {
  const { alert, setAlert } = useAlertContext();
  const { sidebarExpanded } = useAppContext()

  return (
    <div
      className={`fixed bottom-0 right-0 z-30 transition-all duration-500 ease-in-out
      ${
        sidebarExpanded? "w-[calc(100vw-15rem)]" : "w-[calc(100vw-5rem)]"
      }
      ${
        alert ? "animate-alertShow block" : "animate-alertHide bottom-[-4rem]"
      }`}
    >
      <div className="w-full h-[3.75rem] bg-[#F4F9FF] flex items-center justify-between px-6">
        <div className="flex gap-4">
          <img src={alertIcon} className="w-6" alt="" />
          <p className="text-[#030B5D] text-sm font-semibold text-nowrap">{alert}</p>
        </div>

        <button onClick={() => setAlert(null)} className="">
          <img src={closeIcon} className="w-6" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
