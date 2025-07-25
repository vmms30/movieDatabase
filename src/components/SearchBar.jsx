import React from 'react';
import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap';

const SearchBar = ({
  searchQuery,
  onSearchQueryChange,
  onSubmit,
  suggestions = [],
  onSuggestionClick,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleFormSubmit} className="mb-4 p-3 bg-secondary rounded text-white position-relative">
      <Row className="gy-2 gx-3 align-items-end">
        <Col xs={6} md={6}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Search Movies</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Inception, Star Wars..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          {suggestions.length > 0 && (
            <ListGroup className="position-absolute" style={{ zIndex: 1000 }}>
              {suggestions.map((movie) => (
                <ListGroup.Item
                  key={movie.id}
                  action
                  onClick={() => onSuggestionClick(movie.title)}
                >
                  {movie.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
    
        <Col xs={6} md={6} lg={6}>
          <Button variant="primary" type="submit" style={{ width: 'auto' }}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;