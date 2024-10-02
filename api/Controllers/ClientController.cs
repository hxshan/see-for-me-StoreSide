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
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public ClientController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var client = await _context.Clients.FirstOrDefaultAsync();
            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddClientDto addClientDto)
        {
            var client = new Client
            {
                Id = addClientDto.Id,
                Name = addClientDto.Name,
                Address = addClientDto.Address,
                Email = addClientDto.Email,
                PhoneNumber = addClientDto.PhoneNumber
            };
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return Ok(client);
        }

        [HttpPost("order")]
        public async Task<IActionResult> CreateItemRequest([FromBody] ItemRequestDto itemRequestDto)
        {
            if (itemRequestDto == null || itemRequestDto.Items.Count == 0)
            {
                return BadRequest("Invalid item request.");
            }

            var itemRequest = new ItemRequest
            {
                UserId = itemRequestDto.UserId,
                Items = itemRequestDto.Items.Select(item => new ItemRequestDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                }).ToList() // Convert List<ItemRequestDetailDto> to List<ItemRequestDetail>
            };

            _context.ItemRequests.Add(itemRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateItemRequest), new { id = itemRequest.Id }, itemRequest);
        }

    
    }
}