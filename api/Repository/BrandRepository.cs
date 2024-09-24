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
    public class BrandRepository : IBrandRepository
    {
           private readonly ApplicationDBContext _context;

            public BrandRepository(ApplicationDBContext context)
        {
            _context = context;
        }

         public async Task<Brand> AddBrandAsync(Brand brand)
        {
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();
            return brand;
        }
    }
}