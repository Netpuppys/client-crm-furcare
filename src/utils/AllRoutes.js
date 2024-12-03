import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Components/Login/LoginPage';
import DashBoardPage from '../Components/DashBoard/DashBoardPage';
import Sidebar from '../ui/Sidebar';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginPage />} />

        {/* <div className='w-full min-h-screen flx items-center justify-center pl-[20rem]'> */}
        {/* <Sidebar /> */}
        <Route path='/dashboard' element={<DashBoardPage />} />
        {/* </div> */}
    </Routes>
  )
}

export default AllRoutes;