using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class MostPopularTagViewModel : TagViewModel
    {
        public int VisitsCount { get; set; }
    }
}