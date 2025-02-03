import React, { useState } from 'react'
import ClientsTable from './components/ClientsTable'
import ClientProfile from './components/ClientProfile'
import { Link } from 'react-router-dom'

const ClientPatientPage = () => {
  const [ selectedClient, setSelectedClient ] = useState(false)

  return (
    <div className='w-full h-[calc(100vh-4.75rem)] px-[36px] py-4 overflow-y-auto relative'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <p
                    className='underline inline cursor-default'
                >
                    Client & Patient
                </p>
            </div>
            <div className='flex items-center gap-6'>
                <Link
                  to={"/client-patient/create"}
                    className='px-4 py-2 disabled:bg-[#E1E3EA] disabled:border-[#E1E3EA] disabled:text-white hover:bg-transparent hover:text-accent-blue border border-accent-blue text-white text-nowrap bg-accent-blue rounded-md font-medium leading-[1.25rem] text-sm' 
                >
                    <p className=''>
                      Create Account
                    </p>
                </Link>
            </div>
        </div>


      <div className='mt-4 max-w-[800px]'>
        <ClientsTable 
          setSelectedClient={setSelectedClient}
        />
      </div>

      {selectedClient &&
      <div className='w-full h-[calc(100vh-4.75rem)] fixed bottom-0 left-0 flex items-start justify-end'>
        <div
          onClick={() => setSelectedClient(false)}
          className='w-[calc(100%-816px)] h-full'
        ></div>
        <div className='w-[816px] shadow-2xl bg-white h-full  bottom-0 right-0'>
          <ClientProfile />
        </div>
      </div>}
    </div>
  )
}

export default ClientPatientPage