using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.FloorMapDtos
{
    public class EditMapDto
    {
        public List<EditTileDto>? Tiles { get; set; }

    }
}