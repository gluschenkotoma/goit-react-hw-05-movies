import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink, useParams } from 'react-router-dom';

import { toast } from 'react-hot-toast';

import { getMoviesById } from 'services/movieApi';
import { Loader } from 'components/Loader';

export const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const movieId = useParams();

  const {
    id,
    poster_path,
    overview,
    genres,
    vote_average,
    title,
    release_date,
  } = movie;

  let genresName = [];

  function getGenresByName() {
    return genres.map(genre => genresName.push(genre.name));
  }

  getGenresByName();

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
  }, [movieId]); // при обновлении идентификатора фильма

  return (
    <div>
      {loading && <Loader />}

      {movie && (
        <div>
          {' '}
          <div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                alt={title}
              />
            </div>

            <div>
              <h1>
                {title} ({release_date?.slice(0, 4)})
              </h1>
              <p>User Score: {vote_average * 10} %</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <p>{genresName.join(', ')}</p>
            </div>
          </div>
          <div>
            <h2>Additional information</h2>
            <ul>
              <li>
                <NavLink to={`/movies/${id}/cast`}>CAST</NavLink>
              </li>
              <li>
                <NavLink to={`/movies/${id}/reviews`}>REWIEVS</NavLink>
              </li>
            </ul>
            <Suspense fallback="">
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

//
// # import { useParams } from 'react-router-dom';
//  useParams - получить id (динамический параметр :itemId) из url
//  useParams - возвращает обьект динамического параметра
//  const p = useParams();
// console.log(p); //{itemId: '9'}
