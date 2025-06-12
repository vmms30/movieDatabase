// src/components/SearchBar.js
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const SearchBar = ({
  searchQuery,
  onSearchQueryChange,
  yearFilter,
  onYearFilterChange,
  genreFilter,
  onGenreFilterChange,
  genres, // [{id, name}, ...]
  onSubmit,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleFormSubmit} className="mb-4 p-3 bg-secondary rounded text-white">
      <Row className="gy-2 gx-3 align-items-end">
        <Col xs={12} md={6}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Search Movies</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Inception, Star Wars..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
            />
          </Form.Group>
        </Col>
    
        <Col xs={12} md="auto" className="d-grid"> {/* d-grid for full width button on small screens */}
          <Button variant="primary" type="submit" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;