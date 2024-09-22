using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using api.Dtos.ProductType;
using api.Repository;
using api.Mappers;

namespace api.Controllers
{
       [ApiController]
[Route("api/ProductType")]
    public class ProductTypeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ProductTypeRepository _productRepo;

    public ProductTypeController(ApplicationDBContext context,ProductTypeRepository productRepo)
    {
        _context = context;
        _productRepo = productRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProductTypes()
    {
        return Ok(await _context.ProductTypes.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductType(int id)
    {
        var type = await _context.ProductTypes.FindAsync(id);
        if (type == null) return NotFound();
        return Ok(type);
    }

    [HttpPost]
    public async Task<IActionResult> AddProductType([FromBody] AddTypeDto type)
    {
        var Type = ProductTypeMapper.MapToType(type);
        await _productRepo.AddTypeAsync(Type);
        return Ok(type);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProductType(int id, [FromBody] ProductType type)
    {
        var existingType = await _context.ProductTypes.FindAsync(id);
        if (existingType == null) return NotFound();

        existingType.Name = type.Name;
        await _context.SaveChangesAsync();
        return Ok(existingType);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductType(int id)
    {
        var type = await _context.ProductTypes.FindAsync(id);
        if (type == null) return NotFound();

        _context.ProductTypes.Remove(type);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
    }
