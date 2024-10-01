import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

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
    <div className="w-full flex flex-col items-center gap-4 pt-10">
      {maps.length > 0
        ? maps.map((map) => {

            return (
              <div
                key={map.id}
                className="flex flex-col rounded-2xl w-[800px] bg-[#ffffff] shadow-xl"
              >
                <div className="flex flex-col p-8">
                  <div className="text-2xl font-bold   text-[#374151] pb-6">
                    {map.Name?map.Name:"Floor Map"}
                  </div>
                  <div className=" text-lg   text-[#374151]">
                    Map Width : {map.width}
                  </div>
                  <div className=" text-lg   text-[#374151]">
                    Map Height : {map.height}
                  </div>
                  <div className="flex justify-end pt-6">
                    <button
                    onClick={()=>{
                        navigate("/floor")
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
      <button className="font-bold rounded-lg text-lg  w-64 h-16 bg-[#0649e5] text-[#ffffff] justify-center">
        Create new FloorMap
      </button>
    </div>
  );
};

export default FloorHome;
