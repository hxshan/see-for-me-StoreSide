import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF AutoTable

const Product = () => {
  const [show, setShow] = useState(false);

  const [productId, setProductId] = useState(""); // Added state for productId
  const [productname, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [unitWeight, setUnitWeight] = useState("");
  const [unitprice, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editID, setEditId] = useState("");
  const [editProductId, setEditProductId] = useState(""); // Added state for editProductId
  const [editProductname, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editType, setEditType] = useState("");
  const [editUnitWeight, setEditUnitWeight] = useState("");
  const [editUnitprice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const generateReport = () => {
    const doc = new jsPDF();
    // Add a frame around the entire page (optional)
    doc.setLineWidth(0.5); // Set line thickness for the frame
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10); // Create a frame with margins of 5

    doc.setFontSize(18);
    doc.text("See For Mee - Product List Report", 50, 20); // Company name and title at (50, 20)

    // Generate and add the current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentDate} at ${currentTime}`, 50, 30); // Date and time at (50, 30)

    // Table with headers and filtered content
    doc.autoTable({
      startY: 50, // Adjust position after adding the logo and title
      head: [['#', 'Product ID', 'Product Name', 'Brand', 'Type', 'Unit Weight', 'Unit Price', 'Quantity']],
      body: filteredData.map((item, index) => [
        index + 1,
        item.productId,
        item.productName,
        item.brand,
        item.type,
        item.unitWeight,
        item.unitprice,
        item.quantity,
      ]),
    });

    // Save the PDF
    doc.save('filtered-product-list-report.pdf');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:5224/api/Product");
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    let errors = {};
    if (!productId) errors.productId = "Product ID is required."; // Validation for productId
    if (!productname) errors.productname = "Product name is required.";
    if (!brand) errors.brand = "Brand is required.";
    if (!type) errors.type = "Type is required.";
    if (!unitWeight) errors.unitWeight = "Unit weight is required.";
    if (!unitprice || isNaN(unitprice)) errors.unitprice = "Valid unit price is required.";
    if (!quantity || isNaN(quantity)) errors.quantity = "Valid quantity is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEdit = () => {
    let errors = {};
    if (!editProductId) errors.productId = "Product ID is required."; // Validation for editProductId
    if (!editProductname) errors.productname = "Product name is required.";
    if (!editBrand) errors.brand = "Brand is required.";
    if (!editType) errors.type = "Type is required.";
    if (!editUnitWeight) errors.unitWeight = "Unit weight is required.";
    if (!editUnitprice || isNaN(editUnitprice)) errors.unitprice = "Valid unit price is required.";
    if (!editQuantity || isNaN(editQuantity)) errors.quantity = "Valid quantity is required.";
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = async (id) => {
    handleShow();
    try {
      const result = await axios.get(`http://localhost:5224/api/Product/${id}`);
      setEditProductId(result.data.productId); // Set editProductId
      setEditName(result.data.productName);
      setEditBrand(result.data.brand);
      setEditType(result.data.type);
      setEditUnitWeight(result.data.unitWeight);
      setEditPrice(result.data.unitprice);
      setEditQuantity(result.data.quantity);
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete") === true) {
      try {
        const result = await axios.delete(`http://localhost:5224/api/Product/${id}`);
        if (result.status === 200) {
          toast.success("Product has been deleted");
          getData();
        }
      } catch (error) {
        toast.error("Failed to delete the product");
      }
    }
  };

  const handleUpdate = async () => {
    if (!validateEdit()) return;

    const url = `http://localhost:5224/api/Product/${editID}`;
    const updatedData = {
      id: editID,
      productId: editProductId, // Include productId in update
      productName: editProductname,
      brand: editBrand,
      type: editType,
      unitWeight: editUnitWeight,
      unitprice: editUnitprice,
      quantity: editQuantity,
    };
    try {
      await axios.put(url, updatedData);
      handleClose();
      getData();
      clear();
      toast.success("Product has been updated");
    } catch (error) {
      toast.error("Failed to update the product");
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    const url = "http://localhost:5224/api/Product";
    const newData = {
      productId: productId, // Include productId in creation
      productName: productname,
      brand: brand,
      type: type,
      unitWeight: unitWeight,
      unitprice: unitprice,
      quantity: quantity,
    };
    try {
      await axios.post(url, newData);
      getData();
      clear();
      toast.success("Product has been added");
    } catch (error) {
      toast.error("Failed to add the product");
    }
  };

  const clear = () => {
    setProductId(""); // Clear productId
    setName("");
    setBrand("");
    setType("");
    setUnitWeight("");
    setPrice("");
    setQuantity("");
    setEditProductId(""); // Clear editProductId
    setEditName("");
    setEditBrand("");
    setEditType("");
    setEditUnitWeight("");
    setEditPrice("");
    setEditQuantity("");
    setEditId("");
    setErrors({});
    setEditErrors({});
  };

  const handleFloatInput = (e, setState) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setState(value);
    }
  };

  const handleNumberInput = (e, setState) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setState(value);
    }
  };

  const handleAlphaNumericInput = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const filteredData = data.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="w-full max-w-lg mb-6">
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => handleNumberInput(e, setProductId)}
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Product Name"
            value={productname}
            onChange={(e) => handleAlphaNumericInput(e, setName)}
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Brand"
            value={brand}
            onChange={(e) => handleAlphaNumericInput(e, setBrand)}
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Type"
            value={type}
            onChange={(e) => handleAlphaNumericInput(e, setType)}
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Unit Weight"
            value={unitWeight}
            onChange={(e) => handleAlphaNumericInput(e, setUnitWeight)}
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Unit Price"
            value={unitprice}
            onChange={(e) => handleFloatInput(e, setPrice)}
          />
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => handleNumberInput(e, setQuantity)}
          />
          <button
            onClick={handleSave}
            className="block w-full p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={generateReport}
          className="mb-4 p-2 bg-green-500 text-white rounded"
        >
          Generate Report
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Product ID</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Unit Weight</th>
              <th className="border border-gray-300 p-2">Unit Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className={`border border-gray-300 ${item.quantity <= 10 ? 'bg-yellow-200' : ''}`}
              >
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.productId}</td>
                <td className="border border-gray-300 p-2">{item.productName}</td>
                <td className="border border-gray-300 p-2">{item.brand}</td>
                <td className="border border-gray-300 p-2">{item.type}</td>
                <td className="border border-gray-300 p-2">{item.unitWeight}</td>
                <td className="border border-gray-300 p-2">{item.unitprice}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="mr-2 p-1 bg-yellow-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        <div className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 ${show ? 'block' : 'hidden'}`}>
          <div className="bg-white p-4 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Product ID"
              value={editProductId}
              onChange={(e) => handleNumberInput(e, setEditProductId)}
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Product Name"
              value={editProductname}
              onChange={(e) => handleAlphaNumericInput(e, setEditName)}
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Brand"
              value={editBrand}
              onChange={(e) => handleAlphaNumericInput(e, setEditBrand)}
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Type"
              value={editType}
              onChange={(e) => handleAlphaNumericInput(e, setEditType)}
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Unit Weight"
              value={editUnitWeight}
              onChange={(e) => handleAlphaNumericInput(e, setEditUnitWeight)}
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Unit Price"
              value={editUnitprice}
              onChange={(e) => handleFloatInput(e, setEditPrice)}
            />
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Quantity"
              value={editQuantity}
              onChange={(e) => handleNumberInput(e, setEditQuantity)}
            />
            <button
              onClick={handleUpdate}
              className="block w-full p-2 bg-blue-500 text-white rounded mb-4"
            >
              Update
            </button>
            <button
              onClick={handleClose}
              className="block w-full p-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
