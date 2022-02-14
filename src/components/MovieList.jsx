import { useLocation, NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMAGE_URL } from 'services/movieApi';

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
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  transition: 0.25s;
`;
export const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const Image = styled.img`
  width: 300px;
  height: auto;
`;
export const Subtitle = styled.p`
  color: #2196f3;
  font-weight: 500;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
`;
export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <List>
        {movies.map(movie => (
          <Item key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {<Subtitle>{movie.title}</Subtitle>}
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
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
