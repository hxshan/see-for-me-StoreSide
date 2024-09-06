import React from "react";
import { useState } from "react";

const FloorPlan = () => {
  const tileTypes = ["empty", "wall", "start", "end"]; //TODO: make this come form db

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tileSize, setTileSize] = useState(32);
  const [maze, setMaze] = useState(null);

  const generateMaze = () => {
    const newMaze = {
      width: width,
      height: height,
      tiles: Array(height)
        .fill()
        .map(() => Array(width).fill("empty")),
    };
    setMaze(newMaze);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Create Floor Plan</h1>
      <div className="my-4">
        <p>Each Square represents a 0.5 x 0.5 meter tile <b>Eg: A room of width 10m x 10m would be 20x20 </b></p>
      </div>
      <div className="flex flex-col mb-4">
          <label htmlFor="width">Tile Size ( In pixels ) </label>
          <input
            name="width"
            type="number"
            value={tileSize}
            onChange={(e) => setTileSize(Number(e.target.value))}
            className="border p-1 mr-2"
            placeholder="Tile Size"
          />
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
                    className={`border border-gray-300 cursor-pointer `}
                    style={{width:`${tileSize}px`,height:`${tileSize}px`}}
                    //onClick={() => handleTileClick(rowIndex, colIndex)}
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
