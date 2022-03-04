using Microsoft.EntityFrameworkCore;

namespace PhonebookAPI.Model
{
    public partial class PhonebookContext : DbContext
    {
        public PhonebookContext()
        {
        }

        public PhonebookContext(DbContextOptions<PhonebookContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }
    }
}
