using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [ApiController]
[Route("api/Brand")]
    public class BrandController : ControllerBase
    {
           private readonly ApplicationDBContext _context;

    public BrandController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBrands()
    {
        return Ok(await _context.Brands.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBrand(int id)
    {
        var brand = await _context.Brands.FindAsync(id);
        if (brand == null) return NotFound();
        return Ok(brand);
    }

    [HttpPost]
    public async Task<IActionResult> AddBrand([FromBody] Brand brand)
    {
        _context.Brands.Add(brand);
        await _context.SaveChangesAsync();
        return Ok(brand);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBrand(int id, [FromBody] Brand brand)
    {
        var existingBrand = await _context.Brands.FindAsync(id);
        if (existingBrand == null) return NotFound();

        existingBrand.Name = brand.Name;
        await _context.SaveChangesAsync();
        return Ok(existingBrand);
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