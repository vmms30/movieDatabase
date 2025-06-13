// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import PaginationComponent from '../components/PaginationComponent';
import { searchMovies } from '../services/tmdbService';

const SearchPage = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Main search function
  const performSearch = async (query, page = 1) => {
    // Clear query - reset state
    if (!query?.trim()) {
      setMovies([]);
      setTotalPages(0);
      setCurrentPage(1);
      setError(null);
      setHasSearched(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchMovies(query, page);
      
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 0);
      setCurrentPage(data.page || 1);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      setMovies([]);
      setTotalPages(0);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    performSearch(searchQuery, page);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    performSearch(searchQuery, 1);
  };

  // Handle search query changes
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  // Computed values
  const showMovies = !loading && !error && movies.length > 0;
  const showNoResults = !loading && !error && hasSearched && movies.length === 0;
  const showInitialMessage = !loading && !error && !hasSearched && !searchQuery.trim();

  return (
    <div 
      className="container-sm container-md container-lg container-xl container-xxl"
      style={{ 
        backgroundColor: '#141414', 
        color: 'white', 
        minHeight: '100vh', 
        paddingTop: '20px', 
        paddingBottom: '20px',
        minWidth: '60vw'
      }}
    >
      <div className="bg-dark text-light p-5 mb-4 rounded-3" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg')`, // Example backdrop
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container fluid py={5}>
          <h1 className="display-5 fw-bold">Welcome to MovieFlix</h1>
          <p className="col-md-8 fs-4">
            Discover the latest and greatest movies. Explore popular, trending, and top-rated films.
          </p>
          {/* You can add a call to action button here if needed */}
        </Container>
      </div>
      <h1 className="mb-4 text-center">Movie Search</h1>
      
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSubmit={handleSearchSubmit}
      />

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      
      {loading && <LoadingSpinner />}

      {showNoResults && (
        <Alert variant="info" className="mt-3 text-center">
          No movies found for "{searchQuery}". Try different keywords.
        </Alert>
      )}
      
      {showMovies && (
        <>
          <MovieGrid movies={movies} />
          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      
      {showInitialMessage && (
        <p className="text-center mt-3">
          Please enter a search term to find movies.
        </p>
      )}
    </div>
  );
};

export default SearchPage;