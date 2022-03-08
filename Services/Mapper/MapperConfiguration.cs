using AutoMapper;
using PhonebookAPI.Services.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhonebookAPI.Services.Mapper
{
    public class AutoMapperConfiguration
    {
        public static MapperConfiguration GetConfiguration(string culture)
        {
            return new MapperConfiguration(cfg => {

                //cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
                //cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();     
                cfg.AddProfile(new OrganizationProfile(culture));
            });
        }



    }
}
