import React, { useEffect, useState } from "react";
import BlueButton from "../../../ui/BlueButton";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/AxiosInstance";
import { format } from "date-fns";
import { SlPencil } from "react-icons/sl";
import { HiPlus } from "react-icons/hi";


const ClientProfile = ({ selectedClient }) => {
    const [ clientData, setClientData ] = useState()

    useEffect(() => {
        axiosInstance
            .get(`/api/v1/clients/${selectedClient}`)
            .then(res => {
                const response = res.data.data
                setClientData(response)
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [selectedClient])

    if (!clientData) {
        return
    }

    function calculateAgeInMonths(dob) {
        const birthDate = new Date(dob);
        const today = new Date(); // Get the current date
    
        let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
        months += today.getMonth() - birthDate.getMonth();
    
        if (today.getDate() < birthDate.getDate()) {
            months--; // Adjust if the birth day hasn't occurred yet in the current month
        }
    
        return months;
    }

  return (
    <div className="bg-white px-[3.5rem] py-6 w-full h-[calc(100%-4.75rem)] text-[#121C2D]">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center mt-2 ">
            <div className="flex h-full flex-col justify-between items-start gap-4 mt-2">
                <h2 className="font-semibold capitalize">Client - {clientData.firstName} {clientData.lastName}</h2>

                <p className="text-[#121C2D] text-sm">Location - {clientData.postalCode}, {clientData.city}, {clientData.country}</p>
            </div>

          <div className="flex h-full flex-col justify-between items-end gap-4 mt-2">
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md">
              Account Balance: <strong>INR 15.22</strong>{" "}<Link to="#" className="text-[#0263E0]">Pay</Link>
            </span>
            <span className="text-[#121C2D] text-sm">Type: Adopted from shelter</span>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-4 pt-4">

          <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
            <h3 className="text-[#0263E0]">Contact Details</h3>
            <div className="flex gap-2">
              <button className="text-[#606B85] text-sm">
                <SlPencil />
              </button>
              <button className="text-[#006DFA]">
                <HiPlus />
              </button>
            </div>
          </div>

            <div className="mt-4 px-4" >
                <div className="flex w-full items-center gap-5">
                    <p className="text-sm">
                        <span>Primary Phone:</span> <span className="text-black font-semibold">{clientData.phone}</span>
                    </p>
                    <p className="text-sm">
                        <span>Primary Email:</span> <span className="text-black font-semibold">{clientData.email}</span>
                    </p>
                </div>

                <div className="flex gap-2 mt-4">
                    <p className="text-sm">Address:</p>{" "}
                    <p className="font-semibold text-sm capitalize">{clientData.address}, {clientData.city}, {clientData.state} {clientData.postalCode}, {clientData.country}</p>
                </div>
            </div>
        </div>

        {/* Pets */}
        <div className="mt-4 pt-4">
            <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
                <h3 className="text-[#0263E0]">Pet(s)</h3>
                <div className="flex gap-2">
                    <button className="text-[#606B85] text-sm">
                        <SlPencil />
                    </button>
                    <button className="text-[#006DFA]">
                        <HiPlus />
                    </button>
                </div>
            </div>

          {clientData.pets.map((pet, index) => (
          <div key={index} className="flex items-center flex-wrap gap-x-8 gap-y-3 pl-4 mt-2 mb-4 last:mb-0">
                <p className="text-[#0263E0] text-sm capitalize">
                    {pet.name}
                </p>
                <p className="capitalize text-sm">
                    {calculateAgeInMonths(pet.dob)} Months, {pet.gender}, {pet.weight} kg
                </p>
                <p className="text-sm">
                    DOB: -{" "}
                    <span className="font-semibold">
                        {format(new Date(pet.dob), "dd MMM yyyy")}
                    </span>
                </p>
                <p className="text-sm">
                    Record:{" "}
                    <span className="font-semibold">AEM123</span>
                </p>
                <p className="text-sm">
                    Animal Type: -{" "}
                    <span className="capitalize font-semibold">{pet.breed}</span>
                </p>
          </div>))}
        </div>

        {/* Additional Owners/Caretakers */}
        <div className="mt-4 pt-4">
            <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
                <h3 className="text-[#0263E0]">Additional Owner(s)/Caretaker(s)</h3>
                <div className="flex gap-2">
                    <button className="text-[#606B85] text-sm">
                        <SlPencil />
                    </button>
                    <button className="text-[#006DFA]">
                        <HiPlus />
                    </button>
                </div>
            </div>

            {/* <div className=" mt-4 px-4 flex flex-col gap-3">
                <p><span className="font-semibold">John Hathaway</span>, Secondary Owner</p>
                <div className="flex items-center gap-8">
                    <p>
                        <span className="">Primary Phone:</span> <span className="text-black font-semibold">(980) 755-5281</span>
                    </p>
                    <p>
                        <span className="">Primary Email:</span> <span className="text-black font-semibold">jhathaway@gmail.com</span>
                    </p>
                </div>
                <p><span className="font-semibold">Rishab Gupta</span>, Caretaker (Dogwalker)</p>
                <div className="flex items-center gap-8">
                    <p>
                        <span className="">Phone:</span> <span className="text-black font-semibold">(980) 755-5281</span>
                    </p>
                    <p>
                        <span className="">Email:</span> <span className="text-black font-semibold">jhathaway@gmail.com</span>
                    </p>
                    <p>
                        <span className="">Company:</span> <span className="text-black font-semibold">Sploot</span>
                    </p>
                </div>
            </div> */}
        </div>

        {/* Observations */}
        <div className="mt-4 pt-4">
            <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
                <h3 className="text-[#0263E0]">Observations</h3>
                <div className="flex gap-2">
                    <button className="text-[#606B85] text-sm">
                        <SlPencil />
                    </button>
                    <button className="text-[#006DFA]">
                        <HiPlus />
                    </button>
                </div>
            </div>

            <div className=" mt-4 px-4 flex flex-col gap-3">
                <p>Placeholder</p>
            </div>
        </div>

        {/* Share Button */}
        <div className="absolute bottom-8 right-8 text-right ">
            <BlueButton
                text={"Share"}
            />
        </div>
    </div>
  );
};

export default ClientProfile;