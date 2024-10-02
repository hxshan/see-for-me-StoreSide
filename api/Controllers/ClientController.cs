using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.ClientDtos;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/client")]
    public class ClientController:ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public ClientController( ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var client = await _context.Clients.Include(c=>c.itemRequests).FirstOrDefaultAsync();
            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddClientDto addClientDto)
        {
            var client = new Client{
                Id=addClientDto.Id,
                Name = addClientDto.Name,
                Address=addClientDto.Address,
                Email=addClientDto.Email,
                PhoneNumber = addClientDto.PhoneNumber
            };
             _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return Ok(client);
        }
         
        [HttpPost("order")]
        public async Task<IActionResult> AddUser(AddOrderDto addOrderDto)
        {
           
            var order = new ItemRequest{
                UserId = addOrderDto.userId,
                Items = addOrderDto.Items.Select(productDto => ProductMapper.MapToProduct(productDto)).ToList()
            };

            _context.ItemRequests.Add(order);
            await _context.SaveChangesAsync();
        
            return Ok(order);
        }


    }
}