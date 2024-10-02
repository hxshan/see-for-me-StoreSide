// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const ProductList = () => {
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const result = await axios.get("http://localhost:5224/api/Product");
//       setData(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete") === true) {
//       try {
//         const result = await axios.delete(`http://localhost:5224/api/Product/${id}`);
//         if (result.status === 200) {
//           toast.success("Product has been deleted");
//           getData();
//         }
//       } catch (error) {
//         toast.error("Failed to delete the product");
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit-product/${id}`);
//   };

//   const generateReport = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("See For Mee - Product List Report", 50, 20);

//     const currentDate = new Date().toLocaleDateString();
//     const currentTime = new Date().toLocaleTimeString();
//     doc.setFontSize(12);
//     doc.text(`Generated on: ${currentDate} at ${currentTime}`, 50, 30);

//     doc.autoTable({
//       startY: 50,
//       head: [['#', 'Product Name', 'Brand', 'Type', 'Unit Weight Value', 'Unit Price', 'Quantity', 'Unit']],
//       body: filteredData.map((item, index) => [
//         index + 1,
//         item.productName,
//         item.brand?.name || "N/A",  // Access brand name safely
//         item.type?.name || "N/A",   // Access type name safely
//         item.unitWeightValue,       // Updated unitWeight to unitWeightValue
//         Number(item.unitprice).toFixed(2),
//         item.quantity,
//         item.unit,                  // Added new unit column
//       ]),
//     });

//     doc.save('filtered-product-list-report.pdf');
//   };

//   const filteredData = data.filter((item) =>
//     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4">Product List</h2>

//       {/* Search bar area with background */}
//       <div className="w-full max-w-5xl mb-6 p-4 bg-gray-200 rounded">
//         <input
//           type="text"
//           className="block w-full p-2 border border-gray-300 rounded mb-4"
//           placeholder="Search by Product Name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Buttons (Generate Report and Add New Product) */}
//       <div className="flex justify-between w-full max-w-5xl mb-4">
//         <button
//           onClick={generateReport}
//           className="p-2 bg-green-500 text-white rounded"
//         >
//           Generate Report
//         </button>
//         <button
//           onClick={() => navigate('/add-product')}
//           className="p-2 bg-blue-500 text-white rounded"
//         >
//           Add New Product
//         </button>
//       </div>

//       {/* Table area with background */}
//       <div className="w-full max-w-5xl p-4 bg-white rounded shadow-lg">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">#</th>
//               <th className="border border-gray-300 p-2">Product Name</th>
//               <th className="border border-gray-300 p-2">Brand</th>
//               <th className="border border-gray-300 p-2">Type</th>
//               <th className="border border-gray-300 p-2">Unit Weight Value</th> {/* Updated */}
//               <th className="border border-gray-300 p-2">Unit Price</th>
//               <th className="border border-gray-300 p-2">Quantity</th>
//               <th className="border border-gray-300 p-2">Unit</th>              {/* Added */}
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr
//                 key={item.id}
//                 className={`border border-gray-300 ${item.quantity <= 10 ? 'bg-yellow-200' : ''}`}
//               >
//                 <td className="border border-gray-300 p-2">{index + 1}</td>
//                 <td className="border border-gray-300 p-2">{item.productName}</td>
//                 <td className="border border-gray-300 p-2">{item.brand?.name || "N/A"}</td> {/* Safely access brand name */}
//                 <td className="border border-gray-300 p-2">{item.type?.name || "N/A"}</td>  {/* Safely access type name */}
//                 <td className="border border-gray-300 p-2">{item.unitWeightValue}</td>       {/* Updated */}
//                 <td className="border border-gray-300 p-2">{Number(item.unitprice).toFixed(2)}</td>
//                 <td className="border border-gray-300 p-2">{item.quantity}</td>
//                 <td className="border border-gray-300 p-2">{item.unit}</td>                  {/* Added */}
//                 <td className="border border-gray-300 p-2">
//                   <button
//                     onClick={() => handleEdit(item.id)}
//                     className="mr-2 p-1 bg-yellow-500 text-white rounded"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="p-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
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

    // Adding separator line after title and date/time
    doc.setDrawColor(0, 0, 0); // Black color for the line
    doc.line(10, 35, 200, 35); // Drawing the line

    // Changing border color to light blue
    doc.setDrawColor(173, 216, 230); // Light blue color for the frame
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277); // Adding a border/frame to the report

    // Displaying total number of products in the report
    doc.text(`Total number of products: ${filteredData.length}`, 50, 40);

    doc.autoTable({
      startY: 60,
      head: [['#', 'Product Name', 'Brand', 'Type', 'Unit Weight Value', 'Unit Price', 'Quantity', 'Unit']],
      body: filteredData.map((item, index) => [
        index + 1,
        item.productName,
        item.brand?.name || "N/A",  // Access brand name safely
        item.type?.name || "N/A",   // Access type name safely
        item.unitWeight,       // Updated unitWeight to unitWeightValue
        Number(item.unitprice).toFixed(2),
        item.quantity,
        item.unit,                  // Added new unit column
      ]),
    });

    doc.save('filtered-product-list-report.pdf');
  };

  const filteredData = data.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {/* Search bar area with background */}
      <div className="w-full max-w-5xl mb-6 p-4 bg-gray-200 rounded">
        <input
          type="text"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Buttons (Generate Report and Add New Product) */}
      <div className="flex justify-between w-full max-w-5xl mb-4">
        <button
          onClick={generateReport}
          className="p-2 bg-green-500 text-white rounded"
        >
          Generate Report
        </button>
        <button
          onClick={() => navigate('/add-product')}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add New Product
        </button>
      </div>

      {/* Table area with background */}
      <div className="w-full max-w-5xl p-4 bg-white rounded shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Unit Weight Value</th> {/* Updated */}
              <th className="border border-gray-300 p-2">Unit Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Unit</th>              {/* Added */}
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
                <td className="border border-gray-300 p-2">{item.brand?.name || "N/A"}</td> {/* Safely access brand name */}
                <td className="border border-gray-300 p-2">{item.type?.name || "N/A"}</td>  {/* Safely access type name */}
                <td className="border border-gray-300 p-2">{item.unitWeight}</td>       {/* Updated */}
                <td className="border border-gray-300 p-2">{Number(item.unitprice).toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">{item.unit}</td>                  {/* Added */}
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
      </div>
    </div>
  );
};

export default ProductList;
