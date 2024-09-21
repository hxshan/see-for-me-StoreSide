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

    public string? Brand { get; set; }

    public string? Type { get; set; }

    public string? UnitWeight { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? Unitprice { get; set; }
    public int Quantity { get; set; }

  }
}