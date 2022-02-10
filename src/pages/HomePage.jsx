import { Link } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { useFetchItems } from 'hooks';

export const HomePage = () => {
  const { movies, loading, error } = useFetchItems();

  return (
    <main>
      <h1>MovieList</h1>
      {loading && <Loader />}

      {!error && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
