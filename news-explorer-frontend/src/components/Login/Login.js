import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Login({
  email,
  loggedIn,
  userEmail,
  setUserEmail,
  password,
  setPassword,
  handleLoginSubmit,
  setEmail,
}) {

  return (
    <PopupWithForm
      buttonText='Sign in'
      title='Sign in'
      link='Sign up'
    >
      <div className='auth__container'>
        <form
          action='#'
          className='auth'
          title='Sign in'
          onSubmit={handleLoginSubmit}
          to='/main'
        >
          <input
            className='form__input-dark'
            placeholder='Email'
            name='Email'
            type='email'
            errorText='Invalid email address'
            required
            value={email}
          />
          <input
            className='form__input-dark'
            placeholder='Password'
            name='Password'
            type='password'
            errorText='Password requires additional characters'
            required
            value={password}
          />
          <button
            type='submit'
            className='form__submit-button_dark'
            onClick={handleLoginSubmit}
          >
            Sign in
          </button>
        </form>
        <Link className='auth__link' to='/signup'>
          or Sign up
        </Link>
      </div>
    </PopupWithForm>
  );
}
export default Login;
