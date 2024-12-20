import { BrowserRouter, useLocation } from 'react-router-dom';
import AllRoutes from './utils/AllRoutes';
import Sidebar from './ui/Sidebar';
import { useState } from 'react';
import Navbar from './ui/Navbar';
import { AlertProvider } from './utils/AlertContext';
import Alert from './ui/Alert';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './utils/AppContext';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true)

  function Layout() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
      <div className="">
        {currentPath !== '/' && (
          <Sidebar
            currentPath={currentPath}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        )}
        <div
          className={`w-full ${
            currentPath !== '/'
              ? `${sidebarExpanded ? 'pl-60' : 'pl-20'}`
              : ''
          }`}
        >
          {currentPath !== '/' && <Navbar />}
          <AllRoutes />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <ToastContainer closeOnClick={true} closeButton />
      <AppProvider>
        <AlertProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
          <Alert />
        </AlertProvider>
      </AppProvider>
    </div>
  );
}

export default App;