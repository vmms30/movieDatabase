// src/components/MovieGrid.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies to display.</p>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
      {movies.map((movie) => (
        <Col key={movie.id} className="d-flex"> {/* d-flex for equal height cards in a row */}
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieGrid;