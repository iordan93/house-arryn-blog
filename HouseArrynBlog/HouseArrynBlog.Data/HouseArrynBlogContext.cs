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
    }
}
