import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Container, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import PaginationComponent from '../components/PaginationComponent';
import { searchMovies, getMovieGenres, getMoviesByGenre } from '../services/tmdbService';

const HomePage = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Genre state
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getMovieGenres();
        setGenres(fetchedGenres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const data = await searchMovies(searchQuery, 1);
        setSuggestions(data.results.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Main search function
  const performSearch = async (query, page = 1) => {
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
    setSelectedGenre(null);
    setSuggestions([]);

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

  const fetchByGenre = async (genreId, page = 1) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchQuery('');
    setSelectedGenre(genreId);

    try {
      const data = await getMoviesByGenre(genreId, page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 0);
      setCurrentPage(data.page || 1);
    } catch (err) {
      setError('Failed to fetch movies for this genre. Please try again.');
      setMovies([]);
      setTotalPages(0);
      console.error('Genre fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (selectedGenre) {
      fetchByGenre(selectedGenre, page);
    } else {
      performSearch(searchQuery, page);
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    performSearch(searchQuery, 1);
  };

  // Handle search query changes
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleGenreClick = (genreId) => {
    fetchByGenre(genreId, 1);
  };

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    performSearch(query, 1);
  };

  // Computed values
  const showMovies = !loading && !error && movies.length > 0;
  const showNoResults = !loading && !error && hasSearched && movies.length === 0;
  const showInitialMessage = !loading && !error && !hasSearched && !searchQuery.trim() && !selectedGenre;

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
        </Container>
      </div>
      <h1 className="mb-4 text-center">Movie Search</h1>
      
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSubmit={handleSearchSubmit}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />

      <div className="text-center my-4">
        {genres.map(genre => (
          <Button 
            key={genre.id} 
            variant={selectedGenre === genre.id ? "primary" : "outline-light"} 
            onClick={() => handleGenreClick(genre.id)}
            className="m-1"
          >
            {genre.name}
          </Button>
        ))}
      </div>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      
      {loading && <LoadingSpinner />}

      {showNoResults && (
        <Alert variant="info" className="mt-3 text-center">
          No movies found. Try different keywords or genres.
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
          Please enter a search term or select a genre to find movies.
        </p>
      )}
    </div>
  );
};

export default HomePage;