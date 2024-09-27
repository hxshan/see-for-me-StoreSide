using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.FloorMapDtos;
using api.Interfaces;
using api.Mappers;
using api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/floor")]
    [ApiController]
    public class FloorController:ControllerBase
    {
        private readonly IFloorMapRepository _floorRepo;
        public FloorController(IFloorMapRepository floorRepo)
        {
            _floorRepo = floorRepo;
        }


        [HttpGet]
        public async Task<IActionResult> GetFloorPlans(){

            var maps = await _floorRepo.GetMapsAsync();      
            return Ok(maps);
        }
                
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetFloorPlanById([FromRoute] int id){

            var map = await _floorRepo.GetMapByIdAsync(id);
             if(map == null){
                return NotFound();
            }
            return Ok(map);
        }

        [HttpPost("addfloor")]
        public async Task<IActionResult> AddFloorPlan([FromBody] SaveMapDto map){

            var Map = map.MapToDomain();
            await _floorRepo.AddMapAsync(Map);
            return Ok("Map Created");
        }

        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteFloorPlan([FromRoute] int id){
            
           var map = await _floorRepo.GetMapByIdAsync(id);

           if(map == null){
            return NotFound("Floor Map does not exist!");
           }

           var deletedmap = await _floorRepo.DeleteMapAsync(map);
           if(deletedmap ==null){
            return StatusCode(500);
           }
           return Ok("Floor Map deleted Successfully");
        }

        
    }
}