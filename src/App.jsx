// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import SearchPage from './pages/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Navigation from './components/Navigation'; // Import Navigation
// Ensure Bootstrap CSS is imported in src/index.js or here (once)
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation /> {/* Add Navigation bar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} /> {/* Route for movie details */}
          {/* You can add a 404 Not Found route here later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;