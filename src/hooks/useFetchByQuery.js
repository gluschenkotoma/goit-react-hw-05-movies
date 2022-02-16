import { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'services/movieApi';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useFetchByQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);

  // сделать запрос
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      async function fetchMoviesByQuery() {
        setLoading(true);
        try {
          const movies = await getMoviesByQuery(query);
          console.log(movies);

          if (movies.length === 0) {
            toast.error(
              'Нет фильма по такому запросу! Введите название фильма.'
            );
            return;
          }
          setMovies(movies);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchMoviesByQuery();
    }
  }, [query]);

  return { movies, loading, query, setSearchParams };
};
