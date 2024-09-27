using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductTypeDtos;
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
        public static GetTypeDto MapToGetType(this ProductType type)
        {
            if (type == null)
                throw new ArgumentNullException(nameof(type));

            var productTypeDto = new GetTypeDto
            {
                Id=type.Id,
                Name = type.Name
            };

            return productTypeDto;
        }
    }
}