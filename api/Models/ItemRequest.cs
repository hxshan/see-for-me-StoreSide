using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ItemRequest
    {
        public int Id {get;set;}
        public string UserId {get;set;}
        public List<Product>? Items {get;set;}
        
    }
}