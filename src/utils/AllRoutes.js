import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Components/Login/LoginPage';
import DashBoardPage from '../Components/DashBoard/DashBoardPage';
import BusinessUnitsPage from '../Components/Admin/BusinessUnits/BusinessUnitsPage';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashBoardPage />} />
        <Route path='/admin/business-units' element={<BusinessUnitsPage />} />
    </Routes>
  )
}

export default AllRoutes;