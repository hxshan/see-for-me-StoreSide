using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BrandDtos;
using api.Dtos.ProductTypeDtos;
using api.Models;

namespace api.Dtos.ProductDtos
{
    public class GetProductsDto
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public GetBrandDto? Brand { get; set; }
        public GetTypeDto? Type { get; set; }
        public string? UnitWeight { get; set; }
        public decimal? Unitprice { get; set; }
        public int Quantity { get; set; }
    }
}