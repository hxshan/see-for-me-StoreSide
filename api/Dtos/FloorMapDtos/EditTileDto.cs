using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductDtos;

namespace api.Dtos.FloorMapDtos
{
    public class EditTileDto
    {
        public int Id { get; set; }
        public int MapId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public string Type { get; set; }
    }
}