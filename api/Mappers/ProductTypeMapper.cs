using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductType;
using api.Models;

namespace api.Mappers
{
    public static class ProductTypeMapper
    {
        public static ProductType MapToType(this AddTypeDto typeDto)
        {
            if (typeDto == null)
                throw new ArgumentNullException(nameof(typeDto));

            var productType = new ProductType
            {
                Name = typeDto.Name
            };

            return productType;
        }
    }
}