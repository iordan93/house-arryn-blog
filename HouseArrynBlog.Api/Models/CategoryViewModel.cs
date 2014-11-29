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
    public class CategoryViewModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
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
