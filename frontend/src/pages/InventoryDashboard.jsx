import React from 'react'
import { Home, ChevronDown, ChevronRight, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SideNav from './shared/SideNav';
import Header from './shared/Header';

export const InventoryDashboard = () => {

  
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <SideNav/>

    {/* Main Content */}
    <div className="flex-1 p-8">
      {/* Header */}
      <Header/>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-8">
        <DashboardCard title="Products" icon={<ProductIcon />} />
        <DashboardCard title="Brands" icon={<BrandIcon />} />
        <DashboardCard title="Types" icon={<TypesIcon />} />
        <DashboardCard title="Floor Plan" icon={<FloorPlanIcon />} />
      </div>
    </div>
  </div>
);
};

const DashboardCard = ({ title, icon }) => {
  const navigate = useNavigate();
  return(
<div
 onClick={()=>{
  if(title == "Floor Plan"){
    navigate('/floorhome')
  }else if(title == "Products"){
    navigate('/products')
  }else if(title == "Brands"){
    navigate('/brands')
  }else if(title == "Types"){
    navigate('/types')
  }
}} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center space-y-4 hover:cursor-pointer hover:scale-110 transition-all duration-200">
  <div className="w-16 h-16">{icon}</div>
  <span className="text-lg font-semibold">{title}</span>
</div>
);}

const ProductIcon = () => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill="#E5E7EB"/>
      <rect x="3" y="3" width="18" height="8" rx="1" fill="#F3F4F6"/>
      <rect x="4" y="4" width="4" height="6" rx="0.5" fill="#10B981"/>
      <rect x="10" y="4" width="4" height="6" rx="0.5" fill="#F59E0B"/>
      <rect x="16" y="4" width="4" height="6" rx="0.5" fill="#EF4444"/>
      <rect x="3" y="13" width="18" height="8" rx="1" fill="#F3F4F6"/>
      <rect x="4" y="14" width="4" height="6" rx="0.5" fill="#3B82F6"/>
      <rect x="10" y="14" width="4" height="6" rx="0.5" fill="#8B5CF6"/>
      <rect x="16" y="14" width="8" height="2" rx="0.5" fill="#6B7280"/>
      <rect x="16" y="18" width="6" height="2" rx="0.5" fill="#6B7280"/>
    </svg>
  );

const BrandIcon = () => (
<svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#4F46E5"/>
  <path d="M8 12L11 15L16 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

const TypesIcon = () => (
<svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="2" fill="#E5E7EB"/>
  <rect x="4" y="4" width="7" height="7" rx="1" fill="#F59E0B"/>
  <rect x="13" y="4" width="7" height="7" rx="1" fill="#EF4444"/>
  <rect x="4" y="13" width="7" height="7" rx="1" fill="#3B82F6"/>
  <rect x="13" y="13" width="7" height="7" rx="1" fill="#10B981"/>
</svg>
);

const FloorPlanIcon = () => (
<svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="2" fill="#E5E7EB"/>
  <path d="M4 4V20H20" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M4 16H12V20" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M12 8H20V20" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="8" cy="8" r="1" fill="#4B5563"/>
  <circle cx="16" cy="12" r="1" fill="#4B5563"/>
</svg>
    
  );

  export default InventoryDashboard;

