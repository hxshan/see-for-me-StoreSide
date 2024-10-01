using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.FloorMapDtos
{
    public class GetFloorMapDto
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }=string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        public List<GetTileDto> Tiles {get;set;}
    }
}