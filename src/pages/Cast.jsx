import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/movieApi';
import { toast } from 'react-hot-toast';

export const Cast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieCasts, setMovieCasts] = useState([]);
  useEffect(() => {
    async function fetchCasts() {
      try {
        const casts = await getMovieCast(movieId);
        setMovieCasts(casts);
      } catch (error) {
        toast.error('Упс! Что-то пошло не так! Вернитесь на главную страницу');
      } finally {
        setLoading(false);
      }
    }
    fetchCasts();
  }, [movieId]);

  return (
    <ul>
      {movieCasts.map(({ id, profile_path, original_name, character }) => (
        <li key={id}>
          <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt="" />
          <div>
            <p>name: {original_name}</p>
            <p>character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
