
# Detailed Feature Checklist

This document provides a detailed implementation plan for the features outlined in `featurePlan.md`.

---

## High Priority

### 1. TV Show Support

- [X] **Goal:** Add functionality to browse, search, and view details for TV shows.

- [X] **File Modifications & Creations:**
    - **`src/services/tmdbService.js`**:
        - Add new functions for TV show endpoints.
    - **`src/pages/TVShowsPage.jsx` (New File)**:
        - A new page to display popular and top-rated TV shows, using a grid layout.
    - **`src/pages/TVShowDetailsPage.jsx` (New File)**:
        - A new page to show the details for a single TV show, including seasons and episodes.
    - **`src/components/Navigation.jsx`**:
        - Add a "TV Shows" link to the main navigation bar.
    - **`src/App.jsx`**:
        - Add new routes for `/tv` and `/tv/:id`.

---

## Medium Priority

### 1. People/Actor Pages

- [X] **Goal:** Create pages to display details about actors and their work.

- [X] **File Modifications & Creations:**
    - **`src/services/tmdbService.js`**:
        - Add a function to get person details, including their combined credits.
    - **`src/pages/PersonDetailsPage.jsx` (New File)**:
        - A new page to display a person's biography, photo, and a list of their movie/TV credits.
    - **`src/pages/MovieDetailsPage.jsx` (Update)**:
        - In the cast list, wrap each actor's name and photo in a `<Link>` component that navigates to `/person/:id`.
    - **`src/App.jsx`**:
        - Add a new route for `/person/:id`.

### 2. Display Movie Reviews

- [X] **Goal:** Show user reviews on the movie details page.

- [X] **File Modifications & Creations:**
    - **`src/services/tmdbService.js`**:
        - Update the `getMovieDetails` function to also fetch reviews.
    - **`src/components/Reviews.jsx` (New File)**:
        - A component that takes `reviews.results` as a prop and renders a list of reviews, showing the author and content.
    - **`src/pages/MovieDetailsPage.jsx` (Update)**:
        - Render the new `<Reviews />` component and pass the movie's review data to it.
