using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using api.Dtos.ProductTypeDtos;

using api.Mappers;
using api.Interfaces;
using System.Formats.Tar;

namespace api.Controllers
{
       [ApiController]
[Route("api/ProductType")]
    public class ProductTypeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IProductTypeRepository _productRepo;

    public ProductTypeController(ApplicationDBContext context,IProductTypeRepository productRepo)
    {
        _context = context;
        _productRepo = productRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProductTypes()
    {
        return Ok(await _context.ProductTypes.Include(p=>p.Brands).ToListAsync());
    }
    [HttpGet("justtypes")]
    public async Task<IActionResult> GetJustProductTypes()
    {
        var prods =await _context.ProductTypes.ToListAsync();
        List<string> nameList = new List<string>();

        foreach(var prod in prods){
            nameList.Add(prod.Name.ToString());
        }
        return Ok(nameList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductType(int id)
    {
        var type = await _productRepo.GetTypeAsync(id);
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
