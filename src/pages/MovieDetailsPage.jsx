import { useState, useEffect } from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getMoviesById } from '../services/movieApi';
import { Loader } from 'components/Loader';
import { MovieCard } from 'components/MovieCard';

export const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const movieId = useParams();
  console.log(movieId);
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
      {loading && <Loader />}

      {movie && (
        <>
          <NavLink to={location?.state?.from ?? '/'}>Go back</NavLink>
          <MovieCard movie={movie} />
        </>
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
