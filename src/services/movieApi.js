import axios from 'axios';
const API_KEY = 'c3b1e4ac20f5db884f8c75b276d34d38';
axios.defaults.baseURL = 'https://api.themoviedb.org';

export const getMovies = async () => {
  const response = await axios.get(`/3/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};
// https://api.themoviedb.org/3/trending/movie/day?api_key=c3b1e4ac20f5db884f8c75b276d34d38

export const getMoviesByQuery = async query => {
  const response = await axios.get(
    `/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};
// https://api.themoviedb.org/3/search/movie?api_key=c3b1e4ac20f5db884f8c75b276d34d38
// & language=en - US & page=1 & include_adult=false
