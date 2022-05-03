using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_app_angular_net.Data;
using Microsoft.EntityFrameworkCore;

using System.Linq;

using todo_app_angular_net.Models;

namespace todo_app_angular_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public readonly DatabaseContext _dbContext;

        public CustomerController(
                DatabaseContext dbContext
            )
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var all = await (from cust in _dbContext.Users select cust).ToListAsync();
            return Ok(all);
        }

        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] Users user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> PutUser([FromBody] Users user)
        {
            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();

            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = _dbContext.Users.Where(x => x.Id == id).FirstOrDefault();
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return Ok(true);
        }
    }
}
