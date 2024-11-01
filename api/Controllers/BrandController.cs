using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using api.Dtos.BrandDtos;
using api.Mappers;
using api.Interfaces;
using api.Repository;

namespace api.Controllers
{
    [ApiController]
    [Route("api/Brand")]
    public class BrandController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IBrandRepository _brandRepo;

        public BrandController(ApplicationDBContext context, IBrandRepository brandRepo)
        {
            _context = context;
            _brandRepo = brandRepo;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllBrands()
        {
            var brand = await _context.Brands.ToListAsync();
            return Ok(brand);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrand(int id)
        {
            var brand = await _context.Brands
                .Include(x => x.ProductTypes).FirstOrDefaultAsync(x => x.Id == id);

            if (brand == null) return NotFound();
            return Ok(brand);
        }

        [HttpPost]
        public async Task<IActionResult> AddBrand([FromBody] SaveBrandDto brandDto)
        {
            var brand = BrandMapper.MapToBrandFromSave(brandDto);
            await _brandRepo.AddBrandAsync(brand);
            return Ok("Brand Created Succesfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand(int id,[FromBody] UpdateBrandDto brandDto)
        {       
            try{
             var updatedBrand = await _brandRepo.UpdateBrandAsync(id,brandDto);
             return Ok("Brand Updated Successfully");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        
        [HttpPut("assign/{id}")]
        public async Task<IActionResult> AssignType(int id,[FromBody] List<int> productTypes)
        {       
            try{
             var updatedBrand = await _brandRepo.AssignType(id,productTypes);
             return Ok("Brand Updated Successfully");
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null) return NotFound();

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

}