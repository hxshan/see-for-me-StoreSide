import React from "react";
import { useState } from "react";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const FloorPlan = () => { //TODO: make this come form db

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
 // const [tileSize, setTileSize] = useState(32);
  const [maze, setMaze] = useState(null);
  const [tileType,SetTileType] = useState("empty");
  const [isEditing,SetIsEditing] = useState(false);

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
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Create Floor Plan</h1>
      <div className="my-4">
        <p>Each Square represents a 0.5 x 0.5 meter tile <b>Eg: A room of width 10m x 10m would be 20x20 </b></p>
      </div>
       <div className="flex flex-col mb-4">
          <label htmlFor="tileType">Tile Type</label>
          <select 
          name="tileType" 
          value={tileType} 
          onChange={(e)=>{SetTileType(e.target.value)}}>
            <option value="empty">Empty</option>
            <option value="wall">Wall</option>
            <option value="shelf">Shelf</option>
            <option value="counter">Counter</option>
          </select>
      </div>
      <div className="flex flex-col mb-4">
      <button
            onClick={saveFloorPlan}
            className="bg-blue-500 text-white px-2 py-1 rounded my-6"
            >
            Save
            </button>
      </div>
      <div className="flex flex-col mb-4">
          <label htmlFor="tileType">Layout Edit Mode</label>
          <input type="checkbox" name="isEditing" id="isEditing" onClick={(e)=>{SetIsEditing(e.target.checked)}}/>
      </div>
      <div className="mb-4 flex">
        <div className="flex flex-col">
          <label htmlFor="width">Floor Width</label>
          <input
            name="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border p-1 mr-2"
            placeholder="Width"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="width">Floor Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border p-1 mr-2"
            placeholder="Height"
          />
        </div>
        <div className="flex flex-col">
            <button
            onClick={generateMaze}
            className="bg-blue-500 text-white px-2 py-1 rounded my-6"
            >
            Generate Floor
            </button>

        </div>
        </div>
        <div className="mb-4 flex">
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
                      />
                  ))
                )}
            </div>
            )}
      </div>
    </div>
  );
};

export default FloorPlan;
