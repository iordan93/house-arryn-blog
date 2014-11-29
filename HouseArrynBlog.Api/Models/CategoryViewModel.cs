using HouseArrynBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace HouseArrynBlog.Api.Models
{
    public class CategoryViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public static Expression<Func<Category, CategoryViewModel>> FromCategory
        {
            get
            {
                return c => new CategoryViewModel()
                {
                    Id = c.Id,
                    Name = c.Name
                };
            }
        }
    }
}
