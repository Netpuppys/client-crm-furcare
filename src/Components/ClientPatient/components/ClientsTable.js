import React from "react";
import informationIcon from '../../../Assets/icons/informationIcon.png'
import { format } from "date-fns";

// const clients = [
//   { account: "AFT12", name: "Anne Hathaway", pets: 1, lastVisit: "22 Jan 2024" },
//   { account: "AFT13", name: "Abhilash Thiyagi", pets: 2, lastVisit: "22 Dec 2023" },
//   { account: "AFT14", name: "Buna Birm", pets: 2, lastVisit: "12 Nov 2023" },
//   { account: "AFT15", name: "Charlie Chaplin", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT16", name: "David Tenant", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT17", name: "Eckhurt Mann", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT18", name: "Faris Ahmed", pets: 2, lastVisit: "22 Jan 2023" },
//   { account: "AFT19", name: "Gigi Hadid", pets: 2, lastVisit: "22 Jan 2023" },
//   { account: "AFT20", name: "Helen Keller", pets: 2, lastVisit: "22 Jan 2023" },
//   { account: "AFT21", name: "Idris Elba", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT22", name: "Janice Wu", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT23", name: "Kelly Clark", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT24", name: "Lou Wu", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT25", name: "Manny Ral", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT26", name: "Neena Gupta", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT27", name: "Owen Wilson", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT12", name: "Anne Hathaway", pets: 1, lastVisit: "22 Jan 2024" },
//   { account: "AFT13", name: "Abhilash Thiyagi", pets: 2, lastVisit: "22 Dec 2023" },
//   { account: "AFT14", name: "Buna Birm", pets: 2, lastVisit: "12 Nov 2023" },
//   { account: "AFT15", name: "Charlie Chaplin", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT16", name: "David Tenant", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT17", name: "Eckhurt Mann", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT18", name: "Faris Ahmed", pets: 2, lastVisit: "22 Jan 2023" },
//   { account: "AFT19", name: "Gigi Hadid", pets: 2, lastVisit: "22 Jan 2023" },
//   { account: "AFT20", name: "Helen Keller", pets: 2, lastVisit: "22 Jan 2023" },
//   { account: "AFT21", name: "Idris Elba", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT22", name: "Janice Wu", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT23", name: "Kelly Clark", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT24", name: "Lou Wu", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT25", name: "Manny Ral", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT26", name: "Neena Gupta", pets: 1, lastVisit: "22 Jan 2023" },
//   { account: "AFT27", name: "Owen Wilson", pets: 1, lastVisit: "22 Jan 2023" },
// ];

const ClientsTable = ({ allClients, loaded, selectedClient, setSelectedClient }) => {

  return (
    <div className="w-full">
        <table className="w-full border-collapse">
            <thead className="bg-[#F9F9FA] text-[#606B85] text-left text-sm font-semibold">
            <tr>
                <th className="px-4 py-3">
                <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="px-4 py-3"> 
                <div className="flex items-center gap-2 ">
                        Account
                <img src={informationIcon} className="h-4" alt="" />
                </div>
                </th>
                <th className="px-4 py-3"> 
                <div className="flex items-center gap-2 ">
                        Client
                <img src={informationIcon} className="h-4" alt="" />
                </div>
                </th>
                <th className="px-4 py-3"> 
                <div className="flex items-center gap-2 ">
                    Number of Pets
                <img src={informationIcon} className="h-4" alt="" />
                </div>
                </th>
                <th className="px-4 py-3"> 
                <div className="flex items-center gap-2 ">
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
                    onClick={() => setSelectedClient(client.id)}
                    className="border-t even:bg-[#F9F9FA] cursor-pointer"
                >
                    <td className="px-4 py-3">
                        <input 
                            type="checkbox"
                            checked={selectedClient===client.id}
                            className="w-4 h-4"
                        />
                    </td>
                    <td className="px-4 py-3 text-[#0263E0] font-medium">
                        <p className="underline underline-offset-2">{client.clientId}</p>
                    </td>
                    <td className="px-4 py-3 text-[#121C2D] capitalize">{client.firstName}{" "}{client.lastName}</td>
                    <td className="px-4 py-3 font-semibold text-[#0263E0]">{client._count.pets}</td>
                    <td className="px-4 py-3 text-[#0263E0] font-semibold">
                        {/* {client.updatedAt.toLocaleDateString("en-GB").replace(/\//g, "-")} */}
                        {format(new Date(client.updatedAt), "dd MMM yyyy")}
                    </td>
                </tr>
            ))}
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