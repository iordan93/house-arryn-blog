using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Serialization;
using System.Text;

namespace HouseArrynBlog.Api.Models
{
    [DataContract]
    public class CommentViewModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "authorUsername")]
        public string AuthorUsername { get; set; }

        [DataMember(Name = "authorEmail")]
        public string AuthorEmail { get; set; }

        [DataMember(Name = "text")]
        public string Text { get; set; }

        [DataMember(Name = "publishDate")]
        public DateTime PublishDate { get; set; }

        [DataMember(Name = "postId")]
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
