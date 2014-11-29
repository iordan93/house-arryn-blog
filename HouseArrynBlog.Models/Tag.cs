using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HouseArrynBlog.Models
{
    public class Tag
    {
        public Tag()
        {
            this.Posts = new HashSet<Post>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
