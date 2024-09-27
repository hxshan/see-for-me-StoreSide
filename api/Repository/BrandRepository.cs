using System;
using System.Collections.Generic;
using System.Formats.Tar;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.BrandDtos;
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

        public async Task<Brand> GetBrandByIdAsync(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            return brand;
        }

        public async Task<Brand> UpdateBrandAsync(UpdateBrandDto updateBrandDto)
        {
             var brand = await _context.Brands
                              .Include(b => b.ProductTypes)
                              .FirstOrDefaultAsync(b => b.Id == updateBrandDto.Id);
            
            if(brand == null){
                throw new Exception("Brand not found");
            }
            if(!string.IsNullOrEmpty(updateBrandDto.Name)){
                brand.Name = updateBrandDto.Name;
            }

            if(updateBrandDto.ProductTypes != null && updateBrandDto.ProductTypes.Count > 0){

               var newProductTypeIds = updateBrandDto.ProductTypes.Select(pt => pt.Id).ToList();//product types is a dto


               var newTypeList = await _context.ProductTypes.Where(p => newProductTypeIds.Contains(p.Id)).ToListAsync();
               
               var removedType = await _context.ProductTypes.Where(p => !newProductTypeIds.Contains(p.Id)).ToListAsync();

                if(brand.ProductTypes.Count > 0){
                    foreach(var type in removedType){
                        brand.ProductTypes.Remove(type);
                    }
                }
                foreach (var type in newTypeList){
                    brand.ProductTypes.Add(type);
                }
            }else{
                brand.ProductTypes.Clear();
            }

             await _context.SaveChangesAsync();
             return brand;
        }
    }
}