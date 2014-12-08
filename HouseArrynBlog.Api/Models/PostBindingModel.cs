using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace HouseArrynBlog.Api.Models
{
    public class PostBindingModel
    {
        [Required(ErrorMessage = "The post title is required.")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "The post title can be between 3 and 200 characters long.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "The post content is required.")]
        [StringLength(200000, MinimumLength = 3, ErrorMessage = "The post title can be between 3 and 200000 characters long.")]
        public string Content { get; set; }

        [Required(ErrorMessage = "The category ID is required.")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "The tags are required.")]
        public ICollection<string> Tags { get; set; }
    }
}
