// src/components/MovieCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { IMAGE_BASE_URL } from '../services/tmdbService';
import './MovieCard.css'; // Import the CSS for hover effects

const MovieCard = ({ movie }) => {
  console.log('MovieCard componetnt movie: ', movie)
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder if no poster

  return (
    <Card className="movie-card bg-dark text-white">
      <Card.Img variant="top" src={posterUrl} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          Release: {movie.release_date || 'N/A'} <br />
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;