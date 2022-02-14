import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/movieApi';
import { toast } from 'react-hot-toast';
import { FcBusinessman } from 'react-icons/fc';

export const Cast = () => {
  const { movieId } = useParams();
  const [movieCasts, setMovieCasts] = useState([]);
  // const location = useLocation();
  useEffect(() => {
    async function fetchCasts() {
      try {
        const movieCasts = await getMovieCast(movieId);
        console.log(movieCasts);
        setMovieCasts(movieCasts);
      } catch (error) {
        toast.error('Упс! Что-то пошло не так! Вернитесь на главную страницу');
      }
    }
    fetchCasts();
  }, [movieId]);

  return (
    <>
      <div>
        <ul>
          {movieCasts.map(
            ({ id, profile_path, original_name, character, name }) => (
              <li key={id}>
                {profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w154${profile_path}`}
                    alt={name}
                  />
                ) : (
                  <FcBusinessman />
                )}
                <div>
                  <p>name: {original_name}</p>
                  <p>character: {character}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      {/* при условии рендера на отдельной страницы */}
      {/* <hr />
      <NavLink to={location?.state?.from ?? '/'}>Go back</NavLink>
      <hr /> */}
    </>
  );
};
