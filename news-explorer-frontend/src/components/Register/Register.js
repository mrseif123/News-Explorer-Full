import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Register({
  handleRegisterSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) {

  return (
    <PopupWithForm
      buttonText='Sign up'
      title='Sign up'
      link='Sign in'
    >
      <div className='auth__container'>
        <form
          action='#'
          className='auth'
          title='Sign up'
          onSubmit={handleRegisterSubmit}
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
          <input
            className='form__input-dark'
            placeholder='Username'
            name='Username'
            type='text'
            errorText='This username is not available'
            required
          />
          <button
            type='submit'
            className='form__submit-button_dark'
            onSubmit={handleRegisterSubmit}
            to='/main'
          >
            Sign up
          </button>
        </form>
        <p className='form__text'>
          or{' '}
          <Link className='auth__link' to='/signin'>
            Sign in
          </Link>
        </p>
      </div>
    </PopupWithForm>
  );
}
export default Register;
