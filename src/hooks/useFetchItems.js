import { useEffect, useState } from 'react';
import { getMovies } from 'services/movieApi';

export const useFetchItems = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const movies = await getMovies();

        setMovies(movies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  return { movies, loading, error };
};
