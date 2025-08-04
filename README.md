# Movie Database Application

This is a React-based web application for browsing movies and TV shows, powered by The Movie Database (TMDB) API. It allows users to discover popular and top-rated content, view detailed information about movies, TV shows, and actors, and search for specific titles.

## Live Demo

Access the live application on GitHub Pages: [https://vmms30.github.io/movieDatabase/](https://vmms30.github.io/movieDatabase/)

## Features

-   **Home Page:** Displays lists of popular and top-rated movies.
-   **Movie Details:** View comprehensive information about a movie, including cast, crew, overview, and user reviews.
-   **TV Show Support:** Browse popular and top-rated TV shows, and view detailed information about individual series, seasons, and episodes.
-   **Actor/Person Details:** Explore profiles of actors and other crew members, including their filmography.
-   **Search Functionality:** Search for movies and TV shows by title.
-   **Pagination:** Navigate through extensive lists of movies and TV shows.
-   **Favorites Page:** Users can add and remove movies from their local favorites list.
-   **Responsive Design:** Optimized for various screen sizes using React-Bootstrap.
-   **Loading Indicators:** Provides a smooth user experience with loading spinners and skeleton cards.

## Technologies Used

-   **Frontend:**
    -   React (with Vite for fast development)
    -   React Router DOM (for client-side routing)
    -   Bootstrap & React-Bootstrap (for UI components and styling)
    -   Axios (for API requests)
    -   React Bootstrap Icons
-   **API:**
    -   The Movie Database (TMDB) API v3
-   **Deployment:**
    -   GitHub Pages
    -   `gh-pages` npm package (for automated deployment)

## Installation and Local Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vmms30/movieDatabase.git
    cd movieDatabase
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up TMDB API Key:**
    -   Obtain an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).
    -   Create a `.env` file in the root of your project.
    -   Add your API key to the `.env` file in the following format:
        ```
        VITE_TMDB_API_KEY=YOUR_API_KEY_HERE
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
movieDatabase/
├── public/
│   └── 404.html         # Custom 404 page for GitHub Pages routing
├── src/
│   ├── assets/
│   ├── components/      # Reusable UI components (e.g., MovieCard, Navigation)
│   ├── pages/           # Main application pages (e.g., Home, MovieDetailsPage)
│   ├── services/        # API service integrations (e.g., tmdbService.js)
│   └── utils/           # Utility functions
├── .env                 # Environment variables (e.g., TMDB API Key)
├── gh-pages.md          # Documentation for GitHub Pages deployment
├── package.json
├── vite.config.js
└── README.md
```

## Deployment to GitHub Pages

This application is deployed to GitHub Pages using the `gh-pages` npm package. The deployment process is automated via `npm run deploy`.

**Key configurations for GitHub Pages deployment:**

-   **`vite.config.js`**: The `base` property is set to `"/movieDatabase/"` to correctly handle asset paths on GitHub Pages.
-   **`package.json`**: Includes `predeploy` and `deploy` scripts:
    -   `predeploy`: Runs `npm run build` to create the production-ready `dist` folder.
    -   `deploy`: Uses `gh-pages -d dist` to push the contents of the `dist` folder to the `gh-pages` branch.
-   **`public/404.html`**: A custom 404 page is used to handle client-side routing. When a direct link to a sub-route is accessed or the page is refreshed, GitHub Pages serves this `404.html`, which then redirects to `index.html` while preserving the path, allowing React Router to take over.

To deploy the application, simply run:

```bash
npm run deploy
```

Ensure your GitHub repository's Pages settings are configured to deploy from the `gh-pages` branch at the `/ (root)` folder.

## API Usage

This application interacts with The Movie Database (TMDB) API to fetch movie and TV show data. All API calls are handled through `src/services/tmdbService.js`.

## Planned Features & Improvements

Based on the project's roadmap, the following features and technical improvements are planned:

### New Features:

-   **User Authentication & Account Features:** Implement user login, favorite movies, watchlists, and rated content using TMDB's authentication and account APIs.
-   **Advanced Discovery:** Add more filtering options for movie and TV show discovery, including curated, themed collections (e.g., "Based on Your Mood," "Oscar Winners Circle").
-   **Movie Collections:** Display details about movie collections/franchises.
-   **"Movie Match" Quiz:** An interactive quiz to help users discover new movies based on their preferences.
-   **Gamified "Watchlist Challenge":** Turn the watchlist/favorites feature into a game with challenges and badges.
-   **Social Features & Community:** Allow users to share lists, reviews, and ratings with friends.
-   **Personalized Dashboard:** A dashboard featuring recommendations, new releases from favorite actors, and a "Continue Watching" section.

### Technical Improvements:

-   **API Key Management:** Move the TMDB API key to a `.env` file for better security and environment management.
-   **State Management:** Introduce a global state management library (e.g., Zustand) to centralize state logic.
-   **Component & Code Structure:** Standardize naming conventions and refactor API service files for improved modularity.
-   **Error Handling & User Feedback:** Implement robust error handling with user-friendly messages and retry options.
-   **Lazy Loading Routes:** Implement route-based code splitting using `React.lazy()` and `Suspense` to improve initial load times.