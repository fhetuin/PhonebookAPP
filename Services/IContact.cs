using System.Threading.Tasks;

namespace PhonebookAPI.Services
{
    public interface IContact
    {
        Task<int> CreateContactAsync(Model.Contact contact);
    }
}
