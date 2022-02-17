import { useState, useEffect } from 'react';
import { useParams, useLocation, Outlet, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getMoviesById } from '../services/movieApi';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';

export const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();

  useEffect(() => {
    async function fetchMoviesById() {
      setLoading(true);
      try {
        const movie = await getMoviesById(movieId);
        setMovie(movie);
      } catch (error) {
        toast.error('Упс! Что-то пошло не так! Вернитесь на главную страницу');
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesById();
  }, [movieId]);

  return (
    <div>
      <hr />
      <NavLink to={location?.state?.from ?? '/'}>Go back</NavLink>
      <hr />
      {loading && <Loader />}
      {movie && (
        <>
          <div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
              />
              <div>
                <h2>{movie.original_title}</h2>
                <p>Vote Average: {movie.vote_average}</p>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
                <h4>Genres</h4>
                {movie.genres && (
                  <ul>
                    {movie.genres.map((genre, index) => (
                      <li key={index}>{genre.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <hr />
            <div>
              <h4>Additional Information</h4>
              <ul>
                <li>
                  <NavLink
                    to={`/movies/${movie.id}/cast`}
                    state={{ from: location?.state?.from }}
                  >
                    CAST
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/movies/${movie.id}/reviews`}
                    state={{ from: location?.state?.from }}
                  >
                    REVIEW
                  </NavLink>
                </li>
              </ul>
            </div>

            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

MovieDetailsPage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    vote_average: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
  }),
};

//
// # import { useParams } from 'react-router-dom';
//  useParams - получить id (динамический параметр :itemId) из url
//  useParams - возвращает обьект динамического параметра
//  const p = useParams();
// console.log(p); //{itemId: '9'}
