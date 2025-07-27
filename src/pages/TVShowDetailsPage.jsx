import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import {
  getTVShowDetails,
  IMAGE_BASE_URL,
  BACKDROP_BASE_URL,
  PROFILE_BASE_URL,
} from "../services/tmdbService";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieCard from "../components/MovieCard";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent";
import Reviews from "../components/Reviews";
import "./MovieDetailsPage.css"; // Reusing the same CSS

const TVShowDetailsPage = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTVShowDetails(id);
        setTVShow(data);
      } catch (err) {
        console.error(`Error fetching TV show details for ${id}:`, err);
        setError("Failed to load TV show details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container mt-4">{error}</div>;
  if (!tvShow) return <div className="container mt-4">TV Show not found.</div>;

  const {
    name,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    first_air_date,
    genres,
    credits,
    recommendations,
    videos,
    reviews,
  } = tvShow;

  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const backdropUrl = backdrop_path
    ? `${BACKDROP_BASE_URL}${backdrop_path}`
    : "";
  const posterUrl = poster_path
    ? `${IMAGE_BASE_URL}${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="movie-details-page bg-dark">
      {backdropUrl && (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>
      )}

      <Container className={`movie-content ${backdropUrl ? "mt-n5" : "mt-4"}`}>
        <Row className="mb-3">
          <Col>
            <BreadcrumbsComponent movieTitle={name} />
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
            <Image
              src={posterUrl}
              alt={name}
              fluid
              className="movie-poster-details mb-3"
              loading="lazy"
            />
          </Col>

          <Col md={8}>
            <h1 className="details-title">
              {name} (
              {first_air_date ? new Date(first_air_date).getFullYear() : "N/A"})
            </h1>

            <div className="mb-3 movie-genres">
              {genres?.map((genre) => (
                <Badge pill bg="secondary" key={genre.id} className="me-1">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p>
              <strong>Rating:</strong> {vote_average?.toFixed(1)}/10
            </p>
            <p>
              <strong>First Air Date:</strong>{" "}
              {first_air_date
                ? new Date(first_air_date).toLocaleDateString()
                : "N/A"}
            </p>

            <h4 className="section-title">Overview</h4>
            <p>{overview || "No overview available."}</p>
          </Col>
        </Row>

        {credits?.cast?.length > 0 && (
          <section>
            <h4 className="section-title">Cast</h4>
            <Row xs={2} sm={3} md={4} lg={5} className="g-3">
              {credits.cast.slice(0, 10).map((member) => (
                <Col key={member.cast_id || member.id} className="cast-member">
                  <Link to={`/person/${member.id}`}>
                    <Image
                      src={
                        member.profile_path
                          ? `${PROFILE_BASE_URL}${member.profile_path}`
                          : "https://via.placeholder.com/100x150?text=No+Image"
                      }
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

        {trailer && trailer.site === "YouTube" && (
          <section>
            <h4 className="section-title">Trailer</h4>
            <div className="youtube-embed">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${name} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {reviews?.results?.length > 0 && (
          <section>
            <h4 className="section-title">Reviews</h4>
            <Reviews reviews={reviews.results} />
          </section>
        )}

        {recommendations?.results?.length > 0 && (
          <section className="recommendations-grid">
            <h4 className="section-title">You Might Also Like</h4>
            <Row>
              {recommendations.results.slice(0, 6).map((rec) => (
                <Col key={rec.id} md={2} className="mb-4">
                  <MovieCard movie={rec} mediaType="tv" />
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </div>
  );
};

export default TVShowDetailsPage;
