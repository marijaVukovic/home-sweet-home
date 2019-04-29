import { createSelector } from 'reselect';

const compareGuests = (guest1, guest2) => guest2.checkInDate - guest1.checkInDate;

const checkingOutIdsArray = state => state.guest.checkingOutIds;

const getGuestsUnsorted = state => state.guest.data;

export const getGuestsError = state => state.guest.error;

export const getIsCheckInInProgress = state => state.guest.isCheckInInProgress;

export const getGuests = createSelector(
  getGuestsUnsorted,
  guests => guests.sort(compareGuests),
);

export const getCheckingOutIds = createSelector(
  checkingOutIdsArray,
  checkingOutIds => new Set(checkingOutIds),
);
