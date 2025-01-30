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
import EditBusinessUnit from "../Components/Admin/BusinessUnits/EditBusinessUnit";
import RolesAndPermissionsPage from "../Components/Admin/RolesAndPermissions/RolesAndPermissionsPage";
import ReportManagementPage from "../Components/Admin/ReportManagement/ReportManagementPage";
import GroupManagementPage from "../Components/Admin/GroupManagement/GroupManagementPage";
import OnboardingPage from "../Components/Onboarding/OnboardingPage";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/admin/branch-units" element={<BusinessUnitsPage />} />
      <Route path="/admin/animal-classes" element={<AnimalClassesPage />} />
      <Route path="/admin/content-library" element={<ContentLibraryPage />} />
      <Route path="/admin/diagnostic-integrations" element={<DiagnosticIntegrationPage />} />
      <Route path="/admin/supplies-management" element={<SuppliesManagementPage />} />
      <Route path="/admin/groups-management" element={<GroupManagementPage />} />
      <Route path="/admin/report-management" element={<ReportManagementPage />} />
      <Route path="/admin/roles-and-permissions" element={<RolesAndPermissionsPage />} />
      <Route path="/admin/staff-management" element={<StaffManagementPage />} />
      <Route path="/admin/document-templates" element={<DocumentTemplatePage />} />
      <Route path="/admin/branch-units/create-business-unit" element={<CreateBusinessUnit/>}/>
      <Route path="/admin/branch-units/edit-business-unit" element={<EditBusinessUnit/>}/>
    </Routes>
  );
};

export default AllRoutes;
