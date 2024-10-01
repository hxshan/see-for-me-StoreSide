using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.ProductDtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/Product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDBContext _productContext;
        private readonly IProductRepository _productRepo;
        public ProductController(ApplicationDBContext productContext,IProductRepository productRepo)
        {
            _productContext = productContext;
            _productRepo = productRepo;
        }

       [HttpGet]
       public async Task<ActionResult<List<GetProductsDto>>> GetProducts()
       {
         var products = await _productRepo.GetProductsAsync();
        return products;
       }


       [HttpGet("{id}")]
       public async Task<ActionResult<Product>> GetProduct(int id)
       {
        if(_productContext.Products == null)
        {
         return NotFound();
        }
        var product = await _productContext.Products.FindAsync(id);
        if(product == null)
        {
            return NotFound();

        }
        return product;
        }
        [HttpPost]

        public async Task<ActionResult> PostProduct(AddProductDto productDto)
        {
            try{
                var product = _productRepo.AddProductAsync(ProductMapper.MapToProduct(productDto));
                return Ok("Product Created Succesfully");
            }catch(Exception e){
                return BadRequest(e.Message);
            } 
        }
        [HttpPut("{id}")]

        public async Task<ActionResult> PutProduct(int id,Product product)
        {
            if(id != product.Id)
            {
                return BadRequest();
            }
            _productContext.Entry(product).State= EntityState.Modified;
            try
            {
                await _productContext.SaveChangesAsync();

            }
            catch(DbUpdateConcurrencyException)
            {

                throw;

            }
            return Ok();
        }
        [HttpDelete("{id}")]

        public  async Task<ActionResult> DeleteProduct(int id)
        {
            if(_productContext.Products == null)
            {
                return NotFound();
            }
            var product = await _productContext.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound();
            }
            _productContext.Products.Remove(product);
            await _productContext.SaveChangesAsync();

            return Ok();


        }


    }
}