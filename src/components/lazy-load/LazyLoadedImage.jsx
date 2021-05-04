import React, { useEffect, useState } from 'react';
import ImagePlaceholder2 from '../../assets/GenericMovieLoader2.jpg';
import PropTypes from 'prop-types';

const LazyLoadedImage = ({ src, alt, children, className }) => {
  const [image, setImage] = useState(ImagePlaceholder2);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImage(src);
                observer.unobserve(imageRef);
              }
            });
          },
          { root: document, threshold: 0.5, rootMargin: '3%' }
        );
        observer.observe(imageRef);
      }
    } else {
      setImage(src);
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageRef, image]);
  return (
    <div
      ref={setImageRef}
      className={className}
      alt={alt}
      style={{
        backgroundImage: `url(${image})`
      }}
    >
      {children}
    </div>
  );
};

LazyLoadedImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
};

export default LazyLoadedImage;
