import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const [productname, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [unitWeightValue, setUnitWeightValue] = useState(""); // Separate value for unit weight number
  const [unitWeightUnit, setUnitWeightUnit] = useState("kg"); // Default unit
  const [unitprice, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
    fetchTypes();
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5224/api/Product/${id}`);
      const product = response.data;
      setName(product.productName);
      setBrand(product.brandId);
      setType(product.typeId);
      setUnitWeightValue(product.unitWeight.split(" ")[0]);
      setPrice(product.unitprice);
      setQuantity(product.quantity);
      setUnitWeightUnit(product.unitWeight.split(" ")[1]);
    } catch (error) {
      toast.error("Failed to fetch product details");
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5224/api/Brand");
      setBrands(response.data);
    } catch (error) {
      toast.error("Failed to fetch brands");
    }
  };

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
    const nameRegex = /^[A-Za-z\s]+$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const quantityRegex = /^\d+$/;
    const weightRegex = /^\d+$/;

    if (!productname || !nameRegex.test(productname)) {
      errors.productname = "Product name must contain only letters.";
    }
    if (!brand) errors.brand = "Brand is required.";
    if (!type) errors.type = "Type is required.";
    if (!unitWeightValue || !weightRegex.test(unitWeightValue)) {
      errors.unitWeight = "Unit weight must be a valid number.";
    }
    if (!unitprice || !priceRegex.test(unitprice)) {
      errors.unitprice = "Unit price must be a valid number with up to two decimal places.";
    }
    if (!quantity || !quantityRegex.test(quantity)) {
      errors.quantity = "Quantity must be a valid whole number.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    const url = `http://localhost:5224/api/Product/${id}`;
    const updatedData = {
      id: id,
      productName: productname,
      brandId: brand,
      typeId: type,
      unitWeightValue: unitWeightValue,
      unitprice: unitprice,
      quantity: quantity,
      unitWeightUnit: unitWeightUnit,
    };

    try {
      await axios.put(url, updatedData);
      toast.success("Product has been updated");
      navigate('/');
    } catch (error) {
      toast.error("Failed to update the product");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]*$/;
    if (nameRegex.test(value)) {
      setName(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const priceRegex = /^\d*\.?\d{0,2}$/;
    if (priceRegex.test(value)) {
      setPrice(value);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const quantityRegex = /^\d*$/;
    if (quantityRegex.test(value)) {
      setQuantity(value);
    }
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

 // Restrict unit weight value to numbers only
 const handleUnitWeightValueChange = (e) => {
  const value = e.target.value;
  if (/^\d*\.?\d{0,2}$/.test(value)) {
    setUnitWeightValue(value);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
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
            className={`block p-2 border ${
              errors.unitWeightUnit ? "border-red-500" : "border-gray-300"
            } rounded ml-2`}
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
        {errors.unitWeightUnit && (
          <p className="text-red-500">{errors.unitWeightUnit}</p>
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
        onClick={handleUpdate}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;