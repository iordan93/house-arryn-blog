using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class SearchResultViewModel
    {
        public string Query { get; set; }

        public IEnumerable<ConcisePostViewModel> Posts { get; set; }
    }
}