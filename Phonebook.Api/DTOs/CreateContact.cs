using System;
using System.ComponentModel.DataAnnotations;

namespace PhonebookAPI.DTO
{
    public class CreateContact
    {
        public CreateContact()
        {

        }
        [Required(ErrorMessage = "Firstname shouldn't be empty")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Name shouldn't be empty")]
        public string Name { get; set; }
        [RegularExpression(@"\+(\d{1,})(\s{1})(\d{1,})(\s{1})(\d{6,})$", ErrorMessage = "Number should be of the form +39 02 1234567")]
        public string Number { get; set; }


    }
}
