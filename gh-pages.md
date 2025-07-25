# GitHub Pages Deployment Notes

This document outlines the steps taken to successfully deploy the `movieDatabase` React application to GitHub Pages, addressing common issues like 404 errors for sub-routes and incorrect asset loading.

## 1. Vite Configuration (`vite.config.js`)

To ensure assets are loaded correctly when deployed to a GitHub Pages project subdirectory (e.g., `https://vmms30.github.io/movieDatabase/`), the `base` path in `vite.config.js` was set to the repository name:

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/movieDatabase/", // Set to your repository name
});
```

## 2. Deployment Automation with `gh-pages`

The `gh-pages` npm package was installed as a development dependency to automate the deployment process.

```bash
npm install gh-pages --save-dev
```

## 3. `package.json` Scripts

Scripts were added to `package.json` to facilitate building the project and deploying the `dist` folder to the `gh-pages` branch:

```json
// package.json
{
  "name": "movie-db",
  "homepage": "https://vmms30.github.io/movieDatabase",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  // ... other dependencies
}
```

-   `predeploy`: Runs `npm run build` before the `deploy` script.
-   `deploy`: Uses `gh-pages -d dist` to push the contents of the `dist` directory to the `gh-pages` branch.

To deploy, run:

```bash
npm run deploy
```

## 4. Handling Client-Side Routing (404 Redirect)

For Single Page Applications (SPAs) using client-side routing (e.g., React Router's `BrowserRouter`), direct access to sub-routes or refreshing on a sub-route can result in a 404 error on GitHub Pages. To fix this, a custom `404.html` file was created in the `public` directory. This file contains a JavaScript snippet that redirects all 404 requests within the application's base path to `index.html`, allowing the client-side router to handle the route.

File: `public/404.html`
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Get the current path, excluding the base path if present
    var path = window.location.pathname;
    var basePath = "/movieDatabase"; // Your GitHub Pages repository name
    if (path.startsWith(basePath)) {
      path = path.substring(basePath.length);
    }

    // Redirect to index.html, preserving the path for client-side routing
    window.location.replace(basePath + "/index.html" + window.location.search + window.location.hash + path);
  </script>
</head>
<body>
  <p>If you are not redirected automatically, follow this <a href="/movieDatabase/index.html">link</a>.</p>
</body>
</html>
```

After creating this file, the project needs to be rebuilt and redeployed (`npm run deploy`) to include `404.html` in the `dist` folder and push it to the `gh-pages` branch.
