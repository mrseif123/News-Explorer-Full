import { React, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  const { isLoggedIn, handlePopup, isLoggedOut } = props;
  useEffect(() => (!isLoggedIn && !isLoggedOut) ? handlePopup() : null, [isLoggedIn, handlePopup, isLoggedOut])

  return (
    <Route>
      {() =>
        props.isLoggedIn ? <Component {...props} /> : <Redirect to='/' /> 
      }
    </Route>
  );
}

export default ProtectedRoute;
