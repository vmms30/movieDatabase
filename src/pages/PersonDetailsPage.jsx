import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPersonDetails, IMAGE_BASE_URL } from '../services/tmdbService';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieCard from '../components/MovieCard';

const PersonDetailsPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getPersonDetails(id);
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!person) {
    return <div className="container mt-4">Person not found.</div>;
  }

  const {
    name,
    biography,
    profile_path,
    birthday,
    place_of_birth,
    combined_credits,
  } = person;

  const knownFor = combined_credits.cast
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={`${IMAGE_BASE_URL}${profile_path}`} alt={name} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h1>{name}</h1>
          <p><strong>Born:</strong> {birthday} in {place_of_birth}</p>
          <h4>Biography</h4>
          <p>{biography}</p>
        </div>
      </div>

      <div className="known-for mt-5">
        <h2 className="mb-4">Known For</h2>
        <div className="row">
          {knownFor.map(item => (
            <div key={item.id} className="col-md-2 mb-4">
              <MovieCard movie={item} isTV={item.media_type === 'tv'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsPage;
