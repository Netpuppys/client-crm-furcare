import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Components/Login/LoginPage';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
    </Routes>
  )
}

export default AllRoutes;