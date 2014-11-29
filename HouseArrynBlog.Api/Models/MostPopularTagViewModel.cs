using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    [DataContract]
    public class MostPopularTagViewModel : TagViewModel
    {
        [DataMember(Name = "visitsCount")]
        public int VisitsCount { get; set; }
    }
}