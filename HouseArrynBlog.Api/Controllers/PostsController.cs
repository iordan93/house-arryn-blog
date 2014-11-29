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
        public IHttpActionResult GetPostsByPage([FromUri]int page, [FromUri]int count = 10)
        {
            var context = new HouseArrynBlogContext();
            var posts = context.Posts
                .OrderByDescending(p => p.PublishDate)
                .Skip((page - 1) * count)
                .Take(count)
                .Select(PostViewModel.FromPost);
            var result = new PaginatedPostViewModel()
            {
                Posts = posts.ToList(),
                CurrentPage = page,
                CountPerPage = count,
                TotalCount = posts.Count()
            };

            return Json(result);
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

        [HttpGet]
        [Route("List")]
        public IHttpActionResult GetPostsList()
        {
            var context = new HouseArrynBlogContext();
            var posts = context.Posts
                .OrderByDescending(p => p.PublishDate)
                .GroupBy(p => new { Year = p.PublishDate.Year, Month = p.PublishDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Posts = g.AsQueryable().Select(ConcisePostViewModel.FromPost)
                });

            return Json(posts);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult CreatePost([FromBody] PostBindingModel postModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var context = new HouseArrynBlogContext();
            var author = TryGetAuthor(context);
            if (author == null)
            {
                return BadRequest("There is no currently logged in blog administrator.");
            }

            var category = TryGetCategory(context, postModel.CategoryId);
            if (category == null)
            {
                return BadRequest("There is no category with the provided ID: " + postModel.CategoryId + ".");
            }

            var dbTags = GetTags(context, postModel.Tags);

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

        [HttpPut]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult UpdatePost(int id, [FromBody] PostBindingModel postModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var context = new HouseArrynBlogContext();
            var post = TryGetPost(context, id);
            if (post == null)
            {
                return BadRequest("There is no post with the provided ID: " + id + ".");
            }

            var category = TryGetCategory(context, postModel.CategoryId);
            if (category == null)
            {
                return BadRequest("There is no category with the provided ID: " + postModel.CategoryId + ".");
            }

            var dbTags = GetTags(context, postModel.Tags);

            post.Title = postModel.Title;
            post.Content = postModel.Content;
            post.Category = category;
            post.Tags = dbTags;

            context.SaveChanges();

            var postViewModel = new[] { post }.AsQueryable().Select(PostViewModel.FromPost).First();
            return Json(postViewModel);
        }

        private HouseArrynBlogUser TryGetAuthor(HouseArrynBlogContext context)
        {
            return context.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
        }

        private Category TryGetCategory(HouseArrynBlogContext context, int id)
        {
            return context.Categories.Find(id);
        }

        private Post TryGetPost(HouseArrynBlogContext context, int id)
        {
            return context.Posts.Find(id);
        }

        private static List<Tag> GetTags(HouseArrynBlogContext context, ICollection<string> tags)
        {
            var dbTags = new List<Tag>();
            var modelTags = tags.Distinct();
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

            return dbTags;
        }
    }
}
