using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.FloorMap
{
    public class TileDto
    {
        public string Type { get; set; }
        public List<string> Products { get; set; }
    }
}