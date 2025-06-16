// src/components/MovieGrid.jsx
import React, { useState, useEffect, useMemo } from "react"; // Added useMemo
import { Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import { getFavoritesFromStorage } from "../utils/localStorage"; // You'll use this directly

// MovieGrid now only needs 'movies' and 'toggleFavorite' from its parent.
// It will determine 'isFavorite' itself.
const MovieGrid = ({ movies, toggleFavorite }) => {
  // We don't need to store the full favorite movies objects in MovieGrid's state,
  // just the IDs for quick lookup, and we can get this fresh on each render
  // or memoize it if performance becomes an issue with very frequent re-renders.

  // useMemo will re-calculate favoriteIdsSet only when 'movies' changes.
  // This is an optimization. If 'movies' doesn't change often, or if getFavoritesFromStorage
  // is very fast, you might not even need useMemo and could calculate it directly in the map.
  // However, for potentially frequent re-renders of MovieGrid, memoizing is good.
  const favoriteIdsSet = useMemo(() => {
    // console.log("MovieGrid: Recalculating favoriteIdsSet");
    const favoriteMoviesFromStorage = getFavoritesFromStorage();
    return new Set(favoriteMoviesFromStorage.map((fav) => fav.id));
  }, [movies]); // Recompute when the list of 'movies' to display changes.
  // This dependency is a bit broad. If localStorage favorites change
  // independently, this set won't update until 'movies' prop changes.
  // This highlights why central state management (like in App.jsx) is usually better.

  if (!movies || movies.length === 0) {
    return <p className="text-light text-center mt-4">No movies to display.</p>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
      {" "}
      {/* Adjusted lg breakpoint */}
      {movies.map((movie) => {
        if (!movie || typeof movie.id === "undefined") {
          return null;
        }

        // Determine if the current movie is a favorite by checking our memoized set of IDs
        const isCurrentlyFavorite = favoriteIdsSet.has(movie.id);
        // console.log(`MovieGrid: Movie ID ${movie.id} (${movie.title}), isFavorite: ${isCurrentlyFavorite}`);

        return (
          <Col key={movie.id} className="d-flex align-items-stretch">
            <MovieCard
              movie={movie}
              isFavorite={isCurrentlyFavorite} // Directly determined 'isFavorite' status
              onToggleFavorite={toggleFavorite} // This prop is still ESSENTIAL
              // It must come from App.jsx to update
              // localStorage and App's central state.
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default MovieGrid;
