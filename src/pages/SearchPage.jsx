// src/pages/SearchPage.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import PaginationComponent from '../components/PaginationComponent';
import { searchMovies, getMovieGenres } from '../services/tmdbService';

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
  
  // Refs
  const debounceTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Initialize genres on mount
  useEffect(() => {
    const initializeGenres = async () => {
      try {
        await getMovieGenres();
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    initializeGenres();
  }, []);

  // Cleanup function for ongoing requests
  const cleanup = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Main search function
  const performSearch = useCallback(async (query, page = 1) => {
    // Clear query - reset state
    if (!query?.trim()) {
      setMovies([]);
      setTotalPages(0);
      setCurrentPage(1);
      setError(null);
      setHasSearched(false);
      return;
    }

    // Cancel any ongoing request
    cleanup();
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchMovies(query, page, {
        signal: abortControllerRef.current.signal
      });
      
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 0);
      setCurrentPage(data.page || 1);
    } catch (err) {
      // Don't show error if request was aborted
      if (err.name !== 'AbortError') {
        setError('Failed to fetch search results. Please try again.');
        setMovies([]);
        setTotalPages(0);
        console.error('Search error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [cleanup]);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery, 1);
    }, 500);

    return cleanup;
  }, [searchQuery, performSearch, cleanup]);

  // Handle page changes
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    performSearch(searchQuery, page);
  }, [searchQuery, performSearch]);

  // Handle manual search submission
  const handleSearchSubmit = useCallback(() => {
    cleanup();
    performSearch(searchQuery, 1);
  }, [searchQuery, performSearch, cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Computed values
  const showMovies = !loading && !error && movies.length > 0;
  const showNoResults = !loading && !error && hasSearched && movies.length === 0;
  const showInitialMessage = !loading && !error && !hasSearched && !searchQuery.trim();

  return (
    <div 
    class={"container-sm container-md ontainer-lg container-xl container-xxl"}
    style={{ 
      backgroundColor: '#141414', 
      color: 'white', 
      minHeight: '100vh', 
      paddingTop: '20px', 
      paddingBottom: '20px' ,
      minWidth:'60vw'

    }}
    >
      
        <h1 className="mb-4 text-center">Movie Search</h1>
        
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
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