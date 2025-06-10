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
