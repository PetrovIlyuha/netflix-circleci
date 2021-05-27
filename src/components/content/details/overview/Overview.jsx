import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../../services/apiService/movies.service';
import { numToCurrency } from '../../../../utils';
import NoActorPhoto from '../../../../assets/no-actor-photo.jpg';

import './Overview.scss';
import MiniSlider from './MiniSlider';

const Overview = () => {
  const [items, setItems] = useState([]);
  const { movieDetails, movieCast, actorsImages } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    const detailItems = [
      {
        id: 0,
        name: 'Tagline',
        value: movieDetails.tagline || 'No tagline'
      },
      {
        id: 1,
        name: 'Languages',
        value: movieDetails.spoken_languages[0].english_name
      },
      {
        id: 2,
        name: 'Budget',
        value: `${
          movieDetails.budget !== 0
            ? numToCurrency(movieDetails.budget)
            : 'Not disclosed'
        }`
      },
      {
        id: 3,
        name: 'Revenue',
        value: `${
          movieDetails.revenue !== 0
            ? numToCurrency(movieDetails.revenue)
            : 'No data on revenue yet'
        }`
      },
      {
        id: 4,
        name: 'Status',
        value: movieDetails.status
      },
      {
        id: 5,
        name: 'Release Date',
        value: movieDetails.release_date
      },
      {
        id: 6,
        name: 'Run Time',
        value: `${movieDetails.runtime} min.`
      }
    ];
    setItems(detailItems);

    // eslint-disable-next-line
  }, [movieCast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
      className="overview"
    >
      <div>
        <div className="description">{movieDetails.overview}</div>
        <h4 className="cast__title">Cast</h4>
        <div className="cast">
          {movieCast !== null &&
            actorsImages.length > 0 &&
            movieCast.cast.slice(0, 6).map((actor, index) => (
              <motion.div
                initial={{ opacity: 0, x: -100, y: 100, rotateY: 90 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: (0.2 * index) % 2 }}
                className="cast-item"
                key={actor.id}
              >
                <img
                  style={{ minHeight: 80 }}
                  src={
                    // eslint-disable-line
                    actorsImages[index]?.profiles[0].file_path !== undefined
                      ? `${IMAGE_URL}${actorsImages[index].profiles[0].file_path}`
                      : NoActorPhoto
                  }
                  alt="actor poster"
                />
                <div className="actor-name">{actor.name}</div>
                <div className="actor-movie_character">{actor.character}</div>
              </motion.div>
            ))}
        </div>
      </div>
      <div>
        <div className="prod__company">
          <h6>Production Companies</h6>
          <div className="companies-slider">
            <MiniSlider slides={movieDetails.production_companies} />
          </div>
        </div>
        <div className="details-grid">
          {items.map((data) => (
            <div className="overview-detail" key={data.id}>
              <h6 className="overview-detail__name">{data.name}</h6>
              <p className="overview-detail__value">{data.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;
