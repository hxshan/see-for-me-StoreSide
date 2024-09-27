using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductTypeDtos;
using api.Models;

namespace api.Dtos.BrandDtos
{
    public class UpdateBrandDto
    {
        public string? Name { get; set; }
        public List<int>? ProductTypes { get; set; }
    }
}