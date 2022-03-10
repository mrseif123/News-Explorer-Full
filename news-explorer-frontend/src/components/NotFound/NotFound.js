import React from 'react';

const NotFound = ({ error }) => {
  return (
    <div className='not-found'>
      <div className='not-found__icon'></div>
      <h3 className='not-found__title'>
        {error
          ? 'Sorry, something went wrong. Please try again later'
          : 'Nothing Found. Sorry, but nothing matched your search terms.'}
      </h3>
    </div>
  );
};

export default NotFound;
