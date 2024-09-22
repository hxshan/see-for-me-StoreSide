import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productname, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [unitWeight, setUnitWeight] = useState("");
  const [unitprice, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [brands, setBrands] = useState([]); // For storing fetched brands
  const [types, setTypes] = useState([]);   // For storing fetched types
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Fetch brands and types on component mount
  useEffect(() => {
    fetchBrands();
    fetchTypes();
  }, []);

  // Fetch brands from the API
  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5224/api/Brand");
      setBrands(response.data);
    } catch (error) {
      toast.error("Failed to fetch brands");
    }
  };

  // Fetch types from the API
  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5224/api/ProductType");
      setTypes(response.data);
    } catch (error) {
      toast.error("Failed to fetch types");
    }
  };

  const validate = () => {
    let errors = {};
    if (!productname) errors.productname = "Product name is required.";
    if (!brand) errors.brand = "Brand is required.";
    if (!type) errors.type = "Type is required.";
    if (!unitWeight) errors.unitWeight = "Unit weight is required.";
    if (!unitprice || isNaN(unitprice)) errors.unitprice = "Valid unit price is required.";
    if (!quantity || isNaN(quantity)) errors.quantity = "Valid quantity is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const url = "http://localhost:5224/api/Product";
    const newData = {
      productName: productname,
      brandId: brand, // Reference by ID
      typeId: type,   // Reference by ID
      unitWeight: unitWeight,
      unitprice: unitprice,
      quantity: quantity,
    };
    try {
      await axios.post(url, newData);
      toast.success("Product has been added");
      navigate('/');
    } catch (error) {
      toast.error("Failed to add the product");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="w-full max-w-lg mb-6">
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Product Name"
          value={productname}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Dropdown for selecting a brand */}
        <select
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        {/* Dropdown for selecting a type */}
        <select
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Unit Weight"
          value={unitWeight}
          onChange={(e) => setUnitWeight(e.target.value)}
        />
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Unit Price"
          value={unitprice}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button
        onClick={handleSave}
        className="p-2 bg-green-500 text-white rounded"
      >
        Save Product
      </button>
    </div>
  );
};

export default AddProduct;
