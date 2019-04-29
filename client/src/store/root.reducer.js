import { combineReducers } from 'redux';

import guestReducer from './guest/guest.reducer';
import authReducer from './auth/auth.reducer';

export const rootReducer = combineReducers({
  guest: guestReducer,
  auth: authReducer,
});
