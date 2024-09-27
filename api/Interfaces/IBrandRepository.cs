using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BrandDtos;
using api.Models;

namespace api.Interfaces
{
    public interface IBrandRepository
    {
         Task<Brand> AddBrandAsync(Brand brand);
         Task<Brand> GetBrandByIdAsync(int id);

         Task<Brand> UpdateBrandAsync(UpdateBrandDto updatedBrand);

         
    }
}