import React, { useState, useEffect } from 'react';
import Indicators from './Indicators.jsx';
import { CSSTransition } from 'react-transition-group';
import './SlideShow.scss';

const SlideShow = () => {
  // eslint-disable-next-line
  const [images, setImages] = useState([
    {
      src:
        'https://i0.wp.com/itc.ua/wp-content/uploads/2019/02/Dune_Concept_Art_Illustration_Eduardo_Pena-1.jpg?fit=1400%2C764&quality=100&strip=all&ssl=1',
      index: 0
    },
    { src: 'https://i.ytimg.com/vi/xgbPSA94Rqg/maxresdefault.jpg', index: 1 },
    {
      src:
        'https://ixbt.online/gametech/covers/2021/03/11/jKrFbZzjOhBdsRtOsvbPoqCblvxSkqIph87Odsnc.jpg?w=948',
      index: 2
    },
    {
      src: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/tagteam.jpg',
      index: 3
    }
  ]);
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
      if (slideIndexRef.current === images.length - 1) {
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
      // triggerSlideAnimation();
    } else if (direction === 'prev' && slideIndexRef.current === 0) {
      slideIndexRef.current = images.length - 1;
      setCurrentSlideIndex(slideIndexRef.current);
      // triggerSlideAnimation();
    } else if (
      direction === 'next' &&
      slideIndexRef.current < images.length - 1
    ) {
      slideIndexRef.current += 1;
      setCurrentSlideIndex(slideIndexRef.current);
      // triggerSlideAnimation();
    } else if (
      direction === 'next' &&
      slideIndexRef.current === images.length - 1
    ) {
      slideIndexRef.current = 0;
      setCurrentSlideIndex(slideIndexRef.current);
      // triggerSlideAnimation();
    }
  };

  return (
    <React.Fragment>
      <div className="slider">
        <div className="slider-slides">
          {images.length > 0 && (
            <CSSTransition
              in={sliderAnimation}
              timeout={500}
              classNames="slide-in"
            >
              <div
                className="slider-image"
                style={{
                  backgroundImage: `url(${images[slideIndexRef.current].src})`
                }}
              />
            </CSSTransition>
          )}
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
    </React.Fragment>
  );
};

export default SlideShow;
