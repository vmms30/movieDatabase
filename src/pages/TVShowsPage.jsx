import React, { useState, useEffect } from "react";
import { getPopularTVShows, searchTVShows } from "../services/tmdbService";
import MovieCard from "../components/MovieCard";
import PaginationComponent from "../components/PaginationComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { Alert } from "react-bootstrap";

const TVShowsPage = () => {
  const [tvShows, setTVShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchTVShows = async (page) => {
    setLoading(true);
    try {
      const data = await getPopularTVShows(page);
      setTVShows(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query, page) => {
    if (!query?.trim()) {
      fetchTVShows(1);
      return;
    }
    setLoading(true);
    try {
      const data = await searchTVShows(query, page);
      setTVShows(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error searching TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.trim() === "") {
      fetchTVShows(currentPage);
    } else {
      performSearch(searchQuery, currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const data = await searchTVShows(searchQuery, 1);
        setSuggestions(data.results.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    performSearch(searchQuery, 1);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    performSearch(query, 1);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Popular TV Shows</h1>
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onSubmit={handleSearchSubmit}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {tvShows.length > 0 ? (
            <div className="row">
              {tvShows.map((tvShow) => (
                <div key={tvShow.id} className="col-md-3 mb-4">
                  <MovieCard movie={tvShow} mediaType="tv" />
                </div>
              ))}
            </div>
          ) : (
            <Alert variant="info" className="mt-3 text-center">
              No TV shows found.
            </Alert>
          )}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default TVShowsPage;
