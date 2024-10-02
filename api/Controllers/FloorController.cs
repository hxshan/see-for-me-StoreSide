using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.FloorMapDtos;
using api.Dtos.ProductDtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/floor")]
    [ApiController]
    public class FloorController : ControllerBase
    {
        private readonly IFloorMapRepository _floorRepo;
        public FloorController(IFloorMapRepository floorRepo)
        {
            _floorRepo = floorRepo;
        }


        [HttpGet]
        public async Task<IActionResult> GetFloorPlans()
        {

            var maps = await _floorRepo.GetMapsAsync();
            return Ok(maps);
        }

        [HttpGet("first")]
        public async Task<IActionResult> GetFirstFloorPlan()
        {

            var maps = await _floorRepo.GetFirstMapAsync();
            return Ok(maps);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetFloorPlanById([FromRoute] int id)
        {

            var map = await _floorRepo.GetMapByIdStoreAsync(id);
            if (map == null)
            {
                return NotFound();
            }
            return Ok(map);
        }

        [HttpPost("addfloor")]
        public async Task<IActionResult> AddFloorPlan([FromBody] SaveMapDto map)
        {

            var Map = map.MapToDomain();
            await _floorRepo.AddMapAsync(Map);
            return Ok("Map Created");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> updateFloorPlan([FromRoute] int id, [FromBody] EditMapDto editMapDto)
        {
           
            var res = await _floorRepo.UpdateTileByMapIdAsync(id,editMapDto);
            return Ok("Floor Map Updated Successfully");
        }
        



        [HttpPut("shelfitems/{id}")]
        public async Task<IActionResult> updateShelftems([FromRoute] int id, [FromBody] ShelfProdDto shelfProdDto)
        {
           
            var res = await _floorRepo.UpdateShelfAsync(id,shelfProdDto);
            return Ok(res);
        }

        [HttpDelete("shelfitems/{id}")]
        public async Task<IActionResult> RemoveShelftems([FromRoute] int id, [FromQuery] int itemId)
        {
           
            var res =await _floorRepo.DeleteShelfItemAsync(id,itemId);
            return Ok(res);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFloorPlan([FromRoute] int id)
        {

            var map = await _floorRepo.GetMapByIdAsync(id);

            if (map == null)
            {
                return NotFound("Floor Map does not exist!");
            }

            var deletedmap = await _floorRepo.DeleteMapAsync(map);
            if (deletedmap == null)
            {
                return StatusCode(500);
            }
            return Ok("Floor Map deleted Successfully");
        }


    }
}