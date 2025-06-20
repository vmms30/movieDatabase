const API_KEY = "189eae0805817e6d9daf2632ae56dbda";

const url = "https://api.themoviedb.org/3/authentication";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODllYWUwODA1ODE3ZTZkOWRhZjI2MzJhZTU2ZGJkYSIsIm5iZiI6MTc0OTQ3MTAxMi45NDUsInN1YiI6IjY4NDZjZjI0NWNiMjdmYjgyMjM0MmEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySVk0GW9U2wg66r4r02ojVU6aMa2mHoBCZmCfNU9G48",
  },
};

const authetication = fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
const getMovies = async () => {};

const movieList = "https://api.themoviedb.org/3/movie/changes?page=1";

const getMovieList = async () => {
  const data = await fetch(movieList, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
};
