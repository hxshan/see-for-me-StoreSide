import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import SideNav from "../shared/SideNav";
import { Home, ChevronDown, ChevronRight, Search, User } from 'lucide-react';
import Header from "../shared/Header";
import { floorplan , deleteIcon } from "../../assets";

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
      <div className="w-full flex flex-col items-start ">
       
        <Header/>
        <div className="pl-12 flex">
        <div>
        <h1 className="text-4xl font-bold  mb-8">All Floor Layouts</h1>
        <button 
          onClick={()=>{
            navigate(`/floor`)
        }} 
        className=" font-semibold px-[40px] py-[10px] rounded-lg text-lg  bg-[#0649e5] text-[#ffffff] justify-center">
          Create new FloorMap
        </button>
        </div>
        <div className=" border-2 border-black flex flex-col justify-center w-[700px] h-[550px] items-center ml-[100px]">
        <div className="flex  flex-col gap-4 overflow-y-auto">

        
        {maps.length > 0
          ? maps.map((map) => {

              return (
                <div
                  key={map.id}
                  className="flex   rounded-xl mt-[10px] w-[600px] border h-[190px] p-[20px] bg-[#ffffff] shadow-xl items-center"
                >
                <div className=" h-[150px] w-[150px]">
                  <img src={floorplan} alt="img" className="w-full h-full"/>
                </div>
                  <div className="flex flex-col ml-[15px] items-start h-full mt-4">
                    <div className="text-2xl font-bold   text-[#374151] ">
                      {"Floor Map"}
                    </div>
                    <div className=" text-[15px]   text-[#374151]">
                      Map Width : {map.width}
                    </div>
                    <div className=" text-[15px]  text-[#374151]">
                      Map Height : {map.height}
                    </div>
                  </div>
                  <div className=" flex flex-col justify-between h-full items-end ml-[140px]">
                  <div className="bg-[#df2222] w-[50px] h-[50px] rounded-full flex items-center justify-center p-[10px]">
                    <img src={deleteIcon} id={map.id} className=" w-full h-full"
                      onClick={(e)=>{
                          deleteData(e.target.id);
                      }} />
                  </div>
                  <button
                      onClick={()=>{
                          navigate(`/floor/${map.id}`)
                      }} 
                      className="bg-[#3221ce] text-[#ffffff] px-[30px] py-[10px] rounded-md ">
                        Edit Map
                      </button>
                  
                  </div>
                </div>
              );
            })
          : ""}
          </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorHome;
