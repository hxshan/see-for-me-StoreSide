using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductDtos;
using api.Models;

namespace api.Interfaces
{
    public interface IProductRepository
    {
        Task<List<GetProductsDto>> GetProductsAsync();
        Task<Product> AddProductAsync(Product product);
    }
}