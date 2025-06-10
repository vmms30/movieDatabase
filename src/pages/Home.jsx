// import { Container, Row, Col } from 'react-bootstrap';

// function Home() {
//   return (
//     <Container>
//       <Row>
//         <Col xs={12} md={6} lg={4}>
//           <!-- Content -->
//         </Col>
//         <Col xs={12} md={6} lg={8}>
//           <!-- Content -->
//         </Col>
//       </Row>
//     </Container>
//   );
// }
// export default Home

// src/pages/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularMovies, getTrendingMovies } from '../services/tmdbService';
import {Spinner} from 'react-bootstrap'

const Home = () => {
  // Popular Movies State
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularPage, setPopularPage] = useState(1);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState(null);
  const [hasMorePopular, setHasMorePopular] = useState(true);

  // Trending Movies State
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [errorTrending, setErrorTrending] = useState(null);

  // Fetch Popular Movies
  const fetchPopular = useCallback(async (pageToFetch) => {
    setLoadingPopular(true);
    setErrorPopular(null);
    try {
      const data = await getPopularMovies(pageToFetch);
      setPopularMovies(prevMovies => pageToFetch === 1 ? data.results : [...prevMovies, ...data.results]);
      setHasMorePopular(data.page < data.total_pages);
      if (pageToFetch === 1) setPopularPage(1); // Reset page if fetching first page
    } catch (err) {
      setErrorPopular('Failed to fetch popular movies. Please try again later.');
      console.error(err);
    } finally {
      setLoadingPopular(false);
    }
  }, []);

  // Fetch Trending Movies
  const fetchTrending = useCallback(async () => {
    setLoadingTrending(true);
    setErrorTrending(null);
    try {
      const data = await getTrendingMovies('day'); // Or 'week'
      setTrendingMovies(data);
    } catch (err) {
      setErrorTrending('Failed to fetch trending movies. Please try again later.');
      console.error(err);
    } finally {
      setLoadingTrending(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchPopular(1); // Fetch first page of popular movies
    fetchTrending();
  }, [fetchPopular, fetchTrending]); // Add fetchPopular & fetchTrending to dependency array

  const handleLoadMorePopular = () => {
    const nextPage = popularPage + 1;
    setPopularPage(nextPage);
    fetchPopular(nextPage);
  };

  return (
    <div style={{ backgroundColor: '#141414', color: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="bg-dark text-light p-5 mb-4 rounded-3" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://image.tmdb.org/t/p/original/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg')`, // Example backdrop
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container fluid py={5}>
          <h1 className="display-5 fw-bold">Welcome to MovieFlix</h1>
          <p className="col-md-8 fs-4">
            Discover the latest and greatest movies. Explore popular, trending, and top-rated films.
          </p>
          {/* You can add a call to action button here if needed */}
        </Container>
      </div>

      <Container>
        {/* Trending Movies Section */}
        <section className="my-5">
          <h2 className="mb-4">Trending Today</h2>
          {loadingTrending && <LoadingSpinner />}
          {errorTrending && <Alert variant="danger">{errorTrending}</Alert>}
          {!loadingTrending && !errorTrending && <MovieGrid movies={trendingMovies} />}
        </section>

        {/* Popular Movies Section */}
        <section className="my-5">
          <h2 className="mb-4">Popular Movies</h2>
          {/* Display initial loading spinner only for the first load */}
          {loadingPopular && popularMovies.length === 0 && <LoadingSpinner />}
          {errorPopular && <Alert variant="danger">{errorPopular}</Alert>}
          
          {/* Render MovieGrid even if loading more, so existing movies stay visible */}
          {!errorPopular && popularMovies.length > 0 && <MovieGrid movies={popularMovies} />}
          
          {/* "Load More" button and its specific loading indicator */}
          {!errorPopular && hasMorePopular && (
            <div className="text-center mt-4">
              <Button 
                variant="primary" 
                onClick={handleLoadMorePopular} 
                disabled={loadingPopular && popularMovies.length > 0} // Disable if loading more
              >
                {loadingPopular && popularMovies.length > 0 ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    {' '}Loading...
                  </>
                ) : (
                  'Load More Popular Movies'
                )}
              </Button>
            </div>
          )}
          {!hasMorePopular && popularMovies.length > 0 && <p className="text-center mt-3">No more popular movies to load.</p>}
        </section>
      </Container>
    </div>
  );
};

export default Home;