using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;


namespace api.Repository
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        private readonly ApplicationDBContext _context;

        public ProductTypeRepository(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<ProductType> AddTypeAsync(ProductType productType)
        {
            _context.ProductTypes.Add(productType);
            await _context.SaveChangesAsync();
            return productType;
        }

        public async Task<List<ProductType>> GetAllTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        public async Task<ProductType> GetTypeByIdAsync(int id)
        {
            return await _context.ProductTypes.FindAsync(id);
        }

        public async Task UpdateTypeAsync(ProductType productType)
        {
            _context.ProductTypes.Update(productType);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTypeAsync(int id)
        {
            var productType = await _context.ProductTypes.FindAsync(id);
            if (productType != null)
            {
                _context.ProductTypes.Remove(productType);
                await _context.SaveChangesAsync();
            }
        }
    }
}