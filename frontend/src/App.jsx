
import Login from "./pages/shared/Login";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/shared/Home";
import ProductList from "./pages/Productlist";
import { ToastContainer} from 'react-toastify';
import AddProduct from "./pages/AddProduct";
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from "./pages/UpdateProduct";

function App() {
  return (
    <>
  
        <div className="w-full h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
           
      
            
          
           
          </Routes>
          <ToastContainer/>
        </div>
    </>
  );
}

export default App;
