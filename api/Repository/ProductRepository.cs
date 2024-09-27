using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.ProductDtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _context;
        public ProductRepository(ApplicationDBContext context)
        {
            _context= context;
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<GetProductsDto>> GetProductsAsync()
        {
            List<GetProductsDto> productDtos = new List<GetProductsDto>();
            var products = await _context.Products.Include(x=>x.Brand).Include(x => x.Type).ToListAsync();

            foreach(var prod in products){
                productDtos.Add(ProductMapper.MapToGetProdDto(prod));
            }
            return productDtos;

        }
    }
}