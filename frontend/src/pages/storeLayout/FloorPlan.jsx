import React from "react";
import { useState, useRef } from "react";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Save, Plus, Minus, RotateCcw } from "lucide-react";
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Square,
  BrickWall,
  ShoppingCart
} from "lucide-react";

import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const FloorPlan = () => {
  //TODO: make this come form db
  const navigate = useNavigate();

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [name, setName] = useState(" ");

  // const [tileSize, setTileSize] = useState(32);
  const [maze, setMaze] = useState(null);
  const [tileType, SetTileType] = useState("empty");
  const [isDragging, setIsDragging] = useState(false);

  const [isEditing, SetIsEditing] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const gridRef = useRef(null);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const [offsetX, setOffsetX] = useState(0); // X offset for translation
  const [offsetY, setOffsetY] = useState(0);

  const handleZoom = (e) => {
    if (isMouseIn) {
      e.preventDefault();

      // Get the bounding box of the grid
      const gridRect = gridRef.current.getBoundingClientRect();
      const mouseX = e.clientX - gridRect.left;
      const mouseY = e.clientY - gridRect.top;

      // Determine whether zooming in or out
      const zoomIn = e.deltaY < 0;

      // Calculate the new zoom level
      const newZoomLevel = zoomIn
        ? Math.min(zoomLevel + 0.1, 3) // Max zoom level of 3
        : Math.max(zoomLevel - 0.1, 0.5); // Min zoom level of 0.5

      // Calculate how much to offset the grid
      const zoomFactor = newZoomLevel / zoomLevel;
      const newOffsetX = (mouseX - gridRect.width / 2) * (zoomFactor - 1);
      const newOffsetY = (mouseY - gridRect.height / 2) * (zoomFactor - 1);

      // Update the offsets
      setOffsetX((prevOffsetX) => prevOffsetX - newOffsetX);
      setOffsetY((prevOffsetY) => prevOffsetY - newOffsetY);

      // Update the zoom level
      setZoomLevel(newZoomLevel);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setOffsetX(0);
    setOffsetY(0);
    setTransformOrigin("50% 50%");
  };

  const generateMaze = () => {
    if (width > 15 || height > 15) {
      Swal.fire({
        title: "Size Limit",
        text: "Height and Width are currently limited to 15m.",
        icon: "error"
      });
      return;
    }
    const newMaze = {
      name: name,
      width: width,
      height: height,
      tiles: Array(height)
        .fill()
        .map(() => Array(width).fill({ type: "empty", products: [] })),
      products: [],
    };
    setMaze(newMaze);
  };

  const postApI = async (data) => {
    try {
      const res = await axios.post("floor/addfloor", data);
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.warning(error?.response?.data);
      }
    }
  };

  const saveFloorPlan = async () => {
    if (!maze) {
      toast.warning("Generate a Floor plan first");
      3;
      return;
    }
    await postApI(maze).then((res) => {
      if (res) {
        Swal.fire({
          title: "Floor Saved",
          text: "Floor Plan is saved Succesfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/floorhome')
          }
        });
      }
    });
  };
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    // Get the bounding box of the grid
    const gridRect = gridRef.current.getBoundingClientRect();
    // Calculate the mouse position relative to the grid
    const mouseX = e.clientX - gridRect.left;
    const mouseY = e.clientY - gridRect.top;

    // Convert mouse position to percentage of the grid size for transform-origin
    const percentX = (mouseX / gridRect.width) * 100;
    const percentY = (mouseY / gridRect.height) * 100;

    setTransformOrigin(`${percentX}% ${percentY}%`);
  };

  const handleTileClick = (row, col) => {
    if (!maze) return;
    if (!isEditing) {  
      return;
    }
    setMaze((prevMaze) => {
      const newMaze = {
        ...prevMaze,
        tiles: prevMaze.tiles.map((r, rowIndex) =>
          rowIndex === row
            ? r.map((tile, colIndex) =>
                colIndex === col
                  ? {
                      ...tile,
                      type: tileType,
                    }
                  : tile
              )
            : r
        ),
      };
      return newMaze;
    });
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging && isEditing) {
      setMaze((prevMaze) => {
        const newMaze = {
          ...prevMaze,
          tiles: prevMaze.tiles.map((r, rowIndex) =>
            rowIndex === row
              ? r.map((tile, colIndex) =>
                  colIndex === col
                    ? {
                        ...tile,
                        type: tileType,
                      }
                    : tile
                )
              : r
          ),
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
      case "wall":
        return "bg-gray-800";
      case "counter":
        return "bg-green-500";
      case "empty":
        return "bg-white";
      case "shelf":
        return "bg-blue-300";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="w-[65%] mx-auto p-4">
      <div className="flex justify-between items-center mb-10">
        <button
            onClick={() => navigate('/floorhome')}

            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-blue-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <ArrowLeft size={24} />
            <span className="w-full text-nowrap">Go back</span>
          </button>
        <h1 className="text-4xl font-bold">Create Floor Plan</h1>
        <div className="flex items-center">
          <span className="mr-2 font-semibold">Edit Mode</span>
          <button
            onClick={() =>{
              if(isEditing){
                Swal.fire({
                  title: "Edit Mode",
                  text: "Edit mode has been turned off",
                  icon: "success"
                });
              }else{
                Swal.fire({
                  title: "Edit Mode",
                  text: "Edit mode has been turned On",
                  icon: "success"
                });
              }
              SetIsEditing(!isEditing)}
            }
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
              isEditing ? "bg-green-400" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                isEditing ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>
      <div>
        <p className="font-bold">Each Sqaure has dimesions of 1 meter</p>
      </div>
      <div>
        <div className="flex flex-col gap-2 items-start mt-2">
          <label className="font-semibold" htmlFor="name">Layout Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className=" border border-gray-500  p-2 rounded-md w-full"
            type="text"
            placeholder="Layout Name"
          />
        </div>
      </div>
      <div className="flex flex-row items-end gap-12 mb-6">
        <div className="flex flex-col gap-2 items-start">
          <label className="font-semibold" htmlFor="width">Store Width</label>
          <input
            value={width}
            onChange={(e) => {
              setWidth(Number(e.target.value));
            }}
            className=" border border-gray-500  p-2 rounded-md"
            type="number"
            placeholder="width"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <label className="font-semibold" htmlFor="height">Store Height</label>
          <input
            value={height}
            onChange={(e) => {
              setHeight(Number(e.target.value));
            }}
            className=" border border-gray-500  p-2 rounded-md"
            type="number"
            placeholder="height"
          />
        </div>
        <button
          onClick={generateMaze}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Generate Floor
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <div
            className={`flex items-center justify-center border-2 w-[90%] max-h-[90%] h-[600px] border-gray-300  mb-4 overflow-hidden`}
            onMouseEnter={() => setIsMouseIn(true)}
            onMouseLeave={() => setIsMouseIn(false)}
            onWheel={(e) => handleZoom(e)}
            onMouseMove={(e) => handleMouseMove(e)}
          >
            <div
              ref={gridRef}
              style={{
                transform: `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)`,
                transformOrigin: transformOrigin,
                transition: "transform 0.3s",
              }}
            >
              {maze && (
                <div
                  className="grid "
                  style={{ gridTemplateColumns: `repeat(${maze.width}, 2rem)` }}
                  onMouseUp={handleMouseUp}
                >
                  {maze.tiles.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                      cell.type == "shelfUp" ? (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex-col"
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          onMouseEnter={() =>
                            handleMouseEnter(rowIndex, colIndex)
                          }
                          onMouseDown={handleMouseDown}
                        >
                          <div className="h-1/2 bg-white"></div>
                          <div className="h-1/2 bg-blue-500"></div>
                        </div>
                      ) : cell.type == "shelfDown" ? (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex-col"
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          onMouseEnter={() =>
                            handleMouseEnter(rowIndex, colIndex)
                          }
                          onMouseDown={handleMouseDown}
                        >
                          <div className="h-1/2 bg-blue-500" />
                          <div className="h-1/2 bg-white" />
                        </div>
                      ) : cell.type == "shelfRight" ? (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex"
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          onMouseEnter={() =>
                            handleMouseEnter(rowIndex, colIndex)
                          }
                          onMouseDown={handleMouseDown}
                        >
                          <div className="w-1/2 bg-blue-500" />
                          <div className="w-1/2 bg-white" />
                        </div>
                      ) : cell.type == "shelfLeft" ? (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex"
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          onMouseEnter={() =>
                            handleMouseEnter(rowIndex, colIndex)
                          }
                          onMouseDown={handleMouseDown}
                        >
                          <div className="w-1/2 bg-white"></div>
                          <div className="w-1/2 bg-blue-500"></div>
                        </div>
                      ) : (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`border border-gray-300 cursor-pointer w-8 h-8 ${getTileColor(
                            cell.type
                          )}`}
                          onClick={() => handleTileClick(rowIndex, colIndex)}
                          onMouseEnter={() =>
                            handleMouseEnter(rowIndex, colIndex)
                          }
                          onMouseDown={handleMouseDown}
                        />
                      )
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <button
                onClick={handleZoomIn}
                className="bg-gray-200 p-2 rounded-full mr-2"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={resetZoom}
                className="bg-gray-200 p-2 rounded-full mr-2"
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-gray-200 p-2 rounded-full"
              >
                <Minus size={20} />
              </button>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              onClick={saveFloorPlan}
            >
              <Save size={20} className="mr-2" />
              Save
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-fit">
          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"empty"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-black font-semibold transition-all duration-200 bg-gray-200 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
               tileType == "empty" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <Square size={20} />
            <span>Empty </span>
          </button>


          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"shelfUp"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-blue-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
               tileType == "shelfUp" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <ArrowUp size={24} />
            <span>Upward Shelf </span>
          </button>

          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"shelfDown"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-blue-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
               tileType == "shelfDown" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <ArrowDown size={24} />
            <span className="w-full text-nowrap">Downward Shelf </span>
          </button>


          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"shelfRight"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-blue-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
               tileType == "shelfRight" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <ArrowRight size={24} />
            <span className="w-full text-nowrap">Right Shelf</span>
          </button>


          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"shelfLeft"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-blue-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
               tileType == "shelfLeft" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <ArrowLeft size={24} />
            <span className="w-full text-nowrap">Left Shelf</span>
          </button>


          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"wall"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-black 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
               tileType == "wall" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <BrickWall size={24} />
            <span className="w-full text-nowrap">Wall</span>
          </button>


          <button
            onClick={(e) => SetTileType(e.currentTarget.value)}
            value={"counter"}
            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-green-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
               tileType == "counter" ? "scale-[1.2]" : "scale-[1]"
             }`}
          >
            <ShoppingCart size={24} />
            <span className="w-full text-nowrap">Counter</span>
          </button>


        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
