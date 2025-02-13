import React, { useState } from 'react'
import ClientsTable from './components/ClientsTable'
import ClientProfile from './components/ClientProfile'
import closeIcon from "../../Assets/icons/alert/close.png"
import { Link } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'

const ClientPatientPage = () => {
  const [ selectedClient, setSelectedClient ] = useState(false)
  const [ allClients, setAllClients ] = useState([])
  const [ loaded, setLoaded ] = useState(false)

  useState(() => {
    setLoaded(false)

    axiosInstance
      .get('/api/v1/clients')
      .then(res => {
        const response = res.data.data.data
        setAllClients(response)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <div className='w-full h-[calc(100vh-4.75rem)] px-[36px] py-4 overflow-y-auto relative'>
        <div className='flex items-start justify-between'>
            <div className='text-[#0263E0] text-xs'>
                <Link
                    to={"/client-patient"}
                    className='underline inline cursor-default'
                >
                    Client & Patient
                </Link>
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
          allClients={allClients}
          loaded={loaded}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
      </div>

      {selectedClient &&
      <div className='w-full h-[calc(100vh)] fixed bottom-0 left-0 flex items-start justify-end'>
        <div
          onClick={() => setSelectedClient(false)}
          className='w-[calc(100%-816px)] h-full'
        ></div>

        <div className='w-[816px] shadow-2xl relative bg-white h-full bottom-0 right-0'>
          <div className='w-full h-fit pt-8 flex items-center justify-between px-8'>
            <p className='text-xl font-semibold text-[#121C2D]'>
                Account Overview {selectedClient?.clientId}
            </p>
            <button
                onClick={() => setSelectedClient(null)}
                className='h-[1.75rem]'
            >
                <img src={closeIcon} className='h-full w-fit' alt='' />
            </button>
          </div>

          <ClientProfile
            selectedClient={selectedClient}
          />
        </div>
      </div>}
    </div>
  )
}

export default ClientPatientPage