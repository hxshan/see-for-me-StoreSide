using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ProductTypeDtos
{
    public class GetTypeDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }
}