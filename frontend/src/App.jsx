
import Login from "./pages/shared/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/shared/Home";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloorPlan from "./pages/storeLayout/FloorPlan";

function App() {
  return (
    <>
  
        <div className="w-full h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/floor" element={<FloorPlan/>}/>
          </Routes>
          <ToastContainer/>
        </div>
    </>
  );
}

export default App;
