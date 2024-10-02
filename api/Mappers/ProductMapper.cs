using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ProductDtos;
using api.Models;

namespace api.Mappers
{
    public static class ProductMapper
    {

        public static Product MapToProduct(this AddProductDto prodDto)
        {
              if (prodDto == null)
                throw new ArgumentNullException(nameof(prodDto));

                return new Product{
                    ProductName=prodDto.ProductName, 
                    BrandId=prodDto.BrandId,
                    TypeId=prodDto.TypeId,
                    UnitWeight=prodDto.UnitWeight,
                    Unitprice=prodDto.Unitprice,
                    Quantity=prodDto.Quantity,             
                    Unit = prodDto.Unit
                };

        }

        public static GetProductsDto MapToGetProdDto(this Product prod)
        {
              if (prod == null)
                throw new ArgumentNullException(nameof(prod));

                return new GetProductsDto{
                    Id=prod.Id,
                    ProductName=prod.ProductName,
                    Brand = BrandMapper.MapToGetBrand(prod.Brand),
                    Type = ProductTypeMapper.MapToGetType(prod.Type),
                    UnitWeight = prod.UnitWeight,
                    Unitprice=prod.Unitprice,
                    Quantity = prod.Quantity
                };

        }
    }
}