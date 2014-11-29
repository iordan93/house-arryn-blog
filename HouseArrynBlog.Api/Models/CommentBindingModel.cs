using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class CommentBindingModel
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Text { get; set; }
    }
}