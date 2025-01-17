﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Entities;

namespace MoviesAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MoviesActors>()
                .HasKey(x => new { x.MovieId, x.ActorId });
            
            modelBuilder.Entity<MoviesGenres>()
                .HasKey(x => new { x.MovieId, x.GenreId});
            
            modelBuilder.Entity<MovieTheatersMovies>()
                .HasKey(x => new { x.MovieId, x.MovieTheaterId });
            
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<MovieTheater> MovieTheaters { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviesActors> MoviesActors { get; set; }
        public DbSet<MoviesGenres> MoviesGenres { get; set; }
        public DbSet<MovieTheatersMovies> MovieTheatersMovies { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}
