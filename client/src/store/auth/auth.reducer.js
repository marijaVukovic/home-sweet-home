import actionTypes from './auth.type';

const initialState = {
  data: null,
  error: null,
  isLoginInProgress: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.AUTH_LOGIN_PENDING:
    return {
      ...state,
      error: null,
      isLoginInProgress: true,
    };
  case actionTypes.AUTH_LOGIN_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoginInProgress: false,
    };
  case actionTypes.AUTH_LOGIN_FAILURE:
    return {
      ...state,
      error: action.error,
      isLoginInProgress: false,
    };
  default:
    return state;
  }
};
