import React, { useState, useEffect } from 'react';
import { getPopularTVShows } from '../services/tmdbService';
import MovieCard from '../components/MovieCard';
import PaginationComponent from '../components/PaginationComponent';
import LoadingSpinner from '../components/LoadingSpinner';

const TVShowsPage = () => {
  const [tvShows, setTVShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      try {
        const data = await getPopularTVShows(currentPage);
        setTVShows(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching popular TV shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Popular TV Shows</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="row">
            {tvShows.map((tvShow) => (
              <div key={tvShow.id} className="col-md-3 mb-4">
                <MovieCard movie={tvShow} isTV={true} />
              </div>
            ))}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default TVShowsPage;
