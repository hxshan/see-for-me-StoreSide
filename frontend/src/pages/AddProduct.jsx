import React, { useState } from "react";
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

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
      brand: brand,
      type: type,
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
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
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
