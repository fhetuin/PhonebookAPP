using PhonebookAPI.Model;
using PhonebookAPI.Services;
using PhonebookAPI.Services.Mapper;
using System.Linq;
using AutoMapper.QueryableExtensions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PhonebookAPI.Repo
{
    public class ContactRepo : IContact
    {
        private PhonebookContext _context;


        public ContactRepo(PhonebookContext context)
        {
            _context = context;

        }


        public async Task<int> CreateContactAsync(Model.Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return contact.Id;

        }
    }
}
