import React from "react";
import BlueButton from "../../../ui/BlueButton";
import { Link } from "react-router-dom";

const ClientProfile = () => {
  return (
    <div className="bg-white px-10 py-5 relative w-full h-full">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center mt-2 ">
            <div className="flex h-full flex-col justify-between items-start gap-4 mt-2">
                <h2 className="text-lg font-semibold">Client - Anne Hathaway</h2>

                <p className="text-gray-600">Location - 400061, Mumbai, India</p>
            </div>

          <div className="flex h-full flex-col justify-between items-end gap-4 mt-2">
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md">
              Account Balance: <strong>INR 15.22</strong> <Link to="#" className="text-[#0263E0]">Pay</Link>
            </span>
            <span className="text-gray-500 text-sm">Type: Adopted from shelter</span>
          </div>

        </div>

        {/* Contact Details */}
        <div className="mt-4 pt-4">

          <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
            <h3 className="text-[#0263E0]">Contact Details</h3>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-gray-700">✏️</button>
              <button className="text-gray-500 hover:text-gray-700">➕</button>
            </div>
          </div>

            <div className="mt-4 px-4" >
                <div className="flex w-full items-center gap-5">
                    <p>
                        <span>Primary Phone:</span> <span className="text-black font-semibold">(980) 766-5181</span>
                    </p>
                    <p>
                        <span>Primary Email:</span> <span className="text-black font-semibold">ahathaway@gmail.com</span>
                    </p>
                </div>

                <div className="flex gap-2 mt-4">
                    <p>Address:</p>{" "}
                    <p className="font-semibold">CTS 166/167 Ashram, Madh - Marve Rd, Malad West, Mumbai, Maharashtra 400061, India</p>
                </div>
            </div>
        </div>

        {/* Pets */}
        <div className="mt-4 pt-4">
            <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
                <h3 className="text-[#0263E0]">Pet(s)</h3>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700">✏️</button>
                    <button className="text-gray-500 hover:text-gray-700">➕</button>
                </div>
            </div>

          <div className="flex items-center gap-8 px-4 mt-2">
                <p className="text-[#0263E0]">Casper</p>
                <p className="">10 y, Male, 29 kg </p>
                <p className="">DOB: -</p>
                <p>
                    Record:{" "}
                    <span className="font-semibold">AEM123</span>
                </p>
                <p>
                    Animal Type:{" "}
                    <span className="">-</span>
                </p>
          </div>
        </div>

        {/* Additional Owners/Caretakers */}
        <div className="mt-4 pt-4">
            <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
                <h3 className="text-[#0263E0]">Additional Owner(s)/Caretaker(s)</h3>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700">✏️</button>
                    <button className="text-gray-500 hover:text-gray-700">➕</button>
                </div>
            </div>

            <div className=" mt-4 px-4 flex flex-col gap-3">
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
            </div>
        </div>

        {/* Observations */}
        <div className="mt-4 pt-4">
            <div className="bg-[#F4F9FF] border-l border-[#0263E0] h-[36px] pl-5 pr-2 flex justify-between items-center">
                <h3 className="text-[#0263E0]">Observations</h3>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700">✏️</button>
                    <button className="text-gray-500 hover:text-gray-700">➕</button>
                </div>
            </div>

            <div className=" mt-4 px-4 flex flex-col gap-3">
                <p>Placeholder</p>
            </div>
        </div>

        {/* Share Button */}
        <div className="absolute bottom-10 right-8 text-right ">
            <BlueButton
                text={"Share"}
            />
        </div>
    </div>
  );
};

export default ClientProfile;