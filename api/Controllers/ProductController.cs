using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
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
        public ProductController(ApplicationDBContext productContext)
        {
            _productContext = productContext;
        }
        [HttpGet]
       public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
       {
        if(_productContext.Products == null)
        {
         return NotFound();
        }
        return await _productContext.Products.ToListAsync();
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

        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
              
            _productContext.Products.Add(product);
            await _productContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new {id=product.Id}, product);
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