using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class ConcisePostViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public static Expression<Func<Post, ConcisePostViewModel>> FromPost 
        {
            get 
            {
                return p => new ConcisePostViewModel() 
                {
                    Id = p.Id,
                    Title = p.Title
                };
            }
        }
    }
}