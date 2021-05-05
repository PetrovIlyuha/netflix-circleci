import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { typeToTitleEnum } from '../../../redux/moviesSlice';
import MovieGrid from '../movieGrid/MovieGrid';
import Pagination from '../pagination/Pagination';
import SlideShow from '../slide-show/SlideShow';
import './MainContent.scss';

const MainContent = () => {
  const { currentlyShowing } = useSelector((state) => state.movies);
  return (
    <div className="main-content">
      <SlideShow />
      <div className="grid-movie-titles">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={typeToTitleEnum[currentlyShowing]}
            initial={{ opacity: 0.3, x: 130 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            exit={{ opacity: 0, x: -100 }}
            className="movie-type"
          >
            {typeToTitleEnum[currentlyShowing]}
          </motion.div>
        </AnimatePresence>
        <div className="pagination">
          <Pagination topPagination={true}/>
        </div>
      </div>
      <MovieGrid />
      <div className="grid-movie-titles">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={typeToTitleEnum[currentlyShowing]}
            initial={{ opacity: 0.3, x: 130 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            exit={{ opacity: 0, x: -100 }}
            className="movie-type"
          >
            {typeToTitleEnum[currentlyShowing]}
          </motion.div>
        </AnimatePresence>
        <div className="pagination">
          <Pagination topPagination={false}/>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
