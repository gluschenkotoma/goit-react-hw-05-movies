import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/movieApi';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  // const location = useLocation();

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviews = await getMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <>
      <div>
        {reviews.length !== 0 ? (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h2>Author: {author}</h2>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews yet</p>
        )}
      </div>
      {/* при условии рендера на отдельной страницы */}
      {/* <hr />
      <NavLink to={location?.state?.from ?? '/'}>Go back</NavLink>
      <hr /> */}{' '}
    </>
  );
};
