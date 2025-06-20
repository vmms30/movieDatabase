// src/pages/FavoritesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAccountFavoriteMoviesAPI } from '../services/tmdbService'; // Ensure this path is correct

const FavoritesPage = ({ 
  accountId, 
  sessionId, 
  isLoggedIn, 
  toggleFavorite, // This is the API-aware toggleFavorite from App.jsx
  isFavoriteMovie // This is the API-aware isFavoriteMovie from App.jsx
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Callback to fetch favorite movies from the API
  const fetchApiFavorites = useCallback(async (pageToFetch) => {
    if (!isLoggedIn || !accountId || !sessionId) {
      // Clear movies and reset pagination if not logged in or essential IDs are missing
      setMovies([]);
      setCurrentPage(1);
      setTotalPages(0);
      setLoading(false); // Ensure loading is false
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // console.log(`FavoritesPage: Fetching page ${pageToFetch} for account ${accountId}`);
      const data = await getAccountFavoriteMoviesAPI(accountId, sessionId, pageToFetch);
      // console.log('FavoritesPage: API Data Received:', data);
      
      setMovies(prevMovies => 
        pageToFetch === 1 ? (data.results || []) : [...prevMovies, ...(data.results || [])]
      );
      setCurrentPage(data.page || 1);
      setTotalPages(data.total_pages || 0);
    } catch (err) {
      console.error("FavoritesPage: Failed to fetch account favorites:", err);
      setError("Could not load your favorite movies. Please try again later.");
      // Don't clear movies on subsequent page load errors, only on initial or auth failure
      if (pageToFetch === 1) {
        setMovies([]);
        setCurrentPage(1);
        setTotalPages(0);
      }
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, accountId, sessionId]); // Dependencies for the fetch function itself

  // Effect to fetch initial favorites when the component mounts or auth state changes
  useEffect(() => {
    // console.log("FavoritesPage: useEffect triggered. isLoggedIn:", isLoggedIn, "accountId:", accountId);
    if (isLoggedIn && accountId && sessionId) {
      fetchApiFavorites(1); // Fetch the first page
    } else {
      // Clear data if not logged in
      setMovies([]);
      setCurrentPage(1);
      setTotalPages(0);
      setError(null);
    }
    // The dependency array includes fetchApiFavorites to re-run if the function identity changes (due to its own deps changing)
    // However, to ensure it fetches on initial valid login, isLoggedIn and accountId are key direct dependencies.
  }, [isLoggedIn, accountId, sessionId, fetchApiFavorites]); 

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      fetchApiFavorites(currentPage + 1);
    }
  };

  // --- Render Logic ---

  if (!isLoggedIn) {
    return (
      <Container className="text-center mt-5 text-light">
        <Alert variant="info" className="bg-secondary border-secondary text-white">
          <h2>Login Required</h2>
          <p>Please log in to view your TMDB favorite movies.</p>
          {/* You would ideally have a Link to your login page here */}
          {/* <Link to="/login" className="btn btn-primary mt-2">Login with TMDB</Link> */}
          <p className="mt-3">
            If you don't have an account, you can still browse movies.
          </p>
          <Link to="/" className="btn btn-outline-light mt-2">Browse Movies</Link>
        </Alert>
      </Container>
    );
  }

  // Show loading spinner only for the initial page load
  if (loading && currentPage === 1) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="text-center mt-5 text-light">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => fetchApiFavorites(1)}>Try Again</Button>
      </Container>
    );
  }

  // After initial load, if no movies are found
  if (!loading && movies.length === 0 && isLoggedIn) {
    return (
      <Container className="text-center mt-5 text-light">
        <Alert variant="info" className="bg-secondary border-secondary text-white">
          <h2>No Favorites Yet!</h2>
          <p>You haven't added any movies to your TMDB favorites list.</p>
          <p>Go explore and add some!</p>
          <Link to="/" className="btn btn-primary mt-2">Discover Movies</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#141414', color: 'white', minHeight: '100vh', paddingTop: '20px', paddingBottom: '20px' }}>
      <Container>
        <h1 className="mb-4 text-center">Your TMDB Favorite Movies</h1>
        {movies.length > 0 && (
          <MovieGrid
            movies={movies}
            // Pass down the API-aware functions from App.jsx
            toggleFavorite={toggleFavorite}
            isFavoriteMovie={isFavoriteMovie}
            onToggleFavorite={toggleFavorite}
          />
        )}
        
        {/* Load More Button and its specific loading indicator */}
        {currentPage < totalPages && !loading && (
            <div className="text-center mt-4 mb-4">
              <Button 
                variant="primary" 
                onClick={handleLoadMore}
                disabled={loading} // Disable if already loading more
              >
                Load More Favorites
              </Button>
            </div>
          )}
        {/* Inline loading indicator for "Load More" action */}
        {loading && currentPage > 1 && (
            <div className="text-center mt-4 mb-4">
                <LoadingSpinner /> {/* Or a smaller spinner variant */}
            </div>
        )}
      </Container>
    </div>
  );
};

export default FavoritesPage;