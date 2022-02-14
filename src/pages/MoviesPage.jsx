import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'services/movieApi';
import toast from 'react-hot-toast';
import { Loader } from 'components/Loader';
import PropTypes from 'prop-types';
import { MovieList } from 'components/MovieList';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const SearchFormButton = styled.button`
  padding: 6px 22px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.62;
  text-align: center;
  letter-spacing: 0.03em;
  color: #ffffff;
  background: #3f51b5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    box-shadow: 0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08),
      0px 2px 2px rgba(0, 0, 0, 0.12);
  }
`;

export const SearchFormInput = styled.input`
  display: inline-block;
  width: 300px;

  font: inherit;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: rgba(0, 0, 0, 0.12);
  padding: 7px 22px;
  margin-right: 10px;

  &:focus {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08),
      0px 2px 2px rgba(0, 0, 0, 0.12);
    background-color: white;
  }
`;

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // сделать запрос
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      async function fetchMoviesByQuery() {
        setLoading(true);
        try {
          const movies = await getMoviesByQuery(query);
          console.log(movies);

          if (movies.length === 0) {
            toast.error(
              'Нет фильма по такому запросу! Введите название фильма.'
            );
            return;
          }
          setMovies(movies);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchMoviesByQuery();
    }
  }, [query]);

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
