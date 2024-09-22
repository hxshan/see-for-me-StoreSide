using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFloorMapRepository
    {
        Task<FloorMap> AddMapAsync(FloorMap floorMap);
        Task<List<FloorMap>> GetMapsAsync();
        Task<FloorMap> GetMapByIdAsync(int id);
        Task<FloorMap> DeleteMapAsync(FloorMap map);
        Task<FloorMap> DeleteTileByMapIdAsync(int id);
        
    }
}