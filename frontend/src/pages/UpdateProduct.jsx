// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, useParams } from 'react-router-dom';

// const UpdateProduct = () => {
//   const [productname, setName] = useState("");
//   const [brand, setBrand] = useState("");
//   const [type, setType] = useState("");
//   const [unitWeight, setUnitWeight] = useState("");
//   const [unitprice, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const [brands, setBrands] = useState([]); // For storing fetched brands
//   const [types, setTypes] = useState([]);   // For storing fetched types
//   const [errors, setErrors] = useState({});
  
//   const { id } = useParams(); // To get the product ID from the URL
//   const navigate = useNavigate();

//   // Fetch product, brands, and types on component mount
//   useEffect(() => {
//     fetchBrands();
//     fetchTypes();
//     fetchProductDetails();
//   }, []);

//   // Fetch product details by ID
//   const fetchProductDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5224/api/Product/${id}`);
//       const product = response.data;
//       setName(product.productName);
//       setBrand(product.brandId);
//       setType(product.typeId);
//       setUnitWeight(product.unitWeight);
//       setPrice(product.unitprice);
//       setQuantity(product.quantity);
//     } catch (error) {
//       toast.error("Failed to fetch product details");
//     }
//   };

//   // Fetch brands from the API
//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get("http://localhost:5224/api/Brand");
//       setBrands(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch brands");
//     }
//   };

//   // Fetch types from the API
//   const fetchTypes = async () => {
//     try {
//       const response = await axios.get("http://localhost:5224/api/ProductType");
//       setTypes(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch types");
//     }
//   };

//   // Validation function
//   const validate = () => {
//     let errors = {};
//     const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
//     const priceRegex = /^\d+(\.\d{1,2})?$/; // Allows numbers with up to two decimal places
//     const quantityRegex = /^\d+$/; // Allows only whole numbers

