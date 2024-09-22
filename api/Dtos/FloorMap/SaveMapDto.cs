using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.FloorMap
{
    public class SaveMapDto
    {
        public int Width {get;set;}
        public int Height {get;set;}
        public List<List<TileDto>> Tiles { get; set; }
        
    }
}