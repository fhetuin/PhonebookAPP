using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhonebookAPI.DTO;
using PhonebookAPI.Services;
using PhonebookAPI.Services.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContactAsync(int id, DTO.UpdateContact contactDTO)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var existinctContact = await _contactService.GetContactAsync(id);

                    existinctContact.Name = contactDTO.Name;
                    existinctContact.FirstName = contactDTO.FirstName;
                    existinctContact.Number = contactDTO.Number;


                    await _contactService.UpdateContactAsync(existinctContact);
                    return NoContent();
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetAsync()
        {

            try
            {

                // retrieve contacts
                var contacts = await _contactService.GetContactsAsync();
                return Ok(_mapper.Map<IEnumerable<DTO.Contact>>(contacts));

            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }


        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CreateAsync(CreateContact createContactDto)
        {

            try
            {
                if (ModelState.IsValid)
                {

                    Model.Contact contact = _mapper.Map<Model.Contact>(createContactDto);
                    // create contact
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
