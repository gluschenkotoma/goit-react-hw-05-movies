import axios from 'axios';
const API_KEY = 'c3b1e4ac20f5db884f8c75b276d34d38';
axios.defaults.baseURL = 'https://www.themoviedb.org/3/';

export const getMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

// https://api.themoviedb.org/3/trending/movie/day?api_key=c3b1e4ac20f5db884f8c75b276d34d38
