import React, { useEffect, useState } from 'react';
import './Header.scss';
import logo from '../../logo.svg';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMoviesByType,
  setCurrentList,
  setPage,
  setPreloadedData,
  setSearchedToEmpty,
  triggerScrollToGrid
} from '../../redux/moviesSlice';
import { useThrottledDispatch } from '../../hooks/useThrottledDispatch';

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
  const { movies, page } = useSelector((state) => state.movies);
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
    throttledSearch(searchTerm, 1);
  }, [searchTerm]);

  const getDataAndSetStyle = (index, type) => {
    dispatch(setSearchedToEmpty());
    setSearchTerm('');
    dispatch(setPage(1));
    showUnderLineForMenuItem(index);
    dispatch(triggerScrollToGrid());
    dispatch(setCurrentList(type));
    if (mobileMenu) setMobileMenu(false);
    const moviesPrevLoaded = localStorage.getItem(type);
    if (!moviesPrevLoaded) {
      dispatch(getMoviesByType({ type, page: page }));
    } else if (!movies[type]) {
      const data = JSON.parse(localStorage.getItem(type));
      dispatch(setPreloadedData({ type, data }));
    }
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
          <div className="header-image">
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
