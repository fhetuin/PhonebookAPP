using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhonebookAPI.Services
{
    public interface IContact
    {
        Task<int> CreateContactAsync(Model.Contact contact);
        Task<IEnumerable<Model.Contact>> GetContactsAsync();
        Task UpdateContactAsync(Model.Contact contact);
        Task<Model.Contact> GetContactAsync(int id);
    }
}
