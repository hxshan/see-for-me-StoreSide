using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  public class Product
  {

    public int Id { get; set; }
    //public int ProductId { get; set; }
    public string? ProductName { get; set; }

    //public string? Brand { get; set; }
    public int BrandId { get; set; }
    public Brand? Brand { get; set; }  

    public int TypeId { get; set; }
    public ProductType? Type { get; set; }  

    //public string? Type { get; set; }

    public string? UnitWeight { get; set; }
    public string? Unit {get;set;}

    [Column(TypeName = "decimal(18,2)")]
    public decimal? Unitprice { get; set; }
    public int Quantity { get; set; }
    public ICollection<Tile>? Shelves{get;set;}
     public ICollection<ItemRequest>? ItemRequests { get; set; }

  }
}