using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HouseArrynBlog.Models
{
    public class HouseArrynBlogUser : IdentityUser
    {
        public HouseArrynBlogUser()
        {
            this.Posts = new HashSet<Post>();
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<HouseArrynBlogUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            return userIdentity;
        }
    }
}
