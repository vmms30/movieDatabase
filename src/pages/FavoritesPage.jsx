import React, { useState, useEffect } from 'react';
import { Heart, Star, Calendar, Play, Info, Filter, Grid, List } from 'lucide-react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState({ movies: [], tv: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('movies');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date_added');
  const [filterGenre, setFilterGenre] = useState('all');
  
  // Mock account data - replace with actual API integration
  const accountId = 12345;
  const apiKey = 'your_api_key_here';
  
  // Mock data for demonstration
  const mockFavorites = {
    movies: [
      {
        id: 550,
        title: "Fight Club",
        poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
        release_date: "1999-10-15",
        vote_average: 8.4,
        overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
        genre_ids: [18, 53]
      },
      {
        id: 157336,
        title: "Interstellar",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop_path: "/pbrkL804c8yAv3zBZR4QPWZcbMV.jpg",
        release_date: "2014-11-07",
        vote_average: 8.4,
        overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
        genre_ids: [12, 18, 878]
      },
      {
        id: 13,
        title: "Forrest Gump",
        poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        backdrop_path: "/7c9UVPPiTPltouxRVY6N9lvjDYk.jpg",
        release_date: "1994-07-06",
        vote_average: 8.5,
        overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
        genre_ids: [35, 18, 10749]
      }
    ],
    tv: [
      {
        id: 1399,
        name: "Game of Thrones",
        poster_path: "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
        backdrop_path: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
        first_air_date: "2011-04-17",
        vote_average: 8.4,
        overview: "Seven noble families fight for control of the mythical land of Westeros.",
        genre_ids: [10765, 18, 10759]
      },
      {
        id: 94997,
        name: "House of the Dragon",
        poster_path: "/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
        backdrop_path: "/etj8E2o0Bud0HkONVQPjyCkIvIl.jpg",
        first_air_date: "2022-08-21",
        vote_average: 8.5,
        overview: "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke.",
        genre_ids: [10765, 18, 10759]
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        // In a real app, you would make API calls like:
        // const movieResponse = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}`);
        // const tvResponse = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${apiKey}`);
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFavorites(mockFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (itemId, mediaType) => {
    try {
      // In a real app, you would make an API call to remove the favorite
      // await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     media_type: mediaType,
      //     media_id: itemId,
      //     favorite: false
      //   })
      // });

      setFavorites(prev => ({
        ...prev,
        [mediaType]: prev[mediaType].filter(item => item.id !== itemId)
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = (path, size = 'w500') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/api/placeholder/300/450';
  };

  const currentItems = favorites[activeTab] || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg aspect-[2/3]"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            My Favorites
          </h1>
          <p className="text-gray-300">Your curated collection of movies and TV shows</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Tabs */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'movies'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Movies ({favorites.movies.length})
            </button>
            <button
              onClick={() => setActiveTab('tv')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'tv'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              TV Shows ({favorites.tv.length})
            </button>
          </div>

          {/* View Mode */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="date_added">Date Added</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="release_date">Release Date</option>
          </select>
        </div>

        {/* Content */}
        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-400">
              Start adding {activeTab} to your favorites to see them here!
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={getImageUrl(item.poster_path)}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-sm font-semibold">{item.vote_average}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                          <Play size={16} />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                          <Info size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(item.id, activeTab)}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {item.title || item.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {formatDate(item.release_date || item.first_air_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg p-4 flex gap-4 hover:bg-gray-750 transition-colors"
              >
                <img
                  src={getImageUrl(item.poster_path, 'w154')}
                  alt={item.title || item.name}
                  className="w-20 h-30 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
                    <button
                      onClick={() => handleRemoveFavorite(item.id, activeTab)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full transition-all"
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(item.release_date || item.first_air_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400" size={16} />
                      {item.vote_average}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{item.overview}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;