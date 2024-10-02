using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductDtos;
using api.Models;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace api.Dtos.ClientDtos
{
    public class AddOrderDto
    {
        public String userId {get;set;}
        public List<AddProductDto> Items {get;set;}
    }
}