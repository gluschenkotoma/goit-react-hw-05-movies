import { Link, useLocation } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { useFetchItems } from 'hooks';
import PropTypes from 'prop-types';

export const HomePage = () => {
  const { movies, loading, error } = useFetchItems();
  const location = useLocation();
  return (
    <main>
      <h1>MovieList</h1>
      {loading && <Loader />}

      {!error && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

// <Link to={`/movies/${movie.id}`}>{movie.title}</Link> будет вести на ->
//  <Route path="movies/:movieId" element={<MovieDetailsPage />}>
HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
