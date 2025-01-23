import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ branchDetails, setBranchDetails ] = useState()
  const [ selectedBranch, setSelectedBranch ] = useState()
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);

  const fetchBranchDetails = useCallback(() => {
    axiosInstance
      .get("/api/v1/business-branches")
      .then(res => {
        setBranchDetails(res.data.data.data)
        setSelectedBranch(res.data.data.data[0])
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);