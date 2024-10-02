import React from 'react'
import { Home, ChevronDown, ChevronRight, Search, User } from 'lucide-react';

const Header = () => {
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
      <span>Name</span>
    </div>
  </div>
  )
}

export default Header