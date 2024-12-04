import { BrowserRouter, useLocation } from 'react-router-dom';
import AllRoutes from './utils/AllRoutes';
import Sidebar from './ui/Sidebar';
import {Theme} from '@twilio-paste/core/theme';
import { useState } from 'react';
import Navbar from './ui/Navbar';

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
      <Theme.Provider theme="default">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Theme.Provider>
    </div>
  );
}

export default App;