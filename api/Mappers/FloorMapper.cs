using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.FloorMapDtos;
using api.Models;

namespace api.Mappers
{
    public static class FloorMapper
    {
        public static FloorMap MapToDomain(this SaveMapDto mapDto)
        {
            if (mapDto == null)
                throw new ArgumentNullException(nameof(mapDto));

            var floorMap = new FloorMap
            {
                Width = mapDto.Width,
                Height = mapDto.Height,
                Tiles = MapTiles(mapDto.Tiles)
            };

            return floorMap;
        }

        private static List<Tile> MapTiles(List<List<TileDto>> tileDtos)
        {
            var tiles = new List<Tile>();
            for (int y = 0; y < tileDtos.Count; y++)
            {
                for (int x = 0; x < tileDtos[y].Count; x++)
                {
                    tiles.Add(MapTile(tileDtos[y][x], x, y));
                }
            }
            return tiles;
        }

        private static Tile MapTile(TileDto tileDto, int x, int y)
        {
            if (!Enum.TryParse<TileType>(tileDto.Type, true, out var tileType))
            {
                throw new ArgumentException($"Invalid tile type: {tileDto.Type}");
            }

            return new Tile
            {
                X = x,
                Y = y,
                Type = tileType
            };
        }

    
         private static Tile MapEditTileToTile(EditTileDto tileDto)
        {
            if (!Enum.TryParse<TileType>(tileDto.Type, true, out var tileType))
            {
                throw new ArgumentException($"Invalid tile type: {tileDto.Type}");
            }

            return new Tile
            {
                Id = tileDto.Id,
                MapId = tileDto.MapId,
                X = tileDto.X,
                Y = tileDto.Y,
                Type = tileType
            };
            
        }
    
    }
}