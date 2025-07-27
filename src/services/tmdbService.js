// src/services/tmdbService.js
import axios from "axios";

const API_KEY = "189eae0805817e6d9daf2632ae56dbda"; //process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // For poster images
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280"; // For larger backdrop images
export const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185"; // For cast profile images

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-us",
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

// NEW: Get Movie Details, Credits, and Videos in one call
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "credits,videos,recommendations,reviews", // Fetch credits, videos, and recommendations
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};


// NEW: Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await apiClient.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page: page,
        sort_by: 'popularity.desc' // Sort by popularity
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies for genre ID ${genreId}:`, error);
    throw error;
  }
};

export const getPopularTVShows = async (page = 1) => {
  const response = await apiClient.get('/tv/popular', { params: { page } });
  return response.data;
};

export const getTVShowDetails = async (seriesId) => {
  const response = await apiClient.get(`/tv/${seriesId}`, {
    params: { append_to_response: 'credits,videos,recommendations' },
  });
  return response.data;
};

export const getPersonDetails = async (personId) => {
  const response = await apiClient.get(`/person/${personId}`, {
    params: { append_to_response: 'combined_credits' },
  });
  return response.data;
};

export const searchTVShows = async (query, page = 1) => {
  const response = await apiClient.get('/search/tv', {
    params: { query, page },
  });
  return response.data;
};
