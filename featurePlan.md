
# Feature Plan

This document outlines future features to be implemented in the application, based on the available TMDB API endpoints.

## High Priority

- [ ] **User Authentication:** Implement user login and session management to enable personalized features.
  - [ ] Create a guest session (`/authentication/guest_session/new`)
  - [ ] Create a request token (`/authentication/token/new`)
  - [ ] Create a session (`/authentication/session/new`)
  - [ ] Delete a session (`/authentication/session`)
- [ ] **Account Features:** Allow users to manage their TMDB account from within the application.
  - [ ] View account details (`/account/{account_id}`)
  - [ ] View and manage favorite movies (`/account/{account_id}/favorite/movies`)
  - [ ] View and manage movie watchlist (`/account/{account_id}/watchlist/movies`)
  - [ ] View and manage rated movies (`/account/{account_id}/rated/movies`)
- [ ] **TV Show Support:** Add functionality to browse, search, and view details for TV shows.
  - [ ] Get popular TV shows (`/tv/popular`)
  - [ ] Get top-rated TV shows (`/tv/top_rated`)
  - [ ] Get trending TV shows (`/trending/tv/{time_window}`)
  - [ ] Get TV show details (`/tv/{series_id}`)
  - [ ] Search TV shows (`/search/tv`)
  - [ ] Display TV show seasons and episodes.

## Medium Priority

- [ ] **People/Actor Pages:** Create pages to display information about actors, directors, and other crew members.
  - [ ] Get person details (`/person/{person_id}`)
  - [ ] Get a person's movie and TV credits.
- [ ] **Advanced Movie Discovery:** Enhance movie discovery with more filters.
  - [ ] Discover movies by year, rating, etc. (`/discover/movie`)
- [ ] **Movie Collections:** Display movie collections/franchises on movie detail pages.
  - [ ] Get collection details (`/collection/{collection_id}`)
- [ ] **Display Movie Reviews:** Show user reviews on the movie details page.
  - [ ] Get movie reviews (`/movie/{movie_id}/reviews`)

## Low Priority

- [ ] **Company Pages:** Create pages to display movies associated with a specific production company.
  - [ ] Get company details (`/company/{company_id}`)
- [ ] **Keyword Pages:** Allow users to find movies based on keywords.
  - [ ] Get movies by keyword (`/keyword/{keyword_id}/movies`)
- [ ] **"Changes" Tracking:** (For internal use or a "What's New" feature)
  - [ ] Track movie/TV/person changes (`/movie/changes`, `/tv/changes`, `/person/changes`)
