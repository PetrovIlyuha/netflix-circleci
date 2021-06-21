import React from 'react';
import PropTypes from 'prop-types';

import './Media.scss';
import { IMAGE_URL } from '../../../../services/apiService/movies.service';

const Media = ({ trailers, images }) => {
  return (
    <>
      {trailers && images.posters.length > 0 && (
        <div className="media">
          <div>
            <div className="media-title">Watch Trailer</div>
            <div className="media-videos">
              {trailers.slice(0, 5).map((trailer, idx) => (
                <div key={idx} className="video">
                  <iframe
                    autoPlay={true}
                    allowFullScreen
                    style={{ width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${trailers[0].items[0].id}`}
                    frameBorder="0"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="media-title">Movie Posters</div>
            <div className="media-images">
              {images &&
                images.posters.slice(0, 8).map((image, idx) => (
                  <div
                    key={idx}
                    className="image-cell"
                    style={{
                      backgroundImage: `url(${IMAGE_URL}${image.file_path})`
                    }}
                  ></div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Media.propTypes = {
  trailers: PropTypes.arrayOf(PropTypes.element).isRequired,
  images: PropTypes.object.isRequired
};

export default Media;
