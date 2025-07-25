import React from 'react';
import { Card } from 'react-bootstrap';

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div>
      {reviews.map(review => (
        <Card key={review.id} className="mb-3">
          <Card.Body>
            <Card.Title>{review.author}</Card.Title>
            <Card.Text>{review.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;
