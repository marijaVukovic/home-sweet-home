import axios from 'axios';
import env from '../../lib/env';

import {
  authLoginPending,
  authLoginSuccess,
  authLoginFailure,
} from './auth.creators';

export const login = authData => (dispatch) => {
  dispatch(authLoginPending(authData));
  axios.post(`${env.API_URL}/users/authenticate`, authData)
    .then((response) => {
      axios.defaults.headers.common['x-access-token'] = response.data.data.token;
      dispatch(authLoginSuccess(response.data.data.user));
    })
    .catch(error => dispatch(authLoginFailure(error.toString())));
};
