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

        public async Task<ProductType> GetTypeAsync(int id)
        {
            var type = await _context.ProductTypes.Include(p=>p.Brands).FirstOrDefaultAsync(p =>p.Id == id);
            return type;
        }
    }
}