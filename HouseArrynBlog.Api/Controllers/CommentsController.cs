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
    [RoutePrefix("api/Comments")]
    public class CommentsController : ApiController
    {
        [HttpPost]
        public IHttpActionResult AddComment(int id, [FromBody] CommentBindingModel commentModel) 
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

            var author = TryGetCommentAuthor(context, commentModel.Username, commentModel.Email);
            if (author == null)
            {
                author = new CommentAuthor()
                {
                    Username = commentModel.Username,
                    Email = commentModel.Email
                };

                context.CommentAuthors.Add(author);
                context.SaveChanges();
            }

            var comment = new Comment() 
            {
                Post = post,
                Author = author,
                Text = commentModel.Text,
                PublishDate = DateTime.Now
            };

            post.Comments.Add(comment);
            context.SaveChanges();

            var commentViewModel = new[] { comment }
                .AsQueryable()
                .Select(CommentViewModel.FromComment)
                .First();
            return Json(commentViewModel);
        }

        private Post TryGetPost(HouseArrynBlogContext context, int id)
        {
            return context.Posts.Find(id);
        }

        private static CommentAuthor TryGetCommentAuthor(HouseArrynBlogContext context, string username, string email)
        {
            return context.CommentAuthors.FirstOrDefault(a => a.Username == username && a.Email == email);
        }
    }
}
