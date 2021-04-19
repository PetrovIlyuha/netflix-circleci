import React from 'react';

interface IndicatorProps {
  currentSlide: number;
  slides: number;
}

// eslint-disable-next-line react/prop-types
const Indicators: React.FunctionComponent<IndicatorProps> = ({
  currentSlide,
  slides
}) => {
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

export default Indicators;
