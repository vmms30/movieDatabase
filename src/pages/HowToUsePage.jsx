import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './HowToUsePage.css';

const HowToUsePage = () => {
  return (
    <Container className="mt-4 how-to-use-container">
      <h1>How to Use This Website</h1>
      <p>
        Welcome to the Movie Database! This website allows you to browse, search, and discover movies and TV shows.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>
          <strong>Browse:</strong> Navigate through pages of popular movies and TV shows.
        </li>
        <li>
          <strong>Search:</strong> Use the search bar to find specific movies, TV shows, or people.
        </li>
        <li>
          <strong>Details:</strong> Click on any movie or TV show to see more details, including cast, crew, and reviews.
        </li>
        <li>
          <strong>Favorites:</strong> You can add your favorite movies and TV shows to a personal list.
        </li>
      </ul>
      <p>
        Ready to get started? Click the button below to begin browsing.
      </p>
      <Link to="/">
        <Button variant="primary">Start Browsing</Button>
      </Link>
    </Container>
  );
};

export default HowToUsePage;
