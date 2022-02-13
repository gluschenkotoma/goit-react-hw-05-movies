import axios from 'axios';
const API_KEY = 'c3b1e4ac20f5db884f8c75b276d34d38';
axios.defaults.baseURL = 'https://api.themoviedb.org';

// https://api.themoviedb.org/3/trending/movie/day?api_key=c3b1e4ac20f5db884f8c75b276d34d38
export const getMovies = async () => {
  const response = await axios.get(`/3/trending/movie/day?api_key=${API_KEY}`);
  // console.log('response', response);
  const data = await response.data.results;
  return data;
};

// поиск кинофильма по ключевому слову на странице фильмов
// https://api.themoviedb.org/3/search/movie?api_key=c3b1e4ac20f5db884f8c75b276d34d38
// & language=en - US & page=1 & include_adult=false
export const getMoviesByQuery = async query => {
  const response = await axios.get(
    `/3/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.data.results;
  return data;
};

//запрос полной информации о фильме для страницы кинофильма.
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=c3b1e4ac20f5db884f8c75b276d34d38&language=en-US
export const getMoviesById = async id => {
  const response = await axios.get(`/3/movie/${id}?api_key=${API_KEY}`);
  const data = await response.data;
  return data;
};

// запрос информации о актёрском составе для страницы кинофильма.
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=c3b1e4ac20f5db884f8c75b276d34d38&language=en-US
export const getMovieCast = async id => {
  const response = await axios.get(`/3/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await response.data.cast;
  return data;
};

// запрос обзоров для страницы кинофильма.
//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=c3b1e4ac20f5db884f8c75b276d34d38&language=en-US&page=1
export const getMovieReviews = async id => {
  const response = await axios.get(`/3/movie/${id}/reviews?api_key=${API_KEY}`);
  const data = await response.data.results;
  console.log(data);
  return data;
};
