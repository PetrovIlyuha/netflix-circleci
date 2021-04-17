import React, { useState } from 'react';
import './Header.scss';
import logo from '../../logo.svg';

const HeaderLinks = [
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
    icon: 'fas fa-plus-square',
    content: 'Upcoming',
    apiCall: 'upcoming'
  }
];

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
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
              mobileMenu ? 'header-menu-toggle is-active' : 'header-menu-toggle'
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
              <li key={link.id} className="header-nav-item">
                <span className="header-list-name">
                  <i className={link.icon}></i>
                </span>{' '}
                {link.content}
              </li>
            ))}
            <input
              type="search"
              className="search-input"
              placeholder="Search for a movie..."
            />
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
