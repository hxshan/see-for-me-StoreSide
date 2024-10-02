import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Save, Plus, Minus, RotateCcw, Braces } from "lucide-react";
import { useParams } from "react-router-dom";
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
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


const EditFloor = () => {
  //other
  const { id } = useParams();
  const [isEditing, SetIsEditing] = useState(false);
  const navigate = useNavigate();

  //floor plan related
  const [maze, setMaze] = useState(null);
  const [tileType, SetTileType] = useState("empty");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTile,setSeletedTile] = useState(null)
  ;
  const [selectedProd,setSelectedProd] = useState(" ");
  const [shelfProds,setshelfProds] = useState([]);

  const [product,SetProducts] = useState([]);

  //Zoooming in states
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const gridRef = useRef(null);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const [offsetX, setOffsetX] = useState(0); // X offset for translation
  const [offsetY, setOffsetY] = useState(0);
 // Default center zoom

  useEffect(() => {
    getMazeData();
    getProducts();
  }, []);


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

const handleZoom = (e) =>{
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

}

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  const postApI = async (data) => {
    try {
      console.log(data);
      const res = await axios.put(`floor/${id}`, { tiles: data });
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.warning(error?.response?.data);
      }
    }
  };

  const getMazeData = async () => {
    try {
      const res = await axios.get(`floor/${id}`);
      setMaze(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.warning(error?.response?.data);
      }
    }
  };

  const getProducts = async ()=>{
    try {
      const res = await axios.get(`Product`);
      SetProducts(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.warning(error?.response?.data);
      }
    }
  }

  const saveFloorPlan = async () => {
    if (!maze) {
      toast.warning("Genrate a Floor plan first");
      return;
    }
    await postApI(maze.tiles).then((res) => {
      if (res) {
        toast.success("Success");
        getMazeData();
      }
    });
  };

  const handleTileClick = (row, col,index) => {
    if (!maze) return;
    setSeletedTile(index)
    setshelfProds([]);
    console.log(maze.tiles[1])
    if (!isEditing) {
      console.log("not editing");
      return;
    }
    setMaze((prevMaze) => {
      const newMaze = {
        ...prevMaze,
        tiles: prevMaze.tiles.map((tile) =>
          tile.x == row && tile.y == col
            ? {
                ...tile,
                type: tileType,
                products:[]
              }
            : tile
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
          tiles: prevMaze.tiles.map((tile) =>
            tile.x == row && tile.y == col
              ? {
                  ...tile,
                  type: tileType,
                  products:[]
                }
              : tile
          ),
        };
        return newMaze;
      });
    }
  };

  const getTileColor = (type) => {
    switch (type) {
      case "wall":
        return "bg-gray-800";
      case "counter":
        return "bg-green-500";
      case "empty":
        return "bg-white";
      default:
        return "bg-white";
    }
  };

  const saveShelfData = async (id)=>{
    try {
      if(selectedProd == " "){
        toast.warning("Select an Item to assign")
        return;
      }
      const res = await axios.put(`floor/shelfitems/${id}`,{products:[selectedProd]});
      toast.success("Item have been Saved")
      getMazeData();
      console.log(res);
     // setshelfProds(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.warning(error?.response?.data);
      }
    }
  }
  const DeleteShelfItem = async (tileid,id)=>{
    try {
      console.log(id)
      await axios.delete(`floor/shelfitems/${tileid}?itemId=${id}`);
      toast.success("Item has been removed")
      getMazeData();
     // setshelfProds(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.warning(error?.response?.data);
      }
    }
  }

  const isShelf =(selectedTile)=>{
    if(selectedTile == null ) return false;
    let res =false;
    switch (maze.tiles[selectedTile].type) {
      case 'shelfUp':
      case 'shelfDown':
      case 'shelfLeft':
      case 'shelfRight':
        res= true;
        break;
      default:
        res = false;
        break;
    }  

    return res;
  }

  return (
   
      
    
    <div className="w-full mx-auto p-4 flex  justify-center items-start gap-10 mt-20">
   
       
      <div >
      <button
            onClick={() => navigate('/floorhome')}

            className={`flex items-center justify-evenly gap-2 px-4 py-2 rounded-md
             text-white font-semibold transition-all duration-200 bg-blue-500 
             hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4`}
          >Go Back</button>
      <h1 className="text-2xl font-bold mb-4">Edit Shelves</h1>
        <div className="border border-gray-500 w-[25rem] flex flex-col items-center p-4 rounded-md">
        {
          (selectedTile != null && isShelf(selectedTile))?
            (
              <div>
                  <div className="relative inline-block w-64">
                    <select
                      onChange={(e)=>{setSelectedProd(e.target.value)}}
                      defaultValue={selectedProd}
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option  value=" ">Select an Item</option>
                      {
                      product.map((prod)=>{
                        return(
                          <option key={prod.id} value={prod.id}>{prod.productName}</option>
                        )
                      })
                    }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                </div>
                  
                  <div className=" flex justify-between my-8">
                    <button
                      id={maze.tiles[selectedTile]?.id}
                      className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                      onClick={(e)=>{
                        saveShelfData(e.target.id)}}
                      >
                      <Plus size={20} className="mr-2" />
                      Add Item
                    </button>

                    
                  </div>
                <div>
                  <p className="font-semibold text-xl underline mb-4">
                    Assigned Products
                  </p>
                  {
                  maze.tiles[selectedTile].products.length > 0 ? maze.tiles[selectedTile].products.map((prod,index)=>{
                      return(
                        <div key={index} className=" flex flex-col items-end px-4 py-2 border border-gray-500 rounded-md mb-8">
                          <button
                            id={prod.id}
                            onClick={(e)=>DeleteShelfItem(maze.tiles[selectedTile]?.id,e.currentTarget.id)}
                            className={`w-6 h-6
                              bg-red-200 hover:bg-red-300 text-red-600
                              rounded-full flex items-center justify-center
                              transition-colors duration-200 ease-in-out
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                            `}
                            aria-label="Close"
                          >
                          <X size={20} />
                        </button>
                          <p className="w-full text-xl text-left font-semibold ">{prod.productName}</p>
                                            
                        </div>
                      )
                    }):(
                      <><p>No Products assigned yet</p></>
                    )
                  }

                </div>
              </div>
            )
          :<p>
            Please Select a Shelf to assign products
          </p>
        }
       </div>
      </div>
      <div>
        <div className="flex justify-between  items-center mb-4">
          <h1 className="text-2xl font-bold">Edit Tiles</h1>

          <div className="flex items-center">
            <span className="mr-2">Edit Mode</span>
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
                SetIsEditing(!isEditing)}}
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
        <div className="flex">
          <div className="flex-grow mr-4">
            <div
              className={`flex items-center justify-center border-2 max-w-[100%] max-h-[40rem] border-gray-300 h-[800px] mb-4 overflow-hidden p-32`}
              onMouseEnter={() => setIsMouseIn(true)}
              onMouseLeave={() => setIsMouseIn(false)}
              onWheel={(e) => handleZoom(e)}
              onMouseDown={(e) => handleMouseMove(e)}
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
                    style={{
                      gridTemplateColumns: `repeat(${maze.width}, 2rem)`,
                    }}
                    onMouseUp={()=>setIsDragging(false)}
                  >
                    {maze.tiles.map((cell,index) =>
                      cell.type == "shelfUp" ? (
                        <div
                          key={`${cell.x}-${cell.y}`}
                          id={cell.id}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex-col"
                          onClick={() => handleTileClick(cell.x, cell.y,index)}
                          onMouseDown={()=>setIsDragging(true)}
                          onMouseEnter={() => handleMouseEnter(cell.x, cell.y)}
                        >
                          <div className="h-1/2 bg-white"></div>
                          <div className="h-1/2 bg-blue-500"></div>
                        </div>
                      ) : cell.type == "shelfDown" ? (
                        <div
                          id={cell.id}
                          key={`${cell.x}-${cell.y}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex-col"
                          onClick={() => handleTileClick(cell.x, cell.y,index)}
                          onMouseDown={()=>setIsDragging(true)}
                          onMouseEnter={() => handleMouseEnter(cell.x, cell.y)}
                        >
                          <div className="h-1/2 bg-blue-500" />
                          <div className="h-1/2 bg-white" />
                        </div>
                      ) : cell.type == "shelfRight" ? (
                        <div
                          id={cell.id}
                          key={`${cell.x}-${cell.y}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex"
                          onClick={() => handleTileClick(cell.x, cell.y,index)}
                          onMouseDown={()=>setIsDragging(true)}
                          onMouseEnter={() => handleMouseEnter(cell.x, cell.y)}
                        >
                          <div className="w-1/2 bg-blue-500" />
                          <div className="w-1/2 bg-white" />
                        </div>
                      ) : cell.type == "shelfLeft" ? (
                        <div
                          id={cell.id}
                          key={`${cell.x}-${cell.y}`}
                          className="border border-gray-300 cursor-pointer w-8 h-8 flex"
                          onClick={() => handleTileClick(cell.x, cell.y,index)}
                          onMouseDown={()=>setIsDragging(true)}
                          onMouseEnter={() => handleMouseEnter(cell.x, cell.y)}
                        >
                          <div className="w-1/2 bg-white"></div>
                          <div className="w-1/2 bg-blue-500"></div>
                        </div>
                      ) : (
                        <div
                          id={cell.id}
                          key={`${cell.x}-${cell.y}`}
                          className={`border border-gray-300 cursor-pointer w-8 h-8 ${getTileColor(
                            cell.type
                          )}`}
                          onClick={() => handleTileClick(cell.x, cell.y,index)}
                          onMouseDown={()=>setIsDragging(true)}
                          onMouseEnter={() => handleMouseEnter(cell.x, cell.y)}
                        />
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
                Save Floor Plan
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-fit ml-8">
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
    </div>
   
  );
};

export default EditFloor;
