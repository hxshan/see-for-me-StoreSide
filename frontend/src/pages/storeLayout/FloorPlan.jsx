import React from "react";
import { useState,useRef } from "react";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Save, Plus, Minus, RotateCcw} from 'lucide-react';

const FloorPlan = () => { //TODO: make this come form db

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
 // const [tileSize, setTileSize] = useState(32);
  const [maze, setMaze] = useState(null);
  const [tileType,SetTileType] = useState("empty");
  const [isDragging, setIsDragging] = useState(false);

  const [isEditing,SetIsEditing] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMouseIn,setIsMouseIn] = useState(false);
  const gridRef = useRef(null);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%'); // Default center zoom



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
  }

  const generateMaze = () => {
    const newMaze = {
      width: width,
      height: height,
      tiles: Array(height)
        .fill()
        .map(() => Array(width).fill({type:"empty",products:[]})),
      products:[],
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
  const handleMouseMove = (e) => {
    // Get the bounding box of the grid
    const gridRect = gridRef.current.getBoundingClientRect();
    // Calculate the mouse position relative to the grid
    const mouseX = e.clientX - gridRect.left;
    const mouseY = e.clientY - gridRect.top;

    // Convert mouse position to percentage of the grid size for transform-origin
    const percentX = (mouseX / gridRect.width) * 100;
    const percentY = (mouseY / gridRect.height) * 100;

    // Set transform origin to the square under the mouse
    setTransformOrigin(`${percentX}% ${percentY}%`);
  };

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


  const handleMouseEnter = (row, col) => {
    if (isDragging) {
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
  };

  const handleMouseUp = () => {
    setIsDragging(false);
 
  };
  const handleMouseDown = () => {
    setIsDragging(true);
  };

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
          onMouseMove={(e)=>handleMouseMove(e)}
          >
            <div ref={gridRef} 
            style={{ transform: `scale(${zoomLevel})`, 
             transformOrigin: transformOrigin,
             transition: 'transform 0.3s' }}>
    
            {maze && (
            <div
                className="grid "
                style={{ gridTemplateColumns: `repeat(${maze.width}, 2rem)`}}
                onMouseUp={handleMouseUp}
            >
                {maze.tiles.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    cell.type == "shelfUp"?
                    <div
                    key={`${rowIndex}-${colIndex}`}
                    className="border border-gray-300 cursor-pointer w-8 h-8 flex-col"
                    onClick={() => handleTileClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="h-1/2 bg-white"></div>
                    <div className="h-1/2 bg-blue-500"></div>
                  </div>
                  :cell.type == "shelfDown"?
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="border border-gray-300 cursor-pointer w-8 h-8 flex-col"  
                    onClick={() => handleTileClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="h-1/2 bg-blue-500"/>
                    <div className="h-1/2 bg-white"/>
                  </div>
                  :cell.type == "shelfRight"?
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="border border-gray-300 cursor-pointer w-8 h-8 flex"
                    onClick={() => handleTileClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="w-1/2 bg-blue-500"/>
                    <div className="w-1/2 bg-white"/>
                  </div>
                  :cell.type == "shelfLeft"?
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="border border-gray-300 cursor-pointer w-8 h-8 flex"
                    onClick={() => handleTileClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="w-1/2 bg-white"></div>
                    <div className="w-1/2 bg-blue-500"></div>
                  </div>:
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`border border-gray-300 cursor-pointer w-8 h-8 ${getTileColor(
                      cell.type
                    )}`}
                    onClick={() => handleTileClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseDown={handleMouseDown}
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
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"shelfUp"} 
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="shelfUp"?"scale-[1.2]":"scale-[1]"}`}
            >Upward Shelf</button>
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"shelfDown"} 
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="shelfDown"?"scale-[1.2]":"scale-[1]"}`}
            >Downward Shelf</button>
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"shelfRight"} 
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="shelfRight"?"scale-[1.2]":"scale-[1]"}`}
            >Right Shelf</button>
          <button  onClick={(e)=>SetTileType(e.target.value)} value={"shelfLeft"} 
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 transition-transform duration-300 ${tileType=="shelfLeft"?"scale-[1.2]":"scale-[1]"}`}
            >Left Shelf</button>
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
