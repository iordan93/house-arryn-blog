using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace HouseArrynBlog.Api.Models
{
    public class TagViewModel
    {
        public string Name { get; set; }

        public static Expression<Func<Tag, TagViewModel>> FromTag
        {
            get
            {
                return t => new TagViewModel()
                {
                    Name = t.Name
                };
            }
        }
    }
}
