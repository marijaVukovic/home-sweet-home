import axios from 'axios';
import env from '../../lib/env';

import {
  checkInGuestPending,
  checkInGuestSuccess,
  checkInGuestFailure,
  checkOutGuestPending,
  checkOutGuestFailure,
  checkOutGuestSuccess,
  getGuestsPending,
  getGuestsSuccess,
  getGuestsFailure,
} from './guest.creators';

export const checkInGuest = guest => (dispatch) => {
  dispatch(checkInGuestPending(guest));
  axios.post(`${env.API_URL}/guests/`, guest)
    .then(response => dispatch(checkInGuestSuccess(response.data)))
    .catch(error => dispatch(checkInGuestFailure(error.toString())));
};

export const checkOutGuest = id => (dispatch) => {
  dispatch(checkOutGuestPending(id));
  axios.delete(`${env.API_URL}/guests2/${id}`)
    .then(() => dispatch(checkOutGuestSuccess(id)))
    .catch(error => dispatch(checkOutGuestFailure(error.toString(), id)));
};

export const getGuests = () => (dispatch) => {
  dispatch(getGuestsPending());
  axios.get(`${env.API_URL}/guests/`)
    .then(response => dispatch(getGuestsSuccess(response.data.data.guests)))
    .catch(error => dispatch(getGuestsFailure(error.toString())));
};
