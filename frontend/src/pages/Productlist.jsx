import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("See For Mee - Product List Report", 50, 20);

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentDate} at ${currentTime}`, 50, 30);

    doc.autoTable({
      startY: 50,
      head: [['#', 'Product Name', 'Brand', 'Type', 'Unit Weight', 'Unit Price', 'Quantity']],
      body: filteredData.map((item, index) => [
        index + 1,
        item.productName,
        item.brand,
        item.type,
        item.unitWeight,
        Number(item.unitprice).toFixed(2),
        item.quantity,
      ]),
    });

    doc.save('filtered-product-list-report.pdf');
  };

  const filteredData = data.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ToastContainer />
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
              <td className="border border-gray-300 p-2">{item.productName}</td>
              <td className="border border-gray-300 p-2">{item.brand}</td>
              <td className="border border-gray-300 p-2">{item.type}</td>
              <td className="border border-gray-300 p-2">{item.unitWeight}</td>
              <td className="border border-gray-300 p-2">{Number(item.unitprice).toFixed(2)}</td>
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
      <button
        onClick={() => navigate('/add-product')}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Product
      </button>
    </div>
  );
};

export default ProductList;
