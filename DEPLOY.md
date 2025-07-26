# Deployment Steps

This project is deployed on GitHub Pages. Follow these steps to deploy your own version:

## 1. Install gh-pages

Install the `gh-pages` package as a dev dependency:

```bash
npm install gh-pages --save-dev
```

## 2. Configure `package.json`

Add the following properties to your `package.json` file:

- `homepage`: Set this to `https://{your-username}.github.io/{your-repo-name}`.
- `scripts`: Add `predeploy` and `deploy` scripts.

```json
{
  "name": "movie-db",
  "homepage": "https://{your-username}.github.io/{your-repo-name}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  // ...
}
```

## 3. Configure `vite.config.js`

Set the `base` option in your `vite.config.js` file to your repository name:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/{your-repo-name}",
});
```

## 4. Deploy

Run the deploy script:

```bash
npm run deploy
```

This will build the project and deploy it to your GitHub Pages site.
