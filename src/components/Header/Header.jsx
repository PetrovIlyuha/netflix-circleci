import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import './Header.scss';
import logo from '../../logo.svg';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuClickFuture from '../../assets/sound/menu_fx_futuristic_1.mp3';

import {
  getMoviesByType,
  removeHoveredMovieGridIndex,
  setCurrentList,
  setPage,
  setSearchedToEmpty,
  triggerScrollToGrid
} from '../../redux/moviesSlice';
import { useThrottledDispatch } from '../../hooks/useThrottledDispatch';
import { IMAGE_URL } from '../../services/apiService/movies.service';

export const HeaderLinks = [
  {
    id: '329fj',
    icon: 'fas fa-film',
    content: 'Now in Theaters',
    apiCall: 'now_playing'
  },
  { id: '529fj', icon: 'fas fa-fire', content: 'Popular', apiCall: 'popular' },
  {
    id: '729fj',
    icon: 'fas fa-star',
    content: 'Top Rated',
    apiCall: 'top_rated'
  },
  {
    id: '129fj',
    icon: 'fas fa-helicopter',
    content: 'Upcoming',
    apiCall: 'upcoming'
  }
];

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [playMenuClickSound] = useSound(MenuClickFuture);
  const { movies, page, currentlyShowing } = useSelector(
    (state) => state.movies
  );
  const [mobileMenu, setMobileMenu] = useState(false);
  const [underlineIndex, setUnderlineIndex] = useState(null);
  const [underlineClass, setUnderlineClass] = useState(
    'underlined_now_playing'
  );
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  const throttledSearch = useThrottledDispatch();

  const findMoviesFromUserInput = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm.length) {
      throttledSearch(searchTerm, 1);
    }
  }, [searchTerm]);

  const getDataAndSetStyle = (index, type) => {
    playMenuClickSound();
    dispatch(setSearchedToEmpty());
    history.push('/');
    setSearchTerm('');
    dispatch(setPage(1));
    dispatch(removeHoveredMovieGridIndex());
    showUnderLineForMenuItem(index);
    dispatch(triggerScrollToGrid());
    dispatch(setCurrentList(type));
    if (mobileMenu) setMobileMenu(false);
    dispatch(getMoviesByType({ type, page: page }));
  };

  const forwardToHomePage = () => {
    window.location.replace('/');
  };
  const showUnderLineForMenuItem = (index) => {
    const className = HeaderLinks.find((l) => l.id === index).apiCall;
    setUnderlineClass('underlined' + `_${className}`);
    setUnderlineIndex(index);
  };
  return (
    <React.Fragment>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image" onClick={forwardToHomePage}>
            <img src={logo} alt="logo" />
            <h3>NetFlux</h3>
          </div>
          <div
            className={
              mobileMenu
                ? 'header-menu-toggle is-active-bars'
                : 'header-menu-toggle'
            }
            id="header-mobile-menu"
            onClick={toggleMobileMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul
            className={
              mobileMenu ? 'header-nav header-mobile-nav' : 'header-nav'
            }
            style={{
              background: mobileMenu
                ? `url(${IMAGE_URL}${movies[currentlyShowing].results[0].backdrop_path})`
                : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {HeaderLinks.map((link) => (
              <li
                key={link.id}
                className={
                  underlineIndex === link.id
                    ? 'header-nav-item is-active'
                    : 'header-nav-item'
                }
                onClick={() => getDataAndSetStyle(link.id, link.apiCall)}
              >
                <span className="header-list-name">
                  <i className={link.icon}></i>
                </span>{' '}
                {link.content}
                {underlineIndex === link.id && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={underlineClass}
                  ></motion.span>
                )}
              </li>
            ))}
            <input
              type="search"
              className="search-input"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={findMoviesFromUserInput}
            />
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
