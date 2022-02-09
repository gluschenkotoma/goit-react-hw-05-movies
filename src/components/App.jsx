import { lazy } from 'react'; // динамический импорт
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from 'pages';
import { Layout } from 'components/Layout';

// для именованых экспортов

const createChunk = componentName => {
  return lazy(() =>
    import(`../pages/${componentName}`).then(module => ({
      default: module[componentName],
    }))
  );
};
const MoviesPage = createChunk('MoviesPage');
const MovieDetailsPage = createChunk('MovieDetailsPage');
const Cast = createChunk('Cast');
const Reviews = createChunk('Reviews');

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />

        <Route path="movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="movies/:movieId/cast" element={<Cast />} />
          <Route path="movies/:movieId/reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
