import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBrands(); // Load brands on component mount
  }, []);

  // Fetch all brands from the API
  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5224/api/Brand");
      setBrands(response.data);
    } catch (error) {
      toast.error("Failed to fetch brands");
    }
  };

  // Save or update brand
  const saveBrand = async () => {
    try {
      if (editingId) {
        // Update existing brand
        await axios.put(`http://localhost:5224/api/Brand/${editingId}`, { name: brandName });
        toast.success("Brand updated successfully");
      } else {
        // Add new brand
        await axios.post("http://localhost:5224/api/Brand", { name: brandName });
        toast.success("Brand added successfully");
      }
      setBrandName("");
      setEditingId(null);
      fetchBrands(); // Reload brand list after save
    } catch (error) {
      toast.error("Error saving brand");
    }
  };

  // Populate form with brand data for editing
  const editBrand = (id, name) => {
    setEditingId(id);
    setBrandName(name);
  };

  // Delete brand
  const deleteBrand = async (id) => {
    try {
      await axios.delete(`http://localhost:5224/api/Brand/${id}`);
      toast.success("Brand deleted successfully");
      fetchBrands(); // Reload brand list after delete
    } catch (error) {
      toast.error("Error deleting brand");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Manage Brands</h2>

      {/* Input field for adding/updating a brand */}
      <div className="mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <button
          onClick={saveBrand}
          className="bg-green-500 text-white p-2 rounded"
        >
          {editingId ? "Update Brand" : "Add Brand"}
        </button>
      </div>

      {/* Display the list of brands */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-4 border">Brand Name</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="p-4 border">{brand.name}</td>
              <td className="p-4 border">
                {/* Edit button */}
                <button
                  onClick={() => editBrand(brand.id, brand.name)}
                  className="mr-2 p-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => deleteBrand(brand.id)}
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
  );
};

export default BrandPage;
