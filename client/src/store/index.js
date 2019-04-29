import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './root.reducer';

// eslint-disable-next-line no-undef
const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // eslint-disable-next-line no-undef
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export * from './root.actions';
export * from './root.selectors';
