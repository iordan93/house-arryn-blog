using HouseArrynBlog.Api.Models;
using HouseArrynBlog.Data;
using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HouseArrynBlog.Api.Controllers
{
    [RoutePrefix("api/Posts")]
    public class PostsController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllPosts()
        {
            var context = new HouseArrynBlogContext();
            var posts = context.Posts
                .OrderByDescending(p => p.PublishDate)
                .Select(PostViewModel.FromPost);
            return Json(posts);
        }

        [HttpGet]
        public IHttpActionResult GetPost(int id)
        {
            var context = new HouseArrynBlogContext();
            var dbPost = context.Posts.Find(id);
            if (dbPost == null)
            {
                return NotFound();
            }

            var formattedPost = new[] { dbPost }
                .AsQueryable()
                .Select(PostViewModel.FromPost)
                .First();

            dbPost.Visits++;
            context.SaveChanges();

            return Json(formattedPost);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult CreatePost([FromBody] PostBindingModel postModel)
        {
            var context = new HouseArrynBlogContext();
            var author = context.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            if (author == null)
            {
                return BadRequest("There is no currently logged in blog administrator.");
            }

            var category = context.Categories.Find(postModel.CategoryId);
            if (category == null)
            {
                return BadRequest("There is no category with the provided ID - " + postModel.CategoryId + ".");
            }

            var dbTags = new List<Tag>();
            var modelTags = postModel.Tags.Distinct();
            foreach (var tag in modelTags)
            {
                var dbTag = context.Tags.FirstOrDefault(t => t.Name == tag);
                if (dbTag == null)
                {
                    var newTag = new Tag() { Name = tag };
                    context.Tags.Add(newTag);
                    context.SaveChanges();

                    dbTags.Add(newTag);
                }
                else
                {
                    dbTags.Add(dbTag);
                }
            }

            var post = new Post()
            {
                Title = postModel.Title,
                Content = postModel.Content,
                Author = author,
                Category = category,
                PublishDate = DateTime.Now,
                Visits = 0,
                Tags = dbTags
            };

            context.Posts.Add(post);
            context.SaveChanges();

            var postViewModel = new[] { post }.AsQueryable().Select(PostViewModel.FromPost).First();
            return Json(postViewModel);
        }
    }
}
