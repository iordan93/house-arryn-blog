using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class PaginatedPostViewModel
    {
        public ICollection<PostViewModel> Posts { get; set; }

        public int CurrentPage { get; set; }

        public int CountPerPage { get; set; }

        public int TotalCount { get; set; }
    }
}