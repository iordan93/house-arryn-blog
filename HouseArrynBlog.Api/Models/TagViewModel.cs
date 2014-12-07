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
    public class TagViewModel
    {
        [DataMember(Name = "name")]
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
