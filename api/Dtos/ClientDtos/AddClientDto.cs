using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ClientDtos
{
    public class AddClientDto
    {
        public String Id {get;set;}
        public String Name {get;set;}
        public String Address {get;set;}
        public String Email {get;set;}
        public String PhoneNumber {get;set;}
    }
}