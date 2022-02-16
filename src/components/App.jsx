import { lazy } from 'react'; // динамический импорт
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from 'pages';
import { Layout } from 'components/Layout';

import { Suspense } from 'react';

// для именованых экспортов

const createChunk = componentName => {
  return lazy(() =>
    import(`../pages/${componentName}`).then(module => ({
      default: module[componentName],
    }))
  );
};
// const MoviesPage = createChunk('MoviesPage');
const MovieDetailsPage = createChunk('MovieDetailsPage');
const Cast = createChunk('Cast');
const Reviews = createChunk('Reviews');

const MoviesPage = lazy(() =>
  import('../pages/MoviesPage/MoviesPage').then(module => ({
    default: module.MoviesPage,
  }))
);

export const App = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
