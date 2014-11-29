using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Serialization;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    [DataContract]
    public class PostViewModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "author")]
        public string Author { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "content")]
        public string Content { get; set; }

        [DataMember(Name = "publishDate")]
        public DateTime PublishDate { get; set; }

        [DataMember(Name = "comments")]
        public ICollection<CommentViewModel> Comments { get; set; }

        [DataMember(Name = "visits")]
        public int Visits { get; set; }

        [DataMember(Name = "category")]
        public CategoryViewModel Category { get; set; }

        [DataMember(Name = "tags")]
        public ICollection<TagViewModel> Tags { get; set; }

        public static Expression<Func<Post, PostViewModel>> FromPost
        {
            get
            {
                return p => new PostViewModel()
                {
                    Id = p.Id,
                    Author = p.Author.FirstName + " " + p.Author.LastName + " (" + p.Author.UserName + ")",
                    Title = p.Title,
                    Content = p.Content,
                    PublishDate = p.PublishDate,
                    Comments = p.Comments
                        .AsQueryable()
                        .OrderBy(c => c.PublishDate)
                        .Select(CommentViewModel.FromComment)
                        .ToList(),
                    Visits = p.Visits,
                    Category = new[] { p.Category }
                        .AsQueryable()
                        .Select(CategoryViewModel.FromCategory)
                        .FirstOrDefault(),
                    Tags = p.Tags
                        .AsQueryable()
                        .Select(TagViewModel.FromTag)
                        .ToList()
                };
            }
        }
    }
}