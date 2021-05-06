import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SearchGrid.scss';
import '../movieGrid/MovieGrid.scss';
import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/apiService/movies.service';
import LazyLoadedImage from '../../lazy-load/LazyLoadedImage';

const SearchGrid = () => {
  const { searchedMovies, setGridIntoView } = useSelector(
    (state) => state.movies
  );
  const gridRef = useRef();

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

  return (
    <div className="grid" ref={gridRef}>
      {searchedMovies.length > 0 &&
        searchedMovies.map((movie, index) => (
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

export default SearchGrid;
