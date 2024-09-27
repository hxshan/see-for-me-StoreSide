using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IProductTypeRepository
    {
          Task<ProductType> AddTypeAsync(ProductType productType);
          Task<ProductType> GetTypeAsync(int id);

    }
}