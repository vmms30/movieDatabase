// src/components/Navigation.js
import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'; // Import Badge
import { Link } from 'react-router-dom';
import { HeartFill } from 'react-bootstrap-icons'; // Optional: for a nice icon next to Favorites

// Accept favoritesCount prop
const Navigation = ({ favoritesCount }) => {
  return (
    // Consider if `fixed="top"` is desired. If so, you'll need to add padding to the top of your main content area
    // in App.jsx or App.css to prevent content from being hidden underneath the navbar.
    // Removing fixed="top" makes it a static top bar.
    // className="mb-4" is good if it's not fixed, otherwise it has no effect on layout.
    <Navbar bg="dark" variant="dark" expand="sm" sticky="top" className="mb-3"> 
      <Container fluid> {/* Using fluid for potentially wider navbar content area */}
        <Navbar.Brand as={Link} to="/">
          MovieFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"> {/* This currently points to SearchPage in your App.jsx */}
              Search 
            </Nav.Link>
            <Nav.Link as={Link} to="/trending"> {/* This currently points to Home/Trending page */}
              Trending
            </Nav.Link>
            <Nav.Link as={Link} to="/favourites"> {/* Link to Favorites page */}
              <HeartFill size={16} className="me-1" aria-hidden="true" /> {/* Optional icon */}
              Favorites
              {/* Display badge only if there are favorites */}
              {favoritesCount > 0 && (
                <Badge pill bg="primary" className="ms-1">
                  {favoritesCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;