import { NavLink, useLocation } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { useFetchItems } from 'hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMAGE_URL } from 'services/movieApi';

export const Title = styled.h2`
  color: #2196f3;
  font-weight: 500;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;
export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -20px;
  text-align: center;
  list-style: none;
`;

export const Item = styled.li`
  margin: 20px;
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  transition: 0.25s;
`;
const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
`;

export const HomePage = () => {
  const { movies, loading, error } = useFetchItems();
  const location = useLocation();
  return (
    <main>
      <Title>MOVIELIST</Title>
      {loading && <Loader />}

      {!error && (
        <List>
          {movies.map(movie => (
            <Item key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
                {
                  <Image
                    src={IMAGE_URL + movie.poster_path}
                    alt={movie.title || movie.name}
                    width="300"
                    height="450"
                  />
                }
              </Link>
            </Item>
          ))}
        </List>
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
