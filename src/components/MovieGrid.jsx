import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import MovieCard from "./MovieCard";
import {
  addFavoriteToStorage,
  removeFavoriteFromStorage,
  getFavoritesFromStorage,
} from "../utils/localStorage";
import "./MovieGrid.css";

const MovieGrid = ({
  movies = [],
  loading = false,
  error = null,
  title = "Movies",
  showLoadMore = false,
  onLoadMore = null,
  loadingMore = false,
}) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = getFavoritesFromStorage();
    setFavorites(storedFavorites);
  }, []);

  // Handle toggling favorite status
  const handleToggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      // Remove from favorites
      removeFavoriteFromStorage(movie.id);
      setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
    } else {
      // Add to favorites
      addFavoriteToStorage(movie);
      setFavorites((prev) => [...prev, movie]);
    }
  };

  // Check if a movie is in favorites
  const isMovieFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  if (loading && movies.length === 0) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading movies...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Movies</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">
          <Alert.Heading>No Movies Found</Alert.Heading>
          <p>No movies match your current search or filter criteria.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="movie-grid-container">
      {title && (
        <Row className="mb-4">
          <Col>
            <h2 className="text-white">{title}</h2>
          </Col>
        </Row>
      )}

      <Row className="movie-grid-row">
        {movies.map((movie) => (
          <Col
            key={movie.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="mb-4"
          >
            <MovieCard
              movie={movie}
              isFavorite={isMovieFavorite(movie.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          </Col>
        ))}
      </Row>

      {showLoadMore && onLoadMore && (
        <Row className="mt-4 mb-4">
          <Col className="text-center">
            <Button
              variant="outline-light"
              onClick={onLoadMore}
              disabled={loadingMore}
              size="lg"
            >
              {loadingMore ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading More...
                </>
              ) : (
                "Load More Movies"
              )}
            </Button>
          </Col>
        </Row>
      )}

      {loading && movies.length > 0 && (
        <Row className="mt-4">
          <Col className="text-center">
            <Spinner animation="border" variant="light" />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MovieGrid;
