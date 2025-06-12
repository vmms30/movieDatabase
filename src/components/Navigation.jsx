import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Navigation = () => {
  const navigate = useNavigate(); // For programmatic navigation if needed, though 'as={Link}' is often sufficient

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container>
        {/*
          Method 1: Using 'as' prop (preferred for Nav.Link, Navbar.Brand)
          This tells React Bootstrap to render the component as a React Router Link.
        */}
        <Navbar.Brand as={Link} to="/">
          MovieFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
            {/* 
              Alternative Method 2 (if 'as' prop wasn't available or for more complex cases):
              Using onClick with useNavigate.
            
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/search')}>Search</Nav.Link>
            
              Or wrapping content with Link:
            
              <Nav.Link>
                <Link to="/" className="text-decoration-none text-reset">Home</Link>
              </Nav.Link>
            
              However, 'as={Link}' is generally cleaner for these Bootstrap components.
            */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;