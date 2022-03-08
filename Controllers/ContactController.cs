using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhonebookAPI.DTO;
using PhonebookAPI.Services;
using PhonebookAPI.Services.Mapper;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PhonebookAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {

        private IContact _contactService;

        private readonly ILogger<ContactController> _logger;

        private AutoMapper.IMapper _mapper;

        public ContactController(IContact contactService, ILogger<ContactController> logger)
        {
            _logger = logger;
            _contactService = contactService;
            _mapper = AutoMapperConfiguration.GetConfiguration("default").CreateMapper();
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CreateAsync(CreateContact createContactDto)
        {

            try
            {
                if (ModelState.IsValid)
                {

                    Model.Contact contact = _mapper.Map<Model.Contact>(createContactDto);
                    // create user
                    int id = await _contactService.CreateContactAsync(contact);

                    _logger.LogInformation($"{DateTime.UtcNow.ToString("hh:mm:ss")}: Created{contact}");
                    Contact contactDTO = _mapper.Map<DTO.Contact>(contact);
                    contactDTO.Id = id;

                    return Ok(contactDTO);
                }
                else
                {
                    return BadRequest(new { message = ModelState });
                }
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }


        }
    }
}
