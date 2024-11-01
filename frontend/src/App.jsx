
import Login from "./pages/shared/Login";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/shared/Home";
import ProductList from "./pages/Productlist";
import { ToastContainer} from 'react-toastify';
import AddProduct from "./pages/AddProduct";
import 'react-toastify/dist/ReactToastify.css';
import FloorPlan from "./pages/storeLayout/FloorPlan";
import EditProduct from "./pages/UpdateProduct";
import Brand from "./pages/BrandPage";
import Types from "./pages/TypesPage";
import FloorHome from "./pages/storeLayout/FloorHome";
import EditFloor from "./pages/storeLayout/EditFloor";
import InventoryDashboard from "./pages/InventoryDashboard";
function App() {
  return (
    <>
  
        <div className="w-full h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<InventoryDashboard/>} />
            
            <Route path="/floor" element={<FloorPlan/>}/>
            <Route path="/floorhome" element={<FloorHome/>}/>
            <Route path="/floor/:id" element={<EditFloor/>}/>

            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/brands" element={<Brand/>} />
            <Route path="/types" element={<Types/>} />
          </Routes>
          <ToastContainer/>
        </div>
    </>
  );
}

export default App;
