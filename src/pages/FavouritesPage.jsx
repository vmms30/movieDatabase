import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Trash, Heart } from "react-bootstrap-icons";
import MovieGrid from "../components/MovieGrid";
import {
  getFavoritesFromStorage,
  clearFavoritesFromStorage,
} from "../utils/localStorage";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setLoading(true);
    try {
      const storedFavorites = getFavoritesFromStorage();
      setFavorites(storedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle clearing all favorites
  const handleClearAllFavorites = () => {
    if (
      window.confirm(
        "Are you sure you want to remove all favorites? This action cannot be undone."
      )
    ) {
      try {
        clearFavoritesFromStorage();
        setFavorites([]);
      } catch (error) {
        console.error("Error clearing favorites:", error);
      }
    }
  };

  // Empty state - shown when no favorites exist
  const EmptyFavoritesState = () => (
    <Container className="favorites-page py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <div className="empty-favorites">
            <Heart size={64} className="text-muted mb-4" />
            <h2 className="text-light mb-3">No Favorites Yet</h2>
            <p className="text-muted mb-4">
              You haven't added any movies to your favorites yet. Start
              exploring movies and click the heart icon to add them to your
              favorites!
            </p>
            <Button
              variant="primary"
              size="lg"
              href="/"
              className="explore-movies-btn"
            >
              Explore Movies
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );

  // Show empty state if no favorites exist and not loading
  if (!loading && favorites.length === 0) {
    return <EmptyFavoritesState />;
  }

  return (
    <div className="favorites-page">
      <Container fluid className="py-4">
        {/* Header Section */}
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="favorites-header">
                <h1 className="text-light mb-2">
                  <Heart className="me-3 text-danger" size={32} />
                  My Favorites
                </h1>
                <div className="favorites-header-info">
                  <p className="text-muted mb-3">
                    You have {favorites.length} favorite movie
                    {favorites.length !== 1 ? "s" : ""}
                  </p>

                  {/* Clear All Button */}
                  {favorites.length > 0 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleClearAllFavorites}
                      className="clear-all-btn"
                    >
                      <Trash className="me-2" size={16} />
                      Clear All Favorites
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Movies Grid using MovieGrid component */}
        <MovieGrid
          movies={favorites}
          loading={loading}
          error={null}
          title="" // Empty title since we have our own header
          showLoadMore={false}
          onLoadMore={null}
          loadingMore={false}
        />

        {/* Statistics Section */}
        {!loading && favorites.length > 0 && (
          <Container className="mt-5">
            <Row>
              <Col>
                <div className="favorites-stats">
                  <h3 className="text-light mb-3">Your Favorites Stats</h3>
                  <Row>
                    <Col md={3} sm={6} className="mb-3">
                      <div className="stat-card">
                        <h4 className="text-primary">{favorites.length}</h4>
                        <p className="text-muted mb-0">Total Favorites</p>
                      </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                      <div className="stat-card">
                        <h4 className="text-success">
                          {
                            favorites.filter(
                              (movie) =>
                                movie.vote_average && movie.vote_average >= 7
                            ).length
                          }
                        </h4>
                        <p className="text-muted mb-0">Highly Rated (7+)</p>
                      </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                      <div className="stat-card">
                        <h4 className="text-info">
                          {
                            new Set(
                              favorites
                                .map((movie) =>
                                  movie.release_date
                                    ? new Date(movie.release_date).getFullYear()
                                    : null
                                )
                                .filter(Boolean)
                            ).size
                          }
                        </h4>
                        <p className="text-muted mb-0">Different Years</p>
                      </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                      <div className="stat-card">
                        <h4 className="text-warning">
                          {favorites.length > 0
                            ? (
                                favorites.reduce(
                                  (sum, movie) =>
                                    sum + (movie.vote_average || 0),
                                  0
                                ) / favorites.length
                              ).toFixed(1)
                            : "0.0"}
                        </h4>
                        <p className="text-muted mb-0">Average Rating</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default FavoritesPage;

// // src/pages/FavoritesPage.js
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import { Trash, Heart } from "react-bootstrap-icons";
// import MovieGrid from "../components/MovieGrid";
// import {
//   getFavoritesFromStorage,
//   clearFavoritesFromStorage,
// } from "../utils/localStorage";
// import "./FavoritesPage.css";

// const FavoritesPage = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load favorites from localStorage on component mount
//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = () => {
//     setLoading(true);
//     try {
//       const storedFavorites = getFavoritesFromStorage();
//       setFavorites(storedFavorites);
//     } catch (error) {
//       console.error("Error loading favorites:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle clearing all favorites
//   const handleClearAllFavorites = () => {
//     if (
//       window.confirm(
//         "Are you sure you want to remove all favorites? This action cannot be undone."
//       )
//     ) {
//       try {
//         clearFavoritesFromStorage();
//         setFavorites([]);
//       } catch (error) {
//         console.error("Error clearing favorites:", error);
//       }
//     }
//   };

//   // Empty state - shown when no favorites exist
//   const EmptyFavoritesState = () => (
//     <Container className="favorites-page py-5">
//       <Row className="justify-content-center">
//         <Col md={8} lg={6} className="text-center">
//           <div className="empty-favorites">
//             <Heart size={64} className="text-muted mb-4" />
//             <h2 className="text-light mb-3">No Favorites Yet</h2>
//             <p className="text-muted mb-4">
//               You haven't added any movies to your favorites yet. Start
//               exploring movies and click the heart icon to add them to your
//               favorites!
//             </p>
//             <Button
//               variant="primary"
//               size="lg"
//               href="/"
//               className="explore-movies-btn"
//             >
//               Explore Movies
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );

//   // Show empty state if no favorites exist and not loading
//   if (!loading && favorites.length === 0) {
//     return <EmptyFavoritesState />;
//   }

//   return (
//     <div className="favorites-page">
//       <Container fluid className="py-4">
//         {/* Header Section */}
//         <Container>
//           <Row className="mb-4">
//             <Col>
//               <div className="favorites-header">
//                 <h1 className="text-light mb-2">
//                   <Heart className="me-3 text-danger" size={32} />
//                   My Favorites
//                 </h1>
//                 <div className="favorites-header-info">
//                   <p className="text-muted mb-3">
//                     You have {favorites.length} favorite movie
//                     {favorites.length !== 1 ? "s" : ""}
//                   </p>

//                   {/* Clear All Button */}
//                   {favorites.length > 0 && (
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       onClick={handleClearAllFavorites}
//                       className="clear-all-btn"
//                     >
//                       <Trash className="me-2" size={16} />
//                       Clear All Favorites
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>

//         {/* Movies Grid using MovieGrid component */}
//         <MovieGrid
//           movies={favorites}
//           loading={loading}
//           error={null}
//           title="" // Empty title since we have our own header
//           showLoadMore={false}
//           onLoadMore={null}
//           loadingMore={false}
//         />

//         {/* Statistics Section */}
//         {!loading && favorites.length > 0 && (
//           <Container className="mt-5">
//             <Row>
//               <Col>
//                 <div className="favorites-stats">
//                   <h3 className="text-light mb-3">Your Favorites Stats</h3>
//                   <Row>
//                     <Col md={3} sm={6} className="mb-3">
//                       <div className="stat-card">
//                         <h4 className="text-primary">{favorites.length}</h4>
//                         <p className="text-muted mb-0">Total Favorites</p>
//                       </div>
//                     </Col>
//                     <Col md={3} sm={6} className="mb-3">
//                       <div className="stat-card">
//                         <h4 className="text-success">
//                           {
//                             favorites.filter(
//                               (movie) =>
//                                 movie.vote_average && movie.vote_average >= 7
//                             ).length
//                           }
//                         </h4>
//                         <p className="text-muted mb-0">Highly Rated (7+)</p>
//                       </div>
//                     </Col>
//                     <Col md={3} sm={6} className="mb-3">
//                       <div className="stat-card">
//                         <h4 className="text-info">
//                           {
//                             new Set(
//                               favorites
//                                 .map((movie) =>
//                                   movie.release_date
//                                     ? new Date(movie.release_date).getFullYear()
//                                     : null
//                                 )
//                                 .filter(Boolean)
//                             ).size
//                           }
//                         </h4>
//                         <p className="text-muted mb-0">Different Years</p>
//                       </div>
//                     </Col>
//                     <Col md={3} sm={6} className="mb-3">
//                       <div className="stat-card">
//                         <h4 className="text-warning">
//                           {favorites.length > 0
//                             ? (
//                                 favorites.reduce(
//                                   (sum, movie) =>
//                                     sum + (movie.vote_average || 0),
//                                   0
//                                 ) / favorites.length
//                               ).toFixed(1)
//                             : "0.0"}
//                         </h4>
//                         <p className="text-muted mb-0">Average Rating</p>
//                       </div>
//                     </Col>
//                   </Row>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default FavoritesPage;
