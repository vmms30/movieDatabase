// src/components/MovieCard.js
import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { IMAGE_BASE_URL } from "../services/tmdbService";
import "./MovieCard.css";
import {
  addFavoriteToStorage,
  removeFavoriteFromStorage,
} from "../utils/localStorage";

// Props:
// - movie: The movie object to display.
// - isFavorite: A boolean indicating if this movie is currently a favorite.
// - onToggleFavorite: A function to call when the favorite status should be changed.
//                     This function is expected to take the 'movie' object as an argument.
const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  useEffect(() => {}, [isFavorite]);
  if (!movie || typeof movie.id === "undefined") {
    return null;
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  // This is the function called when the heart button is clicked
  const handleFavoriteClick = (e) => {
    // console.log('Heart icon clicked for movie:', movie.title);
    e.preventDefault(); // Prevent the parent Link from navigating
    e.stopPropagation(); // Stop the click event from bubbling to the parent Link

    // Crucial part: Call the onToggleFavorite prop passed from the parent.
    // The parent component (e.g., App.jsx or a state management context)
    // is responsible for the actual logic of adding/removing from favorites
    // (whether it's localStorage or an API call).
    // if (onToggleFavorite) {
    //   onToggleFavorite(movie); // Pass the full movie object
    // } else {
    //   console.warn("MovieCard: onToggleFavorite prop is not defined!");
    // }
  };

  const addToLocalStorage = () => {
    const additionResonse = addFavoriteToStorage(movie);
  };

  const removeFromLocalStorage = () => {
    const removalResponse = removeFavoriteFromStorage(movie.id);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", display: "flex", width: "100%" }}
      className="movie-card-link-wrapper"
    >
      <Card className="movie-card bg-dark text-white h-100 d-flex flex-column">
        <Card.Img
          variant="top"
          src={posterUrl}
          alt={movie.title || "Movie poster"}
        />
        <Card.Body className="d-flex flex-column flex-grow-1">
          <Card.Title className="movie-card-title" title={movie.title}>
            {movie.title || "Untitled Movie"}
          </Card.Title>
          <div className="mt-auto">
            {" "}
            {/* Pushes this block to the bottom */}
            <Card.Text className="mb-1">
              <small>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
                {" | "}
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                <span role="img" aria-label="star" style={{ color: "#ffc107" }}>
                  ⭐
                </span>
              </small>
            </Card.Text>
            {/* This Button IS the heart icon click handler */}
            <Button
              variant="link"
              onClick={handleFavoriteClick} // <--- THIS IS WHERE THE MAGIC HAPPENS
              className="p-0 text-danger favorite-button"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              style={{ lineHeight: 1 }}
            >
              {/* Conditional rendering of HeartFill or Heart based on isFavorite prop */}
              {isFavorite ? (
                <HeartFill
                  onClick={removeFromLocalStorage(movie.id)}
                  size={22}
                />
              ) : (
                <Heart onClick={addToLocalStorage} size={22} />
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;
