using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Brand
    {
     public int Id { get; set; }

     public string? Name { get; set; }

     public List<ProductType>? ProductTypes {get;set;}
     public ICollection<Product>? Products {get ;set;}

    }
}