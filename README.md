# Movie Search and Review Site
Has been grounded and inspired by the course project at https://github.com/gavilanch/React-and-ASP.NET-Core by Felipe Gavilán. I have extended the project to add the basic feature for movie review and aim to develop booking functionality in the future. This is an individual project and has no commercial purpose at all.

## Introduction
The Movie Search and Review web application and api model a service provider that creates a platform demonstrating films in theaters and upcoming releases in details. This includes information on genres, movie theaters, actors, and trailers. Not only that, you can also filter or search the movies based on titles, genres, etc. Once a user logged in, the user gain access to post reviews and mark rates for each movie. As an authorized admin of the service, you can perform every action needed to manage movies, actors, movie theaters, genres and users.

### Installing Dependencies
### Backend
1. **Visual Studio 2022 and SQL Server 2019**
2. **Key Dependencies**
 - .NET 6
 - Entity Framework
 - JWT
### Frontend
You should aleady have `Node` installed on your local machine.
From the react-movies folder, run the following commands to start the client: 
```
npm install // only once to install dependencies
npm start 
```
### API Server URL
- `https://moviesapi20220407202553.azurewebsites.net`
### Web Server URL
- `https://reactmovies3469.web.app`

## Endpoints
### GET /Movies
- `curl -X GET "https://moviesapi20220407202553.azurewebsites.net/api/movies" -H  "accept: text/plain"`
```
{
  "inTheaters": [
    {
      "id": 1,
      "title": "Spider-Man: No Way Home",
      "summary": "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      "trailer": "https://www.youtube.com/watch?v=JfVOs4VSpmA",
      "inTheaters": true,
      "releaseDate": "2021-12-15T00:00:00",
      "poster": "https://moviesapis.blob.core.windows.net/movies/307d0c35-06f2-4aa2-a269-5edc1ff28177.jpg",
      "genres": [],
      "movieTheaters": [],
      "actors": [],
      "reviews": null,
      "averageVote": 0,
      "userVote": 0
    },
    {
      "id": 4,
      "title": "The Batman",
      "summary": "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrator's plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.",
      "trailer": "https://www.youtube.com/watch?v=u34gHaRiBIU",
      "inTheaters": true,
      "releaseDate": "2022-03-01T00:00:00",
      "poster": "https://moviesapis.blob.core.windows.net/movies/87a2651c-cf74-45a1-b083-bc747c5ab1f1.jpg",
      "genres": [],
      "movieTheaters": [],
      "actors": [],
      "reviews": null,
      "averageVote": 0,
      "userVote": 0
    }
  ],
  "upcomingReleases": [
    {
      "id": 2,
      "title": "Top Gun: Maverick",
      "summary": "After more than 30 years of service as one of the Navy's top aviators, Pete \"Maverick\" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
      "trailer": "https://www.youtube.com/watch?v=giXco2jaZ_4",
      "inTheaters": false,
      "releaseDate": "2022-05-27T00:00:00",
      "poster": "https://moviesapis.blob.core.windows.net/movies/9d1498f1-99f8-443c-be7f-e1a68a5bad6a.jpg",
      "genres": [],
      "movieTheaters": [],
      "actors": [],
      "reviews": null,
      "averageVote": 0,
      "userVote": 0
    }
  ]
}
```
### GET /Movies/${id}
- `curl -X GET "https://moviesapi20220407202553.azurewebsites.net/api/movies/4" -H  "accept: text/plain"`
```
{
  "id": 4,
  "title": "The Batman",
  "summary": "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrator's plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.",
  "trailer": "https://www.youtube.com/watch?v=u34gHaRiBIU",
  "inTheaters": true,
  "releaseDate": "2022-03-01T00:00:00",
  "poster": "https://moviesapis.blob.core.windows.net/movies/87a2651c-cf74-45a1-b083-bc747c5ab1f1.jpg",
  "genres": [
    {
      "id": 1,
      "name": "Drama"
    },
    {
      "id": 3,
      "name": "Action"
    },
    {
      "id": 4,
      "name": "Fantasy"
    },
    {
      "id": 8,
      "name": "Thriller"
    },
    {
      "id": 14,
      "name": "Noir"
    },
    {
      "id": 44,
      "name": "Hero"
    }
  ],
  "movieTheaters": [
    {
      "id": 2,
      "name": "Lotte Cinema",
      "latitude": 35.87016743314161,
      "longitude": 128.59703922275003
    }
  ],
  "actors": [
    {
      "id": 3,
      "name": "Dwayne Johnson",
      "picture": "https://moviesapis.blob.core.windows.net/actors/100fc5c9-2b37-4696-9b7f-7a210297c810.jpg",
      "character": "",
      "order": 0
    }
  ],
  "reviews": [
    {
      "id": 43,
      "reviewText": "Better than Marvel",
      "userEmail": "jyj34690@gmail.com",
      "postingDate": "2022-04-17T09:00:35.9415842"
    },
    {
      "id": 44,
      "reviewText": "Too dark",
      "userEmail": "jyj34690@gmail.com",
      "postingDate": "2022-04-17T09:00:48.8099704"
    },
    {
      "id": 49,
      "reviewText": "Thumbs up!",
      "userEmail": "ikjunjang.me@gmail.com",
      "postingDate": "2022-04-17T09:29:55.0700896"
    }
  ],
  "averageVote": 3,
  "userVote": 0
}
```
## Roles
- Admin
    - can perform all CRUD actions on movie, actor, genre, theater, user, review and rating. 
