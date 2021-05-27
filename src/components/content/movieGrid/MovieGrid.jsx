import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMoviesByType,
  getMovieVideos,
  setCurrentList,
  setHoveredMovieGridIndex,
  removeHoveredMovieGridIndex
} from '../../../redux/moviesSlice';
import './MovieGrid.scss';
import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/apiService/movies.service';
import LazyLoadedImage from '../../lazy-load/LazyLoadedImage';
import ScreenChangesSound from '../../../assets/sound/change-screen-1.mp3';
import SimpleMenuClickSound from '../../../assets/sound/ui-click_1_up.mp3';
import TrailerLoads from '../../../assets/sound/trailer-opens.mp3';
import useSound from 'use-sound';

const MovieGrid = () => {
  const dispatch = useDispatch();
  const {
    movies,
    currentlyShowing,
    setGridIntoView,
    page: storedPage,
    youtubeVideo,
    hoveredMovieGridIndex
  } = useSelector((state) => state.movies);
  const gridRef = useRef();
  const [page, setPage] = useState(1);
  const [playScreenChangedSound] = useSound(ScreenChangesSound);
  const [playSimpleMenuClick] = useSound(SimpleMenuClickSound);
  const [playTrailerOpensSound] = useSound(TrailerLoads);
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
    dispatch(getMoviesByType({ type: 'popular', page }));
  }, []);
  return (
    <div className="grid" ref={gridRef}>
      {movies[currentlyShowing] &&
        movies[currentlyShowing].results.map((movie, index) => {
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
                  onClick={() => {
                    playSimpleMenuClick();
                    dispatch(removeHoveredMovieGridIndex());
                  }}
                >
                  Back To Full Card
                </button>
                <Link to={`/movie/${movie.id}`}>
                  <button
                    className="grid-iframe-button"
                    onClick={() => playScreenChangedSound()}
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
                      playTrailerOpensSound();
                    }}
                  ></i>
                </div>
                <div className="grid-read-more">
                  <Link to={`/movie/${movie.id}`}>
                    <button
                      className="grid-cell-button"
                      onClick={() => playScreenChangedSound()}
                    >
                      Read More
                    </button>
                  </Link>
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
          );
        })}
    </div>
  );
};

export default MovieGrid;
