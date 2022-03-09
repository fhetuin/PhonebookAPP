using AutoMapper;
using Model = PhonebookAPI.Model;
using DTO = PhonebookAPI.DTO;
using System;

namespace PhonebookAPI.Services.Mapper
{
    public class OrganizationProfile : Profile
    {

        public OrganizationProfile(string culture)
        {
            #region Mapping DB -> DTO 
            CreateMap<Model.Contact, DTO.Contact>();
            #endregion

            #region Mapping DTO  -> DB
            CreateMap<DTO.Contact, Model.Contact>();
            CreateMap<DTO.CreateContact, Model.Contact>();
            #endregion
        }


        public OrganizationProfile()
        {
            #region Mapping DB -> DTO 
            CreateMap<Model.Contact, DTO.Contact>();
            #endregion

            #region Mapping DTO  -> DB
            CreateMap<DTO.Contact, Model.Contact>();
            CreateMap<DTO.CreateContact, Model.Contact>();
            #endregion
        }

    }

}