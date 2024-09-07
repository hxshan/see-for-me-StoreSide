using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.FloorMap;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/floor")]
    [ApiController]
    public class FloorController:ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public FloorController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpPost("addfloor")]
        public async Task<IActionResult> AddFloorPlan([FromBody] SaveMapDto map){

            var Map = map.MapToDomain();

            await _context.FloorMaps.AddAsync(Map);
            await _context.SaveChangesAsync();

            return Ok(""+map.Tiles);
        }

        
    }
}