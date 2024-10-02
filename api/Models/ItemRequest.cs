using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ItemRequest
    {   
        public int Id { get; set; } 
        public String UserId { get; set; }  
        public List<ItemRequestDetail> Items { get; set; }

        public ItemRequest()
        {
            Items = new List<ItemRequestDetail>();  // Initialize the Items list
        }
    }
}