
# Application Testing Plan

This document outlines the manual testing plan for the MovieFlix application. The goal is to ensure all features and routes are working as expected.

---

## I. General Tests

These tests should be performed across all relevant pages.

- [ ] **Responsiveness:** Verify that the layout and components are responsive and usable on different screen sizes (desktop, tablet, mobile).
- [ ] **Navigation:** Ensure all links in the `Navigation` bar work correctly and navigate to the appropriate page.
- [ ] **Loading States:** Confirm that a `LoadingSpinner` is displayed whenever data is being fetched from the API.
- [ ] **Error Handling:** Intentionally break an API call (e.g., by providing an invalid API key) and verify that a user-friendly error message is displayed instead of crashing the page.

---

## II. Page-Specific Test Cases

### 1. Home Page (`/`)

- [ ] **Verify Content:**
  - [ ] Check that the "Popular Movies" section is displayed with a grid of movie cards.
  - [ ] Check that the search bar is present and functional.
- [ ] **Functionality:**
  - [ ] Perform a search for a valid movie title (e.g., "Inception"). Verify that the movie grid updates with the correct search results.
  - [ ] Perform a search for a movie with a specific year. Verify the results are filtered correctly.
  - [ ] Perform a search with no results. Verify that a "No movies found" message is displayed.
  - [ ] Test pagination by clicking on a page number. The movie grid should update with the corresponding set of movies.
  - [ ] Click on a movie card. Verify it navigates to the correct `/movie/:movieId` details page.

### 2. TV Shows Page (`/tv`)

- [ ] **Verify Content:**
  - [ ] Check that the "Popular TV Shows" heading is displayed.
  - [ ] Check that the page displays a grid of TV show cards.
- [ ] **Functionality:**
  - [ ] Test pagination to ensure it loads the next set of TV shows.
  - [ ] Click on a TV show card. Verify it navigates to the correct `/tv/:id` details page.

### 3. Movie Details Page (`/movie/:movieId`)

- [ ] **Verify Content:**
  - [ ] Navigate to a valid movie URL (e.g., `/movie/27205`).
  - [ ] Check that all details are displayed correctly: title, poster, backdrop, overview, rating, release date, genres.
  - [ ] Verify the "Cast" section shows a list of actors with their photos and character names.
  - [ ] Verify the "Recommendations" section shows a grid of related movies.
  - [ ] Verify the "Reviews" section displays user reviews.
  - [ ] Verify the trailer is embedded and playable.
- [ ] **Functionality:**
  - [ ] Click on a cast member's photo or name. Verify it navigates to the correct `/person/:id` page.
  - [ ] Click on a recommended movie. Verify it navigates to that movie's details page.
  - [ ] Navigate to an invalid movie ID (e.g., `/movie/99999999`). Verify the page redirects to the `/not-found` page.

### 4. TV Show Details Page (`/tv/:id`)

- [ ] **Verify Content:**
  - [ ] Navigate to a valid TV show URL (e.g., `/tv/1399`).
  - [ ] Check that all details are displayed correctly: name, poster, backdrop, overview, rating, first air date, genres.
  - [ ] Verify the "Cast" section is present and populated.
  - [ ] Verify the "Recommendations" section is present.
  - [ ] Verify the trailer is embedded and playable.
- [ ] **Functionality:**
  - [ ] Click on a cast member. Verify it navigates to the correct `/person/:id` page.
  - [ ] Navigate to an invalid TV show ID (e.g., `/tv/99999999`). Verify a "TV Show not found" message is shown.

### 5. Person Details Page (`/person/:id`)

- [ ] **Verify Content:**
  - [ ] Navigate to a valid person URL (e.g., `/person/500`).
  - [ ] Check that the person's name, photo, biography, and birth details are displayed.
  - [ ] Verify the "Known For" section shows a grid of movies and TV shows they have been in.
- [ ] **Functionality:**
  - [ ] Click on a movie/TV show in the "Known For" section. Verify it navigates to the correct details page.
  - [ ] Navigate to an invalid person ID (e.g., `/person/99999999`). Verify a "Person not found" message is shown.

### 6. Favorites Page (`/favourites`)

- [ ] **Verify Content:**
  - [ ] Initially, the page should display a "You have no favorite movies yet" message.
- [ ] **Functionality:**
  - [ ] Navigate to a movie details page and click the "Add to Favorites" button.
  - [ ] Return to the `/favourites` page. Verify that the newly added movie is now displayed in the grid.
  - [ ] Click the "Remove from Favorites" button on the movie card on this page.
  - [ ] Verify that the movie is removed from the favorites list.

### 7. Not Found Page (`/not-found`)

- [ ] **Functionality:**
  - [ ] Manually navigate to a URL that does not exist (e.g., `/some/random/path`).
  - [ ] Verify that the `NotFoundPage` component is rendered, showing a "404 - Page Not Found" message.
