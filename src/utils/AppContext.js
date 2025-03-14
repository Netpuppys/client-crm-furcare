import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';

const AppContext = createContext();

export const AppProvider = ({ 
  children
}) => {

  const [ branchDetails, setBranchDetails ] = useState()
  const [ selectedBranch, setSelectedBranch ] = useState(JSON.parse(sessionStorage.getItem('selectedBranch')))
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);
  const [ businessBranchesData, setBusinessBranchesData ] = useState()

  useEffect(() => {
    if (!selectedBranch && branchDetails) {
      setSelectedBranch(branchDetails[0])
      sessionStorage.setItem('selectedBranch', JSON.stringify(branchDetails[0]))
    }
  }, [branchDetails, selectedBranch])

  // useEffect(() => {
  //   axiosInstance
  //     .get("/api/v1/business-branches")
  //     .then(res => {
  //       setBusinessBranchesData(res.data.data.data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }, [])

  const fetchBranchDetails = useCallback(() => {
    axiosInstance
      .get("/api/v1/business-branches")
      .then(res => {
        setBranchDetails(res.data.data.data)
        setBusinessBranchesData(res.data.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, []);
  
  useEffect(() => {
    fetchBranchDetails()
  }, [fetchBranchDetails])
  
  return (
    <AppContext.Provider
      value={{
        branchDetails,
        selectedBranch,
        setSelectedBranch,
        sidebarExpanded,
        setSidebarExpanded,
        businessBranchesData,
        setBusinessBranchesData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);