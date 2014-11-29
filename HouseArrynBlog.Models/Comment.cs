using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HouseArrynBlog.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public virtual CommentAuthor Author { get; set; }

        public string Text { get; set; }

        public DateTime PublishDate { get; set; }

        public virtual Post Post { get; set; }
    }
}
