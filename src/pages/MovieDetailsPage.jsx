// src/pages/MovieDetailsPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button, Alert, Card } from 'react-bootstrap';
import {
  getMovieDetails,
  IMAGE_BASE_URL,
  BACKDROP_BASE_URL,
  PROFILE_BASE_URL,
} from '../services/tmdbService';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieGrid from '../components/MovieGrid'; // Re-use for similar movies
import BreadcrumbsComponent from '../components/BreadcrumbsComponent';
import Reviews from '../components/Reviews';
import './MovieDetailsPage.css'; // Custom styles

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Get movieId from URL
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovieDetails(movieId);
      setMovie(data);

      // Extract top 10 cast members (or fewer)
      setCast(data.credits?.cast.slice(0, 10) || []);

      // Extract director and key writers
      const director = data.credits?.crew.find(c => c.job === 'Director');
      const writers = data.credits?.crew.filter(c => c.department === 'Writing').slice(0, 3);
      setCrew(director ? [director, ...writers] : writers);

      // Find an official YouTube trailer
      const officialTrailer = data.videos?.results.find(
        video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser') && video.official
      );
      if (!officialTrailer) {
          const anyTrailer = data.videos?.results.find(video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser'));
          setTrailer(anyTrailer || (data.videos?.results.length > 0 ? data.videos.results[0] : null));
      } else {
        setTrailer(officialTrailer);
      }
      

      setRecommendations(data.recommendations?.results.slice(0, 10) || []); // Show top 10 recommendations
      setReviews(data.reviews?.results || []);

    } catch (err) {
      if (err.response && err.response.status === 404) {
        navigate('/not-found');
      } else {
        console.error(`Error fetching movie details for ${movieId}:`, err);
        setError('Failed to load movie details. Please try again later or check the movie ID.');
      }
    } finally {
      setLoading(false);
    }
  }, [movieId, navigate]);

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0); // Scroll to top when movieId changes
  }, [fetchDetails]); // Re-fetch if movieId changes

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <Container className="mt-5 text-center">
      <Alert variant="danger">{error}</Alert>
      <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
    </Container>
  );
  if (!movie) return (
    <Container className="mt-5 text-center">
      <Alert variant="info">Movie data not found.</Alert>
      <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
    </Container>
  );

  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
  const backdropUrl = movie.backdrop_path ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` : '';

  return (
    <div className="movie-details-page bg-dark">
      {backdropUrl && (
        <div className="movie-backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}></div>
      )}

      <Container className={`movie-content ${backdropUrl ? 'mt-n5' : 'mt-4'}`}> {/* Adjust top margin based on backdrop */}
        <Row className="mb-3">
            <Col>
                <BreadcrumbsComponent movieTitle={movie.title} />
            </Col>
        </Row>
        <Row>
          {/* Left Column: Poster & Basic Info */}
          <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
            <Image src={posterUrl} alt={movie.title} fluid className="movie-poster-details mb-3" loading="lazy" />
            <Button variant="outline-light" onClick={() => navigate(-1)} className="w-100 mb-2">
              « Back to Previous
            </Button>
            {movie.homepage && (
              <Button variant="primary" href={movie.homepage} target="_blank" rel="noopener noreferrer" className="w-100">
                Visit Movie Homepage
              </Button>
            )}
          </Col>

          {/* Right Column: Details */}
          <Col md={8}>
            <h1 className="details-title">{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
            {movie.tagline && <p className="details-tagline text-muted">{movie.tagline}</p>}
            
            <div className="mb-3 movie-genres">
              {movie.genres?.map(genre => (
                <Badge pill bg="secondary" key={genre.id} className="me-1">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)}/10 ({movie.vote_count} votes)</p>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            
            <h4 className="section-title">Overview</h4>
            <p>{movie.overview || "No overview available."}</p>

            {crew.length > 0 && (
              <>
                <h4 className="section-title">Key Crew</h4>
                <ul className="list-unstyled">
                  {crew.map(member => (
                    <li key={`${member.id}-${member.job}`}><strong>{member.job || member.department}:</strong> {member.name}</li>
                  ))}
                </ul>
              </>
            )}
          </Col>
        </Row>

        {/* Cast Section */}
        {cast.length > 0 && (
          <section>
            <h4 className="section-title">Cast</h4>
            <Row xs={2} sm={3} md={4} lg={5} className="g-3">
              {cast.map(member => (
                <Col key={member.cast_id || member.id} className="cast-member">
                  <Link to={`/person/${member.id}`}>
                    <Image 
                      src={member.profile_path ? `${PROFILE_BASE_URL}${member.profile_path}` : 'https://via.placeholder.com/100x150?text=No+Image'} 
                      alt={member.name} 
                      rounded 
                      loading="lazy"
                    />
                  </Link>
                  <p className="fw-bold">{member.name}</p>
                  <p className="character-name">{member.character}</p>
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Trailer Section */}
        {trailer && trailer.site === 'YouTube' && (
          <section>
            <h4 className="section-title">Trailer</h4>
            <div className="youtube-embed">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section>
            <h4 className="section-title">Reviews</h4>
            <Reviews reviews={reviews} />
          </section>
        )}

        {/* Similar Movies Section */}
        {recommendations.length > 0 && (
          <section className="recommendations-grid">
            <h4 className="section-title">You Might Also Like</h4>
            <MovieGrid movies={recommendations} />
          </section>
        )}
      </Container>
    </div>
  );
};

export default MovieDetailsPage;