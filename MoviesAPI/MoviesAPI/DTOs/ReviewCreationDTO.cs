using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class ReviewCreationDTO
    {
        [StringLength(maximumLength: 1000)]
        public string ReviewText { get; set; }
        public int MovieId { get; set; }
    }
}
