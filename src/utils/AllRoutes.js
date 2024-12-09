import { Routes, Route } from "react-router-dom";
import LoginPage from "../Components/Login/LoginPage";
import DashBoardPage from "../Components/DashBoard/DashBoardPage";
import BusinessUnitsPage from "../Components/Admin/BusinessUnits/BusinessUnitsPage";
import AnimalClassesPage from "../Components/Admin/AnimalClasses/AnimalClassesPage";
import ContentLibraryPage from "../Components/Admin/ContentLibrary/ContentLibraryPage";
import DiagnosticIntegrationPage from "../Components/Admin/DiagnosticIntegration/DiagnosticIntegrationPage";
import SuppliesManagementPage from "../Components/Admin/SuppliesManagement/SuppliesManagementPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/admin/branch-units" element={<BusinessUnitsPage />} />
      <Route path="/admin/animal-classes" element={<AnimalClassesPage />} />
      <Route path="/admin/content-library" element={<ContentLibraryPage />} />
      <Route path="/admin/diagnostic-integrations" element={<DiagnosticIntegrationPage />}/>
      <Route path="/admin/supplies-management" element={<SuppliesManagementPage />}/>
    </Routes>
  );
};

export default AllRoutes;
