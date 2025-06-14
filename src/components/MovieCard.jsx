// src/components/MovieCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap'; // Added Button
import { Link } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons'; // Import heart icons
import { IMAGE_BASE_URL } from '../services/tmdbService';
import './MovieCard.css'; // Ensure you have this file and it's styled appropriately

// Accept isFavorite and onToggleFavorite props
const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  // Basic guard against undefined movie prop
  if (!movie || typeof movie.id === 'undefined') {
    // Optionally, render a placeholder or null, or log an error
    // console.error("MovieCard received an invalid movie prop:", movie);
    return null; 
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleFavoriteClick = (e) => {
    console.log('e type : ', e
      
    )
    e.preventDefault(); // Important: Prevent the Link navigation when only the button is clicked
    e.stopPropagation(); // Stop event from bubbling up to the Link parent
    if (onToggleFavorite) {
      onToggleFavorite(movie); // Pass the full movie object
    }
  };

  return (
    // The outer Link makes the whole card (except the button) clickable for navigation
    <Link 
      to={`/movie/${movie.id}`} 
      style={{ textDecoration: 'none', display: 'flex', width: '100%' }}
      className="movie-card-link-wrapper" // Added a class for potential specific styling
    >
      <Card className="movie-card bg-dark text-white h-100 d-flex flex-column"> {/* Ensure card itself uses flex for body */}
        <Card.Img variant="top" src={posterUrl} alt={movie.title || "Movie poster"} />
        <Card.Body className="d-flex flex-column flex-grow-1"> {/* flex-grow-1 to make body take remaining space */}
          <Card.Title className="movie-card-title" title={movie.title}>
            {movie.title || "Untitled Movie"}
          </Card.Title>
          <div className="mt-auto"> {/* This div will be pushed to the bottom of Card.Body */}
            <Card.Text className="mb-1"> {/* Reduced margin */}
              <small>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                {' | '}
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                <span role="img" aria-label="star" style={{color: '#ffc107'}}>⭐</span>
              </small>
            </Card.Text>
            <Button
              variant="link" // Use "link" variant for a less obtrusive button style
              onClick={handleFavoriteClick}
              className="p-0 text-danger favorite-button" // text-danger for red heart, p-0 to remove padding
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              style={{ lineHeight: 1 }} // Helps with icon vertical alignment
            >
              {isFavorite ? <HeartFill size={22} /> : <Heart size={22} />}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;