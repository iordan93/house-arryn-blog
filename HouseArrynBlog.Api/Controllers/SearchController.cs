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
    [RoutePrefix("api/Search")]
    public class SearchController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Search([FromUri]string query)
        {
            var context = new HouseArrynBlogContext();
            var result = new SearchResultViewModel() { Query = query, Posts = new List<PostViewModel>() };
            var tag = context.Tags.Where(t => t.Name == query).FirstOrDefault();
            if (tag != null)
            {
                var posts = tag.Posts
                    .AsQueryable()
                    .OrderByDescending(p => p.PublishDate)
                    .Select(PostViewModel.FromPost);
                result.Posts = posts;
            }

            return Json(result);
        }
    }
}
