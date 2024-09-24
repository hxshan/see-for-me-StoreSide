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
        Task UpdateTypeAsync(ProductType productType);
        Task<List<ProductType>> GetAllTypesAsync();
        Task<ProductType> GetTypeByIdAsync(int id);
        Task DeleteTypeAsync(int id);



    }
}