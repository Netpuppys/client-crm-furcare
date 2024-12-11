import { Routes, Route } from "react-router-dom";
import LoginPage from "../Components/Login/LoginPage";
import DashBoardPage from "../Components/DashBoard/DashBoardPage";
import BusinessUnitsPage from "../Components/Admin/BusinessUnits/BusinessUnitsPage";
import AnimalClassesPage from "../Components/Admin/AnimalClasses/AnimalClassesPage";
import ContentLibraryPage from "../Components/Admin/ContentLibrary/ContentLibraryPage";
import DiagnosticIntegrationPage from "../Components/Admin/DiagnosticIntegration/DiagnosticIntegrationPage";
import SuppliesManagementPage from "../Components/Admin/SuppliesManagement/SuppliesManagementPage";
import StaffManagementPage from "../Components/Admin/StaffManagement/StaffManagementPage";
import DocumentTemplatePage from "../Components/Admin/DocumentTemplates/DocumentTemplatePage";
import CreateBusinessUnit from "../Components/Admin/BusinessUnits/CreateBusinessUnit";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/admin/branch-units" element={<BusinessUnitsPage />} />
      <Route path="/admin/animal-classes" element={<AnimalClassesPage />} />
      <Route path="/admin/content-library" element={<ContentLibraryPage />} />
      <Route path="/admin/diagnostic-integrations" element={<DiagnosticIntegrationPage />} />
      <Route path="/admin/supplies-management" element={<SuppliesManagementPage />} />
      <Route path="/admin/staff-management" element={<StaffManagementPage />} />
      <Route path="/admin/document-templates" element={<DocumentTemplatePage />} />
      <Route path="/admin/branch-units/create-business-unit" element={<CreateBusinessUnit/>}/>
    </Routes>
  );
};

export default AllRoutes;
