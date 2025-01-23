import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import AllRoutes from "./utils/AllRoutes";
import Sidebar from "./ui/Sidebar";
import { useEffect } from "react";
import Navbar from "./ui/Navbar";
import { AlertProvider } from "./utils/AlertContext";
import Alert from "./ui/Alert";
import { ToastContainer } from "react-toastify";
import { AppProvider, useAppContext } from "./utils/AppContext";
import "react-toastify/dist/ReactToastify.css";

function App() {

  function Layout() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const currentPath = location.pathname;

    const {  sidebarExpanded } = useAppContext()

    useEffect(() => {
      const access = localStorage.getItem("access");
      const userName = localStorage.getItem("name");

      if (!access || !userName) {
        navigate("/"); // Redirect to root if conditions aren't met
      }
    }, [navigate]);

    return (
      <div className="">
        {currentPath !== "/" && (
          <Sidebar
            currentPath={currentPath}
          />
        )}
        <div
          className={`w-full ${
            currentPath !== "/"
              ? `${
                  sidebarExpanded
                    ? "pl-60 animate-sidebarExpandPadding"
                    : "pl-20 animate-sidebarClosePadding"
                }`
              : ""
          }`}
        >
          {currentPath !== "/" && <Navbar />}
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
