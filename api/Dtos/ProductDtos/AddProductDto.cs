using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ProductDtos
{
    public class AddProductDto
    {

   
    public string? ProductName { get; set; }

    public int BrandId { get; set; }

    public int TypeId { get; set; }

    public string? UnitWeight { get; set; }

    public decimal? Unitprice { get; set; }

    public int Quantity { get; set; }
    }
}