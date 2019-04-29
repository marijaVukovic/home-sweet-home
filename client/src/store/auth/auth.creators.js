import actionTypes from './auth.type';

export const authLoginPending = () => ({
  type: actionTypes.AUTH_LOGIN_PENDING,
});

export const authLoginSuccess = auth => ({
  type: actionTypes.AUTH_LOGIN_SUCCESS,
  payload: auth,
});

export const authLoginFailure = error => ({
  type: actionTypes.AUTH_LOGIN_FAILURE,
  error,
});
