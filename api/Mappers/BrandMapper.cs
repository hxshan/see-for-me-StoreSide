using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BrandDtos;
using api.Models;

namespace api.Mappers
{
    public static class BrandMapper
    {
        
        public static Brand MapToBrandFromSave(this SaveBrandDto brandDto)
        {
            if (brandDto == null)
                throw new ArgumentNullException(nameof(brandDto));

            var brand = new Brand
            {
               Name=brandDto.Name
            };

            return brand;
        }
        public static Brand MapToBrandFromUpdate(this UpdateBrandDto brandDto)
        {
            if (brandDto == null)
                throw new ArgumentNullException(nameof(brandDto));

            var brand = new Brand
            {
               Name=brandDto.Name
               
            };

            return brand;
        }

         public static GetBrandDto MapToGetBrand(this Brand brand)
        {
            if (brand == null)
                throw new ArgumentNullException(nameof(brand));

            var brandDto = new GetBrandDto
            {
               Id=brand.Id,
               Name=brand.Name,
            };

            return brandDto;
        }
        


    }
}