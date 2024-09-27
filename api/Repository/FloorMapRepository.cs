using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class FloorMapRepository : IFloorMapRepository
    { private readonly ApplicationDBContext _context;
       
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
            var maps =await _context.FloorMaps.ToListAsync();
            return maps;
        }

        public async Task<FloorMap> GetMapByIdAsync(int id)
        {
            var map =await _context.FloorMaps
            .Include(x => x.Tiles).FirstOrDefaultAsync(x => x.Id == id);
            Console.WriteLine(map);

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
    }
}