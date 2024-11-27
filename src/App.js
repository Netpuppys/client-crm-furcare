import { BrowserRouter, } from 'react-router-dom';
import AllRoutes from './utils/AllRoutes';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;