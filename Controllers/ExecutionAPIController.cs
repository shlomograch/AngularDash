using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AutoDashV2.Controllers
{
    public class ExecutionAPIController : ApiController
    {
        // GET: api/Execution
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Execution/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Execution
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Execution/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Execution/5
        public void Delete(int id)
        {
        }
    }
}
