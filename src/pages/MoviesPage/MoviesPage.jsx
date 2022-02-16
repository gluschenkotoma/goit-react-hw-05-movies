import toast from 'react-hot-toast';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';
import { MovieList } from 'components/MovieList';

import { useFetchByQuery } from 'hooks';
import { Form, SearchFormInput, SearchFormButton } from './MoviesPage.styled';

export const MoviesPage = () => {
  const { movies, loading, query, setSearchParams } = useFetchByQuery();

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    if (searchQuery === '') {
      toast.error('Введите название фильма!');
      return;
    }
    setSearchParams({ query: searchQuery.trim() });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <SearchFormInput type="text" name="query" />
        <SearchFormButton type="submit">Search query</SearchFormButton>
      </Form>

      {loading && <Loader />}

      {query && !loading && <MovieList movies={movies} />}
    </div>
  );
};
MoviesPage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

// import { useSearchParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { getMoviesByQuery } from 'services/movieApi';

// const [searchParams, setSearchParams] = useSearchParams();
// const [movies, setMovies] = useState([]);
// const [loading, setLoading] = useState(false);

// // сделать запрос
// const query = searchParams.get('query');

// useEffect(() => {
//   if (query) {
//     async function fetchMoviesByQuery() {
//       setLoading(true);
//       try {
//         const movies = await getMoviesByQuery(query);
//         console.log(movies);

//         if (movies.length === 0) {
//           toast.error(
//             'Нет фильма по такому запросу! Введите название фильма.'
//           );
//           return;
//         }
//         setMovies(movies);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchMoviesByQuery();
//   }
// }, [query]);
