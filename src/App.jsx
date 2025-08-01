import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation";
import TVShowsPage from "./pages/TVShowsPage";
import TVShowDetailsPage from "./pages/TVShowDetailsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import HowToUsePage from "./pages/HowToUsePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tv" element={<TVShowsPage />} />
            <Route path="/tv/:id" element={<TVShowDetailsPage />} />
            <Route path="/person/:id" element={<PersonDetailsPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/trending" element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movieDatabase" element={<HowToUsePage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
