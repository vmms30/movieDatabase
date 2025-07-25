
# TMDB API v3 Routes

This document lists the available API routes for The Movie Database (TMDB) API v3. The base URL for all routes is `https://api.themoviedb.org/3`.

| Category | Endpoint | Description |
| --- | --- | --- |
| **Account** | `/account/{account_id}` | Get your account details. |
| | `/account/{account_id}/favorite/movies` | Get a list of your favorite movies. |
| | `/account/{account_id}/favorite/tv` | Get a list of your favorite TV shows. |
| | `/account/{account_id}/lists` | Get the lists that you’ve created. |
| | `/account/{account_id}/rated/movies` | Get a list of all movies you have rated. |
| | `/account/{account_id}/rated/tv` | Get a list of all TV shows you have rated. |
| | `/account/{account_id}/rated/tv/episodes` | Get a list of all TV episodes you have rated. |
| | `/account/{account_id}/watchlist/movies` | Get a list of all movies on your watchlist. |
| | `/account/{account_id}/watchlist/tv` | Get a list of all TV shows on your watchlist. |
| **Authentication** | `/authentication/guest_session/new` | Create a temporary guest session. |
| | `/authentication/token/new` | Create a request token for user authentication. |
| | `/authentication/session/new` | Create a session ID for user authentication. |
| | `/authentication/token/validate_with_login` | Create a session ID with your TMDB username and password. |
| | `/authentication/session` | Delete a session ID. |
| **Changes** | `/movie/changes` | Get a list of all of the movie ids that have been changed. |
| | `/person/changes` | Get a list of all of the person ids that have been changed. |
| | `/tv/changes` | Get a list of all of the TV show ids that have been changed. |
| **Collections** | `/collection/{collection_id}` | Get the details of a collection. |
| | `/collection/{collection_id}/images` | Get the images for a collection. |
| | `/collection/{collection_id}/translations` | Get the translations for a collection. |
| **Companies** | `/company/{company_id}` | Get the details of a company. |
| | `/company/{company_id}/alternative_names` | Get the alternative names for a company. |
| | `/company/{company_id}/images` | Get the images for a company. |
| **Configuration** | `/configuration` | Get the API configuration details. |
| | `/configuration/countries` | Get a list of all of the countries. |
| | `/configuration/jobs` | Get a list of all of the jobs. |
| | `/configuration/languages` | Get a list of all of the languages. |
| | `/configuration/primary_translations` | Get a list of all of the primary translations. |
| | `/configuration/timezones` | Get a list of all of the timezones. |
| **Discover** | `/discover/movie` | Discover movies by different types of data. |
| | `/discover/tv` | Discover TV shows by different types of data. |
| **Find** | `/find/{external_id}` | Find data by external IDs. |
| **Genres** | `/genre/movie/list` | Get the list of official genres for movies. |
| | `/genre/tv/list` | Get the list of official genres for TV shows. |
| **Keywords** | `/keyword/{keyword_id}` | Get the details of a keyword. |
| | `/keyword/{keyword_id}/movies` | Get the movies that belong to a keyword. |
| **Lists** | `/list/{list_id}` | Get the details of a list. |
| | `/list/{list_id}/item_status` | Check if a movie has been added to a list. |
| | `/list` | Create a new list. |
| | `/list/{list_id}` | Delete a list. |
| | `/list/{list_id}/clear` | Clear all of the items from a list. |
| | `/list/{list_id}/remove_item` | Remove a movie from a list. |
| **Movies** | `/movie/{movie_id}` | Get the details of a movie. |
| | `/movie/{movie_id}/account_states` | Get the rating, watchlist and favorite status of a movie. |
| | `/movie/{movie_id}/alternative_titles` | Get the alternative titles for a movie. |
| | `/movie/{movie_id}/changes` | Get the changes for a movie. |
| | `/movie/{movie_id}/credits` | Get the cast and crew for a movie. |
| | `/movie/{movie_id}/external_ids` | Get the external IDs for a movie. |
| | `/movie/{movie_id}/images` | Get the images for a movie. |
| | `/movie/{movie_id}/keywords` | Get the keywords for a movie. |
| | `/movie/{movie_id}/lists` | Get a list of lists that this movie belongs to. |
| | `/movie/{movie_id}/recommendations` | Get a list of recommended movies for a movie. |
| | `/movie/{movie_id}/release_dates` | Get the release date and certification information for a movie. |
| | `/movie/{movie_id}/reviews` | Get the reviews for a movie. |
| | `/movie/{movie_id}/similar` | Get a list of similar movies. |
| | `/movie/{movie_id}/translations` | Get a list of translations that have been created for a movie. |
| | `/movie/{movie_id}/videos` | Get the videos that have been added to a movie. |
| | `/movie/latest` | Get the most newly created movie. |
| | `/movie/now_playing` | Get a list of movies in theatres. |
| | `/movie/popular` | Get a list of the current popular movies on TMDB. |
| | `/movie/top_rated` | Get the top rated movies on TMDB. |
| | `/movie/upcoming` | Get a list of upcoming movies in theatres. |
| **Trending** | `/trending/{media_type}/{time_window}` | Get the daily or weekly trending items. |
| **TV** | `/tv/{series_id}` | Get the details of a TV show. |
| | `/tv/{series_id}/account_states` | Get the rating, watchlist and favorite status of a TV show. |
| | `/tv/{series_id}/aggregate_credits` | Get the aggregate credits for a TV show. |
| | `/tv/{series_id}/alternative_titles` | Get the alternative titles for a TV show. |
| | `/tv/{series_id}/changes` | Get the changes for a TV show. |
| | `/tv/{series_id}/content_ratings` | Get the content ratings for a TV show. |
| | `/tv/{series_id}/credits` | Get the credits for a TV show. |
| | `/tv/{series_id}/episode_groups` | Get the episode groups for a TV show. |
| | `/tv/{series_id}/external_ids` | Get the external IDs for a TV show. |
| | `/tv/{series_id}/images` | Get the images for a TV show. |
| | `/tv/{series_id}/keywords` | Get the keywords for a TV show. |
| | `/tv/{series_id}/recommendations` | Get a list of recommended TV shows for a TV show. |
| | `/tv/{series_id}/reviews` | Get the reviews for a TV show. |
| | `/tv/{series_id}/screened_theatrically` | Get a list of TV shows that have been screened theatrically. |
| | `/tv/{series_id}/similar` | Get a list of similar TV shows. |
| | `/tv/{series_id}/translations` | Get a list of translations that have been created for a TV show. |
| | `/tv/{series_id}/videos` | Get the videos that have been added to a TV show. |
| | `/tv/latest` | Get the most newly created TV show. |
| | `/tv/on_the_air` | Get a list of TV shows that are currently on the air. |
| | `/tv/airing_today` | Get a list of TV shows that are airing today. |
| | `/tv/popular` | Get a list of the current popular TV shows on TMDB. |
| | `/tv/top_rated` | Get the top rated TV shows on TMDB. |
| **TV Seasons** | `/tv/{series_id}/season/{season_number}` | Get the details of a TV season. |
| | `/tv/{series_id}/season/{season_number}/account_states` | Get the rating, watchlist and favorite status of a TV season. |
| | `/tv/{series_id}/season/{season_number}/changes` | Get the changes for a TV season. |
| | `/tv/{series_id}/season/{season_number}/credits` | Get the credits for a TV season. |
| | `/tv/{series_id}/season/{season_number}/external_ids` | Get the external IDs for a TV season. |
| | `/tv/{series_id}/season/{season_number}/images` | Get the images for a TV season. |
| | `/tv/{series_id}/season/{season_number}/translations` | Get the translations for a TV season. |
| | `/tv/{series_id}/season/{season_number}/videos` | Get the videos that have been added to a TV season. |
| **TV Episodes** | `/tv/{series_id}/season/{season_number}/episode/{episode_number}` | Get the details of a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/account_states` | Get the rating of a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/changes` | Get the changes for a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/credits` | Get the credits for a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/external_ids` | Get the external IDs for a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/images` | Get the images for a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/translations` | Get the translations for a TV episode. |
| | `/tv/{series_id}/season/{season_number}/episode/{episode_number}/videos` | Get the videos that have been added to a TV episode. |
