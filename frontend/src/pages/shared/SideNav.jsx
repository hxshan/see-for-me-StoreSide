import React from 'react'
import { Home, ChevronDown, ChevronRight, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const SideNav = () => {
    const navigate = useNavigate()
  return (
    <div className="w-64 bg-white shadow-md">
      <div 
        onClick={()=>{
            navigate('/')
        }}
      className="p-4 bg-gray-200">
        <span className="text-lg font-semibold hover:cursor-pointer">Home</span>
      </div>
      <nav className="mt-4">
        <div
        onClick={()=>{
            navigate('/products')
        }}
        className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <span>Product</span>
          <ChevronRight size={20} />
        </div>

        <div
        onClick={()=>{
            navigate('/brands')
        }} 
        className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <span>Brands</span>
          <ChevronRight size={20} />
        </div>

        <div 
        onClick={()=>{
            navigate('/types')
        }}
        className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <span>Types</span>
          <ChevronRight size={20} />
        </div>

        <div 
        onClick={()=>{
            navigate('/floorhome')
        }}
        className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <span>Store Map</span>
          <ChevronRight size={20} />
        </div>
      </nav>
    </div>
  )
}

export default SideNav