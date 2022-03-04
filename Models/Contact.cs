using System;

namespace PhonebookAPI.Model
{
    public partial class Contact
    {
        public Contact()
        {

        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }


    }
}
