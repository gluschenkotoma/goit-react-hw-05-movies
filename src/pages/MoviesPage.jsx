import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const MoviesPage = () => {
  const [searchParams, setsearchParams] = useSearchParams();

  // сделать запрос
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      console.log('делаем риквест');
    }
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.currentTarget.elements.query.value);
    setsearchParams({ query: e.currentTarget.elements.query.value });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <input type="text" name="query" />
      <button type="submit">Search query</button>
    </form>
  );
};
