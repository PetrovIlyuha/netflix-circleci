import React from 'react';
import * as PropTypes from 'prop-types';

const Indicators = ({ currentSlide, slides }) => {
  const indicators = Array(slides)
    .fill(0)
    .map((_, index) => {
      const buttonClass =
        index === currentSlide
          ? 'slider-navButton slider-navButton--active'
          : 'slider-navButton';
      return <button key={index} className={buttonClass} />;
    });
  return <div className="slider-nav">{indicators}</div>;
};

Indicators.propTypes = {
  currentSlide: PropTypes.number,
  slides: PropTypes.number
};

export default Indicators;
