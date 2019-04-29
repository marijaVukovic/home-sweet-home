import actionTypes from './guest.type';

export const checkInGuestPending = () => ({
  type: actionTypes.CHECK_IN_GUEST_PENDING,
});

export const checkInGuestSuccess = guest => ({
  type: actionTypes.CHECK_IN_GUEST_SUCCESS,
  payload: guest,
});

export const checkInGuestFailure = error => ({
  type: actionTypes.CHECK_IN_GUEST_FAILURE,
  error,
});

export const checkOutGuestPending = id => ({
  type: actionTypes.CHECK_OUT_GUEST_PENDING,
  payload: id,
});

export const checkOutGuestSuccess = id => ({
  type: actionTypes.CHECK_OUT_GUEST_SUCCESS,
  payload: id,
});

export const checkOutGuestFailure = (error, id) => ({
  type: actionTypes.CHECK_OUT_GUEST_FAILURE,
  error,
  payload: id,
});

export const getGuestsPending = () => ({
  type: actionTypes.GET_GUESTS_PENDING,
});

export const getGuestsSuccess = guests => ({
  type: actionTypes.GET_GUESTS_SUCCESS,
  payload: guests,
});

export const getGuestsFailure = error => ({
  type: actionTypes.GET_GUESTS_FAILURE,
  error,
});
