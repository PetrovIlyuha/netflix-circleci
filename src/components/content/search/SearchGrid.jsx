import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import useSound from 'use-sound';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../movieGrid/MovieGrid.scss';
import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/apiService/movies.service';
import LazyLoadedImage from '../../lazy-load/LazyLoadedImage';
import {
  getMovieVideos,
  removeHoveredMovieGridIndex,
  setHoveredMovieGridIndex,
  setSearchedToEmpty
} from '../../../redux/moviesSlice';
import ScreenChangesSound from '../../../assets/sound/change-screen-1.mp3';

const SearchGrid = () => {
  const {
    searchedMovies,
    setGridIntoView,
    hoveredMovieGridIndex,
    youtubeVideo
  } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const gridRef = useRef();
  const [playScreenChangedSound] = useSound(ScreenChangesSound);

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

  const changePageToDetailed = () => {
    dispatch(setSearchedToEmpty());
    playScreenChangedSound();
  };

  return (
    <div className="grid" ref={gridRef}>
      {searchedMovies.length > 0 &&
        searchedMovies.map((movie, index) => {
          return index === hoveredMovieGridIndex && youtubeVideo ? (
            <motion.div
              initial={{ opacity: 0, x: -100, y: 100, rotateY: 90 }}
              animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: (0.2 * index) % 2 }}
              key={movie.id}
              className="grid-cell__iframe"
            >
              <iframe
                key={index}
                height="100%"
                width="100%"
                autoPlay={true}
                src={`https://www.youtube.com/embed/${youtubeVideo.items[0].id}?autoplay=0&showinfo=0&controls=0`}
                frameBorder="0"
              />
              <div className="grid-iframe__info">
                <button
                  className="grid-iframe-button"
                  onClick={() => dispatch(removeHoveredMovieGridIndex())}
                >
                  Back To Full Card
                </button>
                <Link to={`/movie/${movie.id}`}>
                  <button
                    className="grid-iframe-button"
                    onClick={changePageToDetailed}
                  >
                    Read More
                  </button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -100, y: 100, rotateY: 90 }}
              animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: (0.2 * index) % 2 }}
              key={movie.id}
            >
              <LazyLoadedImage
                alt="movie poster"
                className="grid-cell"
                src={`${IMAGE_URL}${movie.poster_path}`}
              >
                <div className="videoPreviewIcon">
                  <i
                    className="far fa-eye"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      dispatch(setHoveredMovieGridIndex(index));
                      dispatch(getMovieVideos(movie.id));
                    }}
                  ></i>
                </div>
                <Link to={`movie/${movie.id}`}>
                  <div className="grid-read-more">
                    <button
                      className="grid-cell-button"
                      onClick={changePageToDetailed}
                    >
                      Read More
                    </button>
                  </div>
                </Link>
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
          );
        })}
    </div>
  );
};

export default SearchGrid;
