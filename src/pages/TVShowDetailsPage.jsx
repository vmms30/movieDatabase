import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTVShowDetails, IMAGE_BASE_URL, BACKDROP_BASE_URL } from '../services/tmdbService';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieCard from '../components/MovieCard';
import './MovieDetailsPage.css'; // Reusing the same CSS for now

const TVShowDetailsPage = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getTVShowDetails(id);
        setTVShow(data);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!tvShow) {
    return <div className="container mt-4">TV Show not found.</div>;
  }

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
  } = tvShow;

  const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="movie-details-container" style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${backdrop_path})` }}>
      <div className="movie-details-content">
        <div className="row">
          <div className="col-md-4">
            <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={name} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h1>{name}</h1>
            <p><strong>Release Date:</strong> {first_air_date}</p>
            <p><strong>Rating:</strong> {vote_average.toFixed(1)} / 10</p>
            <div className="genres mb-3">
              {genres.map(genre => (
                <span key={genre.id} className="badge bg-secondary me-2">{genre.name}</span>
              ))}
            </div>
            <h4>Overview</h4>
            <p>{overview}</p>
            {trailer && (
              <div className="trailer mt-4">
                <h4>Trailer</h4>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="cast mt-5">
          <h2 className="mb-4">Cast</h2>
          <div className="row">
            {credits.cast.slice(0, 10).map(person => (
              <div key={person.cast_id} className="col-md-2 col-sm-4 col-6 mb-4 text-center">
                {person.profile_path && (
                  <img
                    src={`${IMAGE_BASE_URL}${person.profile_path}`}
                    alt={person.name}
                    className="img-fluid rounded-circle"
                  />
                )}
                <p className="mt-2">{person.name}</p>
              </div>
            ))}
          </div>
        </div>

        {recommendations.results.length > 0 && (
          <div className="recommendations mt-5">
            <h2 className="mb-4">Recommendations</h2>
            <div className="row">
              {recommendations.results.slice(0, 6).map(rec => (
                <div key={rec.id} className="col-md-2 mb-4">
                  <MovieCard movie={rec} isTV={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowDetailsPage;
