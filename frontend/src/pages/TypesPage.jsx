import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TypesPage = () => {
  const [types, setTypes] = useState([]);
  const [typeName, setTypeName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTypes(); // Load product types on component mount
  }, []);

  // Fetch all types from the API
  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5224/api/ProductType");
      setTypes(response.data);
    } catch (error) {
      toast.error("Failed to fetch types");
    }
  };

  // Save or update product type
  const saveType = async () => {
    try {
      if (editingId) {
        // Update existing product type
        await axios.put(`http://localhost:5224/api/ProductType/${editingId}`, { name: typeName });
        toast.success("Type updated successfully");
      } else {
        // Add new product type
        await axios.post("http://localhost:5224/api/ProductType", { name: typeName });
        toast.success("Type added successfully");
      }
      setTypeName("");
      setEditingId(null);
      fetchTypes(); // Reload types list after save
    } catch (error) {
      toast.error("Error saving type");
    }
  };

  // Populate form with type data for editing
  const editType = (id, name) => {
    setEditingId(id);
    setTypeName(name);
  };

  // Delete product type
  const deleteType = async (id) => {
    try {
      await axios.delete(`http://localhost:5224/api/ProductType/${id}`);
      toast.success("Type deleted successfully");
      fetchTypes(); // Reload types list after delete
    } catch (error) {
      toast.error("Error deleting type");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Product Types</h2>

      {/* Input field for adding/updating a product type */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <input
          className="border p-2 w-full mb-2 rounded bg-white"
          placeholder="Product Type Name"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
        <button
          onClick={saveType}
          className="bg-green-500 text-white p-2 "
        >
          {editingId ? "Update Type" : "Add Type"}
        </button>
      </div>

      {/* Display the list of product types */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 border">Type Name</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id} className="hover:bg-gray-100">
                <td className="p-4 border">{type.name}</td>
                <td className="p-4 border">
                  {/* Edit button */}
                  <button
                    onClick={() => editType(type.id, type.name)}
                    className="mr-2 p-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => deleteType(type.id)}
                    className="p-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypesPage;
