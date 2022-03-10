import React, { useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Navigation from '../Navigation/Navigation';

const Header = (props) => {
  const {
    setIsPopupOpen,
    setFormPopup,
    signoutHandler,
    handlePopup,
    isFormPopupOpen,
    isSavedNews,
    isPopupOpen,
    isLoggedIn,
    isNavOpen,
    setIsNavOpen,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
  const willMount = useRef(true);


  function setIsNavOpenStatus() {
    if (isFormPopupOpen) {
      setIsNavOpen(false);
      setIsPopupOpen(false);
      setFormPopup(false);
    } else {
      setIsNavOpen(!isNavOpen);
    }
  }

  function navigationLink(activeClass) {
    if (isSavedNews && !isNavOpen) {
      return activeClass;
    } else if (isSavedNews && isNavOpen) {
      return '';
    } else {
      return '';
    }
  }
  const compWillMount = (func) => {
    if (willMount.current) func();
    willMount.current = false;
  };

  compWillMount(() => {
    history.location.state = null;
    return;
  });

  useEffect(() => {
    if (
      history.location.state === null ||
      history.location.state === undefined
    ) {
      return;
    } else if (history.location.state.redirected) {
      handlePopup();
      return;
    }
    return;
  }, [history.location.state, handlePopup]);


  function calcLogoutOpen(navOpen) {
    if (navOpen) return "header__logout_open"
  }

  function calcHeaderWidth(navOpen, loggedIn, isSaved){
    if (navOpen && loggedIn) return "header__mobile-nav_visible_both"
    if (loggedIn && !navOpen && isSaved) return "header__mobile-nav_visible_logged_white"
    if (loggedIn && !navOpen && !isSaved) return "header__mobile-nav_visible_logged"
    if (!loggedIn && navOpen) return "header__mobile-nav_visible_open"
    

    return "HEH"
  }

  return (
        <header className = {
          `header ${isNavOpen ? 'header_nav-active' : ''} ${isNavOpen ? 'header_nav-active' : ''}`
        } >
      <div className='header__size'>
        <p className={`header__logo ${navigationLink('header__logo_dark')} `}>
          NewsExplorer
        </p>

        <button
          onClick={setIsNavOpenStatus}
          className={`header__icon ${isNavOpen ? 'header__icon_active' : ''}
          ${isFormPopupOpen || isPopupOpen ? 'header__icon_active' : ''}
          ${navigationLink('header__icon_dark')}`}
        ></button>
        <div
          className = {
            `header__mobile-nav ${calcHeaderWidth(isNavOpen, isLoggedIn, isSavedNews)}`
          }
        >
          <Navigation
            isLoggedIn={isLoggedIn}
            isSavedNews={isSavedNews}
            isNavOpen={isNavOpen}
            navigationLink={navigationLink}
          />
          {isLoggedIn ? (
            <button
              onClick={signoutHandler}
              className={`header__logout
                ${navigationLink('header__logout_dark')} ${calcLogoutOpen(isNavOpen)}`}
            >
              {isNavOpen ? 'Log Out' : `${currentUser && currentUser.name}`}
            </button>
          ) : (
            <button
              onClick={handlePopup}
              className={`header__signin
                ${navigationLink('header__signin_dark')}`}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;