import React from 'react';
import SlideShow from '../slide-show/SlideShow';
import './MainContent.scss';

const MainContent = () => {
  return (
    <div className="main-content">
      <SlideShow />
      <div className="grid-movie-titles">
        <div className="movie-type">Playing Now in Theaters</div>
        <div className="pagination">Pagination</div>
      </div>
    </div>
  );
};

export default MainContent;
