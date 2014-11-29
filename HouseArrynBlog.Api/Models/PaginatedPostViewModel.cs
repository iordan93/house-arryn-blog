using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    [DataContract]
    public class PaginatedPostViewModel
    {
        [DataMember(Name = "posts")]
        public ICollection<PostViewModel> Posts { get; set; }

        [DataMember(Name = "currentPage")]
        public int CurrentPage { get; set; }

        [DataMember(Name = "countPerPage")]
        public int CountPerPage { get; set; }

        [DataMember(Name = "totalCount")]
        public int TotalCount { get; set; }
    }
}