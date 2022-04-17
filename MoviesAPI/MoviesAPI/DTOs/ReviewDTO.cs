using System;

namespace MoviesAPI.DTOs
{
    public class ReviewDTO
    {
        public int Id { get; set; }
        public string ReviewText { get; set; }
        public string UserEmail { get; set; }
        public DateTime PostingDate { get; set; }
    }
}
