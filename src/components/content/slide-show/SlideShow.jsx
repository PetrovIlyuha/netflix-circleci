import React, { useState, useEffect } from 'react';
import Indicators from './Indicators.jsx';
import { CSSTransition } from 'react-transition-group';
import './SlideShow.scss';
import { useSelector } from 'react-redux';
import { fallbackImagesFirstLoaded } from '../../../services/apiService/movies.service.js';

const SlideShow = () => {
  // eslint-disable-next-line
  const { currentlyShowing, page, currentSlideshowImages } = useSelector(
    (state) => state.movies
  );
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (currentSlideshowImages.length) {
      setImages(currentSlideshowImages.slice(0, 6));
    } else {
      setImages(fallbackImagesFirstLoaded.slice(0, 6));
    }
  }, [currentlyShowing, page]);
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
      if (slideIndexRef.current === 5) {
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

  const changeSlide = (direction) => {
    initializeSliderInterval();
    if (direction === 'prev' && slideIndexRef.current > 0) {
      slideIndexRef.current -= 1;
      setCurrentSlideIndex(slideIndexRef.current);
    } else if (direction === 'prev' && slideIndexRef.current === 0) {
      slideIndexRef.current = images.length - 1;
      setCurrentSlideIndex(slideIndexRef.current);
    } else if (
      direction === 'next' &&
      slideIndexRef.current < images.length - 1
    ) {
      slideIndexRef.current += 1;
      setCurrentSlideIndex(slideIndexRef.current);
    } else if (
      direction === 'next' &&
      slideIndexRef.current === images.length - 1
    ) {
      slideIndexRef.current = 0;
      setCurrentSlideIndex(slideIndexRef.current);
    }
  };

  return (
    <React.Fragment>
      {images.length > 0 && (
        <div className="slider">
          <div className="slider-slides">
            <CSSTransition
              in={sliderAnimation}
              timeout={500}
              classNames="slide-in"
            >
              <div
                className="slider-image"
                style={{
                  backgroundImage: `url(${images[currentSlideIndex]})`,
                  objectFit: 'cover'
                }}
              />
            </CSSTransition>
          </div>
          <Indicators currentSlide={currentSlideIndex} slides={images.length} />
          <div className="slider-arrows">
            <div
              className="slider-arrow slider-arrow--left"
              onClick={() => changeSlide('prev')}
            />
            <div
              className="slider-arrow slider-arrow--right"
              onClick={() => changeSlide('next')}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SlideShow;
