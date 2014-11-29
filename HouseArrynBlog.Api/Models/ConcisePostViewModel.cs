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
    public class ConcisePostViewModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "title")]
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