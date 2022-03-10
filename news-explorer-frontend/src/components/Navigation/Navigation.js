import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isLoggedIn, navigationLink, isNavOpen }) => {
  function savedArticlesLink() {
    if (isLoggedIn) {
      return (
    <li className = {
      `navigation ${isNavOpen ? 'navigation_active' : ''}`
    } >
      <NavLink
          to='/saved-news'
          exact={true}
          activeClassName='navigation__link_active_dark'
          className={`navigation__link ${navigationLink(
            'navigation__link_dark'
          )}`}
        >
          Saved articles
        </NavLink>
      </li>
      );
    } else {
      return;
    }
  }

  return (
    <ul className = {
      `navigation ${isNavOpen ? 'navigation_active' : ''}`
    } >
    <li className = {
      `navigation ${isNavOpen ? 'navigation_active' : ''}`
    } >        
    <NavLink
          to='/'
          exact={true}
          activeClassName='navigation__link_active'
          className={`navigation__link ${navigationLink(
            'navigation__link_dark'
          )}`}
        >
          Home
        </NavLink>
      </li>
        {savedArticlesLink()}
    </ul>

  );
};

export default Navigation;