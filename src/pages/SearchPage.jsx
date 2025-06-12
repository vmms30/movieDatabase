// src/pages/SearchPage.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Alert } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import PaginationComponent from '../components/PaginationComponent';
import { searchMovies, getMovieGenres } from '../services/tmdbService';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); // For client-side genre filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // To prevent "No results" on first load

  const debounceTimeoutRef = useRef(null);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getMovieGenres();
      } catch (err) {
        console.error("Failed to fetch genres", err);
        // setError("Could not load genres for filtering."); // Optional: show error for genres
      }
    };
    fetchGenres();
  }, []);

  // API call function
  const performSearch = useCallback(async (query, page, year) => {
    if (!query.trim()) {
      setSearchResults([]);
      setFilteredResults([]);
      setTotalPages(0);
      setCurrentPage(1);
      setNoResults(false);
      setInitialLoad(true); // Reset initial load state
      return;
    }

    setLoading(true);
    setError(null);
    setNoResults(false);
    setInitialLoad(false);

    try {
      const data = await searchMovies(query,);
      setSearchResults(data.results || []);
      setTotalPages(data.total_pages || 0);
      setCurrentPage(data.page || 1);
      if (data.results && data.results.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      setSearchResults([]);
      setTotalPages(0);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search effect for query and year changes
  useEffect(() => {
    if (initialLoad && !searchQuery.trim()) { // Don't trigger search on initial load if query is empty
        return;
    }
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      // When query or year changes, reset to page 1
      setCurrentPage(1); 
      performSearch(searchQuery, 1,);
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [performSearch, initialLoad]);


  // Effect for page changes (no debounce needed)
  useEffect(() => {
    if (!initialLoad && searchQuery.trim()) { // Only search if not initialLoad or if query is not empty
      performSearch(searchQuery, currentPage, yearFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [currentPage]); // We only want this to run for currentPage changes, performSearch handles others

  // Client-side filtering for genre
  useEffect(() => {
    
    const clientFiltered = searchResults.filter(movie => 
      movie.genre_ids 
    );
    setFilteredResults(clientFiltered);
    if (searchResults.length > 0 && clientFiltered.length === 0) {
        setNoResults(true); // If API returned results but genre filter made it empty
    } else if (clientFiltered.length > 0) {
        setNoResults(false);
    }
  }, [ searchResults]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    // The useEffect for currentPage changes will trigger the search
  };
  
  const handleSearchSubmit = () => {
    // This function can be used if you want an explicit search button press
    // to trigger the search, rather than just debouncing.
    // For now, debouncing handles it. If you want button press:
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    setCurrentPage(1); // Reset to page 1 on new explicit search
    performSearch(searchQuery,);
  };


  return (
    <div style={{ backgroundColor: '#141414', color: 'white', minHeight: '100vh', paddingTop: '20px', paddingBottom: '20px' }}>
      <Container>
        <h1 className="mb-4 text-center">Movie Search</h1>
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSubmit={handleSearchSubmit} // Trigger search on form submit (e.g. pressing Enter)
        />

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        
        {loading && <LoadingSpinner />}

        {!loading && !error && noResults && searchQuery.trim() && !initialLoad && (
          <Alert variant="info" className="mt-3 text-center">
            No movies found matching your criteria. Try different keywords or filters.
          </Alert>
        )}
        
        {!loading && !error && !noResults && filteredResults.length > 0 && (
          <>
            <MovieGrid movies={filteredResults} />
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
        
        {/* Helper text for initial state or empty query */}
        {!loading && !error && filteredResults.length === 0 && !noResults && (initialLoad || !searchQuery.trim()) && (
          <p className="text-center mt-3">Please enter a search term to find movies.</p>
        )}

      </Container>
    </div>
  );
};

export default SearchPage;