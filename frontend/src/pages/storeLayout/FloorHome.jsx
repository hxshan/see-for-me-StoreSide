import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import SideNav from "../shared/SideNav";
import { Home, ChevronDown, ChevronRight, Search, User } from 'lucide-react';
import Header from "../shared/Header";

const FloorHome = () => {
  const [maps, SetMaps] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await axios.get("floor");
      SetMaps(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      console.log(id)
      if(confirm("Are you sure you want to delete this!")){
        const result = await axios.delete(`floor/${id}`);
        if(result.status == 200 ){
          toast.success("Deleted Successfully");
        }
        getData();
      }
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.message)
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100"> 
      <SideNav/>
      <div className="w-full flex flex-col items-start gap-4">
       
        <Header/>
        <div className="pl-36">
        <h1 className="text-4xl font-bold underline mb-8">All Floor Layouts</h1>
        <button 
          onClick={()=>{
            navigate(`/floor`)
        }} 
        className="font-bold rounded-lg text-lg  w-64 h-16 mt-8 bg-[#0649e5] text-[#ffffff] justify-center">
          Create new FloorMap
        </button>
        <div className="flex  flex-col gap-8">

        
        {maps.length > 0
          ? maps.map((map) => {

              return (
                <div
                  key={map.id}
                  className="flex flex-col rounded-2xl w-[800px] border border-gray-500 bg-[#ffffff] shadow-xl"
                >
                  <div className="flex flex-col p-8">
                    <div className="text-2xl font-bold   text-[#374151] pb-6">
                      {map.name?map.name:"Floor Map"}
                    </div>
                    <div className=" text-lg   text-[#374151]">
                      Map Width : {map.width}
                    </div>
                    <div className=" text-lg   text-[#374151]">
                      Map Height : {map.height}
                    </div>
                    <div className="flex justify-end pt-6 gap-8">
                      <button
                      onClick={()=>{
                          navigate(`/floor/${map.id}`)
                      }} 
                      className="bg-[#3221ce] text-[#ffffff] w-full font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">
                        Edit Map Layout
                      </button>
                      <button
                      id={map.id}
                      onClick={(e)=>{
                          deleteData(e.target.id);
                      }} 
                      className="bg-[#df2222] text-[#000000] w-full font-bold text-base  p-3 rounded-lg hover:bg-[#df2f2f] active:scale-95 transition-transform transform">
                        Delete Map Layout
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
          </div>
        

        </div>
      </div>
    </div>
  );
};

export default FloorHome;
