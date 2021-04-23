import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './Rating.scss';

const Rating = ({ rating }) => {
  const [starsFilled, setStarsFilled] = useState([]);
  const [halfStar, setHalfStar] = useState(0);
  const [hollowStars, setHollowStars] = useState([]);

  useEffect(() => {
    const starRatingFilled = Array(Math.ceil(Math.ceil(rating) / 2)).fill(
      <i className="fa fa-star rating-star" />
    );
    const halfStar = rating % parseInt(rating);
    const getHollowStars = (length) => {
      return length > 0
        ? Array(length).fill(<i className="fa fa-star hollow-star" />)
        : [];
    };
    setStarsFilled(starRatingFilled);
    setHalfStar(halfStar);
    if (halfStar) {
      setHollowStars(getHollowStars(5 - starRatingFilled.length));
    } else {
      setHollowStars([]);
    }
  }, []);
  const starRatingFull = [
    ...(halfStar ? starsFilled.slice(0, -1) : starsFilled),
    ...(halfStar
      ? Array(1).fill(<i className="fa fa-star-half rating-star" />)
      : []),
    ...hollowStars
  ];
  return (
    <div className="rating">
      Rating: <span className="stars"></span>
      {starRatingFull.map((star) => (
        <React.Fragment key={uuidv4()}>{star}</React.Fragment>
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number
};

export default Rating;
