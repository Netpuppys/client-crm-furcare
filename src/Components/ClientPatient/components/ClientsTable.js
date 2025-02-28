import React from "react";
import informationIcon from '../../../Assets/icons/informationIcon.png'
import { format } from "date-fns";

const ClientsTable = ({
    loaded,
    allClients,
    setSelectedClient,
}) => {

  return (
    <div className="w-full">
        <table className="w-full border-collapse">
            <thead className="bg-[#F9F9FA] text-[#606B85] text-left text-sm font-semibold">
                <tr>
                    <th className="px-4 py-3 flex items-center justify-center">
                        <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            Account
                            <img src={informationIcon} className="h-4" alt="" />
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            Client
                            <img src={informationIcon} className="h-4" alt="" />
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            Number of Pets
                            <img src={informationIcon} className="h-4" alt="" />
                        </div>
                    </th>
                    <th className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            Last Visit Date
                            <img src={informationIcon} className="h-4" alt="" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
            {allClients.length > 0 && allClients.map((client, index) => (
            <tr 
                key={index} 
                className="border-t even:bg-[#F9F9FA]"
            >
                <td className="px-4 py-3 flex items-center justify-center">
                    <input 
                        type="checkbox"
                        // checked={selectedClient===client.id}
                        className="w-4 h-4 cursor-pointer"
                    />
                </td>
                <td className="px-4 py-3 text-[#0263E0] font-medium">
                    <button 
                        onClick={() => setSelectedClient(client.id)}
                        className=""
                    >
                        <p className="underline underline-offset-2">{client.clientId}</p>
                    </button>
                </td>
                <td className="px-4 py-3 text-[#121C2D] capitalize">{client.firstName}{" "}{client.lastName}</td>
                <td className="px-4 py-3 text-[#121C2D] capitalize">{client._count.pets}</td>
                <td className="px-4 py-3 text-[#121C2D] capitalize">
                    {/* {client.updatedAt.toLocaleDateString("en-GB").replace(/\//g, "-")} */}
                    {format(new Date(client.updatedAt), "dd MMM yyyy")}
                </td>
            </tr>))}
            </tbody>
        </table>
        {allClients.length === 0 && loaded &&
        <div className='w-full h-10 flex items-center justify-center'>
            No Clients and Patients Found
        </div>}
    </div>
  );
};

export default ClientsTable;