// src/App.jsx
import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Your Page Imports
import Home from './pages/Home'; // Assuming this is your trending movies page
import FavouritesPage from './pages/FavoritesPage'; // Corrected spelling based on your import
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

// Your Component Imports
import Navigation from './components/Navigation';

// localStorage Utilities (ensure this path is correct)
import {
  getFavoritesFromStorage,
  addFavoriteToStorage,
  removeFavoriteFromStorage,
  isFavoriteInStorage as checkIsFavoriteInStorage // Renamed for clarity within App
} from './utils/localStorage'; // Make sure this path is correct

// CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    setFavorites(getFavoritesFromStorage());
  }, []);

  // Function to toggle a movie's favorite status
  const toggleFavorite = (movie) => {
    if (!movie || typeof movie.id === 'undefined') {
      console.error("Attempted to toggle favorite for an invalid movie object:", movie);
      return;
    }
    let updatedFavorites;
    if (checkIsFavoriteInStorage(movie.id)) {
      updatedFavorites = removeFavoriteFromStorage(movie.id);
    } else {
      updatedFavorites = addFavoriteToStorage(movie);
    }
    setFavorites(updatedFavorites);
  };

  // Function to check if a movie is a favorite (using current state)
  const isFavoriteMovie = (movieId) => {
    if (typeof movieId === 'undefined') return false;
    return !!favorites.find(fav => fav.id === movieId);
  };

  return (
    <div className="App">
      <Router> {/* Router should be the outermost component for routing context */}
        <Navigation favoritesCount={favorites.length} /> {/* Pass count to Navbar */}
        <Container fluid style={{ paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: '#141414', minHeight: 'calc(100vh - 56px)' }}> {/* 56px is typical Navbar height */}
          <Routes>
            <Route
              path="/"
              element={<SearchPage toggleFavorite={toggleFavorite} isFavoriteMovie={isFavoriteMovie} />}
            />
            <Route
              path='/favourites' // Or '/favorites' to be consistent
              element={<FavouritesPage favorites={favorites} toggleFavorite={toggleFavorite} isFavoriteMovie={isFavoriteMovie} />}
            />
            <Route
              path="/trending"
              element={<Home toggleFavorite={toggleFavorite} isFavoriteMovie={isFavoriteMovie} />}
            />
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage toggleFavorite={toggleFavorite} isFavoriteMovie={isFavoriteMovie} />}
            />
            {/* Example 404 route:
            <Route path="*" element={
              <div className="text-center text-light mt-5">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
            */}
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;