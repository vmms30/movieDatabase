// src/components/MovieGrid.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

// Now accepts isFavoriteMovie and toggleFavorite as props
const MovieGrid = ({ movies, isFavoriteMovie, toggleFavorite }) => {
  if (!movies || movies.length === 0) {
    // Make the "No movies" message more visible on a dark background
    return <p className="text-light text-center mt-4">No movies to display.</p>;
  }

  return (
    // Your responsive breakpoints: xs={1} sm={2} md={3} lg={5} xl={5}
    // Note: lg={5} and xl={5} are the same. You might want lg={4} xl={5} or similar progression.
    // I'll keep your specified values.
    <Row xs={1} sm={2} md={3} lg={5} xl={5} className="g-4">
      {movies.map((movie) => {
        // Defensive check for movie object and id, although data should be clean by this point
        if (!movie || typeof movie.id === 'undefined') {
          // console.warn("MovieGrid encountered an invalid movie object:", movie);
          return null; // Skip rendering this invalid item
        }

        // Determine if the current movie is a favorite
        // Ensure isFavoriteMovie is a function before calling it
        const isCurrentlyFavorite = typeof isFavoriteMovie === 'function' 
                                      ? isFavoriteMovie(movie.id) 
                                      : false;

        return (
          <Col key={movie.id} className="d-flex"> {/* d-flex for equal height cards in a row */}
            <MovieCard
              movie={movie}
              isFavorite={isCurrentlyFavorite} // Pass the determined favorite status
              onToggleFavorite={toggleFavorite} // Pass the toggle function directly
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default MovieGrid;