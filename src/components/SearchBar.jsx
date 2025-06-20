// src/components/SearchBar.js
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const SearchBar = ({
  searchQuery,
  onSearchQueryChange,
  onSubmit,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleFormSubmit} className="mb-4 p-3 bg-secondary rounded text-white">
      <Row className="gy-2 gx-3 align-items-end">
        <Col xs={6} md={6}>
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
    
        <Col xs={6} md={6} lg={6}> {/* d-grid for full width button on small screens */}
          <Button variant="primary" type="submit" style={{ width: 'auto' }}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;