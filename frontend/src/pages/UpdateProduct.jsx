import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  // State variables for the product details
  const [productname, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [unitWeight, setUnitWeight] = useState("");
  const [unitprice, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});  // State for form validation errors

  const navigate = useNavigate();
  const { id } = useParams();  // Get product ID from route parameters

  // Fetch the existing product details on component mount
  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetch product details by ID
  const fetchProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:5224/api/Product/${id}`);
      const product = result.data;

      // Set state with fetched product details
      setName(product.productName);
      setBrand(product.brand);
      setType(product.type);
      setUnitWeight(product.unitWeight);
      setPrice(product.unitprice);
      setQuantity(product.quantity);
    } catch (error) {
      toast.error("Failed to fetch product details");
    }
  };

  // Validation function for form inputs
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

  // Function to handle product update
  const handleUpdate = async () => {
    // If validation fails, stop the update
    if (!validate()) return;

    const url = `http://localhost:5224/api/Product/${id}`;
    
    // Prepare the updated data object with appropriate types
    const updatedData = {
      productName: productname,
      brand: brand,
      type: type,
      unitWeight: unitWeight,
      unitprice: parseFloat(unitprice), // Ensure unitprice is a float
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
    };

    console.log("Updated Data:", updatedData);  // For debugging

    try {
      // Send PUT request to update the product
      await axios.put(url, updatedData);
      toast.success("Product has been updated successfully!");
      navigate('/');  // Redirect to the home page after update
    } catch (error) {
      // Handle any errors returned by the server
      if (error.response && error.response.data) {
        console.error("Error response details:", error.response.data);  // Log the error response
        toast.error(`Update failed: ${error.response.data.title || "Unknown error"}`);
      } else {
        console.error("Unknown error", error);  // Log unknown error
        toast.error("Failed to update the product. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <div className="w-full max-w-lg mb-6">
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Product Name"
          value={productname}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.productname && <span className="text-red-500">{errors.productname}</span>}
        
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        {errors.brand && <span className="text-red-500">{errors.brand}</span>}
        
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        {errors.type && <span className="text-red-500">{errors.type}</span>}
        
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Unit Weight"
          value={unitWeight}
          onChange={(e) => setUnitWeight(e.target.value)}
        />
        {errors.unitWeight && <span className="text-red-500">{errors.unitWeight}</span>}
        
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Unit Price"
          value={unitprice}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.unitprice && <span className="text-red-500">{errors.unitprice}</span>}
        
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {errors.quantity && <span className="text-red-500">{errors.quantity}</span>}
      </div>
      
      <button
        onClick={handleUpdate}
        className="p-2 bg-green-500 text-white rounded"
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
