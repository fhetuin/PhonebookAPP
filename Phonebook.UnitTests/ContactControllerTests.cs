using Fare;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using PhonebookAPI.Controllers;
using PhonebookAPI.DTO;
using PhonebookAPI.Services;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace Phonebook.UnitTests
{
    public class ContactControllerTests
    {
        private static Random rand = new Random();

        private static string numberPattern = @"\+(\d{1,})(\s{1})(\d{1,})(\s{1})(\d{6,})$";
        private static readonly Regex regex = new Regex(numberPattern);
        private readonly ITestOutputHelper output;
        private static Xeger xeger = new Xeger(numberPattern, rand);

        private readonly Mock<IContact> repositoryStub = new();
        private readonly Mock<ILogger<ContactController>> loggerStub = new();

        public ContactControllerTests(ITestOutputHelper output)
        {
            this.output = output;
        }
        private CreateContact CreateRandomContact()
        {
            return new()
            {
                //Id = rand.Next(1000),
                FirstName = Guid.NewGuid().ToString(),
                Name = Guid.NewGuid().ToString(),
                Number = xeger.Generate()
            };
        }



        [Fact]
        public async Task CreateContactAsync_WithItemToCreate_ReturnsCreatedItem()
        {
            // Arrange
            var contactToCreate = CreateRandomContact();
            var controller = new ContactController(repositoryStub.Object, loggerStub.Object);

            //Act
            var actionResult = await controller.CreateAsync(contactToCreate);
            var result = (actionResult.Result as OkObjectResult);
            var createdContact = result.Value as Contact;

            //Assert
            contactToCreate.Should().BeEquivalentTo(
                createdContact,
                options => options.ComparingByMembers<Contact>().ExcludingMissingMembers()
            );

            createdContact.Id.ToString().Should().NotBeEmpty();
        }
    }
}
