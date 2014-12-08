using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HouseArrynBlog.Api.Models
{
    public class CommentBindingModel
    {
        [Required(ErrorMessage = "The username is required.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "The username can be between 3 and 100 characters long.")]
        public string Username { get; set; }

        public string Email { get; set; }

        [Required(ErrorMessage = "The username is required.")]
        [StringLength(100000, MinimumLength = 3, ErrorMessage = "The text can be between 3 and 100000 characters long.")]
        public string Text { get; set; }
    }
}