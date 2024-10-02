using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ClientDtos
{
    public class ItemRequestDto
    {
         public string UserId { get; set; } // UserId for the item request
        public List<ItemRequestDetailDto> Items { get; set; }
    }
}