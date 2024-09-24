using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Brand;
namespace api.Mappers;
using api.Models;

    public static class BrandMapper
    {
         public static Brand MapToBrand(this AddBrandDto brandDto)
        {
            if (brandDto == null)
                throw new ArgumentNullException(nameof(brandDto));

            var brand = new Brand
            {
                Name = brandDto.Name
            };

            return brand;
        }
    }
