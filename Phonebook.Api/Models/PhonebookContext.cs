using Microsoft.EntityFrameworkCore;

namespace PhonebookAPI.Model
{
    public class PhonebookContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public PhonebookContext()
        {

        }

        public PhonebookContext(DbContextOptions<PhonebookContext> options)
            : base(options)
        {
        }





    }
}
