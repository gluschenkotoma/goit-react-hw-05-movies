import { Loader } from 'components/Loader';
import { useFetchItems } from 'hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MovieList } from 'components/MovieList';

export const Title = styled.h2`
  color: #2196f3;
  font-weight: 500;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export const HomePage = () => {
  const { movies, loading, error } = useFetchItems();

  return (
    <main>
      <Title>MOVIELIST</Title>
      {loading && <Loader />}

      {!error && <MovieList movies={movies} />}
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
