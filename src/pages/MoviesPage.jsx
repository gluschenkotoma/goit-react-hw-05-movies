import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'services/movieApi';
import toast from 'react-hot-toast';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

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

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    if (searchQuery === '') {
      toast.error('Введите название фильма!');
      return;
    }
    setSearchParams({ query: searchQuery.trim() });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="query" />
        <button type="submit">Search query</button>
      </form>

      {loading && <Loader />}

      {query && !loading && (
        <div>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
MoviesPage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
