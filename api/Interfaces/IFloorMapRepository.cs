using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.FloorMapDtos;
using api.Dtos.ProductDtos;
using api.Models;

namespace api.Interfaces
{
    public interface IFloorMapRepository
    {
        Task<FloorMap> AddMapAsync(FloorMap floorMap);
        Task<List<FloorMap>> GetMapsAsync();
        Task<FloorMap> GetMapByIdAsync(int id);
        Task<GetFloorMapDto> GetMapByIdStoreAsync(int id);
        Task<List<Tile>> GetTilesByMapIdAsync(int id);
        Task<FloorMap> DeleteMapAsync(FloorMap map);
        Task<FloorMap> DeleteTileByMapIdAsync(int id);

        Task<List<Tile>> UpdateTileByMapIdAsync(int id,EditMapDto editMapDto);
        Task<Tile> UpdateShelfAsync(int id,ShelfProdDto shelfProdDto);
        
    }
}