// src/services/tmdbService.js
import axios from "axios";

const API_KEY = "189eae0805817e6d9daf2632ae56dbda"; //process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // For poster images

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await apiClient.get("/movie/popular", {
      params: { page },
    });
    return response.data; // Contains results, page, total_pages, total_results
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error; // Re-throw to be caught by the component
  }
};

export const getTrendingMovies = async (timeWindow = "day") => {
  // timeWindow can be 'day' or 'week'
  try {
    const response = await apiClient.get(`/trending/movie/${timeWindow}`);
    return response.data.results; // Trending API returns results directly
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// You could add more functions here, e.g., getMovieDetails, searchMovies etc.

// NEW: Function to search movies
export const searchMovies = async (query, page = 1, year = null) => {
  try {
    const params = { query, page };
    if (year && year.length === 4 && !isNaN(year)) {
      // Basic year validation
      params.primary_release_year = year;
    }
    // Note: The /search/movie endpoint does not directly support genre_ids as a filter.
    // Genre filtering on search results would typically be done client-side on the current page's results,
    // or by using the /discover/movie endpoint if genre is a primary criterion (which has its own complexities).
    // For this "basic implementation", we'll pass the year and handle genre filtering client-side if applied.
    const response = await apiClient.get("/search/movie", { params });
    return response.data; // Contains results, page, total_pages, total_results
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// NEW: Function to get movie genres
export const getMovieGenres = async () => {
  try {
    const response = await apiClient.get("/genre/movie/list");
    return response.data.genres; // Array of {id, name}
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};
