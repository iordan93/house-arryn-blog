using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HouseArrynBlog.Api.Models
{
    public class PostBindingModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public int CategoryId { get; set; }

        public ICollection<string> Tags { get; set; }
    }
}
