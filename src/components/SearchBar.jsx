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
        <Col xs={12} sm={6} md={2}>
          <Form.Group controlId="yearFilter">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="YYYY"
              value={yearFilter}
              onChange={(e) => onYearFilterChange(e.target.value)}
              min="1800"
              max={new Date().getFullYear() + 5} // Allow a bit into the future
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={2}>
          <Form.Group controlId="genreFilter">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={genreFilter}
              onChange={(e) => onGenreFilterChange(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
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