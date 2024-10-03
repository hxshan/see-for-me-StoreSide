import React from 'react'
import { Home, ChevronDown, ChevronRight, Search, User } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

const Header = () => {
  const { logout,user,token } =useAuth();
  return (
    <div className="flex justify-between items-center mb-8 w-full px-10 py-6 bg-white shadow-md" >
    <div className="w-64 relative">
      <input
        type="text"
        className="w-full p-2 border rounded-md pl-8"
        placeholder="Search..."
      />
      <Search className="absolute left-2 top-2.5 text-gray-400" size={20} />
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <User size={20} />
      </div>
      <span>{user?.userName}</span>
        <button
            onClick={()=>logout()}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-red-600
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400`}
          >
            
            <span className="w-full text-nowrap">Log-Out</span>
          </button>
    </div>
    
  </div>
  )
}

export default Header