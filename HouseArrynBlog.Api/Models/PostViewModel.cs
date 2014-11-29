using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class PostViewModel
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime PublishDate { get; set; }

        public ICollection<CommentViewModel> Comments { get; set; }

        public int Visits { get; set; }

        public CategoryViewModel Category { get; set; }

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
                        .Select(CommentViewModel.FromComment)
                        .ToList(),
                    Visits = p.Visits,
                    Category = new[] { p.Category }
                        .AsQueryable()
                        .Select(CategoryViewModel.FromCategory)
                        .First(),
                    Tags = p.Tags
                        .AsQueryable()
                        .Select(TagViewModel.FromTag)
                        .ToList()
                };
            }
        }
    }
}