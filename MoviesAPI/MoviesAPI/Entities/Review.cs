using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MoviesAPI.Entities
{
    public class Review
    {
        public int Id { get; set; }
        [StringLength(maximumLength: 1000)]
        public string ReviewText { get; set; }
        [EmailAddress]
        public string UserEmail { get; set; }
        public DateTime PostingDate { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
