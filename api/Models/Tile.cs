using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Tile
    {
        
        public int Id { get; set; }

        public int MapId { get; set; }
        public FloorMap? Map { get; set; }

        public int X { get; set; }
        public int Y { get; set; }
        public TileType Type {get;set;}
    }
}