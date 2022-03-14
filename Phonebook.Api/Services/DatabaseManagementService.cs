using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PhonebookAPI.Model;

namespace PhonebookAPI.Services
{
    public static class DatabaseManagementService
    {
        // Getting the scope of our database context
        public static void MigrationInitialisation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                // Takes all of our migrations files and apply them against the database in case they are not implemented
                var context = serviceScope.ServiceProvider.GetService<PhonebookContext>();
                context.Database.Migrate();
                context.Contacts.AddRange(new Contact[] {
                new Contact() {FirstName = "Florian", Name = "Hetuin", Number = "+33 6 69366512" },
                new Contact() {FirstName = "Thibault", Name = "Harant", Number = "+32 4 93764799" }});
                context.SaveChanges();

            }
        }
    }
}