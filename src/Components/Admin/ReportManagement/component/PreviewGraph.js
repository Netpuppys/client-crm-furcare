import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", doctors: 25, clients: 20 },
  { name: "Tue", doctors: 30, clients: 22 },
  { name: "Wed", doctors: 35, clients: 30 },
  { name: "Thu", doctors: 15, clients: 5 },
  { name: "Fri", doctors: 28, clients: 10 },
  { name: "Sat", doctors: 5, clients: 2 },
];

const PreviewGraph = () => {
  return (
    <div className=" bg-white shadow-sm rounded-xl">
        <div className="w-full flex items-center justify-between mb-8 px-7">
            <h2 className="text-sm font-semibold ">
                Appointment Summary
            </h2>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="bg-[#2F3FF5] w-3 h-3 rounded-full"></div>
                    <p className="text-[#615E83] text-xs">
                        Doctors
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-[#C39FF5] w-3 h-3 rounded-full"></div>
                    <p className="text-[#615E83] text-xs">
                        Clients
                    </p>
                </div>
            </div>
            <div></div>
        </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip 
                contentStyle={{ backgroundColor: "#F9FAFB", borderRadius: "8px", border: "none" }}
                cursor={{ fill: "#F3F4F6" }}
                /> */}
            {/* <Legend 
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", color: "#4B5563", marginBottom: "2rem" }}
            /> */}
            <Bar dataKey="doctors" barSize={30} radius={[6, 6, 0, 0]} fill="#2F3FF5" name="Doctors" />
            <Bar dataKey="clients" barSize={30} radius={[6, 6, 0, 0]} fill="#C39FF5" name="Clients" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PreviewGraph;
