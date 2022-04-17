import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AuthenticationContext from "../auth/AuthenticationContext";
import Authorized from "../auth/Authorized";
import { urlMovies, urlRatings, urlReviews } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";
import coordinateDTO from "../utils/coordinates.models";
import customConfirm from "../utils/customConfirm";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";
import Map from "../utils/Map";
import Ratings from "../utils/Ratings";
import css from "./MovieDetails.module.css";
import { movieDTO } from "./movies.model";

export default function MovieDetails() {
  const { id }: any = useParams();
  const [movie, SetMovie] = useState<movieDTO>();
  const [reviewText, setReviewText] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { claims } = useContext(AuthenticationContext);
  const customAlert = useContext(AlertContext);

  useEffect(() => {
    axios
      .get(`${urlMovies}/${id}`)
      .then((response: AxiosResponse<movieDTO>) => {
        response.data.releaseDate = new Date(response.data.releaseDate);
        response.data.reviews?.forEach((review) => {
          review.postingDate = new Date(review.postingDate);
        });
        SetMovie(response.data);
      });
  }, [id, movie]);

  function transformCoordinates(): coordinateDTO[] {
    if (movie?.movieTheaters) {
      const coordinates = movie.movieTheaters.map((movieTheater) => {
        return {
          lat: movieTheater.latitude,
          lng: movieTheater.longitude,
          name: movieTheater.name,
        } as coordinateDTO;
      });
      return coordinates;
    }
    return [];
  }

  function generateEmbededVideoURL(trailer: string): string {
    if (!trailer) {
      return "";
    }

    let videoId = trailer.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  function handleRate(rate: number) {
    axios.post(urlRatings, { rating: rate, movieId: id }).then(() => {
      Swal.fire({ icon: "success", title: "Rating received" });
    });
  }

  function postReview() {
    const userIsLoggedIn = claims.length > 0;
    if (!userIsLoggedIn) {
      Swal.fire({ title: "Error", text: "You need to login", icon: "error" });
      return;
    }
    try {
      axios
        .post(urlReviews, { reviewText: reviewText, movieId: id })
        .then(() => {
          Swal.fire({ icon: "success", title: "Review posted" });
        });
      setReviewText("");
    } catch (errors) {
      if (errors && errors.response) {
        setErrors(errors.response.data);
      }
    }
  }

  function deleteReview(id: number) {
    axios.delete(`${urlReviews}/${id}`).then(() => {
      customAlert();
    });
  }

  return movie ? (
    <div style={{ marginTop: "1rem" }}>
      <h2>
        {movie.title} ({movie.releaseDate.getFullYear()})
      </h2>
      {movie.genres?.map((genre) => (
        <Link
          key={genre.id}
          style={{ marginRight: "5px" }}
          className="btn btn-primary btn-sm rounded-pill"
          to={`/movies/filter?genreId=${genre.id}`}
        >
          {genre.name}
        </Link>
      ))}{" "}
      | {movie.releaseDate.toDateString()}| Your vote:{" "}
      <Ratings
        maximumValue={5}
        selectedValue={movie.userVote}
        onChange={handleRate}
      />
      | Average vote: {movie.averageVote}
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <span style={{ display: "inline-block", marginRight: "1rem" }}>
          <img
            src={movie.poster}
            style={{ width: "225px", height: "315px" }}
            alt="poster"
          />
        </span>
        {movie.trailer ? (
          <div>
            <iframe
              title="youtube-trailer"
              width="560"
              height="315"
              src={generateEmbededVideoURL(movie.trailer)}
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
      </div>
      {movie.summary ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Summary</h3>
          <div>
            <ReactMarkdown>{movie.summary}</ReactMarkdown>
          </div>
        </div>
      ) : null}
      {movie.actors && movie.actors.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Actors</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {movie.actors?.map((actor) => (
              <div key={actor.id} style={{ marginBottom: "2px" }}>
                <img
                  alt="pic"
                  src={actor.picture}
                  style={{ width: "50px", verticalAlign: "middle" }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "200px",
                    marginLeft: "1rem",
                  }}
                >
                  {actor.name}
                </span>
                <span style={{ display: "inline-block", width: "45px" }}>
                  ...
                </span>
                <span>{actor.character}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {movie.movieTheaters && movie.movieTheaters.length > 0 ? (
        <div>
          <h2>Showing on</h2>
          <Map coordinates={transformCoordinates()} readOnly={true} />
        </div>
      ) : null}
      <div style={{ marginTop: "2rem" }}>
        <h3>My Review</h3>
        <DisplayErrors errors={errors} />
        <textarea
          id="reviewTextArea"
          name="reviewTextArea"
          rows={5}
          cols={170}
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        />
        <div className={css.alignRight}>
          <Button onClick={() => postReview()}>Post</Button>
        </div>
      </div>
      {movie.reviews?.length !== 0 ? (
        <div>
          <h3>Reviews</h3>
          {movie.reviews?.map((review) => (
            <div key={review.id} >
              <div className={css.div}>
                {review.userEmail} | {review.postingDate.toDateString()}
                <hr />
                <ReactMarkdown>{review.reviewText}</ReactMarkdown>
              </div>
              <Authorized
                role="admin"
                authorized={
                  <div className={css.alignRight}>
                    <Button
                      onClick={() =>
                        customConfirm(() => deleteReview(review.id))
                      }
                      className={"btn btn-danger"}
                    >
                      Delete
                    </Button>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  ) : (
    <Loading />
  );
}
