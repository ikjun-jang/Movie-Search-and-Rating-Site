﻿using System;
using System.Collections.Generic;

namespace MoviesAPI.DTOs
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool InTheaters { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Poster { get; set; }
        public List<GenreDTO> Genres { get; set; }
        public List<MovieTheaterDTO> MovieTheaters { get; set; }
        public List<ActorsMovieDTO> Actors { get; set; }
        public List<ReviewDTO> Reviews { get; set; }
        public double AverageVote { get; set; }
        public int UserVote { get; set; }
    }
}
