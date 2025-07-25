import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { IMAGE_BASE_URL } from "../services/tmdbService";
import "./MovieCard.css";

const MovieCard = ({ movie, isFavorite = false, onToggleFavorite }) => {
  if (!movie || typeof movie.id === "undefined") {
    return null;
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent the parent Link from navigating
    e.stopPropagation(); // Stop event bubbling

    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
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
          loading="lazy"
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
              onClick={handleFavoriteClick}
              className="favorite-button-overlay"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <HeartFill size={24} className="heart-icon heart-filled" />
              ) : (
                <Heart size={24} className="heart-icon heart-empty" />
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;
