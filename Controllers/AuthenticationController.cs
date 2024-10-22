using ExpensesAPI.Data;
using ExpensesAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ExpensesAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("auth")]
    public class AuthenticationController : ApiController
    {
        private const string SecretKey = "this_is_a_very_long_secret_key_that_is_at_least_32_characters";

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Enter your username and password.");
            }

            try
            {
                using (var context = new AppDbContext())
                {
                    var exists = context.Users.Any(u => u.UserName == user.UserName && u.Password == user.Password);

                    if (exists)
                    {
                        return Ok(CreateToken(user));
                    }

                    return BadRequest("Wrong credentials");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register([FromBody] User user)
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var exists = context.Users.Any(u => u.UserName == user.UserName);
                    if (exists)
                    {
                        return BadRequest("User already exists.");
                    }
                    context.Users.Add(user);
                    context.SaveChanges();
                    return Ok(CreateToken(user));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private JwtPackage CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Email, user.UserName)
            });

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var signinCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = signinCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new JwtPackage()
            {
                UserName = user.UserName,
                Token = tokenString
            };
        }
    }
}

public class JwtPackage
{
    public string Token { get; set; }
    public string UserName { get; set; }
}