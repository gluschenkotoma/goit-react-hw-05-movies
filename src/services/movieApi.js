import axios from 'axios';
const API_KEY = 'c3b1e4ac20f5db884f8c75b276d34d38';
axios.defaults.baseURL = 'https://api.themoviedb.org';

export const getMovies = async () => {
  const response = await axios.get(`/3/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.data.results;
  return data;
};

// https://api.themoviedb.org/3/trending/movie/day?api_key=c3b1e4ac20f5db884f8c75b276d34d38
