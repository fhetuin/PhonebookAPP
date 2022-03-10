using PhonebookAPI.Model;
using PhonebookAPI.Services;
using PhonebookAPI.Services.Mapper;
using System.Linq;
using AutoMapper.QueryableExtensions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Collections.Generic;

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

        public async Task<Contact> GetContactAsync(int id)
        {
            var _contact = await _context.Contacts.FindAsync(id);
            if (_contact == null)
                throw new AppException("Contact not found");
            else
                return _contact;

        }

        public async Task<IEnumerable<Contact>> GetContactsAsync()
        {
            var contacts = _context.Contacts;
            return await Task.FromResult(contacts);
        }

        public async Task UpdateContactAsync(Contact contact)
        {

            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
        }
    }
}
