using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ItemRequestDetail
    {
        public int Id { get; set; } 
         public int ProductId { get; set; }  
         public Product Product { get; set; } 
        public int Quantity { get; set; } 

        public int ItemRequestId { get; set; }  // Foreign key to the ItemRequest
        public ItemRequest ItemRequest { get; set; }
    }
}