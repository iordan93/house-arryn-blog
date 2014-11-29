using HouseArrynBlog.Api.Models;
using HouseArrynBlog.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HouseArrynBlog.Api.Controllers
{
    [RoutePrefix("api/Tags")]
    public class TagsController : ApiController
    {
        const int DefaultNumberOfTags = 10;

        [HttpGet]
        [Route("Popular")]
        public IHttpActionResult GetMostPopularTags()
        {
            var context = new HouseArrynBlogContext();
            var tags = context.Tags
                .Select(t => new MostPopularTagViewModel()
                {
                    Name = t.Name,
                    VisitsCount = t.Posts.Sum(p => p.Visits)
                })
                .OrderByDescending(t => t.VisitsCount)
                .Take(DefaultNumberOfTags);

            return Json(tags);
        }
    }
}
