using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController:ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager,ITokenService tokenService,SignInManager<AppUser> signInManager)
        {
            
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;

        }

        [HttpPost("register")]
         public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email
                };

                var CreatedUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (CreatedUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "USER");
                    if (roleResult.Succeeded)
                    {
                        return Ok(new NewUserDto{
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser)
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);//BadRequest() is also fine
                    }
                }
                else
                {
                    return StatusCode(500, CreatedUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto){
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user =await _userManager.Users.FirstOrDefaultAsync(X => X.UserName == loginDto.UserName.ToLower());

            if (user == null){
                return Unauthorized("Invalid username");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);

            if(!result.Succeeded){
                return Unauthorized("Username not found/Password incorrect");
            }
            return Ok(new NewUserDto{
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });


        }

    }
}