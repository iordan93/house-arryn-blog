using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace HouseArrynBlog.Api.Models
{
    public class CommentViewModel
    {
        public int Id { get; set; }

        public string AuthorUsername { get; set; }

        public string AuthorEmail { get; set; }

        public string Text { get; set; }

        public DateTime PublishDate { get; set; }

        public int PostId { get; set; }

        public static Expression<Func<Comment, CommentViewModel>> FromComment
        {
            get
            {
                return c => new CommentViewModel()
                {
                    Id = c.Id,
                    AuthorUsername = c.Author.Username,
                    AuthorEmail = c.Author.Email,
                    Text = c.Text,
                    PublishDate = c.PublishDate,
                    PostId = c.Post.Id
                };
            }
        }
    }
}
