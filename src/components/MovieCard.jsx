import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';

export const MovieCard = ({ movie }) => {
  console.log(movie.id);
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

  return (
    <div>
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
  );
};
