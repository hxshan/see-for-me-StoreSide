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
            _context = context;
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            try
            {

                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return product;
            }
            catch (DbUpdateException ex)
            {
                // Log the full stack trace and error for better debugging
                Console.WriteLine($"DbUpdateException: {ex.InnerException?.Message ?? ex.Message}");
                Console.WriteLine(ex.StackTrace);

                // Optionally throw a more user-friendly error
                throw new Exception("An error occurred while saving the product. Please check the details and try again.");
            }
            catch (Exception ex)
            {
                // Log any other unhandled exceptions
                Console.WriteLine($"Exception: {ex.Message}");
                throw new Exception("An unexpected error occurred.");
            }
        }

        public async Task<List<GetProductsDto>> GetProductsAsync()
        {
            List<GetProductsDto> productDtos = new List<GetProductsDto>();
            var products = await _context.Products.Include(x => x.Brand).Include(x => x.Type).ToListAsync();

            foreach (var prod in products)
            {
                productDtos.Add(ProductMapper.MapToGetProdDto(prod));
            }
            return productDtos;

        }
    }
}