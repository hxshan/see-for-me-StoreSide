using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.FloorMapDtos;
using api.Dtos.ProductDtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class FloorMapRepository : IFloorMapRepository
    {
        private readonly ApplicationDBContext _context;

        public FloorMapRepository(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<FloorMap> AddMapAsync(FloorMap map)
        {
            await _context.FloorMaps.AddAsync(map);
            await _context.SaveChangesAsync();
            return map;
        }

        public async Task<List<FloorMap>> GetMapsAsync()
        {
            var maps = await _context.FloorMaps.ToListAsync();
            return maps;
        }

        public async Task<FloorMap> GetMapByIdAsync(int id)
        {
            var map = await _context.FloorMaps
            .Include(x => x.Tiles).FirstOrDefaultAsync(x => x.Id == id);

            return map;
        }
        public async Task<GetFloorMapDto> GetFirstMapAsync()
        {
           var map = await _context.FloorMaps
           .Include(x => x.Tiles).ThenInclude(tile => tile.Products)
               .Select(floorMap => new GetFloorMapDto
               {
                   Id = floorMap.Id,
                   Name = floorMap.Name,
                   Width = floorMap.Width,
                   Height = floorMap.Height,
                   Tiles = floorMap.Tiles.Select(tile => new GetTileDto
                   {
                       Id = tile.Id,
                       X = tile.X,
                       Y = tile.Y,
                       Type = tile.Type.ToString(),  // Convert enum to string if needed
                       Products = tile.Products.Select(product => new ShelfItemDto
                       {
                           Id = product.Id,
                           ProductName = product.ProductName
                       }).ToList()
                   }).ToList()
               }).FirstOrDefaultAsync();

            return map;
        }

        public async Task<FloorMap> DeleteMapAsync(FloorMap map)
        {
            _context.FloorMaps.Remove(map);
            _context.SaveChanges();
            return map;
        }

        public Task<FloorMap> DeleteTileByMapIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Tile>> GetTilesByMapIdAsync(int mapId)
        {
            var tiles = await _context.Tiles.Where(t => t.MapId == mapId)
                .ToListAsync();

            return tiles;

        }

        public async Task<List<Tile>> UpdateTileByMapIdAsync(int id, EditMapDto editMapDto)
        {
            var existingTiles = await this.GetTilesByMapIdAsync(id);


            foreach (var editTile in editMapDto.Tiles)
            {
                var existingTile = existingTiles.FirstOrDefault(t => t.Id == editTile.Id);
                if (existingTile != null)
                {
                    // Update existing tile
                    existingTile.X = editTile.X;
                    existingTile.Y = editTile.Y;
                    existingTile.Type = (TileType)Enum.Parse(typeof(TileType), editTile.Type);

                    // Update products if applicable
                    //existingTile.Products = (TileType)Enum.Parse(typeof(TileType),  editTile.Products ) ?? new List<string>();
                }
            }
            await _context.SaveChangesAsync();
            return existingTiles;
        }

        public async Task<GetFloorMapDto> GetMapByIdStoreAsync(int id)
        {
            var map = await _context.FloorMaps
           .Include(x => x.Tiles).ThenInclude(tile => tile.Products)
           .Where(x => x.Id == id)
               .Select(floorMap => new GetFloorMapDto
               {
                   Id = floorMap.Id,
                   Name = floorMap.Name,
                   Width = floorMap.Width,
                   Height = floorMap.Height,
                   Tiles = floorMap.Tiles.Select(tile => new GetTileDto
                   {
                       Id = tile.Id,
                       X = tile.X,
                       Y = tile.Y,
                       Type = tile.Type.ToString(),  // Convert enum to string if needed
                       Products = tile.Products.Select(product => new ShelfItemDto
                       {
                           Id = product.Id,
                           ProductName = product.ProductName
                       }).ToList()
                   }).ToList()
               }).FirstOrDefaultAsync();

            return map;
        }

        public async Task<Tile> UpdateShelfAsync(int id, ShelfProdDto shelfProdDto)
        {
            
            // Find the tile by its ID
            var tile = await _context.Tiles
                .Include(t => t.Products)  // Include the related products
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tile == null)
            {
                // Handle case where the tile does not exist
                throw new Exception("Tile not found.");
            }

            // Retrieve the products by their IDs
            var products = await _context.Products
                .Where(p => shelfProdDto.Products.Contains(p.Id))
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                // Handle case where none of the products exist or no products were provided
                throw new Exception("No products found to assign."+shelfProdDto.Products[0].ToString());
            }

            // Update the tile's product association
            foreach(var prod in products){
                tile.Products.Add(prod);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return tile;
        }

        public async Task<Tile> DeleteShelfItemAsync(int id, int itemId)
        {
            var tile = await _context.Tiles.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id == id);
            var productTbr = tile.Products.FirstOrDefault(p => p.Id == itemId);
            tile.Products.Remove(productTbr);
            _context.SaveChanges();

            return tile;
        }
    }
}