using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;

namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/reviews")]
    public class ReviewsController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<IdentityUser> userManager;

        public ReviewsController(ApplicationDbContext context,
            UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] ReviewCreationDTO reviewDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            
            var review = new Review();
            review.UserEmail = email;
            review.ReviewText = reviewDTO.ReviewText;
            review.PostingDate = DateTime.UtcNow;
            review.MovieId = reviewDTO.MovieId;
            context.Add(review);

            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
