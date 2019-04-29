import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { authSelectors, store } from '../../store';
import Routes from '../../lib/routes';

const checkIfAuthed = () => {
  const state = store.getState();
  return !!authSelectors.getAuthUser(state);
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (checkIfAuthed() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: Routes.SignIn,
          state: {
            desiredLocation: props.location.pathname,
          },
        }}
      />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.any,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default PrivateRoute;
