using HouseArrynBlog.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HouseArrynBlog.Api.Controllers
{
    public class CategoriesController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllCategories() 
        {
            var context = new HouseArrynBlogContext();
            var categories = context.Categories
                .Select(c => new
                {
                    Id = c.Id,
                    Name = c.Name
                });
            return Json(categories);
        }
    }
}
