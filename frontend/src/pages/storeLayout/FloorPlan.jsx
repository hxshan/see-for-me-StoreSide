import React from "react";
import { useState } from "react";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Save, Plus, Minus, RotateCcw, Scale } from 'lucide-react';

const FloorPlan = () => { //TODO: make this come form db

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
 // const [tileSize, setTileSize] = useState(32);
  const [maze, setMaze] = useState(null);
  const [tileType,SetTileType] = useState("empty");
  const [isEditing,SetIsEditing] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMouseIn,setIsMouseIn] = useState(false);
  const [zoomSquare,SetZoomSquare] = useState(null);


const handleZoom = (e) =>{

  if(isMouseIn){
    e.preventDefault();

    if  (e.deltaY > 0 ){
      setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
    }else{
      setZoomLevel((prev) =>Math.min(prev+0.1, 3))
    }

  }

}

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const resetZoom = ()=>{
    setZoomLevel(1);
    //generateMaze();
  }

  const generateMaze = () => {
    const newMaze = {
      width: width,
      height: height,
      tiles: Array(height)
        .fill()
        .map(() => Array(width).fill({type:"empty",products:[]})),
    };
    setMaze(newMaze);
  };

  const postApI = async (data)=>{
    try{
      const res = await axios.post("floor/addfloor",data);
      return res
    }catch(error){
      if(isAxiosError(error)){
        toast.warning(error?.response?.data)
      }
    }
  }

  const saveFloorPlan = async () =>{
    if(!maze){
      toast.warning("Genrate a Floor plan first");3
      return;
    }
    await postApI(maze).then((res)=>{
      if(res){
        toast.success("Success");
      }
    })
  }

  const handleTileClick = (row,col) =>{
    if (!maze) return;
    if(!isEditing){
      console.log("not editing");
      return;
    }
    setMaze(prevMaze => {

      const newMaze = {
        ...prevMaze,
        tiles: prevMaze.tiles.map((r, rowIndex) =>
          rowIndex === row
            ? r.map((tile, colIndex) =>
                colIndex === col
                  ? {
                      ...tile,
                      type: tileType
                    }
                  : tile
              )
            : r
        )
      };
      return newMaze;
    });
  }


  const getTileColor = (type) => {
    
    switch (type) {
      case 'wall': return 'bg-gray-800';
      case 'counter': return 'bg-green-500';
      case 'empty': return 'bg-white';
      case 'shelf': return 'bg-blue-300';
      default: return 'bg-white';
    }

  };


  return (
    <div className="w-fit mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Create Floor Plan</h1>
        
        <div className="flex items-center">
              <span className="mr-2">Edit Mode</span>
              <button
                onClick={() => SetIsEditing(!isEditing)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  isEditing ? 'bg-green-400' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    isEditing ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
          </div>
      </div>
      <div>
        <p>Each unit represents 1 meter</p>
      </div>
      <div className="flex items-center gap-12 mb-6">
        <div className="flex gap-2 items-center">
          <label htmlFor="width">Store Width</label>
          <input value={width}  
          onChange={(e)=>{setWidth(Number(e.target.value))}}
          className=" border border-gray-500  p-2 rounded-md" type="number" placeholder="width"/>
        </div>
        
        <div className="flex items-center gap-2">
          <label   htmlFor="height">Store Height</label>
          <input value={height} 
          onChange={(e)=>{setHeight(Number(e.target.value))}}
          className=" border border-gray-500  p-2 rounded-md" type="number" placeholder="height"/>
        </div>
        <button
            onClick={generateMaze}
            className="bg-blue-500 text-white p-2 rounded my-6"
            >
            Generate Floor
            </button>
      </div>

  
      <div className="flex">
        <div className="flex-grow mr-4">
          <div 
          className={`flex items-center justify-center border-2 max-w-[40rem] max-h-[40rem] border-gray-300 h-96 mb-4 overflow-hidden`}
          onMouseEnter={()=>setIsMouseIn(true)}
          onMouseLeave={()=>setIsMouseIn(false)}
          onWheel={(e)=>handleZoom(e)}
          >
            <div style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s' }}>
    
            {maze && (
            <div
                className="grid "
                style={{ gridTemplateColumns: `repeat(${maze.width}, 2rem)`}}
            >
                {maze.tiles.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                      <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`border border-gray-300 cursor-pointer w-8 h-8 ${getTileColor(cell.type)}`}
                      onClick={() => handleTileClick(rowIndex, colIndex)}
                      onMouseEnter={(e)=>{SetZoomSquare(e.target)}}
                      />
                  ))
                )}
            </div>
            )}
          </div>
          </div>
          <div className="flex justify-between">
            <div>
              <button onClick={handleZoomIn} className="bg-gray-200 p-2 rounded-full mr-2"><Plus size={20} /></button>
              <button onClick={resetZoom} className="bg-gray-200 p-2 rounded-full mr-2"><RotateCcw size={20} /></button>
              <button  onClick={handleZoomOut} className="bg-gray-200 p-2 rounded-full"><Minus size={20} /></button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              onClick={saveFloorPlan}
            >
              <Save size={20} className="mr-2" />
              Save
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 w-32">
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"empty"} 
            className={`w-full bg-gray-100 text-gray-800 py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="empty"?"scale-[1.2]":"scale-[1]"}`}
            
            >
            Empty
          </button>
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"shelf"} 
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="shelf"?"scale-[1.2]":"scale-[1]"}`}
            
            >Shelf</button>
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"wall"} 
          className={`w-full bg-black text-white py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="wall"?"scale-[1.2]":"scale-[1]"}`}>Wall</button>
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"counter"} 
          className={`w-full bg-green-500 text-white py-2 px-4 rounded transition-transform duration-300 ${tileType=="counter"?"scale-[1.2]":"scale-[1]"}`}>Counter</button>
        </div>
      </div>
    </div> 
  );
};

export default FloorPlan;
