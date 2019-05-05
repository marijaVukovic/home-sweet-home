import moment from 'moment';
import actionTypes from './guest.type';

const initialState = {
  data: [],
  error: null,
  isCheckInInProgress: false,
  checkingOutIds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CHECK_IN_GUEST_PENDING:
    return {
      ...state,
      isCheckInInProgress: true,
    };
  case actionTypes.CHECK_IN_GUEST_SUCCESS:
    return {
      ...state,
      isCheckInInProgress: false,
      data: [
        ...state.data,
        {
          ...action.payload,
          checkInDate: moment(action.payload),
        },
      ],
    };
  case actionTypes.CHECK_IN_GUEST_FAILURE:
    return {
      ...state,
      isCheckInInProgress: false,
      error: action.error,
    };
  case actionTypes.CHECK_OUT_GUEST_PENDING:
    return {
      ...state,
      checkingOutIds: [
        ...state.checkingOutIds,
        action.payload,
      ],
    };
  case actionTypes.CHECK_OUT_GUEST_SUCCESS:
    return {
      ...state,
      data: state.data.filter(user => user._id !== action.payload),
      checkingOutIds: state.checkingOutIds.filter(id => id !== action.payload),
    };
  case actionTypes.CHECK_OUT_GUEST_FAILURE:
    return {
      ...state,
      checkingOutIds: state.checkingOutIds.filter(id => id !== action.payload),
      error: action.error,
    };
  case actionTypes.GET_GUESTS_PENDING:
    return {
      ...state,
    };
  case actionTypes.GET_GUESTS_SUCCESS:
    return {
      ...state,
      data: [
        ...action.payload.map(guest => ({
          ...guest,
          checkInDate: moment(guest.checkInDate),
        })),
      ],
    };
  case actionTypes.GET_GUESTS_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};
