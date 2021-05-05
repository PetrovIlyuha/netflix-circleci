import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMoviesByType,
  setCurrentList,
  setPreloadedData
} from '../../../redux/moviesSlice';
import './MovieGrid.scss';
import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/apiService/movies.service';
import LazyLoadedImage from '../../lazy-load/LazyLoadedImage';

const MovieGrid = () => {
  const dispatch = useDispatch();
  const {
    movies,
    currentlyShowing,
    setGridIntoView,
    page: storedPage
  } = useSelector((state) => state.movies);
  const gridRef = useRef();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(storedPage);
  }, [storedPage]);

  useEffect(() => {
    if (setGridIntoView) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        gridRef.current.scrollIntoView({
          top: 700,
          left: 0,
          behavior: 'smooth'
        });
      }, 1000);
    }
  }, [setGridIntoView]);

  useEffect(() => {
    dispatch(setCurrentList('popular'));
    const popularMoviesLoaded = localStorage.getItem('type: popular, page: 1');
    if (popularMoviesLoaded) {
      const popularData = JSON.parse(
        localStorage.getItem('type: popular, page: 1')
      );
      dispatch(setPreloadedData({ type: 'popular', data: popularData }));
    } else {
      dispatch(getMoviesByType({ type: 'popular', page }));
    }
  }, []);
  return (
    <div className="grid" ref={gridRef}>
      {movies[currentlyShowing] &&
        movies[currentlyShowing].results.map((movie, index) => (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 100, rotateY: 90 }}
            animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: (0.2 * index) % 2 }}
            key={movie.id}
          >
            <LazyLoadedImage
              className="grid-cell"
              alt="movie poster"
              src={`${IMAGE_URL}${movie.poster_path}`}
            >
              <div className="grid-read-more">
                <button className="grid-cell-button">
                  <Link to="/">Read More</Link>
                </button>
              </div>
              <div
                className="grid-detail"
                style={{
                  backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})`
                }}
              >
                <div className="grid-detail-overlay">
                  <span
                    className="grid-detail-title"
                    style={{
                      fontSize:
                        movie.original_title.length > 15 ? '1.3rem' : '1.8rem'
                    }}
                  >
                    {movie.original_title}
                  </span>
                  <div className="grid-detail-rating">
                    <Rating rating={movie.vote_average} />
                  </div>
                </div>
              </div>
            </LazyLoadedImage>
          </motion.div>
        ))}
    </div>
  );
};

export default MovieGrid;
