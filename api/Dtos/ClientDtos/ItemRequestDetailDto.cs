using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.ClientDtos
{
    public class ItemRequestDetailDto
    {
         public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}