import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtherInfo from "./OtherInfo";
import BlueButton from "../../../ui/BlueButton";
import axiosInstance from "../../../utils/AxiosInstance";
import editIcon from "../../../Assets/icons/editIcon.png";
import { useAppContext } from "../../../utils/AppContext";

const Card = ({
  type,
  branch,
  active,
  address,
  selected,
  practice,
  currency,
  businessUnitData
}) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate("/admin/branch-units/edit-business-unit", { state: { businessUnitData: businessUnitData } });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start gap-2">
        {selected?
        <div className="w-4 rounded-full aspect-square bg-[#006DFA] flex items-center justify-center">
          <div className="w-[0.375rem] aspect-square rounded-full bg-white"></div>
        </div> : 
        <div className="w-4 rounded-full aspect-square bg-transparent border border-[#8891AA] flex items-center justify-center">
        </div>}

        <p className="capitalize">
          {branch}
        </p>
        <button
          onClick={handleEdit}
          className=""
        >
          <img src={editIcon} className="h-4" alt="" />
        </button>
      </div>
      <div className="w-full flex items-center justify-start gap-2">
        <div
          className={`w-3 aspect-square ${
            active? "bg-[#0B602D] rounded-full" : "bg-[#C72323] rotate-45 rounded-sm"
          }`}
        ></div>
        <span
          className={`inline-block px-2 py-1 text-[#121C2D] text-sm`}
        >
          {active? "Active" : "Inactive"}
        </span>
      </div>
      <div className="bg-[#5856D6] w-full py-5 px-4 text-white font-medium flex flex-col gap-3">
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Address:</p>
          <p className="text-wrap">{address}</p>
        </div>
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Type:</p>
          <p className="capitalize">{type}</p>
        </div>
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Practice Type:</p>
          <p className="capitalize">{practice}</p>
        </div>
        <div className="flex w-full items-start gap-1 capitalize">
          <p className="">Currency:</p>
          <p className="uppercase">{currency}</p>
        </div>
      </div>
    </div>
  );
};

const BusinessUnitsPage = () => {
  const navigate = useNavigate()

  const { selectedBranch, setSelectedBranch } = useAppContext()

  const [ businessBranchesData, setBusinessBranchesData ] = useState()
  const [ selectedBusiness, setSelectedBusiness ] = useState(0)

  useEffect(() => {
    axiosInstance
      .get("/api/v1/business-branches")
      .then(res => {
        setBusinessBranchesData(res.data.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleAdminClick = () => {
    navigate("/admin/branch-units")
  }

  const navigateToCreate = () => {
    navigate("/admin/branch-units/create-business-unit", { state: { businessUnitId: businessBranchesData[selectedBusiness].businessUnitId } });
  };

  const handleCardClick = (item, index) => {
    setSelectedBusiness(index);
    setSelectedBranch(item);
    sessionStorage.setItem('selectedBranch', JSON.stringify(item))
  }

  return (
    <div className="w-full min-h-full px-[36px] py-4 overflow-y-auto">
      <div className="flex items-start justify-between">
        <div className="text-[#0263E0] text-xs">
          <button
            onClick={handleAdminClick}
            className="underline inline"
          >
            Admin
          </button>
          <span> / </span>
          <p className="underline inline cursor-default">
            Business Units
          </p>
        </div>
        <BlueButton
          onClickHandler={navigateToCreate}
          text={"Create"}
        />
      </div>

      <div className="flex items-start flex-wrap justify-start gap-x-[6.25rem] gap-y-6 mt-6">
        {businessBranchesData?.map((item, index) => (
          <div className="max-w-[calc(33.333%-4.16666rem)]" onClick={() => handleCardClick(item, index)} key={index}>
            <Card
              active={item.active}
              branch={item.name}
              selected={selectedBranch?.id===item?.id? true : false}
              branchId={item.businessUnitId}
              address={<>{item.addressLine1}, {item.addressLine2}, {item.city}, {item.state}, {item.country}</>}
              type={item.type}
              practice={item.practice}
              currency={item.currency}
              businessUnitData={item}
            />
          </div>
        ))}
      </div>

      {selectedBranch &&
      <div className="mt-10 min-h-[32rem]">
        <OtherInfo 
          branchData={selectedBranch}
        />
      </div>}
    </div>
  );
};

export default BusinessUnitsPage;