//     if (!productname || !nameRegex.test(productname)) {
//       errors.productname = "Product name must contain only letters.";
//     }
//     if (!brand) errors.brand = "Brand is required.";
//     if (!type) errors.type = "Type is required.";
//     if (!unitWeight) errors.unitWeight = "Unit weight is required.";
//     if (!unitprice || !priceRegex.test(unitprice)) {
//       errors.unitprice = "Unit price must be a valid number with up to two decimal places.";
//     }
//     if (!quantity || !quantityRegex.test(quantity)) {
//       errors.quantity = "Quantity must be a valid whole number.";
//     }
    
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleUpdate = async () => {
//     if (!validate()) return;

//     const url = `http://localhost:5224/api/Product/${id}`;
//     const updatedData = {
//       id: id, // Pass the product ID for updating the correct product
//       productName: productname,
//       brandId: brand,
//       typeId: type,
//       unitWeight: unitWeight,
//       unitprice: unitprice,
//       quantity: quantity,
//     };

//     try {
//       await axios.put(url, updatedData);
//       toast.success("Product has been updated");
//       navigate('/');
//     } catch (error) {
//       toast.error("Failed to update the product");
//     }
//   };

//   // Helper functions for real-time input restrictions
//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     const nameRegex = /^[A-Za-z\s]*$/; // Only allow letters and spaces
//     if (nameRegex.test(value)) {
//       setName(value);
//     }
//   };

//   const handlePriceChange = (e) => {
//     const value = e.target.value;
//     const priceRegex = /^\d*\.?\d{0,2}$/; // Only allow numbers with up to 2 decimal places
//     if (priceRegex.test(value)) {
//       setPrice(value);
//     }
//   };

//   const handleQuantityChange = (e) => {
//     const value = e.target.value;
//     const quantityRegex = /^\d*$/; // Only allow whole numbers
//     if (quantityRegex.test(value)) {
//       setQuantity(value);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4">Update Product</h2>
//       <div className="w-full max-w-lg mb-6">
//         <input
//           type="text"
//           className={`block w-full p-2 border ${errors.productname ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
//           placeholder="Product Name"
//           value={productname}
//           onChange={handleNameChange}
//         />
//         {errors.productname && <p className="text-red-500 text-sm mb-4">{errors.productname}</p>}

//         {/* Dropdown for selecting a brand */}
//         <select
//           className="block w-full p-2 border border-gray-300 rounded mb-4"
//           value={brand}
//           onChange={(e) => setBrand(e.target.value)}
//         >
//           <option value="">Select Brand</option>
//           {brands.map((brand) => (
//             <option key={brand.id} value={brand.id}>
//               {brand.name}
//             </option>
//           ))}
//         </select>
//         {errors.brand && <p className="text-red-500 text-sm mb-4">{errors.brand}</p>}

//         {/* Dropdown for selecting a type */}
//         <select
//           className="block w-full p-2 border border-gray-300 rounded mb-4"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//         >
//           <option value="">Select Type</option>
//           {types.map((type) => (
//             <option key={type.id} value={type.id}>
//               {type.name}
//             </option>
//           ))}
//         </select>
//         {errors.type && <p className="text-red-500 text-sm mb-4">{errors.type}</p>}

//         <input
//           type="text"
//           className={`block w-full p-2 border ${errors.unitWeight ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
//           placeholder="Unit Weight"
//           value={unitWeight}
//           onChange={(e) => setUnitWeight(e.target.value)}
//         />
//         {errors.unitWeight && <p className="text-red-500 text-sm mb-4">{errors.unitWeight}</p>}

//         <input
//           type="text"
//           className={`block w-full p-2 border ${errors.unitprice ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
//           placeholder="Unit Price"
//           value={unitprice}
//           onChange={handlePriceChange}
//         />
//         {errors.unitprice && <p className="text-red-500 text-sm mb-4">{errors.unitprice}</p>}

//         <input
//           type="text"
//           className={`block w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
//           placeholder="Quantity"
//           value={quantity}
//           onChange={handleQuantityChange}
//         />
//         {errors.quantity && <p className="text-red-500 text-sm mb-4">{errors.quantity}</p>}
//       </div>
//       <button
//         onClick={handleUpdate}
//         className="p-2 bg-blue-500 text-white rounded"
//       >
//         Update Product
//       </button>
//     </div>
//   );
// };

// export default UpdateProduct;
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

  const [brands, setBrands] = useState([]); // For storing fetched brands
  const [types, setTypes] = useState([]);   // For storing fetched types
  const [errors, setErrors] = useState({});

  const { id } = useParams(); // To get the product ID from the URL
  const navigate = useNavigate();

  // Fetch product, brands, and types on component mount
  useEffect(() => {
    fetchBrands();
    fetchTypes();
    fetchProductDetails();
  }, []);

  // Fetch product details by ID
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5224/api/Product/${id}`);
      const product = response.data;
      setName(product.productName);
      setBrand(product.brandId);
      setType(product.typeId);
      setUnitWeightValue(product.unitWeight.split(" ")[0]); // Extract the weight value
      setUnitWeightUnit(product.unitWeight.split(" ")[1]); // Extract the weight unit
      setPrice(product.unitprice);
      setQuantity(product.quantity);
    } catch (error) {
      toast.error("Failed to fetch product details");
    }
  };

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
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    const priceRegex = /^\d+(\.\d{1,2})?$/; // Allows numbers with up to two decimal places
    const quantityRegex = /^\d+$/; // Allows only whole numbers
    const weightRegex = /^\d+$/; // Allows only numbers

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
      id: id, // Pass the product ID for updating the correct product
      productName: productname,
      brandId: brand,
      typeId: type,
      unitWeight: `${unitWeightValue} ${unitWeightUnit}`, // Combine weight value and unit
      unitprice: unitprice,
      quantity: quantity,
    };

    try {
      await axios.put(url, updatedData);
      toast.success("Product has been updated");
      navigate('/');
    } catch (error) {
      toast.error("Failed to update the product");
    }
  };

  // Helper functions for real-time input restrictions
  const handleNameChange = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]*$/; // Only allow letters and spaces
    if (nameRegex.test(value)) {
      setName(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const priceRegex = /^\d*\.?\d{0,2}$/; // Only allow numbers with up to 2 decimal places
    if (priceRegex.test(value)) {
      setPrice(value);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const quantityRegex = /^\d*$/; // Only allow whole numbers
    if (quantityRegex.test(value)) {
      setQuantity(value);
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    const weightRegex = /^\d*$/; // Only allow numbers
    if (weightRegex.test(value)) {
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
          className={`block w-full p-2 border ${errors.productname ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
          placeholder="Product Name"
          value={productname}
          onChange={handleNameChange}
        />
        {errors.productname && <p className="text-red-500 text-sm mb-4">{errors.productname}</p>}

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
        {errors.brand && <p className="text-red-500 text-sm mb-4">{errors.brand}</p>}

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
        {errors.type && <p className="text-red-500 text-sm mb-4">{errors.type}</p>}

        {/* Unit Weight Input */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className={`block w-1/2 p-2 border ${errors.unitWeight ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder="Unit Weight"
            value={unitWeightValue}
            onChange={handleWeightChange}
          />
          <select
            className="block w-1/2 p-2 border border-gray-300 rounded"
            value={unitWeightUnit}
            onChange={(e) => setUnitWeightUnit(e.target.value)}
          >
            <option value="kg">KG</option>
            <option value="g">G</option>
            <option value="l">L</option>
            <option value="ml">ML</option>
          </select>
        </div>
        {errors.unitWeight && <p className="text-red-500 text-sm mb-4">{errors.unitWeight}</p>}

        <input
          type="text"
          className={`block w-full p-2 border ${errors.unitprice ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
          placeholder="Unit Price"
          value={unitprice}
          onChange={handlePriceChange}
        />
        {errors.unitprice && <p className="text-red-500 text-sm mb-4">{errors.unitprice}</p>}

        <input
          type="text"
          className={`block w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
        {errors.quantity && <p className="text-red-500 text-sm mb-4">{errors.quantity}</p>}
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

