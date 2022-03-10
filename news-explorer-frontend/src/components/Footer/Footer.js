import React from 'react';
import { Link } from 'react-router-dom';
import linkedin from '../../images/linkedin.svg';
import github from '../../images/github.svg';

function Footer() {
  return (
    <footer className='footer'>
        <p className='footer__copyright'>
          © {new Date().getFullYear()} Seaf Aliyan | News API
        </p>
        <div className='footer__content-container'>
          <ul className='footer__content footer__links'>
            <li className='footer__item'>
              <Link className='footer__link' to='/'>
                Home
              </Link>
            </li>
            <li className='footer__item'>
              <a
                className='footer__link'
                href='https://practicum.yandex.com/'
                target='_blank'
                rel='noreferrer'
              >
                Practicum by Yandex
              </a>
            </li>
          </ul>
          <ul className='footer__content footer__icons'>
            <li>
              <a
                href = 'https://github.com/mrseif123/'
                target='_blank'
                rel='noreferrer'
              >
                <img src={github} alt='github' className='footer__icon' />
              </a>
            </li>
            <li>
              <a
                href = 'https://www.linkedin.com/in/mrseif123/'
                target='_blank'
                rel='noreferrer'
              >
                <img src={linkedin} alt='facebook' className='footer__icon' />
              </a>
            </li>
          </ul>
        </div>
    </footer>
  );
}
export default Footer;
