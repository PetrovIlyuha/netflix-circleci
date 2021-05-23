import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import './MiniSlider.scss';
import { IMAGE_URL } from '../../../../services/apiService/movies.service.js';

const MiniSlider = ({ slides }) => {
  console.log(slides.map((slide) => `${IMAGE_URL}${slide.logo_path}`));
  console.log(slides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [sliderAnimation, setSliderAnimation] = useState(false);
  const slideIndexRef = React.useRef(0);
  const sliderRef = React.useRef(null);

  const initializeSliderInterval = () => {
    if (sliderRef.current !== null) {
      clearInterval(sliderRef.current);
    }
    sliderRef.current = setInterval(() => {
      triggerSlideAnimation();
      if (slideIndexRef.current === slides.length - 1) {
        slideIndexRef.current = 0;
        setCurrentSlideIndex(slideIndexRef.current);
      } else {
        slideIndexRef.current += 1;
        setCurrentSlideIndex(slideIndexRef.current);
      }
    }, 5000);
  };
  useEffect(() => {
    initializeSliderInterval();
    return () => {
      clearInterval(sliderRef.current);
    };
  }, []);

  const triggerSlideAnimation = () => {
    setSliderAnimation(true);
    setTimeout(() => {
      setSliderAnimation(false);
    }, 4900);
  };

  return (
    <React.Fragment>
      <div>
        <CSSTransition in={sliderAnimation} timeout={500} classNames="slide-in">
          <div className="single_mini_slide">
            <img src={`${IMAGE_URL}${slides[currentSlideIndex].logo_path}`} />
            <span>{slides[currentSlideIndex]?.name}</span>
          </div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};

MiniSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default MiniSlider;
