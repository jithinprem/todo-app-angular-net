using Microsoft.EntityFrameworkCore;
using todo_app_angular_net.Models;

// I have added a comment in Database context
namespace todo_app_angular_net.Data
{
    public class DatabaseContext :DbContext
    {
        
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
