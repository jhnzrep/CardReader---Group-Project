using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CardReaderAPI.Models;
using CardReaderAPI.Utility;

namespace CardReaderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/User
        UserHelper helper = new UserHelper();
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return helper.GetUsers();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return helper.GetUser(id);
        }

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] User value)
        {
            helper.Insert(value);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
