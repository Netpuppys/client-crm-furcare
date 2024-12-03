import { createContext, useContext, useEffect, useState } from 'react';

const AlertContext = createContext();

export const UserProvider = ({ children }) => {
  const [ alert, setAlert ] = useState()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(alert)
      setAlert(null);
    }, 5000);
  
    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useUserContext = () => useContext(AlertContext);
