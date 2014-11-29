using HouseArrynBlog.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseArrynBlog.Data
{
    public class HouseArrynBlogContext : IdentityDbContext<HouseArrynBlogUser>
    {
        public HouseArrynBlogContext()
            : base("DefaultConnection")
        {
        }

        public IDbSet<Post> Posts { get; set; }

        public IDbSet<Category> Categories { get; set; }

        public IDbSet<Comment> Comments { get; set; }

        public IDbSet<CommentAuthor> CommentAuthors { get; set; }

        public IDbSet<Tag> Tags { get; set; }
    }
}
