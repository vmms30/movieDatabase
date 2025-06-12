// src/components/MovieCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import { IMAGE_BASE_URL } from '../services/tmdbService';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    // Wrap Card with Link
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
      <Card className="movie-card bg-dark text-white h-100"> {/* h-100 for equal height potential */}
        <Card.Img variant="top" src={posterUrl} alt={movie.title} />
        <Card.Body className="d-flex flex-column"> {/* Flex column for content alignment */}
          <Card.Title className="flex-grow-1">{movie.title}</Card.Title> {/* flex-grow-1 to push text down */}
          <Card.Text>
            Release: {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} <br />
            Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;