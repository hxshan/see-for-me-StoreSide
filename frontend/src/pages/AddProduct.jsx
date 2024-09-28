import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productname, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [unitWeightValue, setUnitWeightValue] = useState("");
  const [unitWeightUnit, setUnitWeightUnit] = useState("kg"); // Default unit to "kg"
  const [unitprice, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [brands, setBrands] = useState([]); // For storing fetched brands
  const [types, setTypes] = useState([]); // For storing fetched types
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

  // Validation function
  const validate = () => {
    let errors = {};

    if (!productname) errors.productname = "Product name is required.";
    if (!brand) errors.brand = "Brand is required.";
    if (!type) errors.type = "Type is required.";
    if (!unitWeightValue) errors.unitWeightValue = "Unit weight is required.";
    if (!unitprice) errors.unitprice = "Unit price is required.";
    if (!quantity) errors.quantity = "Quantity is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Restrict product name input to letters and spaces only
  const handleProductNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
    }
  };

  // Restrict unit price to valid floating-point numbers
  const handleUnitPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  // Restrict quantity to numbers only
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  // Restrict unit weight value to numbers only
  const handleUnitWeightValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setUnitWeightValue(value);
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    const url = "http://localhost:5224/api/Product";
    const newData = {
      productName: productname,
      brandId: brand, // Reference by ID
      typeId: type, // Reference by ID
      unitWeight: `${unitWeightValue} ${unitWeightUnit}`, // Combine value and unit
      unitprice: unitprice,
      quantity: quantity,
    };
    try {
      await axios.post(url, newData);
      toast.success("Product has been added");
      navigate("/");
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
          className={`block w-full p-2 border ${
            errors.productname ? "border-red-500" : "border-gray-300"
          } rounded mb-4`}
          placeholder="Product Name"
          value={productname}
          onChange={handleProductNameChange} // Restrict to letters and spaces
        />
        {errors.productname && (
          <p className="text-red-500">{errors.productname}</p>
        )}

        {/* Dropdown for selecting a brand */}
        <select
          className={`block w-full p-2 border ${
            errors.brand ? "border-red-500" : "border-gray-300"
          } rounded mb-4`}
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
        {errors.brand && <p className="text-red-500">{errors.brand}</p>}

        {/* Dropdown for selecting a type */}
        <select
          className={`block w-full p-2 border ${
            errors.type ? "border-red-500" : "border-gray-300"
          } rounded mb-4`}
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
        {errors.type && <p className="text-red-500">{errors.type}</p>}

        {/* Unit weight input */}
        <div className="flex mb-4">
          <input
            type="text"
            className={`block w-full p-2 border ${
              errors.unitWeightValue ? "border-red-500" : "border-gray-300"
            } rounded`}
            placeholder="Unit Weight Value"
            value={unitWeightValue}
            onChange={handleUnitWeightValueChange} // Restrict to numbers only
          />
          <select
            className="block p-2 border border-gray-300 rounded ml-2"
            value={unitWeightUnit}
            onChange={(e) => setUnitWeightUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
          </select>
        </div>
        {errors.unitWeightValue && (
          <p className="text-red-500">{errors.unitWeightValue}</p>
        )}

        <input
          type="text"
          className={`block w-full p-2 border ${
            errors.unitprice ? "border-red-500" : "border-gray-300"
          } rounded mb-4`}
          placeholder="Unit Price"
          value={unitprice}
          onChange={handleUnitPriceChange} // Restrict to valid float numbers
        />
        {errors.unitprice && (
          <p className="text-red-500">{errors.unitprice}</p>
        )}

        <input
          type="text"
          className={`block w-full p-2 border ${
            errors.quantity ? "border-red-500" : "border-gray-300"
          } rounded mb-4`}
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange} // Restrict to numbers only
        />
        {errors.quantity && (
          <p className="text-red-500">{errors.quantity}</p>
        )}
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
