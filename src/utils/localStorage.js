// src/utils/localStorage.js

const FAVORITES_KEY = "movieAppFavorites";

// Get all favorites from localStorage
export const getFavoritesFromStorage = () => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Error parsing favorites from localStorage:", error);
    return []; // Return empty array on error
  }
};

// Save all favorites to localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    const favoritesJson = JSON.stringify(favorites);
    localStorage.setItem(FAVORITES_KEY, favoritesJson);
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
    // Potentially handle quota exceeded errors or other storage issues
  }
};

// Add a movie to favorites
export const addFavoriteToStorage = (movie) => {
  const favorites = getFavoritesFromStorage();
  if (!favorites.find((fav) => fav.id === movie.id)) {
    const updatedFavorites = [...favorites, movie];
    saveFavoritesToStorage(updatedFavorites);
    return updatedFavorites;
  }
  return favorites; // Return existing if already there
};

// Remove a movie from favorites by ID
export const removeFavoriteFromStorage = (movieId) => {
  const favorites = getFavoritesFromStorage();
  const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
  saveFavoritesToStorage(updatedFavorites);
  return updatedFavorites;
};

// Check if a movie is a favorite by ID
export const isFavoriteInStorage = (movieId) => {
  const favorites = getFavoritesFromStorage();
  return !!favorites.find((fav) => fav.id === movieId);
};
